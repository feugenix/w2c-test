import uniqid from 'uniqid';

const WEB_ID_PREFIX = 'w2c-',
    RESPONSE_TIMEOUT = 4000;

export default class Web2Client {
    constructor(global, modules) {
        this.global = global;
        this.promises = {};
        this.modules = modules;

        this.__registerClientMessagesHandler();
        this.__installModules();
        this.__installModulesToDispatch();
    }

    __registerClientMessagesHandler() {
        this.oldWoTClientMessageHandler = this.global.WoTClientMessageHandler;

        this.global.WoTClientMessageHandler = this.__clientMessageHandler.bind(this);
    }

    __clientMessageHandler(callbackString) {
        let callbackData, webId;

        try {
            callbackData = JSON.parse(callbackString);
            webId = callbackData.web_id;
        } catch(e) {
            return;
        }

        if (!webId || !this.promises[webId]) {
            if (this.oldWoTClientMessageHandler) {
                this.oldWoTClientMessageHandler(callbackString);
            }
            return;
        }

        this.promises[webId].resolve(callbackData);
        this.promises[webId] = null;
    }

    __installModules() {
        for (let module of Object.values(this.modules)) {
            let {methods} = module;

            for (let [methodName, method] of Object.entries(methods)) {
                Reflect.defineProperty(
                    this,
                    methodName,
                    {value: (...args) => method({sendCommand: this.sendCommand.bind(this)}, ...args)}
                );
            }
        }
    }

    __installModulesToDispatch() {
        this._modulesMethods = {};

        for (let module of Object.values(this.modules)) {
            let {methods} = module;

            for (let [methodName, method] of Object.entries(methods)) {
                this._modulesMethods[methodName] = (...args) => method({sendCommand: this.sendCommand.bind(this)}, ...args);
            }
        }
    }

    dispatch(command, ...params) {
        if (!this._modulesMethods[command]) {
            return Promise.reject(`no such command ${command}`);
        }

        return this._modulesMethods[command](...params);
    }

    sendCommand({command, params}) {
        let timeout, id,
            promise;

        console.log(`command ${command}`, params);
        return Promise.resolve();

        if (!this.global.jsHostQuery) {
            return Promise.reject('no jsHostQuery');
        }

        id = uniqid(WEB_ID_PREFIX);

        this.global.jsHostQuery({
            request: JSON.stringify({
                command,
                params,
                web_id: id
            }),
            persistent: false
        });

        promise = new Promise((resolve, reject) => {
            this.promises[id] = {
                resolve,
                reject
            };
        });

        timeout = setTimeout(() => {
            this.promises[id].reject('timeout');
            this.promises[id] = null;
        }, RESPONSE_TIMEOUT);

        return promise
            .then((value) => {
                clearTimeout(timeout);

                return value;
            });
    }
}
