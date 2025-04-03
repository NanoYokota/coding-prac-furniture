"use strict";
// import InView from './components/inView';
// import Accordion from './components/accordion';
// import Modal from './components/modal';

document.addEventListener("DOMContentLoaded", () => {

  // // スクロール 表示領域にて発火
  // const inViewEl = [...document.querySelectorAll('.js-inView')].map(el => {
  //   return new InView(el);
  // });

  // // アコーディオン
  // const accordionEl = [...document.querySelectorAll('.js-accordion')].map(el => {
  //   return new Accordion(el, {
  //     tabs: '.js-accordion-tab',
  //     panels: '.js-accordion-panel'
  //   });
  // });

  // // モーダル
  // const modalEl = [...document.querySelectorAll('[data-a11y-dialog]')].map(el => {
  //   return new Modal(el);
  // });

  // ハンバーガーメニュー
  const hamburger = document.querySelector('.js-hamburger');
  const hamburgerLines = document.querySelectorAll('.js-hamburger-line');
  const nav = document.querySelector('.js-global-nav');
  const bg = document.querySelector('.js-hamburger-bg');

  const isOpenClass = 'is-open';

  hamburger.addEventListener('click', () => {
    hamburgerLines.forEach(hamburgerLine => {
      hamburgerLine.classList.toggle(isOpenClass);
    });
    nav.classList.toggle(isOpenClass);
    bg.classList.toggle(isOpenClass);
  });

  // ハンバーガーの背景をクリックしたら閉じる
  bg.addEventListener('click', () => {
    hamburgerLines.forEach(hamburgerLine => {
      hamburgerLine.classList.remove(isOpenClass);
    });
    nav.classList.remove(isOpenClass);
    bg.classList.remove(isOpenClass);
  });
});
