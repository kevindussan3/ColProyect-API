"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

// idMateria, idUsario, idActividad, nota
var definitivaSchema = new _mongoose.Schema({
  user: [{
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId
  }],
  materia: {
    type: String
  },
  definitiva: {
    type: Number
  },
  periodo: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Definitiva', definitivaSchema);

exports["default"] = _default;