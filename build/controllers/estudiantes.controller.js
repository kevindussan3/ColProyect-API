"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteActividadUpload = exports.getActivityMatters = exports.getMatters = exports.getActivityByIdUser = exports.getActivitys = exports.uploadActivity = void 0;

var _Materia = _interopRequireDefault(require("../models/Materia"));

var _Actividad = _interopRequireDefault(require("../models/Actividad"));

var _Grado = _interopRequireDefault(require("../models/Grado"));

var _User = _interopRequireDefault(require("../models/User"));

var _mongoose = require("mongoose");

var _Desarrollo = _interopRequireDefault(require("../models/Desarrollo"));

var _upload = _interopRequireDefault(require("../middlewares/upload"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var uploadActivity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var fountActividad, matter, _req$body, titulo, descripcion, urlArchivo, materia, user, grado, respuesta, foundActivity, foundUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Actividad["default"].find({
              '_id': _mongoose.mongo.ObjectId(req.params.idActividad)
            }, {
              materia: 1,
              _id: 0
            });

          case 2:
            fountActividad = _context.sent;
            matter = fountActividad.map(function (actividad) {
              return actividad.materia;
            });
            fs.mkdir("".concat(__basedir, "../../resources/static/assets/uploads/").concat(req.params.idUser, "/").concat(matter), function (e) {
              if (!e || e && e.code === 'EEXIST') {} else {}
            });
            _context.next = 7;
            return (0, _upload["default"])(req, res);

          case 7:
            _req$body = req.body, titulo = _req$body.titulo, descripcion = _req$body.descripcion, urlArchivo = _req$body.urlArchivo, materia = _req$body.materia, user = _req$body.user, grado = _req$body.grado;
            _context.next = 10;
            return (0, _Desarrollo["default"])({
              titulo: titulo,
              descripcion: descripcion,
              urlArchivo: urlArchivo
            });

          case 10:
            respuesta = _context.sent;

            if (!(req.params.idUser && req.params.idActividad)) {
              _context.next = 23;
              break;
            }

            console.log("Estoy aquí");
            _context.next = 15;
            return _Actividad["default"].find({
              _id: {
                $in: req.params.idActividad
              }
            });

          case 15:
            foundActivity = _context.sent;
            respuesta.actividad = foundActivity.map(function (actividad) {
              return actividad._id;
            });
            _context.next = 19;
            return _User["default"].find({
              _id: {
                $in: req.params.idUser
              }
            });

          case 19:
            foundUser = _context.sent;
            respuesta.user = foundUser.map(function (user) {
              return user._id;
            });
            _context.next = 25;
            break;

          case 23:
            console.log("Prueba de salida ");
            res.status(400).json("Materia o Grado no existe");

          case 25:
            respuesta.urlArchivo = req.file.path;
            respuesta.save();
            console.log(respuesta);
            res.json({
              message: "subido con exito"
            });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
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
            _context2.prev = 0;
            _context2.next = 3;
            return _Desarrollo["default"].find();

          case 3:
            result = _context2.sent;
            res.status(200).json(result);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
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

var getMatters = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$params, idGrade, jornada, datos;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params = req.params, idGrade = _req$params.idGrade, jornada = _req$params.jornada;
            _context4.next = 3;
            return _Materia["default"].find({
              grado: idGrade,
              jornada: jornada
            });

          case 3:
            datos = _context4.sent;
            res.json(datos);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMatters(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getMatters = getMatters;

var getActivityMatters = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$params2, idGrade, idMatter, foundActivity;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params2 = req.params, idGrade = _req$params2.idGrade, idMatter = _req$params2.idMatter;
            console.log(idGrade);
            console.log(idMatter);
            _context5.next = 5;
            return _Actividad["default"].find({
              grado: _mongoose.mongo.ObjectId(idGrade),
              materia: _mongoose.mongo.ObjectId(idMatter)
            });

          case 5:
            foundActivity = _context5.sent;
            console.log(foundActivity);
            res.status(200).json(foundActivity);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getActivityMatters(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getActivityMatters = getActivityMatters;

var deleteActividadUpload = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Desarrollo["default"].findById(req.params.idDesarrollo);

          case 3:
            result = _context6.sent;
            console.log(result);
            _context6.next = 7;
            return _Desarrollo["default"].findByIdAndDelete(req.params.idDesarrollo);

          case 7:
            fs.unlink(result.urlArchivo, function (err) {
              if (err) throw err;
            });
            res.status(200).json("Eliminado");
            _context6.next = 14;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json(_context6.t0);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 11]]);
  }));

  return function deleteActividadUpload(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteActividadUpload = deleteActividadUpload;