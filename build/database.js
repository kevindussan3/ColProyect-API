"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect("mongodb+srv://".concat(process.env.USER, ":").concat(process.env.PASSWORD, "@cluster0.ymr7x.mongodb.net/").concat(process.env.DBNAME, "?retryWrites=true&w=majority"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(function (db) {
  return console.log('Base de datos conectada');
})["catch"](function (error) {
  return console.log(error);
});