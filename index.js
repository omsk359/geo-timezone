let { cityToTimezoneId } = require('./cityToTimezone');

(async () => {
    try {
        let tzId = await cityToTimezoneId('Москва');
        console.log('timezone', tzId);
    } catch (e) {
        console.error(e);
    }
})();

