/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/app.js":
/*!***********************************!*\
  !*** ./src/assets/scripts/app.js ***!
  \***********************************/
/***/ (function() {

eval("\n// import InView from './components/inView';\n// import Accordion from './components/accordion';\n// import Modal from './components/modal';\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n  // // スクロール 表示領域にて発火\n  // const inViewEl = [...document.querySelectorAll('.js-inView')].map(el => {\n  //   return new InView(el);\n  // });\n\n  // // アコーディオン\n  // const accordionEl = [...document.querySelectorAll('.js-accordion')].map(el => {\n  //   return new Accordion(el, {\n  //     tabs: '.js-accordion-tab',\n  //     panels: '.js-accordion-panel'\n  //   });\n  // });\n\n  // // モーダル\n  // const modalEl = [...document.querySelectorAll('[data-a11y-dialog]')].map(el => {\n  //   return new Modal(el);\n  // });\n\n  // ハンバーガーメニュー\n  const hamburger = document.querySelector('.js-hamburger');\n  const hamburgerLines = document.querySelectorAll('.js-hamburger-line');\n  const nav = document.querySelector('.js-global-nav');\n  const bg = document.querySelector('.js-hamburger-bg');\n\n  const isOpenClass = 'is-open';\n\n  hamburger.addEventListener('click', () => {\n    hamburgerLines.forEach(hamburgerLine => {\n      hamburgerLine.classList.toggle(isOpenClass);\n    });\n    nav.classList.toggle(isOpenClass);\n    bg.classList.toggle(isOpenClass);\n  });\n\n  // ハンバーガーの背景をクリックしたら閉じる\n  bg.addEventListener('click', () => {\n    hamburgerLines.forEach(hamburgerLine => {\n      hamburgerLine.classList.remove(isOpenClass);\n    });\n    nav.classList.remove(isOpenClass);\n    bg.classList.remove(isOpenClass);\n  });\n});\n\n\n//# sourceURL=webpack://static-kit/./src/assets/scripts/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/scripts/app.js"]();
/******/ 	
/******/ })()
;