var fs = require("fs");
var mysql = require('mysql');


var info = fs.readFileSync("/root/jemin/src/info.json");
var JSON_info = JSON.parse(info);

var connection = mysql.createConnection({
        host: JSON_info.proxy.host,
        user: JSON_info.proxy.user,
        port: JSON_info.proxy.port,
        password: JSON_info.proxy.password,
        database: JSON_info.proxy.database
});


module.exports = connection;
