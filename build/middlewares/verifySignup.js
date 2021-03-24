"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMateriaExisted = exports.checkRolesExisted = exports.checkDuplicateIdentificationAndEmail = void 0;

var _Materia = _interopRequireDefault(require("../models/Materia"));

var _Role = require("../models/Role");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkDuplicateIdentificationAndEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var identificacion, email;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findOne({
              identificacion: req.body.identificacion
            });

          case 2:
            identificacion = _context.sent;

            if (!identificacion) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'Ups, ya existe'
            }));

          case 5:
            _context.next = 7;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 7:
            email = _context.sent;

            if (!email) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'Ups, ya existe'
            }));

          case 10:
            next();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkDuplicateIdentificationAndEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkDuplicateIdentificationAndEmail = checkDuplicateIdentificationAndEmail;

var checkRolesExisted = function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Role ".concat(req.body.roles[i], " no existe")
        });
      }
    }
  }

  next();
}; // Validar que las materias agregadas ya existan 


exports.checkRolesExisted = checkRolesExisted;

var checkMateriaExisted = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var foundMateria, result, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Materia["default"].find({}, {
              "nombre_materia": 1,
              "_id": 0
            });

          case 2:
            foundMateria = _context2.sent;
            result = foundMateria.map(function (materia) {
              var result = materia.nombre_materia;
              return result;
            });

            if (!req.body.materia) {
              _context2.next = 12;
              break;
            }

            i = 0;

          case 6:
            if (!(i < req.body.materia.length)) {
              _context2.next = 12;
              break;
            }

            if (result.includes(req.body.materia[i])) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Materia ".concat(req.body.materia[i], " no existe")
            }));

          case 9:
            i++;
            _context2.next = 6;
            break;

          case 12:
            next();

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkMateriaExisted(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.checkMateriaExisted = checkMateriaExisted;