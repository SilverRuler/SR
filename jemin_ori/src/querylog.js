var test = require('./db/query');
var util = require('./util/dateutil');
var schedule = require('node-schedule');

console.log('querylog 시작');

schedule.scheduleJob('*/5 * * * ?',function(){
  console.log('매시간 5분마다 스케줄 실행');
  start();
});

  
function start(){
    var path = '/var/lib/proxysql';
    var server = ['hc1', 'hc2', 'hc3', 'vc3', 'vc5', 'vc7', 'vc9'];
    var ts = util.getTimeStamp();
    for(let i = 0 ; i < server.length; i++){
      test.totalTmp(server[i], ts, path);
    }
}