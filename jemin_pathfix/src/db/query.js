var connection = require('./access');
var fs = require('fs');
var async = require('async');

exports.totalTmp = function (server, date, path){

    var file = path+'/proxy_'+server+'/'+server+'.log.00000001-'+date;
    fileToJSON(file, function(ferr, fRes){
        if(ferr) {
            if(ferr.code == 'ENOENT'){
                console.log('파일 없음');
            }else{
                console.log(ferr);
            }
        }
        async.each(fRes, function (data, ecb){
            setQueryLog(server, data, function(err, res){
               if(err){
                   console.log(err);
               }
               ecb(err);
           })
       },function (err){
           console.log('완료');
       })
    })
};


function fileToJSON (file, callback){
    arr = [];
    fs.readFile(file,'utf8',function (err, data) {
        if(err){
            console.log('err :'+ err);
            callback(err, null);
            return;
        }
        data = data.replace(/([\u0000\u2000-\u200b\u2028-\u2029\u3000])/g, '');
        arr = data.split('\n');
        arr.pop();
        for(let i = 0; i < arr.length; i++){
            arr[i] = JSON.parse(arr[i]);
            arr[i].starttime = arr[i].starttime.replace(/[- :]/g,'').substring(0,14);
            arr[i].endtime = arr[i].endtime.replace(/[- :]/g,'').substring(0,14);
        }
        callback(null, arr);
    });
}

function setQueryLog (server, data, callback) {
    var dataTemp = [
                    data.starttime,
                    data.endtime, 
                    data.duration_us, 
                    data.event,
                    data.query,
                    data.rows_affected,
                    data.rows_sent,
                    data.schemaname,
                    data.client,
                    data.username,
                    server
                ];
    var query = "INSERT INTO QUERYLOG "
                +"(STARTTIME, ENDTIME, DURATION_US, EVENT, QUERY, ROWS_AFFECTED,"
                +" ROWS_SENT, SCHEMANAME, CLIENT_IP, USERNAME, DATABASENAME) "
                +"VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    var q = connection.query(query,dataTemp, function(err, result){
        if(err) {
            console.log('err : '+err);
            callback(err,null);
            return;
        }
        callback(null,null);
    })
}