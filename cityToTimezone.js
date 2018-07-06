let rp = require('request-promise-native');
let rpJson = rp.defaults({ json: true, encoding: 'utf8' });

let { googleKey } = require('./config');

async function cityToTimezoneId(city) {
    let response = await rpJson(`https://geocode-maps.yandex.ru/1.x/?geocode=${encodeURIComponent(city)}&format=json&results=1`);
    let kind;
    try {
        kind = response.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.kind;
    } catch (e) {
        throw new Error(`No results for "${city}"`);
    }
    if (!['province', 'locality'].includes(kind))
        throw new Error(`"${city}" is not a city`);

    let coords = response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    coords = coords.split(' ').reverse().join();
    let timestamp = +new Date()/1000|0;
    response = await rpJson(`https://maps.googleapis.com/maps/api/timezone/json?location=${coords}&timestamp=${timestamp}&key=${googleKey}`);
    if (response.errorMessage)
        throw new Error(response.errorMessage);
    return response.timeZoneId;
}

module.exports = { cityToTimezoneId };
