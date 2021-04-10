var async = require('async');
var mysql = require('mysql');
var exec = require('child_process').exec;
var conf = require('./config.json');

exports.getDatabaseStat = function(pool, callback) {
  var result = {Status:'', MaxConnection:0};
  var child = exec("mysqladmin -uvegas -p'!mgrsol123' ping", function (error, stdout, stderr) {
    result.Status = stdout;
    if(result.Status.indexOf('alive') == -1) {
      result.Metrics = selectMetrics(null);
      callback(null, result);
    }  else {
      pool.getConnection(function(err, connection) {
        async.series({
          max_connection : function(scb) {
             connection.query("SHOW GLOBAL VARIABLES LIKE 'max_connections'", function(err, res) {
               scb(err, res[0].Value);
            });
          },
          metrics : function(scb) {
             connection.query("SHOW GLOBAL STATUS", function(err, res) {
               var m = selectMetrics(res);
               scb(err, m);
            });
          },
          slaveStatus:function(scb) {
            if(conf.mode == 'slave') {
              connection.query("SHOW SLAVE STATUS", function(err, res) {
                var m = selectSlaveStatus(res);
                console.log(m);
                scb(err, m);
              });
            } else {
              var m = selectSlaveStatus(null);
              scb(null, m);
            }
          },
          removed: function(scb) {
            removeProcess(connection, scb);
          }
        }, 
        function(error, results) {
          connection.release();
          result.Metrics = results.metrics;
          result.MaxConnection = results.max_connection;
          result.SlaveStatus = results.slaveStatus;
          callback(null, result);
        });
      });
    }
  });
};


function removeProcess(connection, callback) {
  var sql = "SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST WHERE TIME > ? \n"
          + "ORDER BY TIME DESC LIMIT 0, 10";
  connection.query(sql, [300], function(err, res) {
    if(res != null && res.length > 0) {
      async.each(res,
        function(process, cb) {
          var cmd = 'kill ' + process.ID;
          connection.query(cmd, cb);;
        },
        function(error) {
          callback(error, res.length);
        }
      );
    } else {
      callback(null, 0);
    }
  }); 
}

function slaveStatus(connection, callback) {
  var sql = "SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST WHERE TIME > ? \n"
          + "ORDER BY TIME DESC LIMIT 0, 10";
  connection.query(sql, [300], function(err, res) {
    if(res != null && res.length > 0) {
      async.each(res,
        function(process, cb) {
          var cmd = 'kill ' + process.ID;
          connection.query(cmd, cb);;
        },
        function(error) {
          callback(error, res.length);
        }
      );
    } else {
      callback(null, 0);
    }
  }); 
}

function selectMetrics(statusList) {
  var metrics = {
    "Aborted_connects" : -1,
    "Aborted_clients" : -1,
    "Slow_queries" : -1,
    "Threads_connected" : -1,
    "Threads_created" : -1,
    "Threads_running" : -1,
    "wsrep_received" : -1,
    "wsrep_received_bytes" : -1,
    "wsrep_local_commits" : -1,
    "wsrep_local_cert_failures" : -1,
    "wsrep_local_replays" : -1,
    "wsrep_local_send_queue" : -1,
    "wsrep_local_send_queue_max" : -1,
    "wsrep_local_send_queue_min" : -1,
    "wsrep_local_send_queue_avg" : -1,
    "wsrep_local_recv_queue" : -1,
    "wsrep_local_recv_queue_max" : -1,
    "wsrep_local_recv_queue_min" : -1,
    "wsrep_local_recv_queue_avg" : -1,
    "wsrep_local_state_comment" :'',
    "wsrep_incoming_addresses" : '',
    "wsrep_evs_repl_latency" :-1,
    "wsrep_evs_state" : '',
    "wsrep_cluster_status" : '',
    "wsrep_cluster_size": -1,
    "wsrep_connected" : ''
  };

  if(statusList == null) {
    return metrics;
  }

  for(var i = 0; i < statusList.length; i++) {
    for(var key in  metrics) {
      if(key == statusList[i].Variable_name) {
        metrics[key] = statusList[i].Value;
        break;
      }
    }
  }
  return metrics;
}

function selectSlaveStatus(statusList) {
  var metrics = {
    "Master_Server_Id": -1,
    "Slave_IO_State":'',
    "Read_Master_Log_Pos": -1,
    "Slave_IO_Running": "No",
    "Slave_SQL_Running": "No",
    "Master_Log_File": "",
    "Last_IO_Error": "",
    "Master_Host": "",
    "Master_User": "",
    "Master_Port": ""
  };

  if(statusList == null || statusList.length == 0) {
    return metrics;
  }
  
  var s = statusList[0];
  for(var key in  metrics) {
    metrics[key] = s[key]; // copies each property to the objCopy object
  }

  return metrics;
}
