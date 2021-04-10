var dateutils = require('date-utils');

exports.getTimeStamp = function() {
    var d = new Date();
    var ts = d.toFormat('YYYYMMDD')
  
    return ts;
};