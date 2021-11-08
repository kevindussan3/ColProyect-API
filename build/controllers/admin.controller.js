"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocente = exports.getAllTipoRol = exports.getGradeId = exports.updateGradeId = exports.deleteGradeId = exports.getGradeWorkingDay = exports.getGrade = exports.createGrade = exports.deleteMatterId = exports.updateMatterId = exports.getMatterId = exports.getMatter = exports.createMatter = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _Grado = _interopRequireDefault(require("../models/Grado"));

var _Materia = _interopRequireDefault(require("../models/Materia"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// CRUD PARA USUARIOS
var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, password, roles, grado, jornada, newUser, foundRoles, role, userSaved;

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
            _context.t6 = rh;
            _context.t7 = fechaNacimiento;
            _context.t8 = direccion;
            _context.next = 13;
            return _User["default"].encryptPassword(password);

          case 13:
            _context.t9 = _context.sent;
            _context.t10 = roles;
            _context.t11 = grado;
            _context.t12 = jornada;
            _context.t13 = {
              identificacion: _context.t1,
              email: _context.t2,
              nombres: _context.t3,
              apellidos: _context.t4,
              telefono: _context.t5,
              rh: _context.t6,
              fechaNacimiento: _context.t7,
              direccion: _context.t8,
              password: _context.t9,
              roles: _context.t10,
              grado: _context.t11,
              jornada: _context.t12
            };
            newUser = new _context.t0(_context.t13);

            if (!roles) {
              _context.next = 26;
              break;
            }

            _context.next = 22;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 22:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 30;
            break;

          case 26:
            _context.next = 28;
            return _Role["default"].findOne({
              name: "estudiante"
            });

          case 28:
            role = _context.sent;
            newUser.roles = [role._id];

          case 30:
            _context.next = 32;
            return newUser.save();

          case 32:
            userSaved = _context.sent;
            res.status(201).json(userSaved);
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t14 = _context["catch"](0);
            res.status(400).json(_context.t14);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 36]]);
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
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].find().populate("roles");

          case 3:
            infoUsuario = _context2.sent;
            res.status(200).json(infoUsuario);
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
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].findById(req.params.userId).populate("roles");

          case 3:
            user = _context3.sent;
            console.log(user);
            res.status(200).json(user);
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

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, identificacion, email, nombres, apellidos, telefono, rh, fechaNacimiento, direccion, roles, grado, jornada, foundRoles, r, updateUser, role, _r, _updateUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, identificacion = _req$body2.identificacion, email = _req$body2.email, nombres = _req$body2.nombres, apellidos = _req$body2.apellidos, telefono = _req$body2.telefono, rh = _req$body2.rh, fechaNacimiento = _req$body2.fechaNacimiento, direccion = _req$body2.direccion, roles = _req$body2.roles, grado = _req$body2.grado, jornada = _req$body2.jornada;
            console.log(req.params.userId);
            console.log(req.body);

            if (!roles) {
              _context4.next = 17;
              break;
            }

            console.log(roles);
            _context4.next = 7;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 7:
            foundRoles = _context4.sent;
            console.log(foundRoles);
            r = foundRoles.map(function (role) {
              return role._id;
            });
            console.log(r);
            _context4.next = 13;
            return _User["default"].findByIdAndUpdate(req.params.userId, {
              identificacion: identificacion,
              email: email,
              nombres: nombres,
              apellidos: apellidos,
              telefono: telefono,
              rh: rh,
              fechaNacimiento: fechaNacimiento,
              direccion: direccion,
              roles: r,
              grado: grado,
              jornada: jornada
            }, {
              "new": true,
              useFindAndModify: false
            })["catch"](function (e) {
              console.log(e);
            });

          case 13:
            updateUser = _context4.sent;
            res.status(200).json(updateUser);
            _context4.next = 25;
            break;

          case 17:
            _context4.next = 19;
            return _Role["default"].findOne({
              name: 'estudiante'
            });

          case 19:
            role = _context4.sent;
            _r = [role._id];
            _context4.next = 23;
            return _User["default"].findByIdAndUpdate(req.params.userId, {
              identificacion: identificacion,
              email: email,
              nombres: nombres,
              apellidos: apellidos,
              telefono: telefono,
              rh: rh,
              fechaNacimiento: fechaNacimiento,
              direccion: direccion,
              roles: _r,
              grado: grado,
              jornada: jornada
            }, {
              "new": true,
              useFindAndModify: false
            });

          case 23:
            _updateUser = _context4.sent;
            res.status(200).json(_updateUser);

          case 25:
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
            _context5.prev = 0;
            userId = req.params.userId;
            _context5.next = 4;
            return _User["default"].findByIdAndDelete(userId);

          case 4:
            res.status(204).json();
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.status(400).json(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function deleteUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // CRUD Materias


exports.deleteUserById = deleteUserById;

var createMatter = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var _req$body3, nombre_materia, profesor, grados, jornada, newMatter, foundDocente, foundgrade, result;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, nombre_materia = _req$body3.nombre_materia, profesor = _req$body3.profesor, grados = _req$body3.grados, jornada = _req$body3.jornada;
            _context6.next = 3;
            return (0, _Materia["default"])({
              nombre_materia: nombre_materia,
              jornada: jornada
            });

          case 3:
            newMatter = _context6.sent;
            _context6.next = 6;
            return _User["default"].find({
              _id: {
                $in: profesor
              }
            })["catch"](function (e) {
              res.status(400).json({
                message: "No existe docente"
              });
            });

          case 6:
            foundDocente = _context6.sent;
            _context6.next = 9;
            return _Grado["default"].find({
              numero_grado: {
                $in: grados
              },
              jornada: jornada
            })["catch"](function (e) {
              res.status(400).json({
                message: "No existe docente"
              });
            });

          case 9:
            foundgrade = _context6.sent;
            newMatter.user = foundDocente.map(function (item) {
              return item._id;
            });
            newMatter.grado = foundgrade.map(function (item) {
              return item._id;
            });
            _context6.next = 14;
            return newMatter.save();

          case 14:
            result = _context6.sent;
            res.json(result);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function createMatter(_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createMatter = createMatter;

var getMatter = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _getMatter;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _Materia["default"].find().populate(["user", "grado"]);

          case 3:
            _getMatter = _context7.sent;
            res.status(200).json(_getMatter);
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            res.status(400).json(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function getMatter(_x14, _x15) {
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
            _context8.prev = 0;
            _context8.next = 3;
            return _Materia["default"].findById(req.params.matterId);

          case 3:
            metter = _context8.sent;
            console.log(metter);
            res.status(200).json(metter);
            _context8.next = 11;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            res.status(400).json(_context8.t0);

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 8]]);
  }));

  return function getMatterId(_x16, _x17) {
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
            _context9.prev = 0;
            _context9.next = 3;
            return _Materia["default"].findByIdAndUpdate(req.params.matterId, req.body, {
              "new": true
            });

          case 3:
            metter = _context9.sent;
            res.status(200).json(metter);
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            res.status(400).json(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function updateMatterId(_x18, _x19) {
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
            _context10.prev = 0;
            _context10.next = 3;
            return _Materia["default"].findByIdAndDelete(req.params.matterId);

          case 3:
            res.status(200).json("Eliminado");
            _context10.next = 9;
            break;

          case 6:
            _context10.prev = 6;
            _context10.t0 = _context10["catch"](0);
            res.status(400).json(_context10.t0);

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 6]]);
  }));

  return function deleteMatterId(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}(); // CRUD crear grado


exports.deleteMatterId = deleteMatterId;

var createGrade = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var dato, jorn, _req$body4, numero_grado, jornada, foundGrade, newGrado, result;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$body4 = req.body, numero_grado = _req$body4.numero_grado, jornada = _req$body4.jornada;
            _context11.next = 4;
            return _Grado["default"].find({
              numero_grado: {
                $in: numero_grado
              }
            });

          case 4:
            foundGrade = _context11.sent;
            foundGrade.map(function (value) {
              dato = value.numero_grado;
              jorn = value.jornada;
            });

            if (!(dato == numero_grado && jorn == jornada)) {
              _context11.next = 8;
              break;
            }

            return _context11.abrupt("return", res.status(400).json({
              message: "Grado y jornada ya existe"
            }));

          case 8:
            newGrado = new _Grado["default"]({
              numero_grado: numero_grado,
              jornada: jornada
            });
            console.log(newGrado);
            _context11.next = 12;
            return newGrado.save();

          case 12:
            result = _context11.sent;
            res.status(200).json(result);
            _context11.next = 19;
            break;

          case 16:
            _context11.prev = 16;
            _context11.t0 = _context11["catch"](0);
            res.status(400).json(_context11.t0);

          case 19:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 16]]);
  }));

  return function createGrade(_x22, _x23) {
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
            _context12.prev = 0;
            _context12.next = 3;
            return _Grado["default"].find();

          case 3:
            foundGrade = _context12.sent;
            res.status(200).json(foundGrade);
            _context12.next = 10;
            break;

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            res.status(400).json(_context12.t0);

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));

  return function getGrade(_x24, _x25) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getGrade = getGrade;

var getGradeWorkingDay = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var foundGrade;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _Grado["default"].find({
              jornada: req.params.jornada
            });

          case 3:
            foundGrade = _context13.sent;
            res.status(200).json(foundGrade);
            _context13.next = 10;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            res.status(400).json({
              mesage: "Error"
            });

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));

  return function getGradeWorkingDay(_x26, _x27) {
    return _ref13.apply(this, arguments);
  };
}();

exports.getGradeWorkingDay = getGradeWorkingDay;

var deleteGradeId = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var foundDeleteGrade;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _Grado["default"].findByIdAndDelete(req.params.GradeId);

          case 3:
            foundDeleteGrade = _context14.sent;
            res.status(400).json("Eliminado");
            _context14.next = 10;
            break;

          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            res.status(400).json(_context14.t0);

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 7]]);
  }));

  return function deleteGradeId(_x28, _x29) {
    return _ref14.apply(this, arguments);
  };
}();

exports.deleteGradeId = deleteGradeId;

var updateGradeId = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var _req$body5, numero_grado, jornada, foundGrade;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _req$body5 = req.body, numero_grado = _req$body5.numero_grado, jornada = _req$body5.jornada;
            _context15.next = 4;
            return _Grado["default"].findById(req.params.GradeId);

          case 4:
            foundGrade = _context15.sent;
            console.log(foundGrade); // if (materia) {
            //     const grado = new Grado({ numero_grado, materia });
            //     const foundMateria = await Materia.find({ nombre_materia: { $in: materia } })
            //     const metter = foundMateria.map(materia => materia._id)
            //     console.log(metter, req.body)
            //     const updateGrade = await Grado.findByIdAndUpdate(req.params.GradeId, {
            //         numero_grado,
            //         materia: metter
            //     }, { new: true });
            //     res.status(200).json(updateGrade);
            // } else {
            //     const grado = new Grado({ numero_grado, materia });
            //     const materia = await Materia.findOne({ nombre_materia: 'Sociales' })
            //     const matter = [materia._id]
            //     const updateGrade = await Grado.findByIdAndUpdate(req.params.GradeId, {
            //         numero_grado,
            //         materia: matter
            //     }, { new: true });
            //     res.status(200).json(updateGrade);
            // }

            _context15.next = 11;
            break;

          case 8:
            _context15.prev = 8;
            _context15.t0 = _context15["catch"](0);
            res.status(400).json(_context15.t0);

          case 11:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 8]]);
  }));

  return function updateGradeId(_x30, _x31) {
    return _ref15.apply(this, arguments);
  };
}();

exports.updateGradeId = updateGradeId;

var getGradeId = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
    var foundGradeId;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _Grado["default"].findById(req.params.GradeId);

          case 3:
            foundGradeId = _context16.sent;
            res.status(200).json(foundGradeId);
            _context16.next = 10;
            break;

          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            res.status(400).json(_context16.t0);

          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 7]]);
  }));

  return function getGradeId(_x32, _x33) {
    return _ref16.apply(this, arguments);
  };
}(); // Obtener solo los usuarios con el tipo de rol que se envia


exports.getGradeId = getGradeId;

var getAllTipoRol = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
    var docente, idRol, docentes;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _Role["default"].find({
              'name': req.params.rol
            });

          case 2:
            docente = _context17.sent;
            idRol = docente.map(function (value) {
              return value._id;
            });
            console.log(idRol);
            _context17.next = 7;
            return _User["default"].find({
              'roles': idRol
            });

          case 7:
            docentes = _context17.sent;
            res.json(docentes);

          case 9:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function getAllTipoRol(_x34, _x35) {
    return _ref17.apply(this, arguments);
  };
}();

exports.getAllTipoRol = getAllTipoRol;

var getDocente = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
    var rol, idRol, docente;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return _Role["default"].find({
              'name': 'docente'
            });

          case 3:
            rol = _context18.sent;
            idRol = rol.map(function (value) {
              return value._id;
            });
            _context18.next = 7;
            return _User["default"].find({
              'roles': idRol
            }, {
              '_id': 1,
              'nombres': 1,
              'apellidos': 1
            });

          case 7:
            docente = _context18.sent;
            res.status(200).json({
              data: docente
            });
            _context18.next = 14;
            break;

          case 11:
            _context18.prev = 11;
            _context18.t0 = _context18["catch"](0);
            res.status(400).json({
              mesage: "Algo, paso"
            });

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 11]]);
  }));

  return function getDocente(_x36, _x37) {
    return _ref18.apply(this, arguments);
  };
}();

exports.getDocente = getDocente;