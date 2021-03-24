"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActivityByIdUser = exports.getActivitys = exports.uploadActivity = void 0;

var _Materia = _interopRequireDefault(require("../models/Materia"));

var _Grado = _interopRequireDefault(require("../models/Grado"));

var _User = _interopRequireDefault(require("../models/User"));

var _mongoose = require("mongoose");

var _Desarrollo = _interopRequireDefault(require("../models/Desarrollo"));

var _upload = _interopRequireDefault(require("../middlewares/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var uploadActivity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$params, idUser, idGrade, idMatter, directoryPath, _req$body, titulo, descripcion, urlArchivo, materia, user, grado, respuesta, foundMateria, foundGrado, foundUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$params = req.params, idUser = _req$params.idUser, idGrade = _req$params.idGrade, idMatter = _req$params.idMatter;
            directoryPath = __basedir + "../../resources/static/assets/uploads/".concat(req.params.idUser, "/").concat(req.params.idGrade, "/").concat(req.params.idMatter, "/");
            fs.mkdir(__basedir + "../../resources/static/assets/uploads/".concat(req.params.idUser, "/"), function (e) {
              if (!e || e && e.code === 'EEXIST') {} else {}
            });
            fs.mkdir(__basedir + "../../resources/static/assets/uploads/".concat(req.params.idUser, "/").concat(req.params.idGrade, "/"), function (e) {
              if (!e || e && e.code === 'EEXIST') {} else {}
            });
            fs.mkdir(__basedir + "../../resources/static/assets/uploads/".concat(req.params.idUser, "/").concat(req.params.idGrade, "/").concat(req.params.idMatter, "/"), function (e) {
              if (!e || e && e.code === 'EEXIST') {} else {}
            });
            _context.next = 8;
            return (0, _upload["default"])(req, res);

          case 8:
            _req$body = req.body, titulo = _req$body.titulo, descripcion = _req$body.descripcion, urlArchivo = _req$body.urlArchivo, materia = _req$body.materia, user = _req$body.user, grado = _req$body.grado;
            _context.next = 11;
            return (0, _Desarrollo["default"])({
              titulo: titulo,
              descripcion: descripcion,
              urlArchivo: urlArchivo,
              materia: materia,
              user: user,
              grado: grado
            });

          case 11:
            respuesta = _context.sent;

            if (!(req.params.idUser && req.params.idGrade && req.params.idMatter)) {
              _context.next = 28;
              break;
            }

            console.log("Estoy aquí");
            _context.next = 16;
            return _Materia["default"].find({
              _id: {
                $in: req.params.idMatter
              }
            });

          case 16:
            foundMateria = _context.sent;
            respuesta.materia = foundMateria.map(function (materia) {
              return materia._id;
            });
            _context.next = 20;
            return _Grado["default"].find({
              _id: {
                $in: req.params.idGrade
              }
            });

          case 20:
            foundGrado = _context.sent;
            respuesta.grado = foundGrado.map(function (grado) {
              return grado._id;
            });
            _context.next = 24;
            return _User["default"].find({
              _id: {
                $in: req.params.idUser
              }
            });

          case 24:
            foundUser = _context.sent;
            respuesta.user = foundUser.map(function (user) {
              return user._id;
            });
            _context.next = 30;
            break;

          case 28:
            console.log("Prueba de salida ");
            res.status(400).json("Materia o Grado no existe");

          case 30:
            respuesta.urlArchivo = req.file.path;
            respuesta.save();
            res.json("Respuesta");
            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 35]]);
  }));

  return function uploadActivity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadActivity = uploadActivity;

var getActivitys = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Desarrollo["default"].find();

          case 2:
            result = _context2.sent;
            res.status(200).json(result);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getActivitys(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getActivitys = getActivitys;

var getActivityByIdUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            console.log(req.params.idUser + " Use");
            _context3.next = 4;
            return _Desarrollo["default"].find({
              "user": _mongoose.mongo.ObjectId(req.params.idUser),
              "materia": _mongoose.mongo.ObjectId(req.params.idMatter)
            });

          case 4:
            result = _context3.sent;
            res.status(200).json(result);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function getActivityByIdUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getActivityByIdUser = getActivityByIdUser;