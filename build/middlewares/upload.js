"use strict";

var _mongoose = require("mongoose");

var _Actividad = _interopRequireDefault(require("../models/Actividad"));

var _Materia = _interopRequireDefault(require("../models/Materia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var util = require('util');

var multer = require('multer');

var fs = require('fs');

var maxSize = 2 * 1024 * 1024;
var storage = multer.diskStorage({
  destination: function () {
    var _destination = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, file, cb) {
      var fountActividad, matter;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(req.params.idUser && req.params.idActividad)) {
                _context.next = 8;
                break;
              }

              _context.next = 3;
              return _Actividad["default"].find({
                '_id': _mongoose.mongo.ObjectId(req.params.idActividad)
              }, {
                materia: 1,
                _id: 0
              });

            case 3:
              fountActividad = _context.sent;
              matter = fountActividad.map(function (actividad) {
                return actividad.materia;
              });
              cb(null, __basedir + "../../resources/static/assets/uploads/".concat(req.params.idUser, "/").concat(matter, "/"));
              _context.next = 9;
              break;

            case 8:
              if (req.params.Grade && req.params.Matter) {
                console.log(req.params.Grade + ' Matter' + req.params.Matter);
                cb(null, __basedir + "../../resources/static/assets/uploads/".concat(req.params.Grade, "/").concat(req.params.Matter, "/"));
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function destination(_x, _x2, _x3) {
      return _destination.apply(this, arguments);
    }

    return destination;
  }(),
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