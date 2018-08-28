import { sendCommand, bindModules } from '../w2c/core.mjs';
import * as sound from '../w2c/modules/sounds.mjs';
import * as openTab from '../w2c/modules/openTab.mjs';

let bindedSendCommand = sendCommand.bind(
    undefined,
    {
        // transport: global.jsHostQuery.bind(global),
        transport: (command) => {
            console.log(command.request);
        },
        transportProps: {
            prefix: 'w2c-',
            timeout: 150
        }
    }
);

export default bindModules([sound, openTab], bindedSendCommand);
