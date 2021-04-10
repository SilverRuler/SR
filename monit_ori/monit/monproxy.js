var conf = require('./config.json');
var jsonfile = require('jsonfile');
var redis = require('redis');
var mysql = require('mysql');
var async = require('async');
var dateFormat = require('dateformat');
var moment = require('moment');
var sysinfo = require('./sysmon.js');
var wasmon = require('./wasmon.js');
var dbmon = require('./dbmon.js');
var command = require('./command.js');
var imagemon = require('./imagemon.js')
var redisClient = null;
var pool = null;
var iteration = 0;

function startMon() {
  redisClient = redis.createClient(conf.redis);
  redisClient.select(2);
  var arg = null;
  if(conf.server_type == 'WAS' || conf.server_type =='IMAGE' || conf.server_type =='BACKUP') {
    var file = conf.process_dir + 'process.json';
    var obj = jsonfile.readFileSync(file);
    arg = obj.apps;
  } else {
    pool  = mysql.createPool(conf.mysql);
    arg = pool;
  }

  subscribeCommand();
  var interval = setInterval(function(arg) {
    monitorMain(arg, iteration, function(error, results) {
     iteration++;
    });
  }, 60*1000, arg, iteration);
}

function monitorMain(arg, iteration, callback) {
  var currTime = '';
  async.waterfall([
    function(cb) {
      var x = redisClient.send_command('TIME', function(err, r) {
        if(err) {
          console.log(err);
          cb(err);
        } else {
          var d = parseInt(r[0]);
          var timestamp = moment.unix(d);
          currTime = dateFormat(timestamp, 'yyyymmddHHMMss');
          cb(null);
        }
      });
    },
    function(cb) {//imagemon 
	sysinfo.getSystemInformation(conf.ipaddress[0], function(error, sysmon) {
        sysmon.time = currTime;
        sysmon.name = conf.nominal;
        sysmon.type = conf.server_type;
        var data = JSON.stringify(sysmon);
        var key = getRedisKey(currTime, conf.nominal, 'SYS');
        insertData(key, data, cb);
      });
    },
    function(cb) {
	return cb(null); // 나중에 삭제해야하는 줄
      if(conf.server_type == 'WAS' ) {
        wasmon.getResponseTime(arg, function(error, results) {
         var stat = {time:currTime, stat:results}
          var data = JSON.stringify(stat);
          var key = getRedisKey(currTime, conf.nominal, 'WAS');
          insertData(key, data, cb);
        });
      }else if(conf.server_type == 'IMAGE' || conf.server_type =='BACKUP'){
        imagemon.getImageInformation(arg,conf.server_type,function(error,results){
          results.time = currTime;
          results.name = conf.nominal;
          results.type = conf.server_type;
          var data = JSON.stringify(results);
          var key = getRedisKey(currTime,conf.nominal,'IMAGE');
          insertData(key,data,cb);
        });
      }else{
        if(iteration % 5 == 0) {
          dbmon.getDatabaseStat(pool, function(error, result) {
            result.time = currTime;
            var data = JSON.stringify(result);
            var key = getRedisKey(currTime, conf.nominal, 'DB');
            insertData(key, data, cb);
          });
        } else {
          cb(null);
        }
      }
    }],
    function(error) {
      callback(null);
    });
}

function getRedisKey(ts, nominal, mtype) {
  var key = [nominal, ts.substr(0,8), mtype];
  return key.join(':');
}

function insertData(key, data, callback) {
  redisClient.exists(key, function(err,reply) {
    if(!err) {
      if(reply === 1) {
        redisClient.lpush(key, data);
        console.log("Key exists");
      } else {
        redisClient.lpush(key, data);
        redisClient.expireat(key, parseInt((+new Date)/1000) + 86400);
        console.log("Does't exists");
      }
      callback(null);
    }  else {
      callback(err);
    }
  });
}

function subscribeCommand() {
  var client = redis.createClient(conf.redis);
  var ch = conf.nominal + ':CMD';
  client.on("message", function(channel, message) {
    var cmd = JSON.parse(message);
    console.log(message);
    console.log(cmd);
    command.executeCommand(cmd, function(err) {

    });
  });
  client.subscribe(ch);
}

function test() {
  redisClient = redis.createClient(conf.redis);
  redisClient.select(2);
/*
  var x = redisClient.send_command('TIME', function(err, r) {
    var d = parseInt(r[0]);
    var timestamp = moment.unix(d);
    var currTime = dateFormat(timestamp, 'yyyymmddHHMMss');

    var key = getRedisKey(currTime, conf.nominal, 'WAS');
    console.log(key);
    console.log(currTime)
  });
*/
/*
  var x = redisClient.lrange('WAS001V:20180621:WAS', 0, 0, function(err, r) {
    console.log(r);
  });
*/

  pool  = mysql.createPool(conf.mysql);
  dbmon.getDatabaseStat(pool, function(error, results) {
    console.log(results);
  });
}

//test();
startMon()

