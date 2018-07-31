export function playSound({sendCommand}, soundId) {
    return sendCommand({
        command: SOUND_COMMAND_ID,
        params: {
            sound_id: soundId
        }
    });
};

export function muteSound({sendCommand}) {
    return sendCommand({
        command: HANGAR_SOUND_COMMAND,
        params: {
            mute: true
        }
    });
};

export function unmuteSound({sendCommand}) {
    return sendCommand({
        command: HANGAR_SOUND_COMMAND,
        params: {
            mute: false
        }
    });
};
