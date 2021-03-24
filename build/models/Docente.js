"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var docenteSchema = new _mongoose.Schema({
  numero_actividad: {
    type: Number,
    unique: true
  },
  titulo: {
    type: String
  },
  descripcion: {
    type: String
  },
  puntos: {
    type: Number
  },
  urlArchivo: {
    type: String
  },
  materia: [{
    ref: "Materia",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Docente', docenteSchema);

exports["default"] = _default;