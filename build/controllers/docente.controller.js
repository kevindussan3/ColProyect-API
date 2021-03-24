"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateActivity = exports.deleteActivity = exports.downloadActivity = exports.createActivity = void 0;

var _Docente = _interopRequireDefault(require("../models/Docente"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createActivity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createActivity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createActivity = createActivity;

var downloadActivity = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var fileName, directoryPath;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fileName = req.params.name;
            directoryPath = __basedir + "/resources/static/assets/uploads/";
            res.download(directoryPath + fileName, fileName, function (err) {
              if (err) {
                res.status(500).send({
                  message: "Could not download the file. " + err
                });
              }
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function downloadActivity(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.downloadActivity = downloadActivity;

var deleteActivity = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteActivity(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteActivity = deleteActivity;

var updateActivity = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateActivity(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateActivity = updateActivity;