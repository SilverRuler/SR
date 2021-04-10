var
  daemon = require('daemon')
  , fs = require('fs')
  , process = require('child_process')
  , conf = require('./msol2.json')
  ;

if(conf.daemon == true)
  daemon();

/*
if(cluster.isMaster) {
  process.on('uncaughtException', function (err) {
    logger.error("unhandled exception : " + err + "\n" + err.stack);
  });

  /////////////////////////////////////////////////////////////////////
  // master
  /////////////////////////////////////////////////////////////////////
  var worker = cluster.fork().process;

  cluster.on('exit', function(worker) {
    console.log('worker %s dies. restart...', worker.process.pid);
    setTimeout(function() {
      cluster.fork();
    }, 1000*3);
  });
} else {
  main.start();
}
*/

function startMain()
{
  var main = process.fork("main.js");  

  main.on('exit', function (code) {
    console.log('child process exited with code ' + code);
    setTimeout(startMain, 1000*3);
  });  
}
/*
function startMonitor()
{
  var main = process.fork("monitor.js");  

  main.on('exit', function (code) {
    console.log('child process exited with code ' + code);
    setTimeout(startMonitor, 1000*3);
  });  
}
*/
startMain();
//startMonitor();
