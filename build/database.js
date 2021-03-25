"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect().then(function (db) {
  return console.log('Base de datos conectada');
})["catch"](function (error) {
  return console.log(error);
});