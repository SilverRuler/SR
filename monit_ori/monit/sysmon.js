var si = require('systeminformation');
var os = require('os');
var async = require('async');

exports.getSystemInformation = function(ipaddr, callback) {
  async.series({
    currentLoad: function(cb) {
      getCpuLoad(cb);
    },
    cores: function(cb) {
      getCpuCore(cb);
    },
    diskStat: function(cb) {
      getDiskUsage(cb);
    },
    diskIO: function(cb) {
      getDiskIO(cb);
    },
    networkStat: function(cb) {
      getNetworkStat(ipaddr, cb);
    },
    momoryUsage:function(cb) {
      getMemoryUsage(cb);
    },
    operatingEtc:function(cb) {
      getOperatingEtc(cb);
    }
  },
  function(error, results) {
    if (error) {
      //logger.error("getSystemInformation :" + error);
      callback(error, null);
      return;
    }
    results.hostname = os.hostname();
    results.loadavg = os.loadavg();

    for(var i = 0; i < 3; i++)
      results.loadavg[i] = Math.round(results.loadavg[i]*100) / 100.0;
      console.log(results);
/*
    var severity = results.loadavg[0] / (results.cores / 2);
    setLoadSeverity(results);
    setDiskUsageSeverity(results);
*/
    callback(error, results);
  });
}

function setLoadSeverity(sysmon) {
  var severity = sysmon.loadavg[0] / (sysmon.cores / 2);

  sysmon.loadSeverity = 1;
  if(severity >= 0.75) {
    sysmon.loadSeverity = 4;
  } else if(severity >= 0.5 && severity < 0.75) {
    sysmon.loadSeverity = 3;
  } else if(severity >= 0.2 && severity < 0.5) {
    sysmon.loadSeverity = 2;
  }
}

function setDiskUsageSeverity(sysmon) {
  for(var i = 0; i < sysmon.diskStat.length; i++) {
    var du = sysmon.diskStat[i];
    du.severity = 1;
    if(du.use >= 90) {
      du.severity = 4;
    } else if(du.use >= 85 && du.use < 90) {
      du.severity = 3;
    } else if(du.use >= 70 && du.use < 85) {
      du.severity = 2;
    }
  }
}

function getMemoryUsage(callback) {
  var result = {free:-1, used:-1};
  si.mem(function(data) {
    result.free = data.free;
    result.used = data.used;
    result.swapused = data.swapused;
    result.swapfree = data.swapfree;
    callback(null,result);
  });
}

function getDiskUsage(callback) {
  var result = [];
  si.fsSize(function(data) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].mount == '/' || data[i].mount == '/home') {
        result.push({mount:data[i].mount, size:data[i].size, use:data[i].use});
      }
    }
    callback(null,result);
  });
}

function getNetworkStat(ipaddr, callback) {
  var result = {ip4:'', rx_sec:-1, tx_sec:-1};
  async.waterfall([
    function(cb) {
      si.networkInterfaces(function(data) {
        var iface = null;
        for(var i = 0; i < data.length; i++) {
          if(data[i].ip4 == ipaddr) {
            iface == data[i].iface;
            result.ip4 = data[i].ip4;
            break;
          }
        }
        cb(null, iface);
      });
    },
    function(iface, cb) {
      si.networkStats(iface, function(data) {
        result.rx_sec = Math.round((data.rx_sec/1024/1024) * 100) / 100.0;
        result.tx_sec = Math.round((data.tx_sec/1024/1024) * 100) / 100.0;
        cb(null);
      });
    }
  ],
  function(error) {
    callback(error, result);
  });
}

function getCpuLoad(callback) {
  var result = {user:-1, system:-1};
  si.currentLoad(function(data) {
    result.user = Math.round(data.currentload_user * 100) / 100;
    result.system = Math.round(data.currentload_system *100) / 100;
    callback(null, result);
  });
}

function getDiskIO(callback) {
  var result = {rIO:-1, wIO:-1};
  si.disksIO(function(data) {
    result.rIO = Math.round(data.rIO_sec * 100) / 100;
    result.wIO = Math.round(data.wIO_sec *100) / 100;
    callback(null, result);
  });
}

function getCpuCore(callback) {
  var result = -1;
  si.cpu(function(data) {
    result = data.cores;
    callback(null, result);
  });
}

function getOperatingEtc(callback) {
  var result = {};
  async.waterfall([
    function (wcb) {
      si.users(function (data){
        result.users = data;
        wcb(null, result);
      });
    }, function (result, wcb) {
      si.versions(function (data) {
        result.versions = data;
        wcb(null, result);
      });
    }, function (result, wcb) {
      si.blockDevices(function (data) {
        result.blockDevices = data;
        wcb(null, result);
      });
    }
  ], function (error, results) {
    callback(null, results);
  });
}

/*
function getNetGraphData(){
   netrxGraphList =[];
   nettxGraphList =[];
   for(var i = 0 ; i<netrxList.length; i++){
       if(i == 0){
           netrxGraphList.push(netrxList[i]);
           nettxGraphList.push(nettxList[i]);
       }else{
           var rxdata = netrxList[i]- netrxList[i-1];
           var txdata = nettxList[i]- nettxList[i-1];
           netrxGraphList.push(Math.round(rxdata*100)/100.0);
           nettxGraphList.push(Math.round(txdata*100)/100.0);
       }
   }
}
*/
function test() {
  si.networkInterfaces(function(data) {
    console.log('CPU-Information:');
    console.log(data);
  });
}

//getCpuLoad();
//getDiskUsage(null);
//test();

