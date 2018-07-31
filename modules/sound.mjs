const HANGAR_SOUND_COMMAND = 'hangar_sound',
    SOUND_COMMAND_ID = 'sound';

export default {
    methods: {
        muteSound({sendCommand}) {
            return sendCommand({
                command: HANGAR_SOUND_COMMAND,
                params: {
                    mute: true
                }
            }).catch(() => {});
        },
        unmuteSound({sendCommand}) {
            return sendCommand({
                command: HANGAR_SOUND_COMMAND,
                params: {
                    mute: false
                }
            }).catch(() => {});
        },
        playSound({sendCommand}, soundId) {
            return sendCommand({
                command: SOUND_COMMAND_ID,
                params: {
                    sound_id: soundId
                }

            });
        }
    }
};
