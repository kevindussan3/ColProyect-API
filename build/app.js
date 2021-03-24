"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _inialSetup = require("./libs/inialSetup");

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _admin = _interopRequireDefault(require("./routes/admin.routes"));

var _docente = _interopRequireDefault(require("./routes/docente.routes"));

var _actividad = _interopRequireDefault(require("./routes/actividad.routes"));

var _nota = _interopRequireDefault(require("./routes/nota.routes"));

var _estudiantes = _interopRequireDefault(require("./routes/estudiantes.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var app = (0, _express["default"])();
/* Cors son para que n o se bloqueen las solicitudes */

var cors = require('cors');

var corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOption));
/* EndCors */

(0, _inialSetup.createRoles)();
global.__basedir = __dirname;
app.set('pkg', _package["default"]);
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
app.get('/', function (req, res) {
  res.json({
    nombreproyecto: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/auth', _auth["default"]);
app.use('/api/admin', _admin["default"]);
app.use('/api/docente', _docente["default"]);
app.use('/api/actividad', _actividad["default"]);
app.use('/api/nota', _nota["default"]);
app.use('/api/estudiante', _estudiantes["default"]);
var _default = app;
exports["default"] = _default;