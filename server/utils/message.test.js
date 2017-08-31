var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Daniel';
        var text = 'is awesome'
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage', () => {
   it('should generate correct location object', () => {
       var from = 'Daniel';
       var latitude = 20;
       var longitude = 40;
       var url = 'https://google.com/maps?q=20,40';
       var message = generateLocationMessage(from, latitude, longitude);
       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from,url})
   });
});