"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var desarrolloSchema = new _mongoose.Schema({
  titulo: {
    type: String
  },
  descripcion: {
    type: String
  },
  urlArchivo: {
    type: String
  },
  materia: [{
    ref: "Materia",
    type: _mongoose.Schema.Types.ObjectId
  }],
  user: [{
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId
  }],
  grado: [{
    ref: "Grado",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Desarrollo', desarrolloSchema);

exports["default"] = _default;