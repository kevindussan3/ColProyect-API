"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calificarActivity = exports.updateActivity = exports.deleteActivity = exports.getActivityById = exports.getAllActivityUploads = exports.downloadActivity = exports.createActivity = void 0;

var _Docente = _interopRequireDefault(require("../models/Docente"));

var CtrlActividad = _interopRequireWildcard(require("./actividad.controller"));

var _mongoose = require("mongoose");

var _Actividad = _interopRequireDefault(require("../models/Actividad"));

var _Desarrollo = _interopRequireDefault(require("../models/Desarrollo"));

var _Nota = _interopRequireDefault(require("../models/Nota"));

var _Materia = _interopRequireDefault(require("../models/Materia"));

var _Definitiva = _interopRequireDefault(require("../models/Definitiva"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createActivity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createActivity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createActivity = createActivity;

var downloadActivity = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var fileName, directoryPath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              fileName = req.params.name;
              directoryPath = __basedir + "/resources/static/assets/uploads/";
              res.download(directoryPath + fileName, fileName, function (err) {
                if (err) {
                  res.status(500).send({
                    message: "Could not download the file. " + err
                  });
                }
              });
            } catch (error) {
              res.status(400).json(errors);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadActivity(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.downloadActivity = downloadActivity;

var getAllActivityUploads = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var foundActividad;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Desarrollo["default"].find({
              'actividad': _mongoose.mongo.ObjectId(req.params.idRespuestas)
            });

          case 2:
            foundActividad = _context3.sent;
            res.status(200).json(foundActividad);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAllActivityUploads(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAllActivityUploads = getAllActivityUploads;

var getActivityById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var idActividad, foundActividad;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            idActividad = req.params.idActividad;
            _context4.next = 3;
            return _Actividad["default"].find({
              '_id': _mongoose.mongo.ObjectId(idActividad)
            });

          case 3:
            foundActividad = _context4.sent;
            console.log(foundActividad);
            res.status(200).json(foundActividad);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getActivityById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getActivityById = getActivityById;

var deleteActivity = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteActivity(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteActivity = deleteActivity;

var updateActivity = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateActivity(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateActivity = updateActivity;

var calificarActivity = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body, nota, respuesta, idUser, updateDesarrollo, id, foundDesarollos, idMateria, suma, result, foundDefinitiva, a, _updateDesarrollo, newNota;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body = req.body, nota = _req$body.nota, respuesta = _req$body.respuesta;
            _context7.next = 3;
            return _Desarrollo["default"].find({
              '_id': req.params.idDesarrollo
            }, {
              _id: 0,
              user: 1
            });

          case 3:
            idUser = _context7.sent;
            _context7.next = 6;
            return _Desarrollo["default"].findByIdAndUpdate(req.params.idDesarrollo, {
              nota: nota,
              respuesta: respuesta
            }, {
              "new": true,
              useFindAndModify: false
            });

          case 6:
            updateDesarrollo = _context7.sent;
            id = idUser.map(function (value) {
              return value.user;
            });
            _context7.next = 10;
            return _Desarrollo["default"].find({
              'user': _mongoose.mongo.ObjectId(id[0][0])
            });

          case 10:
            foundDesarollos = _context7.sent;
            console.log(foundDesarollos);
            idMateria = foundDesarollos.map(function (desarrollo) {
              return desarrollo.materia;
            });
            suma = 0;
            foundDesarollos.forEach(function (value) {
              suma += value.nota;
            });
            result = suma / foundDesarollos.length;
            _context7.next = 18;
            return _Definitiva["default"].find({
              'user': _mongoose.mongo.ObjectId(id[0][0]),
              'materia': _mongoose.mongo.ObjectId(req.params.idMatter)
            });

          case 18:
            foundDefinitiva = _context7.sent;
            a = foundDefinitiva.map(function (value) {
              return value.user;
            });
            console.log("data 1 " + a[0]);
            console.log("data 2 " + id);

            if (!(a[0] == id + "")) {
              _context7.next = 28;
              break;
            }

            _context7.next = 25;
            return _Definitiva["default"].findByIdAndUpdate(a, {}, {
              "new": true,
              useFindAndModify: false
            });

          case 25:
            _updateDesarrollo = _context7.sent;
            _context7.next = 34;
            break;

          case 28:
            console.log('Aqui 2');
            newNota = new _Definitiva["default"]({
              periodo: "1"
            });
            newNota.user = idUser.map(function (value) {
              return value.user;
            });
            newNota.definitiva = result;
            newNota.materia = req.params.idMatter;
            newNota.save();

          case 34:
            // if (foundDefinitiva == null) {
            //   console.log('Aqui 1')
            // } else {
            //   console.log('Aqui 2')
            // const newNota = new Definitiva({ periodo: "1"})
            // newNota.user =    idUser.map(value => value.user)
            // newNota.definitiva = result
            // newNota.materia = req.params.idMatter
            // newNota.save()
            // console.log(newNota)
            // }
            console.log(foundDefinitiva);
            res.status(200).json(updateDesarrollo);

          case 36:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function calificarActivity(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.calificarActivity = calificarActivity;