"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteActivity = exports.downloadActivity = exports.getActivity = exports.createActivity = void 0;

var _mongoose = require("mongoose");

var _Actividad = _interopRequireDefault(require("../models/Actividad"));

var _Grado = _interopRequireDefault(require("../models/Grado"));

var _Materia = _interopRequireDefault(require("../models/Materia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadFile = require('../middlewares/upload');

var fs = require('fs');

var createActivity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var directoryPath, _req$body, numero_actividad, titulo, puntos, descripcion, urlArchivo, user, materia, grado, _req$params, Grade, Matter, newActivity, foundMateria, foundGrado;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            directoryPath = __basedir + "../../resources/static/assets/uploads/";
            _context.prev = 1;
            _context.next = 4;
            return uploadFile(req, res);

          case 4:
            _req$body = req.body, numero_actividad = _req$body.numero_actividad, titulo = _req$body.titulo, puntos = _req$body.puntos, descripcion = _req$body.descripcion, urlArchivo = _req$body.urlArchivo, user = _req$body.user, materia = _req$body.materia, grado = _req$body.grado;
            _req$params = req.params, Grade = _req$params.Grade, Matter = _req$params.Matter;
            _context.next = 8;
            return (0, _Actividad["default"])({
              numero_actividad: numero_actividad,
              titulo: titulo,
              puntos: puntos,
              descripcion: descripcion,
              urlArchivo: urlArchivo,
              materia: materia,
              grado: grado
            });

          case 8:
            newActivity = _context.sent;

            if (!(Matter && Grade)) {
              _context.next = 22;
              break;
            }

            _context.next = 12;
            return _Materia["default"].find({
              nombre_materia: {
                $in: Matter
              }
            });

          case 12:
            foundMateria = _context.sent;
            newActivity.materia = foundMateria.map(function (materia) {
              return materia._id;
            });
            _context.next = 16;
            return _Grado["default"].find({
              numero_grado: {
                $in: Grade
              }
            });

          case 16:
            foundGrado = _context.sent;
            newActivity.grado = foundGrado.map(function (grado) {
              return grado._id;
            });
            console.log(foundGrado);
            console.log(foundMateria);
            _context.next = 24;
            break;

          case 22:
            console.log("Prueba de salida " + Matter + Grade);
            res.status(400).json("Materia o Grado no existe");

          case 24:
            if (!(req.file == undefined)) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "Por favor sube un archivo"
            }));

          case 26:
            newActivity.urlArchivo = req.file.path;
            res.status(200).send({
              message: "Archivo subido sastifactoriamente: " + req.file
            });
            newActivity.save();
            console.log(newActivity);
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](1);
            res.status(500).send({
              message: "Could not upload the file: ".concat(req.file, ". ").concat(_context.t0)
            });

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 32]]);
  }));

  return function createActivity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createActivity = createActivity;

var getActivity = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$params2, Matter, Grade, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$params2 = req.params, Matter = _req$params2.Matter, Grade = _req$params2.Grade;
            console.log(Grade + "=================================" + Matter);
            _context2.next = 4;
            return _Actividad["default"].find({
              "grado": _mongoose.mongo.ObjectId(Grade),
              "materia": _mongoose.mongo.ObjectId(Matter)
            });

          case 4:
            result = _context2.sent;
            res.status(200).json(result);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getActivity(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getActivity = getActivity;

var downloadActivity = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var fileName, directoryPath;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fileName = req.params.name;
            directoryPath = __basedir + "../../resources/static/assets/uploads/";
            res.download(directoryPath + fileName, fileName, function (err) {
              if (err) {
                res.status(500).send({
                  message: "Could not download the file. " + err
                });
              }
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function downloadActivity(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.downloadActivity = downloadActivity;

var deleteActivity = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Actividad["default"].findById(req.params.idActividad);

          case 2:
            result = _context4.sent;
            _context4.next = 5;
            return _Actividad["default"].findByIdAndDelete(req.params.idActividad);

          case 5:
            fs.unlink(result.urlArchivo, function (err) {
              if (err) throw err;
            });
            res.status(200).json("Eliminado");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteActivity(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteActivity = deleteActivity;