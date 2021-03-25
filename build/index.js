"use strict";

require("@babel/polyfill");

var _app = _interopRequireDefault(require("./app"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(process.env.PORT || 4000);

console.log('Servidor activo ', 4000);