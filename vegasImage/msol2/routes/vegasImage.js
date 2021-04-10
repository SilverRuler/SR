var logger = require('log4js').getLogger("vegasImage");
var util = require('util');
var async = require('async');
var fs = require('fs');
var imagick = require('imagemagick');
var common = require('../common.js');
var quotedPrintable = require('quoted-printable');

exports.saveEmployeeImage = function(req, res) {
  var result = {RESULT:true, FILENAME:''};
  var files = req.files;
  var decodeUploadInfo = quotedPrintable.decode(req.body.uploadInfo);
  var uploadInfo = JSON.parse(decodeURIComponent(decodeUploadInfo));
  var movePath = "";

  logger.info('saveEmployeeImage : uploadInfo = ' + decodeURIComponent(decodeUploadInfo));
  logger.info("saveEmployeeImage : req.files=" + util.inspect(files));
  
  if(uploadInfo === undefined || files === undefined) {
    logger.error("saveEmployeeImage : uploadInfo or files undefined");
    res.json(null);
    return;
  };
  
  var imagePathObj = common.getImageDir(uploadInfo.ORGID, 'employee');
  var imagetk = uploadInfo.IMAGEPATH.split('/');
  uploadInfo.FILENAME = imagetk[1];

  if(files.uploadImage != null) {
    movePath = imagePathObj.SOURCE + uploadInfo.FILENAME;
    fs.renameSync(files.uploadImage.path, movePath);
    logger.info('file move = ' + movePath);
  }

  if(files.uploadThumb != null) {
    movePath = imagePathObj.SOURCE75 + uploadInfo.FILENAME;
    fs.renameSync(files.uploadThumb.path, movePath);
    logger.info('file move = ' + movePath);
  }

  if(files.uploadThumb2 != null) {
    movePath = imagePathObj.THUMBNAIL + uploadInfo.FILENAME;
    fs.renameSync(files.uploadThumb2.path, movePath);
    logger.info('file move = ' + movePath);
  }
  
  //logger.debug('result = ' + encodeURIComponent(result));
  res.json(encodeURIComponent(JSON.stringify(result)));
};

exports.saveCustomerImage = function(req, res) {
  var result = {RESULT:true, FILENAME:''};
  var files = req.files;
  var decodeUploadInfo = quotedPrintable.decode(req.body.uploadInfo);
  var uploadInfo = JSON.parse(decodeURIComponent(decodeUploadInfo));
  var movePath = "";

  logger.info('saveCustomerImage : uploadInfo = ' + decodeURIComponent(decodeUploadInfo));
  logger.info("saveCustomerImage : req.files=" + util.inspect(files));

  if(uploadInfo === undefined || files === undefined) {
    logger.error("saveCustomerImage : uploadInfo or files undefined");
    res.json(null);
    return;
  };

  var imagePathObj = common.getImageDir(uploadInfo.ORGID, 'customer');
  var imagetk = uploadInfo.IMAGEPATH.split('/');
  uploadInfo.FILENAME = imagetk[1];

  if(files.uploadImage != null) {
    movePath = imagePathObj.SOURCE + uploadInfo.FILENAME;
    fs.renameSync(files.uploadImage.path, movePath);
    logger.info('file move = ' + movePath);
  }

  if(files.uploadThumb != null) {
    movePath = imagePathObj.THUMBNAIL + uploadInfo.FILENAME;
    fs.renameSync(files.uploadThumb.path, movePath);
    logger.info('file move = ' + movePath);
  }
  
  res.json(encodeURIComponent(JSON.stringify(result)));
};

exports.saveMedicalImage = function(req, res) {
  var result = {RESULT:true, FILENAME:''};
  var files = req.files;
  var decodeUploadInfo = quotedPrintable.decode(req.body.uploadInfo);
  var uploadInfo = JSON.parse(decodeURIComponent(decodeUploadInfo));
  var movePath = "";  

  logger.info('saveMedicalImage : uploadInfo = ' + decodeURIComponent(decodeUploadInfo));
  logger.info("saveMedicalImage : req.files=" + util.inspect(files));

  if(uploadInfo === undefined || files === undefined) {
    logger.error("saveMedicalImage : uploadInfo or files undefined");
    res.json(null);
    return;
  };

  var imagePathObj = common.getImageDir(uploadInfo.ORGID, 'medical');
  var imagetk = uploadInfo.IMAGEPATH.split('/');
  uploadInfo.FILENAME = imagetk[1];

  if(files.uploadImage != null) {
    movePath = imagePathObj.SOURCE + uploadInfo.FILENAME;
    fs.renameSync(files.uploadImage.path, movePath);
    logger.info('file move = ' + movePath);
  }

  if(files.uploadThumb != null) {
    movePath = imagePathObj.THUMBNAIL + uploadInfo.FILENAME;
    fs.renameSync(files.uploadThumb.path, movePath);
    logger.info('file move = ' + movePath);
  }
  
  res.json(encodeURIComponent(JSON.stringify(result)));
};

exports.deleteImageFile = function(req, res) {
  var image = req.body.image || req.query.image;
  var result = {RESULT:true, FILENAME:image.IMAGEPATH};
  
  res.set('Access-Control-Allow-Origin', '*');
  
  if(image === undefined) {
    logger.error("deleteImageFile : image undefined");
    res.json(null);
    return;
  };
  
  logger.info("deleteImageFile : image=" + util.inspect(image));
  common.removeImageFile(image.ORGID, image.DELETETYPE, image.IMAGEPATH);
  
  res.json(result);
};


/*
exports.saveEmployeeImage = function(req, res) {
  var image = req.body.image || req.query.image;
  var result = {RESULT:true, FILENAME:''};
  var currMonth = (new Date()).toFormat('YYYYMM');

  res.set('Access-Control-Allow-Origin', '*');

  if(image === undefined) {
    logger.error("save : image undefined");
    res.json(null);
    return;
  };

  //logger.info("saveEmployeeImage : image=" + util.inspect(image));

  if(image.base64Image != null && image.base64Image != '') {
    var imagePathObj = common.getImageDir(image.ORGID, 'employee');
    var imagePath = [];
    imagePath[0] = imagePathObj.SOURCE;
    imagePath[1] = imagePathObj.SOURCE75;
    imagePath[2] = imagePathObj.THUMBNAIL;

    var imagetk = image.IMAGEPATH.split('/');
    image.EMPLPIC = imagetk[1];

    writeEmployeeImage(imagePath, image.EMPLPIC, image.base64Image, function(error, results) {
      if(error) {
        logger.error("saveEmployeeImage : " + error);
        result.RESULT = false;
      }
      res.json(result);
    });
  } else {
    result.RESULT = false;
    res.json(result);
  }
};

exports.saveCustomerImage = function(req, res) {
  var image = req.body.image || req.query.image;
  var result = {RESULT:true, FILENAME:''};
  var currMonth = (new Date()).toFormat('YYYYMM');

  //res.set('Access-Control-Allow-Origin', '*');

  if(image === undefined) {
    logger.error("saveCustomerImage : image undefined");
    res.json(null);
    return;
  };

  //logger.info("saveCustomerImage : image=" + util.inspect(image));

  if(image.base64Image != null && image.base64Image != '') {
    var imagetk = image.IMAGEPATH.split('/');
    var imagePathObj = common.getImageDir(image.ORGID, 'customer');
    var sourcePath = imagePathObj.SOURCE + imagetk[1];
    var thumbnailPath = imagePathObj.THUMBNAIL + imagetk[1];

    writeCustoemrImage(sourcePath, thumbnailPath, image.base64Image, function(error, results) {
      if(error) {
        logger.error("saveCustomerImage : " + error);
        result.RESULT = false;
      }
      res.json(result);
    });
  } else {
    result.RESULT = false;
    res.json(result);
  }
};

exports.saveMedicalImage = function(req, res) {
  var image = req.body.image || req.query.image;
  var result = {RESULT:true, FILENAME:''};
  var currMonth = (new Date()).toFormat('YYYYMM');

  //res.set('Access-Control-Allow-Origin', '*');

  if(image === undefined) {
    logger.error("saveMedicalImage : image undefined");
    res.json(null);
    return;
  };

  //logger.info("saveMedicalImage : image=" + util.inspect(image));

  if(image.base64Image != null && image.base64Image != '') {
    var imagetk = image.IMAGEPATH.split('/');
    var imagePathObj = common.getImageDir(image.ORGID, 'medical');
    var sourcePath = imagePathObj.SOURCE + imagetk[1];
    var thumbnailPath = imagePathObj.THUMBNAIL + imagetk[1];

    writeMedicalImage(sourcePath, thumbnailPath, image.base64Image, function(error, results) {
      if(error) {
        logger.error("saveMedicalImage : " + error);
        result.RESULT = false;
      }
      res.json(result);
    });
  } else {
    result.RESULT = false;
    res.json(result);
  }
};
*/

// 직원 사진 저장 
function writeEmployeeImage(imagePath, fileName, base64Image, callback) 
{
  logger.info("writeEmployeeImage : image=" + imagePath[0] + fileName);
  
  var encoded = base64Image.replace(/^data:[\w\/]+;base64,/, "");
  var imageData = new Buffer(encoded, 'base64').toString('binary');
  
  fs.writeFile(imagePath[0] + fileName, imageData, 'binary', function(err1) {
    if(err1) {
      logger.error('saveEmployeeImage :save image error=' + err1); 
      return err1;
    }

    imagick.convert([imagePath[0] + fileName, '-resize', '75x100', imagePath[1] + fileName], function(err2) {
      if (err2) {
        logger.error('saveEmployeeImage : create thumbnail error=' + err2); 
        return err2;
      } 
      
      imagick.convert([imagePath[0] + fileName, '-resize', '42x34', imagePath[2] + fileName], function(err3) {
        if (err3) {
          logger.error('saveEmployeeImage : create thumbnail error=' + err3); 
          return err3;
        } 
        callback(err3, null);
      });
          
    });
  });    
}

// 고객 사진 저장 
function writeCustoemrImage(imagePath, thumbnailPath, base64Image, callback) 
{
  logger.info("writeCustoemrImage : image=" + imagePath);
  
  var encoded = base64Image.replace(/^data:[\w\/]+;base64,/, "");
  var imageData = new Buffer(encoded, 'base64').toString('binary');

  fs.writeFile(imagePath, imageData, 'binary', function(error) {
    if(error) {
      logger.error('writeCustoemrImage : image error=' + error); 
      callback(error, null);
      return;
    }

    imagick.convert([imagePath, '-resize', '36x48', thumbnailPath], function(err) {
      if (err) {
        logger.error('writeCustoemrImage : create thumbnail error=' + err); 
        callback(err, null);
        return err;
      } 
      callback(err, null);
    });
  });    
}

// 종이차트/진료사진 저장 
function writeMedicalImage(imagePath, thumbnailPath, base64Image, callback) 
{
  logger.info("writeMedicalImage : image=" + imagePath);
  
  var encoded = base64Image.replace(/^data:[\w\/]+;base64,/, "");
  var imageData = new Buffer(encoded, 'base64').toString('binary');

  fs.writeFile(imagePath, imageData, 'binary', function(error) {
    if(error) {
      logger.error('writeMedicalImage : image error=' + error); 
      callback(error, null);
      return;
    }

    imagick.convert([imagePath, '-resize', '75x100', thumbnailPath], function(err) {
      if (err) {
        logger.error('writeMedicalImage : create thumbnail error=' + err); 
        callback(err, null);
        return err;
      } 
      callback(err, null);
    });
  });    
}

function jsonpCallback(req, res, result)
{
  var jsonpCallback = req.query.callback;
  var jsonp = jsonpCallback + "(" + JSON.stringify(result) + ")";
  //logger.info(jsonp);
  res.send(jsonp);
}
