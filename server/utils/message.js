const moment = require('moment');

var date = moment();
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: date.format('MMM YYYY')
    }
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocationMessage};

