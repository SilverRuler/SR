require('date-utils');//https://github.com/JerrySievert/node-date-utils
var fs = require('fs');
var path = require('path');
var msol2conf = require('./msol2.json');
var logger = require('log4js').getLogger("common");

exports.getTimestamp =function() {
  return (new Date()).toFormat('YYYYMMDDHH24MISS');
};

exports.addMonths = function(date, value){
  date.addMonths(value);
  return date;
};

exports.addDays = function(date, value){
  date.addDays(value);
  return date;
};

exports.dateTermCal = function(dateStr, moveType, cal) {
	if(dateStr == null || dateStr.length < 8) return;
	var currDate = getStrToDate(dateStr);

	switch(moveType) {
		case "day": currDate.setDate(currDate.getDate() + cal); break;
		case "week": currDate.setDate(currDate.getDate() + cal * 7); break;
		case "month": currDate.setMonth(currDate.getMonth() + cal); break;
		case "year": currDate.setFullYear(currDate.getFullYear() + cal); break;
	}
	
	return getDateToStr(currDate);
}

exports.formatDate = function(date, format) {
  return date.toFormat(format);
};

exports.dateFormat = function(dateStr, format) {
	if(dateStr == null || dateStr.length < 8) return dateStr;
	
	var 	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		},
		dayNames = [
			"일", "월", "화", "수", "목", "금", "토",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		date = dateStr.length > 8 ? getStrToDatetime(dateStr) : getStrToDate(dateStr);

	var	d = date.getDate(),
		D = date.getDay(),
		m = date.getMonth(),
		y = date.getFullYear(),
		H = date.getHours(),
		M = date.getMinutes(),
		s = date.getSeconds(),
		L = date.getMilliseconds(),
		o = date.getTimezoneOffset(),
		flags = {
			d:    d,
			dd:   pad(d),
			ddd:  dayNames[D],
			dddd: dayNames[D + 7],
			m:    m + 1,
			mm:   pad(m + 1),
			yy:   String(y).slice(2),
			yyyy: y,
			h:    H % 12 || 12,
			hh:   pad(H % 12 || 12),
			H:    H,
			HH:   pad(H),
			M:    M,
			MM:   pad(M),
			s:    s,
			ss:   pad(s),
			l:    pad(L, 3),
			L:    pad(L > 99 ? Math.round(L / 10) : L),
			t:    H < 12 ? "a"  : "p",
			tt:   H < 12 ? "am" : "pm",
			T:    H < 12 ? "A"  : "P",
			TT: H < 12 ? "오전" : "오후",
			o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4)
		};

	return format.replace(token, function ($0) {
		return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
	});		
};

exports.getStrToDatetime = function(str) {
  return getStrToDatetime(str);
}

exports.getStrToDate = function(str) {
  return getStrToDate(str);
}

exports.objectIndexOf = function(list, key, val) {
	var index = -1;
	if(list == null || list.length == 0) return index;
	
	for(var i=0; i<list.length; i++) {
		if(list[i][key] == undefined) continue;
		if(list[i][key] == val) {
			index = i;
			break;
		}
	}
	
	return index;
}

exports.searchObjectList = function(list, key, val) {
	var result = null;
	if(list == null || list.length == 0) return result;
	
	for(var i=0; i<list.length; i++) {
		if(list[i][key] == undefined) continue;
		if(list[i][key] == val) {
			result = list[i];
			break;
		}
	}
	
	return result;
}

exports.customerImagePath = function(imageList) {
  if(imageList == null) return;

  var basePath = msol2conf.directory.image;
  var imagetk;

  if(imageList.constructor == Array) {
  	for(var i=0; i<imageList.length; i++) {
  	  if(imageList[i].CUSTPIC != null && imageList[i].CUSTPIC != "" && imageList[i].CUSTPIC.indexOf('/') > -1) {
         imagetk = imageList[i].CUSTPIC.split('/');
         imageList[i].THUMBNAIL = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/customer/thumbnail/' + imagetk[1];
         imageList[i].CUSTPIC75 = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/customer/source/' + imagetk[1];
         imageList[i].CUSTPIC = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/customer/source/' + imagetk[1];
  	  } else {
  	    imageList[i].THUMBNAIL = '/img/patientpic.png';	// 36 x 48
  	    imageList[i].CUSTPIC75 = '/img/detailpatimg.png';	// 75 x 100
  	    imageList[i].CUSTPIC = '/img/patientpic.png';		// 120 x 160
  	  }
  	}
  } else {
  	if(imageList.CUSTPIC != null && imageList.CUSTPIC != "" && imageList.CUSTPIC.indexOf('/') > -1) {
       imagetk = imageList.CUSTPIC.split('/');
       imageList.THUMBNAIL = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/customer/thumbnail/' + imagetk[1];
       imageList.CUSTPIC75 = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/customer/source/' + imagetk[1];
       imageList.CUSTPIC = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/customer/source/' + imagetk[1];
  	} else {
       imageList.THUMBNAIL = '/img/patientpic.png';
       imageList.CUSTPIC75 = '/img/detailpatimg.png';
       imageList.CUSTPIC = '/img/patientpic.png';
     }
  }
  
  return imageList;
};

exports.medicalImagePath = function(imageList) {
  if(imageList == null) return;

  var basePath = msol2conf.directory.image;
  var imagetk;

  if(imageList.constructor == Array) {
  	for(var i=0; i<imageList.length; i++) {
  	  if(imageList[i].IMAGEPATH != null && imageList[i].IMAGEPATH != "" && imageList[i].IMAGEPATH.indexOf('/') > -1) {
         imageList[i].IMAGEPATHORG = imageList[i].IMAGEPATH;
         imagetk = imageList[i].IMAGEPATH.split('/');
         imageList[i].THUMBNAILPATH = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/medical/75x100/' + imagetk[1];
         imageList[i].IMAGEPATH = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/medical/source/' + imagetk[1];
  	  } else {
  	    imageList[i].THUMBNAILPATH = '/img/noimage.png';	// 75 x 100
  	    //imageList[i].IMAGEPATH = '/img/patientpic.png';	// source
  	  }
  	}
  } else {
  	if(imageList.IMAGEPATH != null && imageList.IMAGEPATH != "" && imageList.IMAGEPATH.indexOf('/') > -1) {
       imageList.IMAGEPATHORG = imageList.IMAGEPATH;
       imagetk = imageList.IMAGEPATH.split('/');
       imageList.THUMBNAILPATH = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/medical/75x100/' + imagetk[1];
       imageList.IMAGEPATH = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/medical/source/' + imagetk[1];
  	} else {
       imageList.THUMBNAILPATH = '/img/noimage.png';
       //imageList.IMAGEPATH = '/img/noimage.png';
     }
  }
  
  return imageList;
};

exports.employeeImagePath = function(imageList) {
  if(imageList == null) return;

  var basePath = msol2conf.directory.image;
  var imagetk;

  if(imageList.constructor == Array) {
  	for(var i=0; i<imageList.length; i++) {
  	  if(imageList[i].EMPLPIC != null && imageList[i].EMPLPIC != "" && imageList[i].EMPLPIC.indexOf('/') > -1) {
         imagetk = imageList[i].EMPLPIC.split('/');
         imageList[i].THUMBNAIL = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/employee/thumbnail/' + imagetk[1];
         imageList[i].EMPLPIC75 = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/employee/75x100/' + imagetk[1];
         imageList[i].EMPLPIC = basePath + '/' + imageList[i].ORGID + '/' + imagetk[0] + '/employee/source/' + imagetk[1];
  	  } else {
  	    imageList[i].THUMBNAIL = '/img/doctor.png';		// 42 x 34
  	    imageList[i].EMPLPIC75 = '/img/detailpatimg.png';	// 75 x 100
  	    imageList[i].EMPLPIC = '/img/patientpic.png';		// 120 x 160
  	  }
  	}
  } else {
  	if(imageList.EMPLPIC != null && imageList.EMPLPIC != "" && imageList.EMPLPIC.indexOf('/') > -1) {
       imagetk = imageList.EMPLPIC.split('/');
       imageList.THUMBNAIL = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/employee/thumbnail/' + imagetk[1];
       imageList.EMPLPIC75 = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/employee/75x100/' + imagetk[1];
       imageList.EMPLPIC = basePath + '/' + imageList.ORGID + '/' + imagetk[0] + '/employee/source/' + imagetk[1];
  	} else {
       imageList.THUMBNAIL = '/img/doctor.png';
       imageList.EMPLPIC75 = '/img/detailpatimg.png';
       imageList.EMPLPIC = '/img/patientpic.png';
     }
  }
  
  return imageList;
};

exports.existsDir = function(pathDir) {
  existsDir(pathDir);
};

exports.getImageDir = function(orgID, imageType) {
  var currMonth = (new Date()).toFormat('YYYYMM');
  var imageDir = path.normalize(__dirname + msol2conf.directory.image);	// full path
  var basePath = imageDir + '/' + orgID + '/' + currMonth;
  var imagePathObj = {};
  
  if(imageType == null || imageType == '') return;
  
  switch(imageType) {
    case 'customer':
      imagePathObj.SOURCE = basePath + '/customer/source/';
      imagePathObj.THUMBNAIL = basePath + '/customer/thumbnail/';
      break;

    case 'medical':
      imagePathObj.SOURCE = basePath + '/medical/source/';
      imagePathObj.THUMBNAIL = basePath + '/medical/75x100/';
      break;

    case 'employee':
      imagePathObj.SOURCE = basePath + '/employee/source/';
      imagePathObj.SOURCE75 = basePath + '/employee/75x100/';
      imagePathObj.THUMBNAIL = basePath + '/employee/thumbnail/';
      break;
  }
  
  if(!fs.existsSync(imagePathObj.SOURCE) || !fs.existsSync(imagePathObj.THUMBNAIL)) {
    logger.debug('getImageDir : checkImageDir : ' + imagePathObj.SOURCE);
    checkImageDir(orgID);
  }
  
  return imagePathObj;
};

exports.removeImageFile = function(orgID, imageType, imagePath) {
  if(imagePath == null || imagePath == "" || imagePath.indexOf('/') == -1) return;
  if(imageType == null || imageType == '') return;

  var imageDir = path.normalize(__dirname + msol2conf.directory.image);	// full path
  var imagetk = imagePath.split('/');
  var basePath = imageDir + '/' + orgID + '/' + imagetk[0];
  var imagePathObj = {};

  switch(imageType) {
    case 'customer':
      imagePathObj.SOURCE = basePath + '/customer/source/' + imagetk[1];
      imagePathObj.THUMBNAIL = basePath + '/customer/thumbnail/' + imagetk[1];
      break;

    case 'medical':
      imagePathObj.SOURCE = basePath + '/medical/source/' + imagetk[1];
      imagePathObj.THUMBNAIL = basePath + '/medical/75x100/' + imagetk[1];
      break;

    case 'employee':
      imagePathObj.SOURCE = basePath + '/employee/source/' + imagetk[1];
      imagePathObj.SOURCE75 = basePath + '/employee/75x100/' + imagetk[1];
      imagePathObj.THUMBNAIL = basePath + '/employee/thumbnail/' + imagetk[1];
      break;
  }

  if(fs.existsSync(imagePathObj.SOURCE)) {
    fs.unlinkSync(imagePathObj.SOURCE);
    logger.info('removeImageFile : ' + imagePathObj.SOURCE);
  }
  if(fs.existsSync(imagePathObj.THUMBNAIL)) {
    fs.unlinkSync(imagePathObj.THUMBNAIL);
    logger.info('removeImageFile : ' + imagePathObj.THUMBNAIL);
  }

};

exports.checkImageDir = function(orgID) {
  checkImageDir(orgID);
};

exports.cloneObject = function(object) {
  function internalClone(source) {
    for (i in source) {
      if(i == 'remove') continue;
      if (typeof source[i] == 'source') {
        this[i] = new internalClone(source[i]);
      } else {
        this[i] = source[i];
      }
    }
  }
  
  return new internalClone(object);
}

exports.getAuthField = function(object) {
  var AUTHCONFIG;
  
  if(object == null) {
    AUTHCONFIG = {
      PEUSERACCNT  : 1,
      PEORGINFO    : 1,
      PEORGETC     : 1,
      PERESVNOTE   : 1,
      PECHART      : 1,
      PEDOCMEMO    : 1,
      PEDMDOWN     : 1,
      PECHGPAYMENT : 1,
      PESTAT       : 1,
      PEORDER      : 1,
      PECUSTDEL    : 1,
      PECALLDEL    : 1,
      PETODAY	    : 1,
      TMEMO        : 2,
      PESER        : 1,
      PEMGMT       : 1,
      PECRM        : 1,
      PESMS        : 1
    };  	
  } else {
    AUTHCONFIG = {
      PEUSERACCNT  : object.PEUSERACCNT,
      PEORGINFO    : object.PEORGINFO,
      PEORGETC     : object.PEORGETC,
      PERESVNOTE   : object.PERESVNOTE,
      PECHART      : object.PECHART,
      PEDOCMEMO    : object.PEDOCMEMO,
      PEDMDOWN     : object.PEDMDOWN,
      PECHGPAYMENT : object.PECHGPAYMENT,
      PESTAT       : object.PESTAT,
      PEORDER      : object.PEORDER,
      PECUSTDEL    : object.PECUSTDEL,
      PECALLDEL    : object.PECALLDEL,
      PETODAY      : object.PETODAY,
      TMEMO        : object.TMEMO,
      PESER        : object.PESER,
      PEMGMT       : object.PEMGMT,
      PECRM        : object.PECRM || 0,
      PESMS        : object.PESMS || 0
    };
  }
  
  return AUTHCONFIG;
}

exports.productCategory = {
	DRUGS:[1401,1402,1403,1404,1405],
	ITEMS:[999,1101,1201,1202,1203,1204,1301,1302,1303,1304,1501,1601,1901], 
	MATERIALS:[1000]
};

exports.getUserInfo = function(userInfo) {
  var obj = {};
  if(userInfo != null) {
    obj = {
      EMPLTYPE : userInfo.EMPLTYPE,
      EMPLNAME : userInfo.EMPLNAME,
      EMPLOYEEID : userInfo.EMPLOYEEID
    };
  }
  return obj;
};

exports.getCalcTax = function(taxAmt) {
  var taxObj = {ORDER:0, TAXABLE:0, TAX:0};

  if(taxAmt == null || taxAmt == 0) return taxObj;

  taxObj.ORDER = parseInt(taxAmt);
  taxObj.TAX = parseInt(Math.floor(taxObj.ORDER / 11));
  taxObj.TAXABLE = taxObj.ORDER - taxObj.TAX;

  return taxObj;
};

function getStrToDate(str)
{
  if(str == null || str == "") return;
  var parts = str.match(/^(\d{4})(\d\d)(\d\d).*$/);
  if(parts == null) return;
  return new Date(parts[1], parts[2]-1, parts[3]);
}

function getStrToDatetime(str)
{
  if(str == null || str == "") return;
  var parts = str.match(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d).*$/);
  if(parts == null) return;
  return new Date(parts[1], parts[2]-1, parts[3], parts[4], parts[5]);
}

function getDateToStr(setDate)
{
  var year = parseInt(setDate.getFullYear(), 10); 
  var month = parseInt(setDate.getMonth(), 10) + 1;
  var day = parseInt(setDate.getDate(), 10);
  if(month < 10) month = "0" + month;
  if(day < 10) day = "0" + day;
  
  return year.toString() + month.toString() + day.toString();
}

function existsDir(pathDir) {
  if(pathDir == null || pathDir == '') return;
  if(!fs.existsSync(pathDir)) {
    try {
      fs.mkdirSync(pathDir, 0755);
    } catch(e) {
    	 if(e.code != 'EEXIST') logger.error("common.existsDir : " + e);
    }
  }
}

function checkImageDir(orgID) {
  var currMonth = (new Date()).toFormat('YYYYMM');
  var imageDir = path.normalize(__dirname + msol2conf.directory.image);	// full path
  var basePath = imageDir + '/' + orgID + '/' + currMonth;

  try {
    existsDir(imageDir + '/' + orgID);
    existsDir(basePath);
    
    existsDir(basePath + '/customer/');
    existsDir(basePath + '/customer/source/');
    existsDir(basePath + '/customer/thumbnail/');

    existsDir(basePath + '/medical/');
    existsDir(basePath + '/medical/source/');
    existsDir(basePath + '/medical/75x100/');

    existsDir(basePath + '/employee/');
    existsDir(basePath + '/employee/source/');
    existsDir(basePath + '/employee/75x100/');
    existsDir(basePath + '/employee/thumbnail/');
  } catch(error) {
    logger.error("common.checkImageDir : " + error);
  }
}