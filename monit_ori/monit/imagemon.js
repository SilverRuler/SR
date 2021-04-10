var si = require('systeminformation');
var async = require('async');
var exec = require('child_process').exec;
var request = require('request');
var fs = require('fs');
var diskSize=0;
var diskUsed=0;
exports.getImageInformation = function(procList,serverType, callback) {
  async.series({
    getResponseTime:function(cb){
      getResponseTime(procList,cb);
    },
    diskStat:function(cb){
      getDiskUsage(cb)
    },
    getImageUsage:function(cb){
      getDiskImageUsage(cb);
    },
    getSyncDate: function(cb){
      if(serverType=="BACKUP"){
        getSyncImageDate(cb);
      }else{
        cb(null,null);
      }
    },
    getVirusData: function(cb){
      getVirusData(cb);
    }             
  },
  function(error, results) {
    if (error) {
      callback(error, null);
      return;
    }
    callback(error, results);
  });
}

function getResponseTime(proclist,callback){
  var result = [];
  async.each(proclist,
    function(proc, cb) {
      var port = proc.args[0];
      var path = '/HealthCheck';
      request.get({ url: 'http://127.0.0.1:'+port+path, time: true }, function (err, response) {
        //console.log('The actual time elapsed:', response.elapsedTime);
        if(response.body!=null && response.body!="" && response.body!="undefined"){
	        var res = JSON.parse(response.body);
          var ret = {
            port:port,
            elapsed:response.elapsedTime,
            maxcon:res.LIMIT,
            used:res.CUR,
            status: 'online'
          };
          result.push(ret);
          cb(null);
	      }else{
          var ret = {
            port:port,
            elased:0,
            status: 'stopped'
          };
          result.push(ret);
          cb(null);
	      }
      });
    }, 
    function(err) {
      callback(err, result);
    });
}

function getFileList(callback){
  var fileArr = [];
  fs.readdir('/var/log/ClamAV/',function(error,fileList){
    if(error){
      console.log(error);
      return [];
    }else{
      callback(null,fileList);
      // fileArr = fileList;
    }
  });
}
function getVirusData(callback){
  var result = [];
  async.waterfall([
    function(wcb){
      getFileList(wcb);
    },
    function(fileArr,wcb){
      async.each(fileArr,function(file,ecb){
      imageDisk = '';
      var space = 'tail /var/log/ClamAV/'
      var space2 = ' |cat |grep "Infected files"'
      var a=exec(space+file+space2,function(error,sz,err){
        if(err){
        console.log('get dist image space error :' + err);
        }else{
          if(sz!=null && sz != ''){
            var vir = sz.split(': ')[1];
            if(vir != 0){
              result.push(file);
            }
          }
        }
      ecb(null);
      });
    },
    function(err,res){
      wcb(null,res);
    });
    }
  ],
  function(err,res){
    callback(null,result);
  });
}

function getDiskUsage(callback){
  var result = [];
  si.fsSize(function(data) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].mount == '/home') {
        diskSize=data[i].size/1024;
        diskUsed=data[i].used/1024;
        result.push({size:diskSize, used:diskUsed});
      }
    }
  callback(null,result);
  })
}

function getDiskImageUsage(callback){
    var result= [];
    imageDisk = '';
    var space = 'du -s ../vegas/vegasImage/public/image'
    var a=exec(space,function(error,size,err){
      if(err){
        console.log(err);
        }else{
        if(size != null && size != ''){
          splitData = size.split('../');
          splitData2 = splitData[0].split('/t');
          imageDisk=Number(splitData2[0]);
          var imageUsePer = imageDisk/diskSize*100;
          result.push({imageSize : imageDisk,imageUsePer:imageUsePer,usingSpace:diskSize-diskUsed});
        }
      }
    callback(err,result);
    });
}

  function getSyncImageDate(callback){
    var result= [];//실패에 대한 다른방법
    var cmdexec = 'tac  /var/mail/root |grep Date | sed -n 1p'
    var a=exec(cmdexec,function(error,data,err){
      console.log("data="+data);
      if(err){
        logger.error('get dist image space error :' + err);
      }else{
        if(data!=null && data != ''){
          console.log(data);
          result.push(data);
        }
      }
      callback(null,result);
    });
  }
