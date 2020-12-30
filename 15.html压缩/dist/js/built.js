/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
eval("// import '@babel/polyfill';\n\nconst add = (x, y) => {\n  return x + y;\n}\n\nconsole.log(add(2, 5));\n\nconst promise = new Promise(resolve => {\n  setTimeout(() => {\n    console.log('定时器执行了');\n    resolve()\n  }, 1000);\n})\n\nconsole.log(promise);\n\n//# sourceURL=webpack:///./src/js/index.js?");
/******/ })()
;