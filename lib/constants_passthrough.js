'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

console.log(exports);

Object.keys(exports).forEach(function(key) {
    console.log({key: key})
});

var _constants = require('./constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default") return;
  if (key === "__esModule") {
      console.log("~~~Duplicate definition of __esModule~~~");
  }
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});
