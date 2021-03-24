"use strict";

var util = require('util');

var multer = require('multer');

var fs = require('fs');

var maxSize = 2 * 1024 * 1024;
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    if (req.params.idUser && req.params.idGrade && req.params.idMatter) {
      cb(null, __basedir + "../../resources/static/assets/uploads/".concat(req.params.idUser, "/").concat(req.params.idGrade, "/").concat(req.params.idMatter));
    } else {
      cb(null, __basedir + "../../resources/static/assets/uploads/");
    }
  },
  filename: function filename(req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  }
});
var uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  }
}).single("file");
var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;