export function openHangar({sendCommand}) {
    return sendCommand({
        command: 'open_tab',
        params: {
            commandParams: {
                tab_id: 'hangar'
            },
            noResponse: true
        }
    });
};
