var exec = require('child_process').exec;
var config = require('./config.json');

exports.executeCommand = function(command, callback) {
  if(command.command == 'RESTART') {
    restart(callback);
  } else {
    callback(null);
  }
}


function restart(callback) {
  var proc = config.process_dir + 'process.json';
  var child = exec("pm2 restart " + proc, function (error, stdout, stderr) {
    callback(error);
  });
}

