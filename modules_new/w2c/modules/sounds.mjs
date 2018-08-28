export function playSound({sendCommand}, soundId) {
    return sendCommand({
        command: 'sound',
        params: {
            commandParams: {
                sound_id: soundId
            },
            noResponse: true
        }
    });
};

export function muteSound({sendCommand}) {
    return sendCommand({
        command: 'hangar_sound',
        params: {
            commandParams: {
                mute: true
            },
            noResponse: true
        }
    });
};

export function unmuteSound({sendCommand}) {
    return sendCommand({
        command: 'hangar_sound',
        params: {
            commandParams: {
                mute: false
            },
            noResponse: true
        }
    });
};
