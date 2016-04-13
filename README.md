Duplicate `__esModule` definition
=================================

To reproduce:

```
$ jest
```

Note that transpiling via `babel-cli` and running the code does not reproduce
the issue:

```
$ npm run build
$ node lib/main.js
```
