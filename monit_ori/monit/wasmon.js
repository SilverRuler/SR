var request = require('request');
var async = require('async');


exports.getResponseTime = function(proclist, callback) {
  var result = [];
  async.each(proclist,
    function(proc, cb) {
      var port = proc.args[0];
      var path = '/HealthCheck';
      request.get({ url: 'http://127.0.0.1:'+port+path, time: true }, function (err, response) {
        //console.log('The actual time elapsed:', response.elapsedTime);
        var res = JSON.parse(response.body);
        console.log("res="+res);
	var ret = {
          port:port,
          elapsed:response.elapsedTime,
          maxcon:res.LIMIT,
          used:res.CUR
        };
        result.push(ret);
        cb(null);
      });
    }, 
    function(err) {
      callback(err, result);
    });
};
