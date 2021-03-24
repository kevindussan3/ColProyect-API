"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGradeId = exports.updateGradeId = exports.deleteGradeId = exports.getGrade = exports.createGrade = exports.deleteMatterId = exports.updateMatterId = exports.getMatterId = exports.getMatter = exports.createMatter = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _Grado = _interopRequireDefault(require("../models/Grado"));

var _Materia = _interopRequireDefault(require("../models/Materia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// CRUD PARA USUARIOS
var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles, newUser, foundRoles, role, userSaved;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, identificacion = _req$body.identificacion, email = _req$body.email, nombres = _req$body.nombres, apellidos = _req$body.apellidos, telefono = _req$body.telefono, rh = _req$body.rh, fechaNacimiento = _req$body.fechaNacimiento, direccion = _req$body.direccion, password = _req$body.password, roles = _req$body.roles;
            _context.t0 = _User["default"];
            _context.t1 = identificacion;
            _context.t2 = email;
            _context.t3 = nombres;
            _context.t4 = apellidos;
            _context.t5 = telefono;
            _context.t6 = rh;
            _context.t7 = fechaNacimiento;
            _context.t8 = direccion;
            _context.next = 12;
            return _User["default"].encryptPassword(password);

          case 12:
            _context.t9 = _context.sent;
            _context.t10 = roles;
            _context.t11 = {
              identificacion: _context.t1,
              email: _context.t2,
              nombres: _context.t3,
              apellidos: _context.t4,
              telefono: _context.t5,
              rh: _context.t6,
              fechaNacimiento: _context.t7,
              direccion: _context.t8,
              password: _context.t9,
              roles: _context.t10
            };
            newUser = new _context.t0(_context.t11);

            if (!roles) {
              _context.next = 23;
              break;
            }

            _context.next = 19;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 19:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 27;
            break;

          case 23:
            _context.next = 25;
            return _Role["default"].findOne({
              name: "estudiante"
            });

          case 25:
            role = _context.sent;
            newUser.roles = [role._id];

          case 27:
            _context.next = 29;
            return newUser.save();

          case 29:
            userSaved = _context.sent;
            res.status(201).json(userSaved);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var infoUsuario;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].find().populate("roles");

          case 2:
            infoUsuario = _context2.sent;
            res.status(200).json(infoUsuario);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _User["default"].findById(req.params.userId).populate("roles");

          case 2:
            user = _context3.sent;
            console.log(user);
            res.status(200).json(user);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles, foundRoles, r, updateUser, role, _r, _updateUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, identificacion = _req$body2.identificacion, email = _req$body2.email, nombres = _req$body2.nombres, apellidos = _req$body2.apellidos, telefono = _req$body2.telefono, rh = _req$body2.rh, fechaNacimiento = _req$body2.fechaNacimiento, direccion = _req$body2.direccion, password = _req$body2.password, roles = _req$body2.roles;

            if (!roles) {
              _context4.next = 28;
              break;
            }

            _context4.next = 4;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 4:
            foundRoles = _context4.sent;
            r = foundRoles.map(function (role) {
              return role._id;
            });
            _context4.t0 = _User["default"];
            _context4.t1 = req.params.userId;
            _context4.t2 = identificacion;
            _context4.t3 = email;
            _context4.t4 = nombres;
            _context4.t5 = apellidos;
            _context4.t6 = telefono;
            _context4.t7 = rh;
            _context4.t8 = fechaNacimiento;
            _context4.t9 = direccion;
            _context4.next = 18;
            return _User["default"].encryptPassword(password);

          case 18:
            _context4.t10 = _context4.sent;
            _context4.t11 = r;
            _context4.t12 = {
              identificacion: _context4.t2,
              email: _context4.t3,
              nombres: _context4.t4,
              apellidos: _context4.t5,
              telefono: _context4.t6,
              rh: _context4.t7,
              fechaNacimiento: _context4.t8,
              direccion: _context4.t9,
              password: _context4.t10,
              roles: _context4.t11
            };
            _context4.t13 = {
              "new": true
            };
            _context4.next = 24;
            return _context4.t0.findByIdAndUpdate.call(_context4.t0, _context4.t1, _context4.t12, _context4.t13).populate("roles");

          case 24:
            updateUser = _context4.sent;
            res.status(200).json(updateUser);
            _context4.next = 52;
            break;

          case 28:
            _context4.next = 30;
            return _Role["default"].findOne({
              name: 'estudiante'
            });

          case 30:
            role = _context4.sent;
            _r = [role._id];
            _context4.t14 = _User["default"];
            _context4.t15 = req.params.userId;
            _context4.t16 = identificacion;
            _context4.t17 = email;
            _context4.t18 = nombres;
            _context4.t19 = apellidos;
            _context4.t20 = telefono;
            _context4.t21 = rh;
            _context4.t22 = fechaNacimiento;
            _context4.t23 = direccion;
            _context4.next = 44;
            return _User["default"].encryptPassword(password);

          case 44:
            _context4.t24 = _context4.sent;
            _context4.t25 = _r;
            _context4.t26 = {
              identificacion: _context4.t16,
              email: _context4.t17,
              nombres: _context4.t18,
              apellidos: _context4.t19,
              telefono: _context4.t20,
              rh: _context4.t21,
              fechaNacimiento: _context4.t22,
              direccion: _context4.t23,
              password: _context4.t24,
              roles: _context4.t25
            };
            _context4.t27 = {
              "new": true
            };
            _context4.next = 50;
            return _context4.t14.findByIdAndUpdate.call(_context4.t14, _context4.t15, _context4.t26, _context4.t27).populate("roles");

          case 50:
            _updateUser = _context4.sent;
            res.status(200).json(_updateUser);

          case 52:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var userId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.params.userId;
            _context5.next = 3;
            return _User["default"].findByIdAndDelete(userId);

          case 3:
            res.status(204).json();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // CRUD Materias


exports.deleteUserById = deleteUserById;

var createMatter = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body3, nombre_materia, nota, result;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, nombre_materia = _req$body3.nombre_materia, nota = _req$body3.nota;
            _context6.next = 3;
            return (0, _Materia["default"])({
              nombre_materia: nombre_materia
            });

          case 3:
            result = _context6.sent;
            result.save();
            res.status(200).json(result);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function createMatter(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createMatter = createMatter;

var getMatter = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var getMatter;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Materia["default"].find();

          case 2:
            getMatter = _context7.sent;
            res.status(200).json(getMatter);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getMatter(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getMatter = getMatter;

var getMatterId = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var metter;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Materia["default"].findById(req.params.matterId);

          case 2:
            metter = _context8.sent;
            console.log(metter);
            res.status(200).json(metter);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getMatterId(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getMatterId = getMatterId;

var updateMatterId = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var metter;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _Materia["default"].findByIdAndUpdate(req.params.matterId, req.body, {
              "new": true
            });

          case 2:
            metter = _context9.sent;
            res.status(200).json(metter);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function updateMatterId(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updateMatterId = updateMatterId;

var deleteMatterId = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _Materia["default"].findByIdAndDelete(req.params.matterId);

          case 2:
            res.status(200).json("Eliminado");

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteMatterId(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}(); // CRUD crear grado


exports.deleteMatterId = deleteMatterId;

var createGrade = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var _req$body4, numero_grado, materia, grado, foundMateria, _materia, result;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _req$body4 = req.body, numero_grado = _req$body4.numero_grado, materia = _req$body4.materia;
            grado = new _Grado["default"]({
              numero_grado: numero_grado,
              materia: materia
            });

            if (!materia) {
              _context11.next = 9;
              break;
            }

            _context11.next = 5;
            return _Materia["default"].find({
              nombre_materia: {
                $in: materia
              }
            });

          case 5:
            foundMateria = _context11.sent;
            grado.materia = foundMateria.map(function (materia) {
              return materia._id;
            });
            _context11.next = 13;
            break;

          case 9:
            _context11.next = 11;
            return _Materia["default"].findOne({
              nombre_materia: 'Sociales'
            });

          case 11:
            _materia = _context11.sent;
            grado.materia = [_materia._id];

          case 13:
            _context11.next = 15;
            return grado.save();

          case 15:
            result = _context11.sent;
            res.status(200).json(result);

          case 17:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function createGrade(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.createGrade = createGrade;

var getGrade = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var foundGrade;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _Grado["default"].find();

          case 2:
            foundGrade = _context12.sent;
            res.status(200).json(foundGrade);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function getGrade(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getGrade = getGrade;

var deleteGradeId = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var foundDeleteGrade;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _Grado["default"].findByIdAndDelete(req.params.GradeId);

          case 2:
            foundDeleteGrade = _context13.sent;
            res.status(400).json("Eliminado");

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function deleteGradeId(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

exports.deleteGradeId = deleteGradeId;

var updateGradeId = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var _req$body5, numero_grado, materia, grado, foundMateria, metter, updateGrade, _grado, _materia2, matter, _updateGrade;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _req$body5 = req.body, numero_grado = _req$body5.numero_grado, materia = _req$body5.materia;

            if (!materia) {
              _context14.next = 14;
              break;
            }

            grado = new _Grado["default"]({
              numero_grado: numero_grado,
              materia: materia
            });
            _context14.next = 5;
            return _Materia["default"].find({
              nombre_materia: {
                $in: materia
              }
            });

          case 5:
            foundMateria = _context14.sent;
            metter = foundMateria.map(function (materia) {
              return materia._id;
            });
            console.log(metter, req.body);
            _context14.next = 10;
            return _Grado["default"].findByIdAndUpdate(req.params.GradeId, {
              numero_grado: numero_grado,
              materia: metter
            }, {
              "new": true
            });

          case 10:
            updateGrade = _context14.sent;
            res.status(200).json(updateGrade);
            _context14.next = 23;
            break;

          case 14:
            _grado = new _Grado["default"]({
              numero_grado: numero_grado,
              materia: _materia2
            });
            _context14.next = 17;
            return _Materia["default"].findOne({
              nombre_materia: 'Sociales'
            });

          case 17:
            _materia2 = _context14.sent;
            matter = [_materia2._id];
            _context14.next = 21;
            return _Grado["default"].findByIdAndUpdate(req.params.GradeId, {
              numero_grado: numero_grado,
              materia: matter
            }, {
              "new": true
            });

          case 21:
            _updateGrade = _context14.sent;
            res.status(200).json(_updateGrade);

          case 23:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function updateGradeId(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.updateGradeId = updateGradeId;

var getGradeId = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var foundGradeId;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _Grado["default"].findById(req.params.GradeId);

          case 2:
            foundGradeId = _context15.sent;
            res.status(200).json(foundGradeId);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function getGradeId(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

exports.getGradeId = getGradeId;