export function openHangar({sendCommand}) {
    return sendCommand({
        command: 'open_tab',
        params: {
            tab_id: 'hangar'
        }
    });
};
