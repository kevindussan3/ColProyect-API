"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _Grado = _interopRequireDefault(require("../models/Grado"));

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles, grado, jornada, newUser, foundRoles, role, foundGrado, savedUser, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, identificacion = _req$body.identificacion, email = _req$body.email, nombres = _req$body.nombres, apellidos = _req$body.apellidos, telefono = _req$body.telefono, rh = _req$body.rh, fechaNacimiento = _req$body.fechaNacimiento, direccion = _req$body.direccion, password = _req$body.password, roles = _req$body.roles, grado = _req$body.grado, jornada = _req$body.jornada;
            _context.t0 = _User["default"];
            _context.t1 = identificacion;
            _context.t2 = email;
            _context.t3 = nombres;
            _context.t4 = apellidos;
            _context.t5 = telefono;
            _context.next = 10;
            return _User["default"].encryptPassword(password).then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 10:
            _context.t6 = _context.sent;
            _context.t7 = jornada;
            _context.t8 = {
              identificacion: _context.t1,
              email: _context.t2,
              nombres: _context.t3,
              apellidos: _context.t4,
              telefono: _context.t5,
              password: _context.t6,
              jornada: _context.t7
            };
            newUser = new _context.t0(_context.t8);

            if (!roles) {
              _context.next = 21;
              break;
            }

            _context.next = 17;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            }).then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 17:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 25;
            break;

          case 21:
            _context.next = 23;
            return _Role["default"].findOne({
              name: "estudiante"
            }).then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 23:
            role = _context.sent;
            newUser.roles = [role._id];

          case 25:
            if (!grado) {
              _context.next = 30;
              break;
            }

            _context.next = 28;
            return _Grado["default"].find({
              numero_grado: grado,
              jornada: jornada
            }).then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 28:
            foundGrado = _context.sent;
            newUser.grado = foundGrado.map(function (role) {
              return role._id;
            });

          case 30:
            console.log(newUser);
            _context.next = 33;
            return newUser.save().then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 33:
            savedUser = _context.sent;
            console.log(savedUser);
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.status(200).json({
              token: token
            });
            res.status(200).json('Registrado');
            _context.next = 43;
            break;

          case 40:
            _context.prev = 40;
            _context.t9 = _context["catch"](0);
            res.status(400).json(_context.t9);

          case 43:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 40]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, identificacionUser, macthPassword, token, _macthPassword, _token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles").then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 3:
            userFound = _context2.sent;
            _context2.next = 6;
            return _User["default"].findOne({
              identificacion: req.body.identificacion
            }).populate("roles").then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 6:
            identificacionUser = _context2.sent;

            if (!req.body.email) {
              _context2.next = 19;
              break;
            }

            if (userFound) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Usuario no encontrado"
            }));

          case 10:
            _context2.next = 12;
            return _User["default"].comparePassword(req.body.password, userFound.password).then(function (res) {
              return console.log(res);
            }).watch(function (error) {
              return console.log(error);
            });

          case 12:
            macthPassword = _context2.sent;

            if (macthPassword) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: "Contraseña invalida"
            }));

          case 15:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });
            _context2.next = 29;
            break;

          case 19:
            if (!req.body.identificacion) {
              _context2.next = 29;
              break;
            }

            if (identificacionUser) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Usuario no encontrado"
            }));

          case 22:
            _context2.next = 24;
            return _User["default"].comparePassword(req.body.password, identificacionUser.password);

          case 24:
            _macthPassword = _context2.sent;

            if (_macthPassword) {
              _context2.next = 27;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: "Contraseña invalida"
            }));

          case 27:
            _token = _jsonwebtoken["default"].sign({
              id: identificacionUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: _token
            });

          case 29:
            _context2.next = 34;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json(_context2.t0);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 31]]);
  }));

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;