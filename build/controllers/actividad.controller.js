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
    var _req$params, Grade, Matter, directoryPath, _req$body, numero_actividad, titulo, puntos, descripcion, urlArchivo, user, materia, jornada, newActivity, foundMateria, foundGrado;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, Grade = _req$params.Grade, Matter = _req$params.Matter;
            _context.prev = 1;
            fs.mkdir("".concat(__basedir, "../../resources/static/assets/uploads/").concat(Grade, "/").concat(Matter), function (e) {
              if (!e || e && e.code === 'EEXIST') {} else {}
            });
            directoryPath = __basedir + "../../resources/static/assets/uploads/";
            _context.next = 6;
            return uploadFile(req, res);

          case 6:
            _req$body = req.body, numero_actividad = _req$body.numero_actividad, titulo = _req$body.titulo, puntos = _req$body.puntos, descripcion = _req$body.descripcion, urlArchivo = _req$body.urlArchivo, user = _req$body.user, materia = _req$body.materia, jornada = _req$body.jornada;
            _context.next = 9;
            return (0, _Actividad["default"])({
              numero_actividad: numero_actividad,
              titulo: titulo,
              puntos: puntos,
              descripcion: descripcion,
              urlArchivo: urlArchivo,
              materia: materia
            });

          case 9:
            newActivity = _context.sent;

            if (!(Matter && Grade)) {
              _context.next = 23;
              break;
            }

            _context.next = 13;
            return _Materia["default"].find({
              nombre_materia: Matter,
              jornada: jornada
            });

          case 13:
            foundMateria = _context.sent;
            newActivity.materia = foundMateria.map(function (materia) {
              return materia._id;
            });
            console.log(Grade);
            console.log(foundMateria);
            _context.next = 19;
            return _Grado["default"].find({
              numero_grado: Grade,
              jornada: jornada
            });

          case 19:
            foundGrado = _context.sent;
            newActivity.grado = foundGrado.map(function (grado) {
              return grado._id;
            });
            _context.next = 25;
            break;

          case 23:
            console.log("Prueba de salida " + Matter + Grade);
            res.status(400).json("Materia o Grado no existe");

          case 25:
            if (!(req.file == undefined)) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "Por favor sube un archivo"
            }));

          case 27:
            newActivity.urlArchivo = req.file.path;
            res.status(200).send({
              message: "Archivo subido sastifactoriamente: " + req.file
            });
            newActivity.save();
            console.log(newActivity);
            _context.next = 36;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context["catch"](1);
            res.status(500).send({
              message: "Could not upload the file: ".concat(req.file, ". ").concat(_context.t0)
            });

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 33]]);
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
            _context2.prev = 0;
            _req$params2 = req.params, Matter = _req$params2.Matter, Grade = _req$params2.Grade;
            console.log(Grade + "=================================" + Matter);
            _context2.next = 5;
            return _Actividad["default"].find({
              "grado": _mongoose.mongo.ObjectId(Grade),
              "materia": _mongoose.mongo.ObjectId(Matter)
            });

          case 5:
            result = _context2.sent;
            res.status(200).json(result);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
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
            try {
              fileName = req.params.name;
              directoryPath = __basedir + "../../resources/static/assets/uploads/";
              res.download(directoryPath + fileName, fileName, function (err) {
                if (err) {
                  res.status(500).send({
                    message: "Could not download the file. " + err
                  });
                }
              });
            } catch (error) {
              res.status(400).json(error);
            }

          case 1:
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
            _context4.prev = 0;
            _context4.next = 3;
            return _Actividad["default"].findById(req.params.idActividad);

          case 3:
            result = _context4.sent;
            _context4.next = 6;
            return _Actividad["default"].findByIdAndDelete(req.params.idActividad);

          case 6:
            fs.unlink(result.urlArchivo, function (err) {
              if (err) throw err;
            });
            res.status(200).json("Eliminado");
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function deleteActivity(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteActivity = deleteActivity;