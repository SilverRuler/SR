/**
 * Module dependencies.
 */
var fs = require('fs')
  , log4js = require('log4js')
  , url = require('url')
  , path = require('path')
  , util = require('util')
  , HashMap = require('hashmap').HashMap
  , multer  = require('multer')
  ;

var express = require('express')
  , swig = require('swig')
  , http = require('http')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  ;

var msol2conf = require('./msol2.json')
  , vegasImage = require('./routes/vegasImage')
  ;

var app = express();

var views = __dirname + '/views';

var imageDir = path.normalize(__dirname + msol2conf.directory.image);
fs.exists(imageDir, function (exists) {
  if(!exists) {
    fs.mkdir(imageDir, 0755);
  }
});

var uploadDir = path.normalize(__dirname + msol2conf.directory.upload);
fs.exists(uploadDir, function (exists) {
  if(!exists) {
    fs.mkdir(uploadDir, 0755);
  }
});

var logDir = path.normalize(__dirname + msol2conf.directory.logs);
fs.exists(logDir, function (exists) {
  if(!exists) {
    fs.mkdir(logDir, 0755);
  }
});
log4js.configure('log4js.json', { cwd: logDir });
var logger = log4js.getLogger("app");

logger.info('imageDir = ' + imageDir);
logger.info('uploadDir = ' + uploadDir);
logger.info('logDir = ' + logDir);
logger.info('public = ' + path.normalize(__dirname + msol2conf.directory.public));

process.on('uncaughtException', function (err) {
  logger.error("unhandled exception : " + err + "\n" + err.stack);
  //process.exit(-1);
});

/*
swig.init({
  root: views,
  allowErrors: true,
  autoescape: false
});
*/

//swig.setDefaults({ allowErrors: true });
swig.setDefaults({ autoescape: false }); 

app.set('port', process.env.PORT || 3000);

app.set('views', views);
app.set('view engine', 'html');
//app.engine('html', swig.__express);
app.engine('html', swig.renderFile);
app.set('view options', {layout: false})
//app.use(express.favicon());
//app.use(express.bodyParser());
app.use(bodyParser({uploadDir: uploadDir, limit:'50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb'}));
//app.use(express.methodOverride());
//app.use(app.router); -> session동작하지 않음.

app.use(cookieParser());
app.use(function(req, res, next) {
  var matchUrl = '/image/';
  //logger.debug(req.url);
  if(req.url.substring(0, matchUrl.length) === matchUrl) {
    //logger.debug('Access-Control-Allow-Origin');
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  return next();
});
app.use(express.static(path.normalize(__dirname + msol2conf.directory.public)));

app.use(multer({
  dest: uploadDir,
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    logger.info(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    logger.info(file.fieldname + ' uploaded to  ' + file.path)
  }
}));

function processInput(obj)
{
  for(i in obj) {
    //logger.debug('typeof[' + obj[i] + ']=' + typeof(obj[i]));
    if(typeof(obj[i]) == "object") {
      processInput(obj[i]);
    } else if(typeof(obj[i]) == "string") {
      obj[i] = obj[i].replace(/[']/g, "''");
    }
  }
}


function checkSession(req, res, next) {
  if(req.url == '/favicon.ico') {
    next();
    return;
  }

  //logger.debug("[" + req.header('X-Forwarded-For') + "] " + req.method + " " + req.url);
  var pathname = url.parse(req.url).pathname;
  //logger.debug("pathname=" + pathname);

  req.imagePath = __dirname + msol2conf.directory.image;
    
  if(req.method.toUpperCase() == "GET") {
    processInput(req.query);
    //logger.debug('query =' + util.inspect(req.query));
  } else {
    processInput(req.body);
    //logger.debug('body =' + util.inspect(req.body));
  }

  next();

};

app.get('/*', checkSession);
app.post('/*', checkSession);

app.post('/saveEmployeeImage', vegasImage.saveEmployeeImage);
app.post('/saveCustomerImage', vegasImage.saveCustomerImage);
app.post('/saveMedicalImage', vegasImage.saveMedicalImage);
app.post('/deleteImageFile', vegasImage.deleteImageFile);

app.get('/saveEmployeeImage', vegasImage.saveEmployeeImage);
app.get('/saveCustomerImage', vegasImage.saveCustomerImage);
app.get('/saveMedicalImage', vegasImage.saveMedicalImage);
	   		   
var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

