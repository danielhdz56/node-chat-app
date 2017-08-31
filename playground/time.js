const moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'years')
// console.log(date.format('MMM Do, YYYY '));

// 10:35 am

var date = moment();
console.log(date.format('h:mm a'))