import sendCommand from '../w2c/core.mjs';

export default {
    intall(Vue, { global, modules, transportProps}) {
        let bindedSendCommand = sendCommand.bind(
                undefined,
                {
                    transport: global.jsHostQuery.bind(global),
                    transportProps
                }
            ),
            bindedModules = {};

        for (let [moduleName, module] in Object.entries(modules)) {
            let bindedModule = bindedModules[moduleName] = {};

            for (let [commandName, command] in Object.entries(module)) {
                bindedModule[commandName] = command.bind(undefined, {
                    sendCommand: bindedSendCommand
                });
            }
        }

        Vue.prototype.$w2c = bindedModules;
    }
};
