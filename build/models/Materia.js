"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var materiaSchema = new _mongoose.Schema({
  nombre_materia: {
    type: String
  },
  grado: [{
    ref: "Grado",
    type: _mongoose.Schema.Types.ObjectId
  }],
  user: [{
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId
  }],
  jornada: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Materia', materiaSchema);

exports["default"] = _default;