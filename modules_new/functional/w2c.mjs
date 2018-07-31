import sendCommand from '../w2c/core.mjs';
import * as sound from '../w2c/modules/sounds.mjs';
import * as openTab from '../w2c/modules/openTab.mjs';

let bindedSendCommand = sendCommand.bind(
    undefined,
    {
        transport: global.jsHostQuery.bind(global),
        transportProps: {
            prefix: 'w2c-',
            timeout: 150
        }
    }
);

export default [sound, openTab].reduce((module, acc) => {
    Object.keys(module).forEach((methodName) => {
        acc[methodName] = module[methodName].bind(undefined, {
            sendCommand: bindedSendCommand
        });
    });
}, {});
