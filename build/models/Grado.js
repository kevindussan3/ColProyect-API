"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var gradoSchema = new _mongoose.Schema({
  numero_grado: {
    type: String,
    unique: true
  },
  materia: [{
    ref: "Materia",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Grado', gradoSchema);

exports["default"] = _default;