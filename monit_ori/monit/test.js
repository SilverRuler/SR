var exec = require('child_process').exec;
var fs = require('fs');
var async = require('async');
function getDiskImageUsage(){
  var result= [];
  imageDisk = '';
  var space = 'tail /var/log/ClamAV/imageClamAVcheck102.log |cat |grep "Infected files"'
  var a=exec(space,function(error,sz,err){
    console.log("sz="+sz.split(': ')[1]);
    var aa = sz.split(': ')[1];
    if(aa == 0){
      console.log('aa');
    }
    if(err){
      //logger.error('get dist image space error :' + err);
    }else{
      if(sz!=null && sz != ''){
        splitData = sz.substr(0,5);
        imageDisk = splitData;
      }
    }
    console.log('st'+imageDisk);
  });
}
function test(){
  fs.readdir('/var/log/ClamAV/',function(error,fileList){
    console.log(fileList);
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
function getVirusData(){
  var result = [];
  var as = [];
  async.waterfall([
    function(wcb){
      getFileList(wcb);
    },
    function(fileArr,wcb){
      console.log(fileArr);
      async.each(fileArr,function(file,ecb){
      imageDisk = '';
      var space = 'tail /var/log/ClamAV/'
      var space2 = ' |cat |grep "Infected files"'
      console.log(space+file+space2);
      var a=exec(space+file+space2,function(error,sz,err){
        if(err){
        console.log('get dist image space error :' + err);
        }else{
          if(sz!=null && sz != ''){
            var vir = sz.split(': ')[1];
            if(vir != 0){
              result.push(file);
            }else{
              as.push(file);
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
    console.log('res=' + result);
    console.log('as=' + as);
  });
}

getVirusData();
