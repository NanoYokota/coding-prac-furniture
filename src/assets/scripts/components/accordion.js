// デフォルトのオプション設定
const defaultOptions = {
  timingFunction: 'ease-out',
  duration: '.3s',
  openMultiple: false,
};

export default class Accordion {
  /**
   * Accordionクラスのインスタンスを作成。
   * @param {HTMLElement} element - アコーディオンのルート要素。
   * @param {Object} options - アコーディオンのオプション。
   */
  constructor(element, options) {
    this.element = element;
    this.options = { ...defaultOptions, ...options };
    this.expanded = new Set();

    // 必須オプションのチェック
    this.validateOptions(options);

    // タブとパネルの要素を取得
    this.tabs = Array.from(element.querySelectorAll(options.tabs));
    this.panels = Array.from(element.querySelectorAll(options.panels));

    // イベントハンドラを設定
    this.subscriptions = this.tabs.map(tab =>
      attachEvent(tab, 'click', this.handleTabClick.bind(this))
    );

    this.prepareAttributes();
    this.handleDeviceType();
  }

  /**
   * 必須オプションの存在確認
   * @param {Object} options - アコーディオンのオプション。
   */
  validateOptions(options) {
    if (!options.tabs) throw new TypeError('"tabs"オプションは必須です');
    if (!options.panels) throw new TypeError('"panels"オプションは必須です');
  }

  /**
   * デバイスのタイプに基づいてアコーディオンを制御
   */
  handleDeviceType() {
    const deviceSelect = this.element.getAttribute('data-device');
    const mqSp = window.matchMedia("(max-width: 767px)");
    const mqPc = window.matchMedia("(min-width: 768px)");

    const mqMatch = () => {
      if (deviceSelect) {
        if (deviceSelect === 'sp' && mqSp.matches || deviceSelect === 'pc' && mqPc.matches) {
          this.reinitializeAccordion();
        } else {
          this.destroy();
        }
      } else {
        this.reinitializeAccordion();
      }
    };

    mqSp.addListener(mqMatch);
    mqPc.addListener(mqMatch);
    mqMatch();
  }

  /**
   * アコーディオンを再初期化する
   */
  reinitializeAccordion() {
    this.destroy();
    this.tabs = Array.from(this.element.querySelectorAll(this.options.tabs));
    this.panels = Array.from(this.element.querySelectorAll(this.options.panels));

    this.subscriptions = this.tabs.map(tab =>
      attachEvent(tab, 'click', this.handleTabClick.bind(this))
    );

    this.prepareAttributes();
  }

  /**
   * イベントリスナーを削除して、アコーディオンを破棄する。
   */
  destroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.resetAttributes();
    this.expanded.clear();
  }

  /**
   * タブとパネルの属性をリセット
   */
  resetAttributes() {
    this.tabs.forEach(tab => {
      tab.removeAttribute('aria-expanded');
      tab.removeAttribute('aria-controls');
    });

    this.panels.forEach(panel => {
      panel.removeAttribute('aria-hidden');
      panel.style = '';  // styleリセット
    });
  }

  /**
   * タブがクリックされたときのハンドラ。
   */
  handleTabClick(event) {
    const tab = event.currentTarget;
    const tabIndex = this.tabs.indexOf(tab);
    this.toggleItem(tabIndex, !this.expanded.has(tabIndex));
    event.preventDefault();
  }

  /**
   * アコーディオンの属性を初期化する。
   */
  prepareAttributes() {
    const randomId = `accordion-${Math.random().toString(36).slice(2)}`;

    this.tabs.forEach((tab, index) => {
      tab.setAttribute('id', `${randomId}-tab-${index}`);
      tab.setAttribute('aria-expanded', 'false');
      tab.setAttribute('aria-controls', `${randomId}-panel-${index}`);
    });

    this.panels.forEach((panel, index) => {
      panel.setAttribute('id', `${randomId}-panel-${index}`);
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'grid';
      panel.style.gridTemplateRows = '0fr';
      panel.children[0].style.overflow = 'hidden';
    });
  }

  /**
   * アイテム（タブとパネル）の開閉を切り替える。
   * @param {number} itemIndex - 切り替えるアイテムのインデックス。
   * @param {boolean} expand - アイテムを展開する場合はtrue、閉じる場合はfalse。
   * @param {Object} [options] - オプション。
   */
  toggleItem(itemIndex, expand, { noTransition = false, deviceSwitch = false } = {}) {
    const isItemExpanded = this.expanded.has(itemIndex);
    if (expand === isItemExpanded) return;

    const updateItemAttribute = (expand) => {
      const targetTab = this.tabs[itemIndex];
      const targetPanel = this.panels[itemIndex];
      targetTab.setAttribute('aria-expanded', String(expand));
      targetPanel.setAttribute('aria-hidden', String(!expand));
      targetPanel.style.gridTemplateRows = expand ? '1fr' : '0fr';
      targetPanel.style.visibility = expand ? 'visible' : 'hidden';
      targetPanel.style.transition = noTransition ? '' : `grid-template-rows ${this.options.timingFunction} ${this.options.duration}, visibility ${this.options.duration}`;
      this.expanded[expand ? 'add' : 'delete'](itemIndex);
    };

    // 複数選択不可の場合、他のパネルを閉じる
    if (!this.options.openMultiple && !isItemExpanded && !deviceSwitch) {
      this.expanded.forEach((index) => updateItemAttribute(false));
    }

    updateItemAttribute(expand);
  }
}

/**
 * イベントリスナーを要素にアタッチし、イベントが発生したときにハンドラを実行する。
 * @param {HTMLElement} element - イベントリスナーをアタッチする要素。
 * @param {string} event - 監視するイベントの名前。
 * @param {Function} handler - イベントが発生したときに実行するハンドラ。
 * @param {Object} [options] - イベントリスナーのオプション。
 * @returns {Object} - イベントリスナーを削除するためのunsubscribeメソッドを持つオブジェクト。
 */
function attachEvent(element, event, handler, options) {
  element.addEventListener(event, handler, options);
  return {
    unsubscribe() {
      element.removeEventListener(event, handler);
    }
  };
}
