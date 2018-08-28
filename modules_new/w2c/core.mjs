// import uniqid from 'uniqid';

let promises = {};

export function sendCommand({
    transport,
    transportProps = {
        prefix: 'w2c-core-',
        timeout: 42
    }
}, {
    command,
    params = {
        commandParams: {},
        noResponse: false
    }
}) {

    let timeout, id,
        promise;

    if (!transport) {
        return Promise.reject('no transport');
    }

    // id = uniqid(transportProps.prefix);
    id = `${transportProps.prefix}${Math.random()}`;

    transport({
        request: JSON.stringify({
            command,
            params: params.commandParams,
            web_id: id
        }),
        persistent: false
    });

    if (params.noResponse) {
        return;
    }

    promise = new Promise((resolve, reject) => {
        promises[id] = {
            resolve,
            reject
        };
    });

    timeout = setTimeout(() => {
        promises[id].reject('timeout');
        promises[id] = null;
    }, transportProps.timeout);

    return promise
        .then((value) => {
            clearTimeout(timeout);

            return value;
        });
};

export function bindModules(
    modules = [],
    bindedSendCommand = () => {}
) {

    if (!(modules instanceof Array)) {
        modules = [modules];
    }

    return modules.reduce((acc, module) => {
        Object.keys(module || {}).forEach((methodName) => {
            let method = module[methodName];

            if (typeof method === 'function') {
                acc[methodName] = method.bind(undefined, {
                    sendCommand: bindedSendCommand
                });
            }
        });

        return acc;
    }, {});
}
