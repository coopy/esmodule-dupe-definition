Duplicate `__esModule` definition
=================================

## To reproduce

```
$ npm install
$ node_modules/.bin/jest

FAIL  lib/__tests__/module-test.js (4.492s)
● module › it works
 - TypeError: Cannot redefine property: __esModule
       at Function.defineProperty (native)
       at eval (lib/constants_passthrough.js:11:10)
       at Array.forEach (native)
       at Object.<anonymous> (lib/constants_passthrough.js:9:25)
       at Object.<anonymous> (lib/module.js:8:30)
       at Object.eval (lib/__tests__/module-test.js:7:18)
       at emitTwo (events.js:87:13)
       at process.emit (events.js:172:7)
       at handleMessage (internal/child_process.js:695:10)
       at Pipe.channel.onread (internal/child_process.js:440:11)
```

The problem stems from the each transpiled module has this:

```
Object.defineProperty(exports, "__esModule", {
  value: true
});
```

When a module passes through all exports from another module with:

```
export * from './foo';
```

...this transpiles to:

```
var _Foo = require('./foo);

Object.keys(_Foo).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Constants[key];
    }
  });
});
```

`Object.defineProperty` is supposed to set `enumerable` in the property
descriptor to `false` by default ([reference][]), but for some reason, when
running the transpiled code through Jest, `forEach` enumerates over `__esModule`
in `_Foo` anyway.

Note that transpiling via `babel-cli` and running the code does not reproduce
the issue:

```
$ npm run build
$ node lib/main.js
```

## Update

[@tals correctly identified](https://github.com/facebook/jest/issues/880) that
this is a problem with how Jest mocks the underlying module: property
`enumerable` descriptors are not heeded.

[reference]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
