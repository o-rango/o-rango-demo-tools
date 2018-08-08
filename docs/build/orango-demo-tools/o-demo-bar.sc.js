/*!
 * O-RANGO - MIT License
 * Built with http://stenciljs.com
 */
const { h } = window.OrangoDemoTools;

class DemoBarComponent {
    constructor() {
        this.caseOptionSelected = 0;
        this.pattern = true;
        this.device = 'desktop';
        this.deviceSize = '1024';
        this.deviceEmulate = false;
    }
    // LifeCycle Hooks
    componentWillLoad() {
        document.body.style.margin = '0';
        this.demoCases = this.el.querySelectorAll('o-demo-case');
        this.casesOptions = this._setSelect();
    }
    componentDidLoad() {
        this.resizeComponent = this.el.shadowRoot.querySelector('o-demo-resizer');
        this._setIframe();
        this.setViewPort();
    }
    componentDidUpdate() {
        this._setIframe();
        this.setViewPort();
    }
    // Utils
    setViewPort() {
        window.requestAnimationFrame(() => this.resizeComponent.setActiveViewPort(this.deviceSize));
    }
    selectedCaseChangedHandler(event) {
        this.caseOptionSelected = event.detail;
    }
    toolbarButtonClickedHandler(event) {
        switch (event.detail) {
            case 'grid-pattern':
                this.pattern = !this.pattern;
                this.deviceEmulate = false;
                break;
            case 'mobile':
                this.device = event.detail;
                this.deviceSize = '412';
                this.deviceEmulate = false;
                break;
            case 'desktop':
                this.device = event.detail;
                this.deviceSize = '1024';
                this.deviceEmulate = false;
                break;
            case 'other-devices':
                this.device = event.detail;
                this.deviceSize = '458';
                this.deviceEmulate = true;
                break;
        }
        this._setIframe();
        if (event.detail !== 'other-devices') {
            setTimeout(() => {
                this.setViewPort();
            }, 20);
        }
    }
    resizeButtonClickedHandler(event) {
        this.el.shadowRoot.querySelector('iframe').width = event.detail;
        this.deviceSize = event.detail;
    }
    _setSelect() {
        return Array.from(this.demoCases).map(function (item) {
            return item.getAttribute('name');
        });
    }
    _cleanIframe() {
        const oldFrame = this.el.shadowRoot.querySelector('iframe');
        if (oldFrame) {
            oldFrame.remove();
        }
    }
    _setIframe() {
        window.requestAnimationFrame(() => {
            this._cleanIframe();
            const iframeContainer = this.el.shadowRoot.querySelector('#iframeContainer');
            const iframe = document.createElement('iframe');
            const frameH = Math.max(document.documentElement.clientHeight);
            const frameW = this.deviceSize;
            const htmlContent = this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
            const html = `<html><head></head><style>body{margin:0}</style><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`;
            iframe.height = `${(frameH - 85).toString()}px`;
            iframe.width = `${frameW.toString()}px`;
            iframe.style.border = 'none';
            iframeContainer.appendChild(iframe);
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(html);
            iframe.contentWindow.document.close();
        });
    }
    render() {
        const bgClasses = { pattern: this.pattern && !this.deviceEmulate };
        const deviceClasses = { hide: this.deviceEmulate };
        // Templates for default view or Mobile View
        const defaultView = [h("div", { id: "iframeContainer" })];
        const mobileView = [h("o-demo-fab", null), h("o-demo-devices", null,
                h("div", { id: "iframeContainer", class: "pattern", slot: "screen" }))];
        return (h("div", { id: "demo-bar" },
            this.events ? h("o-demo-snackbar", { events: this.events }) : null,
            h("o-demo-bar-toolbar", { name: this.name },
                h("o-demo-bar-select", { slot: "center", options: this.casesOptions }),
                h("o-demo-bar-buttons", { slot: "right" }),
                h("o-demo-resizer", { class: deviceClasses, size: this.deviceSize, viewport: this.device, slot: "base" })),
            h("div", { id: "frame-wrap", class: bgClasses }, this.deviceEmulate ? mobileView : defaultView)));
    }
    static get is() { return "o-demo-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "caseOptionSelected": {
            "type": Number,
            "attr": "case-option-selected",
            "mutable": true
        },
        "device": {
            "type": String,
            "attr": "device",
            "mutable": true
        },
        "deviceEmulate": {
            "type": Boolean,
            "attr": "device-emulate",
            "mutable": true
        },
        "deviceSize": {
            "type": String,
            "attr": "device-size",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "events": {
            "type": "Any",
            "attr": "events"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "pattern": {
            "type": Boolean,
            "attr": "pattern",
            "mutable": true
        }
    }; }
    static get listeners() { return [{
            "name": "selectedCaseChanged",
            "method": "selectedCaseChangedHandler"
        }, {
            "name": "toolbarButtonClicked",
            "method": "toolbarButtonClickedHandler"
        }, {
            "name": "resizeButtonClicked",
            "method": "resizeButtonClickedHandler"
        }]; }
    static get style() { return "\n.sc-o-demo-bar-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.mdc-typography.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased; }\n\n.mdc-typography--headline1.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 6rem;\n  line-height: 6rem;\n  font-weight: 300;\n  letter-spacing: -0.01562em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline2.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.75rem;\n  line-height: 3.75rem;\n  font-weight: 300;\n  letter-spacing: -0.00833em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline3.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3rem;\n  line-height: 3.125rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline4.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: 0.00735em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline5.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline6.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--subtitle1.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--subtitle2.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.375rem;\n  font-weight: 500;\n  letter-spacing: 0.00714em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--body1.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.03125em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--body2.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--caption.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.03333em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--button.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase; }\n\n.mdc-typography--overline.sc-o-demo-bar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.16667em;\n  text-decoration: none;\n  text-transform: uppercase; }\n\n.sc-o-demo-bar-h   #iframe-wrap.sc-o-demo-bar {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  vertical-align: middle;\n  z-index: 0; }\n\n.sc-o-demo-bar-h   .hide.sc-o-demo-bar {\n  display: none; }\n\n.sc-o-demo-bar-h   o-demo-bar.sc-o-demo-bar {\n  z-index: 999; }\n\n.sc-o-demo-bar-h   o-demo-devices.sc-o-demo-bar {\n  margin-top: auto;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.sc-o-demo-bar-h   #iframeContainer.sc-o-demo-bar {\n  margin: auto;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  .sc-o-demo-bar-h   #iframeContainer.sc-o-demo-bar   iframe.sc-o-demo-bar {\n    margin: 0;\n    border: 0;\n    position: relative;\n    background-color: transparent;\n    z-index: 1; }\n\n.sc-o-demo-bar-h   #iframeContainer.sc-o-demo-bar   iframe.sc-o-demo-bar {\n  display: inline; }\n\n.sc-o-demo-bar-h   .bgcolor.sc-o-demo-bar {\n  background-color: rgba(0, 0, 0, 0.04); }\n\n.sc-o-demo-bar-h   .pattern.sc-o-demo-bar {\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  width: 100%;\n  height: 100%;\n  border: none;\n  font: normal 100%/normal Arial, Helvetica, sans-serif;\n  color: white;\n  text-overflow: clip;\n  background: linear-gradient(45deg, rgba(0, 0, 0, 0.0980392) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.0980392) 75%, rgba(0, 0, 0, 0.0980392) 0), linear-gradient(45deg, rgba(0, 0, 0, 0.0980392) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.0980392) 75%, rgba(0, 0, 0, 0.0980392) 0), white;\n  background-position: 0 0, 8px 8px;\n  background-origin: padding-box;\n  -webkit-background-clip: border-box;\n  background-clip: border-box;\n  background-size: 16px 16px; }\n"; }
}

class DemoButtonsComponent {
    handleClick(event) {
        let evt = event.currentTarget.getAttribute('data-btn');
        this.toolbarButtonClicked.emit(evt);
    }
    render() {
        return (h("div", { class: "toolbar-icons" },
            h("button", { "data-btn": "other-devices", onClick: (event) => this.handleClick(event), class: "toolbar-button" },
                h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                    h("path", { d: "M0 0h24v24H0z", fill: "none" }),
                    h("path", { d: "M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V6zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22V12zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1zm-1 10h-4v-8h4v8z" }))),
            h("button", { "data-btn": "mobile", onClick: (event) => this.handleClick(event), class: "toolbar-button" },
                h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                    h("path", { d: "M0 0h24v24H0z", fill: "none" }),
                    h("path", { d: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" }))),
            h("button", { "data-btn": "desktop", onClick: (event) => this.handleClick(event), class: "toolbar-button" },
                h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                    h("path", { d: "M0 0h24v24H0z", fill: "none" }),
                    h("path", { d: "M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" })))));
    }
    static get is() { return "o-demo-bar-buttons"; }
    static get encapsulation() { return "shadow"; }
    static get events() { return [{
            "name": "toolbarButtonClicked",
            "method": "toolbarButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "\n.sc-o-demo-bar-buttons-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.sc-o-demo-bar-buttons-h   .toolbar-button.sc-o-demo-bar-buttons:focus {\n  outline: none; }\n\n.sc-o-demo-bar-buttons-h   .toolbar-button.sc-o-demo-bar-buttons {\n  -webkit-transition: all 200ms ease;\n  transition: all 200ms ease;\n  cursor: pointer;\n  outline: none;\n  background: none;\n  border: none; }\n  .sc-o-demo-bar-buttons-h   .toolbar-button.sc-o-demo-bar-buttons   svg.sc-o-demo-bar-buttons {\n    fill: var(--o-demo-bar-buttons-color, #494949); }\n\n.sc-o-demo-bar-buttons-h   .toolbar-button.active.sc-o-demo-bar-buttons   svg.sc-o-demo-bar-buttons {\n  fill: var(--o-demo-bar-buttons-color, #8e8e8e); }\n"; }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }

  /** @return enum{strings} */
  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }

  /** @return enum{numbers} */
  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }

  /** @return {!Object} */
  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }

  /**
   * @param {A=} adapter
   */
  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template F
 */
class MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new MDCFoundation());
  }

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */
  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize(/* ...args */) {
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.
  }

  /**
   * @return {!F} foundation
   */
  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
      'foundation class');
  }

  initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */
  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */
  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */
  emit(evtType, evtData, shouldBubble = false) {
    let evt;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble,
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const cssClasses = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake',
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCFloatingLabelAdapter>}
 * @final
 */
class MDCFloatingLabelFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /**
   * {@see MDCFloatingLabelAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCFloatingLabelAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCFloatingLabelAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      getWidth: () => {},
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
    });
  }

  /**
   * @param {!MDCFloatingLabelAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCFloatingLabelFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.shakeAnimationEndHandler_ = () => this.handleShakeAnimationEnd_();
  }

  init() {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  }

  /**
   * Returns the width of the label element.
   * @return {number}
   */
  getWidth() {
    return this.adapter_.getWidth();
  }

  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} shouldShake adds shake class if true,
   * otherwise removes shake class.
   */
  shake(shouldShake) {
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  }

  /**
   * Styles the label to float or dock.
   * @param {boolean} shouldFloat adds float class if true, otherwise remove
   * float and shake class to dock label.
   */
  float(shouldFloat) {
    const {LABEL_FLOAT_ABOVE, LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  }

  /**
   * Handles an interaction event on the root element.
   */
  handleShakeAnimationEnd_() {
    const {LABEL_SHAKE} = MDCFloatingLabelFoundation.cssClasses;
    this.adapter_.removeClass(LABEL_SHAKE);
  }
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCComponent<!MDCFloatingLabelFoundation>}
 * @final
 */
class MDCFloatingLabel extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCFloatingLabel}
   */
  static attachTo(root) {
    return new MDCFloatingLabel(root);
  }

  /**
   * Styles the label to produce the label shake for errors.
   * @param {boolean} shouldShake styles the label to shake by adding shake class
   * if true, otherwise will stop shaking by removing shake class.
   */
  shake(shouldShake) {
    this.foundation_.shake(shouldShake);
  }

  /**
   * Styles label to float/dock.
   * @param {boolean} shouldFloat styles the label to float by adding float class
   * if true, otherwise docks the label by removing the float class.
   */
  float(shouldFloat) {
    this.foundation_.float(shouldFloat);
  }

  /**
   * @return {number}
   */
  getWidth() {
    return this.foundation_.getWidth();
  }

  /**
   * @return {!MDCFloatingLabelFoundation}
   */
  getDefaultFoundation() {
    return new MDCFloatingLabelFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      getWidth: () => this.root_.offsetWidth,
      registerInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
    });
  }
}

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const cssClasses$1 = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
};

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @extends {MDCFoundation<!MDCLineRippleAdapter>}
 * @final
 */
class MDCLineRippleFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$1;
  }

  /**
   * {@see MDCLineRippleAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCLineRippleAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCLineRippleAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      setStyle: () => {},
      registerEventHandler: () => {},
      deregisterEventHandler: () => {},
    });
  }

  /**
   * @param {!MDCLineRippleAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCLineRippleAdapter} */ ({})) {
    super(Object.assign(MDCLineRippleFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd(evt);
  }

  init() {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  }

  /**
   * Activates the line ripple
   */
  activate() {
    this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
  }

  /**
   * Sets the center of the ripple animation to the given X coordinate.
   * @param {number} xCoordinate
   */
  setRippleCenter(xCoordinate) {
    this.adapter_.setStyle('transform-origin', `${xCoordinate}px center`);
  }

  /**
   * Deactivates the line ripple
   */
  deactivate() {
    this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
  }

  /**
   * Handles a transition end event
   * @param {!Event} evt
   */
  handleTransitionEnd(evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    const isDeactivating = this.adapter_.hasClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
      }
    }
  }
}

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCComponent<!MDCLineRippleFoundation>}
 * @final
 */
class MDCLineRipple extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCLineRipple}
   */
  static attachTo(root) {
    return new MDCLineRipple(root);
  }

  /**
   * Activates the line ripple
   */
  activate() {
    this.foundation_.activate();
  }

  /**
   * Deactivates the line ripple
   */
  deactivate() {
    this.foundation_.deactivate();
  }

  /**
   * Sets the transform origin given a user's click location. The `rippleCenter` is the
   * x-coordinate of the middle of the ripple.
   * @param {number} xCoordinate
   */
  setRippleCenter(xCoordinate) {
    this.foundation_.setRippleCenter(xCoordinate);
  }

  /**
   * @return {!MDCLineRippleFoundation}
   */
  getDefaultFoundation() {
    return new MDCLineRippleFoundation(/** @type {!MDCLineRippleAdapter} */ (Object.assign({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      setStyle: (propertyName, value) => this.root_.style[propertyName] = value,
      registerEventHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterEventHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
    })));
  }
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$2 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
};

const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
};

const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
};

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
let supportsCssVariables_;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
let supportsPassive_;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj, forceRefresh = false) {
  let supportsCssVariables = supportsCssVariables_;
  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    windowObj.CSS.supports('(--css-vars: yes)') &&
    windowObj.CSS.supports('color', '#00000000')
  );

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }
  return supportsCssVariables;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
}

/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {x, y} = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;

  let normalizedX;
  let normalizedY;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {x: normalizedX, y: normalizedY};
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Activation events registered on the root element of each instance for activation
const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
let activatedTargets = [];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */
class MDCRippleFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$2;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () => /* boolean - cached */ {},
      isUnbounded: () => /* boolean */ {},
      isSurfaceActive: () => /* boolean */ {},
      isSurfaceDisabled: () => /* boolean */ {},
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      containsEventTarget: (/* target: !EventTarget */) => {},
      registerInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerDocumentInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterDocumentInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      updateCssVariable: (/* varName: string, value: string */) => {},
      computeBoundingRect: () => /* ClientRect */ {},
      getWindowPageOffset: () => /* {x: number, y: number} */ {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));

    /** @private {number} */
    this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    this.frame_ = /** @type {!ClientRect} */ ({width: 0, height: 0});

    /** @private {!ActivationStateType} */
    this.activationState_ = this.defaultActivationState_();

    /** @private {number} */
    this.initialSize_ = 0;

    /** @private {number} */
    this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    this.activateHandler_ = (e) => this.activate_(e);

    /** @private {function(!Event)} */
    this.deactivateHandler_ = (e) => this.deactivate_(e);

    /** @private {function(?Event=)} */
    this.focusHandler_ = () => this.handleFocus();

    /** @private {function(?Event=)} */
    this.blurHandler_ = () => this.handleBlur();

    /** @private {!Function} */
    this.resizeHandler_ = () => this.layout();

    /** @private {{left: number, top:number}} */
    this.unboundedCoords_ = {
      left: 0,
      top: 0,
    };

    /** @private {number} */
    this.fgScale_ = 0;

    /** @private {number} */
    this.activationTimer_ = 0;

    /** @private {number} */
    this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    this.previousActivationEvent_ = null;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */
  isSupported_() {
    return this.adapter_.browserSupportsCssVars();
  }

  /**
   * @return {!ActivationStateType}
   */
  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false,
    };
  }

  /** @override */
  init() {
    if (!this.isSupported_()) {
      return;
    }
    this.registerRootHandlers_();

    const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.addClass(ROOT);
      if (this.adapter_.isUnbounded()) {
        this.adapter_.addClass(UNBOUNDED);
        // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
        this.layoutInternal_();
      }
    });
  }

  /** @override */
  destroy() {
    if (!this.isSupported_()) {
      return;
    }

    if (this.activationTimer_) {
      clearTimeout(this.activationTimer_);
      this.activationTimer_ = 0;
      const {FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
      this.adapter_.removeClass(FG_ACTIVATION);
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();

    const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
    requestAnimationFrame(() => {
      this.adapter_.removeClass(ROOT);
      this.adapter_.removeClass(UNBOUNDED);
      this.removeCssVars_();
    });
  }

  /** @private */
  registerRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.registerInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.registerResizeHandler(this.resizeHandler_);
    }
  }

  /**
   * @param {!Event} e
   * @private
   */
  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach((type) => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }

  /** @private */
  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.deregisterInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }

  /** @private */
  deregisterDeactivationHandlers_() {
    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }

  /** @private */
  removeCssVars_() {
    const {strings: strings$$1} = MDCRippleFoundation;
    Object.keys(strings$$1).forEach((k) => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings$$1[k], null);
      }
    });
  }

  /**
   * @param {?Event} e
   * @private
   */
  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : (
      e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown'
    );

    const hasActivatedChild =
      e && activatedTargets.length > 0 && activatedTargets.some((target) => this.adapter_.containsEventTarget(target));
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push(/** @type {!EventTarget} */ (e.target));
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }

  /**
   * @param {?Event} e
   * @private
   */
  checkElementMadeActive_(e) {
    return (e && e.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  activate(event = null) {
    this.activate_(event);
  }

  /** @private */
  animateActivation_() {
    const {VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END} = MDCRippleFoundation.strings;
    const {FG_DEACTIVATION, FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
    const {DEACTIVATION_TIMEOUT_MS} = MDCRippleFoundation.numbers;

    this.layoutInternal_();

    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {startPoint, endPoint} = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */
  getFgTranslationCoordinates_() {
    const {activationEvent, wasActivatedByPointer} = this.activationState_;

    let startPoint;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(
        /** @type {!Event} */ (activationEvent),
        this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()
      );
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2,
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - (this.initialSize_ / 2),
      y: startPoint.y - (this.initialSize_ / 2),
    };

    const endPoint = {
      x: (this.frame_.width / 2) - (this.initialSize_ / 2),
      y: (this.frame_.height / 2) - (this.initialSize_ / 2),
    };

    return {startPoint, endPoint};
  }

  /** @private */
  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {FG_DEACTIVATION} = MDCRippleFoundation.cssClasses;
    const {hasDeactivationUXRun, isActivated} = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  }

  /** @private */
  rmBoundedActivationClasses_() {
    const {FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  }

  /**
   * @param {?Event} e
   * @private
   */
  deactivate_(e) {
    const activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    const state = /** @type {!ActivationStateType} */ (Object.assign({}, activationState));

    if (activationState.isProgrammatic) {
      const evtObject = null;
      requestAnimationFrame(() => this.animateDeactivation_(evtObject, state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(e, state);
        this.resetActivationState_();
      });
    }
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  deactivate(event = null) {
    this.deactivate_(event);
  }

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */
  animateDeactivation_(e, {wasActivatedByPointer, wasElementMadeActive}) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }

  /** @private */
  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();
    const maxDim = Math.max(this.frame_.height, this.frame_.width);

    // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.
    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;

    this.updateLayoutCssVars_();
  }

  /** @private */
  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE, VAR_LEFT, VAR_TOP, VAR_FG_SCALE,
    } = MDCRippleFoundation.strings;

    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
        top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
      };

      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }

  /** @param {boolean} unbounded */
  setUnbounded(unbounded) {
    const {UNBOUNDED} = MDCRippleFoundation.cssClasses;
    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

  handleFocus() {
    requestAnimationFrame(() =>
      this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

  handleBlur() {
    requestAnimationFrame(() =>
      this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */
class MDCRipple extends MDCComponent {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);

    /** @type {boolean} */
    this.disabled = false;

    /** @private {boolean} */
    this.unbounded_;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */
  static attachTo(root, {isUnbounded = undefined} = {}) {
    const ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */ (isUnbounded);
    }
    return ripple;
  }

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */
  static createAdapter(instance) {
    const MATCHES = getMatchesProperty(HTMLElement.prototype);

    return {
      browserSupportsCssVars: () => supportsCssVariables(window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      isSurfaceDisabled: () => instance.disabled,
      addClass: (className) => instance.root_.classList.add(className),
      removeClass: (className) => instance.root_.classList.remove(className),
      containsEventTarget: (target) => instance.root_.contains(target),
      registerInteractionHandler: (evtType, handler) =>
        instance.root_.addEventListener(evtType, handler, applyPassive()),
      deregisterInteractionHandler: (evtType, handler) =>
        instance.root_.removeEventListener(evtType, handler, applyPassive()),
      registerDocumentInteractionHandler: (evtType, handler) =>
        document.documentElement.addEventListener(evtType, handler, applyPassive()),
      deregisterDocumentInteractionHandler: (evtType, handler) =>
        document.documentElement.removeEventListener(evtType, handler, applyPassive()),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
    };
  }

  /** @return {boolean} */
  get unbounded() {
    return this.unbounded_;
  }

  /** @param {boolean} unbounded */
  set unbounded(unbounded) {
    this.unbounded_ = Boolean(unbounded);
    this.setUnbounded_();
  }

  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */
  setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  }

  activate() {
    this.foundation_.activate();
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  layout() {
    this.foundation_.layout();
  }

  /**
   * @return {!MDCRippleFoundation}
   * @override
   */
  getDefaultFoundation() {
    return new MDCRippleFoundation(MDCRipple.createAdapter(this));
  }

  /** @override */
  initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  }
}

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */
class RippleCapableSurface {}

/** @protected {!Element} */
RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
const strings$1 = {
  PATH_SELECTOR: '.mdc-notched-outline__path',
  IDLE_OUTLINE_SELECTOR: '.mdc-notched-outline__idle',
};

/** @enum {string} */
const cssClasses$3 = {
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
};

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCFoundation<!MDCNotchedOutlineAdapter>}
 * @final
 */
class MDCNotchedOutlineFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings$1;
  }

  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses$3;
  }

  /**
   * {@see MDCNotchedOutlineAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCNotchedOutlineAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCNotchedOutlineAdapter} */ ({
      getWidth: () => {},
      getHeight: () => {},
      addClass: () => {},
      removeClass: () => {},
      setOutlinePathAttr: () => {},
      getIdleOutlineStyleValue: () => {},
    });
  }

  /**
   * @param {!MDCNotchedOutlineAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCNotchedOutlineFoundation.defaultAdapter, adapter));
  }

  /**
   * Adds the outline notched selector and updates the notch width
   * calculated based off of notchWidth and isRtl.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   */
  notch(notchWidth, isRtl = false) {
    const {OUTLINE_NOTCHED} = MDCNotchedOutlineFoundation.cssClasses;
    this.adapter_.addClass(OUTLINE_NOTCHED);
    this.updateSvgPath_(notchWidth, isRtl);
  }

  /**
   * Removes notched outline selector to close the notch in the outline.
   */
  closeNotch() {
    const {OUTLINE_NOTCHED} = MDCNotchedOutlineFoundation.cssClasses;
    this.adapter_.removeClass(OUTLINE_NOTCHED);
  }

  /**
   * Updates the SVG path of the focus outline element based on the notchWidth
   * and the RTL context.
   * @param {number} notchWidth
   * @param {boolean=} isRtl
   * @private
   */
  updateSvgPath_(notchWidth, isRtl) {
    // Fall back to reading a specific corner's style because Firefox doesn't report the style on border-radius.
    const radiusStyleValue = this.adapter_.getIdleOutlineStyleValue('border-radius') ||
        this.adapter_.getIdleOutlineStyleValue('border-top-left-radius');
    const radius = parseFloat(radiusStyleValue);
    const width = this.adapter_.getWidth();
    const height = this.adapter_.getHeight();
    const cornerWidth = radius + 1.2;
    const leadingStrokeLength = Math.abs(11 - cornerWidth);
    const paddedNotchWidth = notchWidth + 8;

    // The right, bottom, and left sides of the outline follow the same SVG path.
    const pathMiddle = 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius
      + 'v' + (height - (2 * cornerWidth))
      + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius
      + 'h' + (-width + (2 * cornerWidth))
      + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius
      + 'v' + (-height + (2 * cornerWidth))
      + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius;

    let path;
    if (!isRtl) {
      path = 'M' + (cornerWidth + leadingStrokeLength + paddedNotchWidth) + ',' + 1
        + 'h' + (width - (2 * cornerWidth) - paddedNotchWidth - leadingStrokeLength)
        + pathMiddle
        + 'h' + leadingStrokeLength;
    } else {
      path = 'M' + (width - cornerWidth - leadingStrokeLength) + ',' + 1
        + 'h' + leadingStrokeLength
        + pathMiddle
        + 'h' + (width - (2 * cornerWidth) - paddedNotchWidth - leadingStrokeLength);
    }

    this.adapter_.setOutlinePathAttr(path);
  }
}

/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @extends {MDCComponent<!MDCNotchedOutlineFoundation>}
 * @final
 */
class MDCNotchedOutline extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCNotchedOutline}
   */
  static attachTo(root) {
    return new MDCNotchedOutline(root);
  }

  /**
    * Updates outline selectors and SVG path to open notch.
    * @param {number} notchWidth The notch width in the outline.
    * @param {boolean=} isRtl Determines if outline is rtl. If rtl is true, notch
    * will be right justified in outline path, otherwise left justified.
    */
  notch(notchWidth, isRtl) {
    this.foundation_.notch(notchWidth, isRtl);
  }

  /**
   * Updates the outline selectors to close notch and return it to idle state.
   */
  closeNotch() {
    this.foundation_.closeNotch();
  }

  /**
   * @return {!MDCNotchedOutlineFoundation}
   */
  getDefaultFoundation() {
    return new MDCNotchedOutlineFoundation({
      getWidth: () => this.root_.offsetWidth,
      getHeight: () => this.root_.offsetHeight,
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setOutlinePathAttr: (value) => {
        const path = this.root_.querySelector(strings$1.PATH_SELECTOR);
        path.setAttribute('d', value);
      },
      getIdleOutlineStyleValue: (propertyName) => {
        const idleOutlineElement = this.root_.parentNode.querySelector(strings$1.IDLE_OUTLINE_SELECTOR);
        return window.getComputedStyle(idleOutlineElement).getPropertyValue(propertyName);
      },
    });
  }
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cssClasses$4 = {
  BOX: 'mdc-select--box',
  DISABLED: 'mdc-select--disabled',
  ROOT: 'mdc-select',
  OUTLINED: 'mdc-select--outlined',
};

const strings$2 = {
  CHANGE_EVENT: 'MDCSelect:change',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  LABEL_SELECTOR: '.mdc-floating-label',
  NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
  OUTLINE_SELECTOR: '.mdc-notched-outline',
};

/** @enum {number} */
const numbers$1 = {
  LABEL_SCALE: 0.75,
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSelectFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$4;
  }

  static get numbers() {
    return numbers$1;
  }

  static get strings() {
    return strings$2;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      hasClass: (/* className: string */) => false,
      floatLabel: (/* value: boolean */) => {},
      activateBottomLine: () => {},
      deactivateBottomLine: () => {},
      getValue: () => {},
      isRtl: () => false,
      hasLabel: () => {},
      getLabelWidth: () => {},
      hasOutline: () => {},
      notchOutline: () => {},
      closeOutline: () => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCSelectFoundation.defaultAdapter, adapter));

    this.focusHandler_ = (evt) => this.handleFocus_(evt);
    this.blurHandler_ = (evt) => this.handleBlur_(evt);
  }

  updateDisabledStyle(disabled) {
    const {DISABLED} = MDCSelectFoundation.cssClasses;
    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }

  handleChange() {
    const optionHasValue = this.adapter_.getValue().length > 0;
    this.adapter_.floatLabel(optionHasValue);
    this.notchOutline(optionHasValue);
  }

  handleFocus() {
    this.adapter_.floatLabel(true);
    this.notchOutline(true);
    this.adapter_.activateBottomLine();
  }

  handleBlur() {
    this.handleChange();
    this.adapter_.deactivateBottomLine();
  }

  /**
   * Opens/closes the notched outline.
   * @param {boolean} openNotch
   */
  notchOutline(openNotch) {
    if (!this.adapter_.hasOutline() || !this.adapter_.hasLabel()) {
      return;
    }

    if (openNotch) {
      const labelScale = numbers$1.LABEL_SCALE;
      const labelWidth = this.adapter_.getLabelWidth() * labelScale;
      const isRtl = this.adapter_.isRtl();
      this.adapter_.notchOutline(labelWidth, isRtl);
    } else {
      this.adapter_.closeOutline();
    }
  }
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSelect extends MDCComponent {
  static attachTo(root) {
    return new MDCSelect(root);
  }

  get value() {
    return this.nativeControl_.value;
  }

  set value(value) {
    this.nativeControl_.value = value;
    this.foundation_.handleChange();
  }

  get selectedIndex() {
    return this.nativeControl_.selectedIndex;
  }

  set selectedIndex(selectedIndex) {
    this.nativeControl_.selectedIndex = selectedIndex;
    this.foundation_.handleChange();
  }

  get disabled() {
    return this.nativeControl_.disabled;
  }

  set disabled(disabled) {
    this.nativeControl_.disabled = disabled;
    this.foundation_.updateDisabledStyle(disabled);
  }

  /**
   * Recomputes the outline SVG path for the outline element.
   */
  layout() {
    const openNotch = this.nativeControl_.value.length > 0;
    this.foundation_.notchOutline(openNotch);
  }

  initialize(
    labelFactory = (el) => new MDCFloatingLabel(el),
    lineRippleFactory = (el) => new MDCLineRipple(el),
    outlineFactory = (el) => new MDCNotchedOutline(el)) {
    this.nativeControl_ = this.root_.querySelector(strings$2.NATIVE_CONTROL_SELECTOR);
    const labelElement = this.root_.querySelector(strings$2.LABEL_SELECTOR);
    if (labelElement) {
      this.label_ = labelFactory(labelElement);
    }
    const lineRippleElement = this.root_.querySelector(strings$2.LINE_RIPPLE_SELECTOR);
    if (lineRippleElement) {
      this.lineRipple_ = lineRippleFactory(lineRippleElement);
    }
    const outlineElement = this.root_.querySelector(strings$2.OUTLINE_SELECTOR);
    if (outlineElement) {
      this.outline_ = outlineFactory(outlineElement);
    }

    if (this.root_.classList.contains(cssClasses$4.BOX)) {
      this.ripple = this.initRipple_();
    }
  }

  initRipple_() {
    const adapter = Object.assign(MDCRipple.createAdapter(this), {
      registerInteractionHandler: (type, handler) => this.nativeControl_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.nativeControl_.removeEventListener(type, handler),
    });
    const foundation = new MDCRippleFoundation(adapter);
    return new MDCRipple(this.root_, foundation);
  }

  initialSyncWithDOM() {
    this.handleChange_ = () => this.foundation_.handleChange();
    this.handleFocus_ = () => this.foundation_.handleFocus();
    this.handleBlur_ = () => this.foundation_.handleBlur();

    this.nativeControl_.addEventListener('change', this.handleChange_);
    this.nativeControl_.addEventListener('focus', this.handleFocus_);
    this.nativeControl_.addEventListener('blur', this.handleBlur_);

    // Initially sync floating label
    this.foundation_.handleChange();

    if (this.nativeControl_.disabled) {
      this.disabled = true;
    }
  }

  destroy() {
    this.nativeControl_.removeEventListener('change', this.handleChange_);
    this.nativeControl_.removeEventListener('focus', this.handleFocus_);
    this.nativeControl_.removeEventListener('blur', this.handleBlur_);

    if (this.ripple) {
      this.ripple.destroy();
    }
    if (this.outline_) {
      this.outline_.destroy();
    }

    super.destroy();
  }

  getDefaultFoundation() {
    return new MDCSelectFoundation((Object.assign({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      activateBottomLine: () => {
        if (this.lineRipple_) {
          this.lineRipple_.activate();
        }
      },
      deactivateBottomLine: () => {
        if (this.lineRipple_) {
          this.lineRipple_.deactivate();
        }
      },
      isRtl: () => window.getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      getValue: () => this.nativeControl_.value,
    },
    this.getOutlineAdapterMethods_(),
    this.getLabelAdapterMethods_()))
    );
  }

  /**
   * @return {!{
   *   notchOutline: function(number, boolean): undefined,
   *   hasOutline: function(): boolean,
   * }}
   */
  getOutlineAdapterMethods_() {
    return {
      notchOutline: (labelWidth, isRtl) => {
        if (this.outline_) {
          this.outline_.notch(labelWidth, isRtl);
        }
      },
      closeOutline: () => {
        if (this.outline_) {
          this.outline_.closeNotch();
        }
      },
      hasOutline: () => !!this.outline_,
    };
  }

  /**
   * @return {!{
   *   floatLabel: function(boolean): undefined,
   *   hasLabel: function(): boolean,
   *   getLabelWidth: function(): number,
   * }}
   */
  getLabelAdapterMethods_() {
    return {
      floatLabel: (shouldFloat) => {
        if (this.label_) {
          this.label_.float(shouldFloat);
        }
      },
      hasLabel: () => !!this.label_,
      getLabelWidth: () => {
        if (this.label_) {
          return this.label_.getWidth();
        }
      },
    };
  }
}

class DemoSelectComponent {
    componentDidLoad() {
        const rootEl = this.el.shadowRoot.querySelector('.mdc-select');
        this.select = new MDCSelect(rootEl);
        this.select.selectedIndex = 0;
        this.emitChange();
        this.select.listen('change', () => {
            this.emitChange();
        });
    }
    emitChange() {
        this.selectedCaseChanged.emit(this.select.selectedIndex);
    }
    componentDidUnload() {
        this.select.destroy();
    }
    render() {
        return (h("div", { class: "mdc-select" },
            h("select", { class: "mdc-select__native-control" }, this.options.map((option, index) => (h("option", { value: index, id: index, role: "option", tabindex: "0" }, option)))),
            h("label", { class: "mdc-floating-label" }, "Select Demo:"),
            h("div", { class: "mdc-line-ripple" })));
    }
    static get is() { return "o-demo-bar-select"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "options": {
            "type": "Any",
            "attr": "options"
        }
    }; }
    static get events() { return [{
            "name": "selectedCaseChanged",
            "method": "selectedCaseChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "\n.sc-o-demo-bar-select-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.mdc-menu.sc-o-demo-bar-select {\n  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  background-color: #fff;\n  \n  background-color: var(--mdc-theme-background, #fff);\n  display: none;\n  position: absolute;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  min-width: 170px;\n  max-width: calc(100vw - 32px);\n  max-height: calc(100vh - 32px);\n  margin: 0;\n  padding: 0;\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  -webkit-transform-origin: top left;\n  transform-origin: top left;\n  border-radius: 2px;\n  opacity: 0;\n  white-space: nowrap;\n  overflow-x: hidden;\n  overflow-y: auto;\n  will-change: transform, opacity;\n  z-index: 4; }\n  .mdc-menu.sc-o-demo-bar-select:focus {\n    outline: none; }\n  .mdc-menu--animating-open.sc-o-demo-bar-select {\n    display: inline-block;\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8);\n    -webkit-transition: opacity 0.03s linear, -webkit-transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 0.03s linear, -webkit-transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 0.03s linear, transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 0.03s linear, transform 0.12s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    opacity: 0;\n    overflow-y: hidden; }\n  .mdc-menu--open.sc-o-demo-bar-select {\n    display: inline-block;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1; }\n  .mdc-menu--animating-closed.sc-o-demo-bar-select {\n    display: inline-block;\n    -webkit-transition: opacity 0.075s linear;\n    transition: opacity 0.075s linear;\n    opacity: 0;\n    overflow-y: hidden; }\n  .mdc-menu__items.sc-o-demo-bar-select {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    overflow-x: hidden;\n    overflow-y: auto;\n    will-change: transform; }\n    .mdc-menu__items.sc-o-demo-bar-select    > .mdc-list-item.sc-o-demo-bar-select {\n      cursor: pointer; }\n    .mdc-menu--animating.sc-o-demo-bar-select   .mdc-menu__items.sc-o-demo-bar-select {\n      overflow-y: hidden; }\n  .mdc-menu--animating-open.sc-o-demo-bar-select    > .mdc-menu__items.sc-o-demo-bar-select {\n    -webkit-transform: scale(1.25);\n    transform: scale(1.25); }\n  .mdc-menu--open.sc-o-demo-bar-select    > .mdc-menu__items.sc-o-demo-bar-select {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-menu.sc-o-demo-bar-select {\n    -webkit-transform-origin: top right;\n    transform-origin: top right; }\n  .mdc-menu.sc-o-demo-bar-select   .mdc-list-group.sc-o-demo-bar-select, .mdc-menu.sc-o-demo-bar-select   .mdc-list.sc-o-demo-bar-select {\n    padding: 8px 0; }\n  .mdc-menu.sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1rem;\n    line-height: 1.75rem;\n    font-weight: 400;\n    letter-spacing: 0.00937em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    position: relative;\n    outline: none;\n    color: inherit;\n    text-decoration: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  .mdc-menu.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n    color: rgba(0, 0, 0, 0.54);\n    \n    color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n  .mdc-menu.sc-o-demo-bar-select   .mdc-list-item[aria-disabled=\"true\"].sc-o-demo-bar-select {\n    color: rgba(0, 0, 0, 0.38);\n    \n    color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38));\n    cursor: default;\n    pointer-events: none; }\n    .mdc-menu.sc-o-demo-bar-select   .mdc-list-item[aria-disabled=\"true\"].sc-o-demo-bar-select:focus::before {\n      opacity: 0; }\n\n.mdc-menu-anchor.sc-o-demo-bar-select {\n  position: relative;\n  overflow: visible; }\n\n\@-webkit-keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n\@keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n\@-webkit-keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n\@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n\@-webkit-keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n\@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug.sc-o-demo-bar-select {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug.sc-o-demo-bar-select::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-list.sc-o-demo-bar-select {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  color: rgba(0, 0, 0, 0.87);\n  \n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));\n  margin: 0;\n  padding: 8px 0;\n  \n  line-height: 1.5rem;\n  list-style-type: none; }\n\n.mdc-list-item__secondary-text.sc-o-demo-bar-select {\n  color: rgba(0, 0, 0, 0.54);\n  \n  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n\n.mdc-list-item__graphic.sc-o-demo-bar-select {\n  background-color: transparent; }\n\n.mdc-list-item__graphic.sc-o-demo-bar-select {\n  color: rgba(0, 0, 0, 0.38);\n  \n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__meta.sc-o-demo-bar-select {\n  color: rgba(0, 0, 0, 0.38);\n  \n  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list--dense.sc-o-demo-bar-select {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  font-size: .812rem; }\n\n.mdc-list-item.sc-o-demo-bar-select {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  height: 48px;\n  padding: 0 16px;\n  overflow: hidden; }\n  .mdc-list-item.sc-o-demo-bar-select:focus {\n    outline: none; }\n\n.mdc-list-item--selected.sc-o-demo-bar-select, .mdc-list-item--activated.sc-o-demo-bar-select {\n  color: #6200ee;\n  \n  color: var(--mdc-theme-primary, #6200ee); }\n  .mdc-list-item--selected.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select, .mdc-list-item--activated.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n    color: #6200ee;\n    \n    color: var(--mdc-theme-primary, #6200ee); }\n\n.mdc-list-item--disabled.sc-o-demo-bar-select {\n  color: rgba(0, 0, 0, 0.38);\n  \n  color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__graphic.sc-o-demo-bar-select {\n  \n  margin-left: 0;\n  \n  margin-right: 32px;\n  width: 24px;\n  height: 24px;\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  .mdc-list-item[dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select, [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n    \n    margin-left: 32px;\n    \n    margin-right: 0; }\n\n.mdc-list-item__meta.sc-o-demo-bar-select {\n  \n  margin-left: auto;\n  \n  margin-right: 0; }\n  .mdc-list-item[dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item__meta.sc-o-demo-bar-select, [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select   .mdc-list-item__meta.sc-o-demo-bar-select {\n    \n    margin-left: 0;\n    \n    margin-right: auto; }\n\n.mdc-list-item__text.sc-o-demo-bar-select {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-align-self: flex-start;\n  -ms-flex-item-align: start;\n  align-self: flex-start; }\n\n.mdc-list-item__primary-text.sc-o-demo-bar-select {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-top: 0;\n  line-height: normal;\n  margin-bottom: -20px;\n  display: block; }\n  .mdc-list-item__primary-text.sc-o-demo-bar-select::before {\n    display: inline-block;\n    width: 0;\n    height: 32px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list-item__primary-text.sc-o-demo-bar-select::after {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: -20px; }\n  .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__primary-text.sc-o-demo-bar-select {\n    margin-top: 0;\n    line-height: normal;\n    margin-bottom: -20px; }\n    .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__primary-text.sc-o-demo-bar-select::before {\n      display: inline-block;\n      width: 0;\n      height: 24px;\n      content: \"\";\n      vertical-align: 0; }\n    .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__primary-text.sc-o-demo-bar-select::after {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: -20px; }\n\n.mdc-list-item__secondary-text.sc-o-demo-bar-select {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-top: 0;\n  line-height: normal;\n  display: block; }\n  .mdc-list-item__secondary-text.sc-o-demo-bar-select::before {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__secondary-text.sc-o-demo-bar-select {\n    margin-top: 0;\n    line-height: normal;\n    font-size: inherit; }\n    .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__secondary-text.sc-o-demo-bar-select::before {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: 0; }\n\n.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select {\n  height: 40px; }\n\n.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n  \n  margin-left: 0;\n  \n  margin-right: 36px;\n  width: 20px;\n  height: 20px; }\n  .mdc-list-item[dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select, [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select   .mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n    \n    margin-left: 36px;\n    \n    margin-right: 0; }\n\n.mdc-list--avatar-list.sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select {\n  height: 56px; }\n\n.mdc-list--avatar-list.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n  \n  margin-left: 0;\n  \n  margin-right: 16px;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%; }\n  .mdc-list-item[dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list--avatar-list.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select, [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select   .mdc-list--avatar-list.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n    \n    margin-left: 16px;\n    \n    margin-right: 0; }\n\n.mdc-list--two-line.sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select {\n  height: 72px; }\n\n.mdc-list--two-line.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n  \n  margin-left: 0;\n  \n  margin-right: 20px;\n  width: 36px;\n  height: 36px; }\n  .mdc-list-item[dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list--avatar-list.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select, [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-item.sc-o-demo-bar-select   .mdc-list--avatar-list.mdc-list--dense.sc-o-demo-bar-select   .mdc-list-item__graphic.sc-o-demo-bar-select {\n    \n    margin-left: 20px;\n    \n    margin-right: 0; }\n\n.sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::before {\n    -webkit-transition: opacity 15ms linear;\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    top: 0;\n    \n    left: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transform-origin: center center;\n    transform-origin: center center; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    \n    left: var(--mdc-ripple-left, 0); }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n    animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n    animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::after {\n    top: calc(50% - 100%);\n    \n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item::after {\n    background-color: black; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item:hover::before {\n    opacity: 0.04; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused::before {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded)::after {\n    -webkit-transition: opacity 150ms linear;\n    transition: opacity 150ms linear; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active::after {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated::before {\n    opacity: 0.12; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n    background-color: #6200ee; }\n    \@supports not (-ms-ime-align: auto) {\n      .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n        \n        background-color: var(--mdc-theme-primary, #6200ee); } }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {\n    opacity: 0.16; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {\n    -webkit-transition: opacity 150ms linear;\n    transition: opacity 150ms linear; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.28; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.28; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected::before {\n    opacity: 0.08; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n    background-color: #6200ee; }\n    \@supports not (-ms-ime-align: auto) {\n      .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n        \n        background-color: var(--mdc-theme-primary, #6200ee); } }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {\n    opacity: 0.12; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before, .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.2; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {\n    -webkit-transition: opacity 150ms linear;\n    transition: opacity 150ms linear; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  .sc-o-demo-bar-select:not(.mdc-list--non-interactive)    > .sc-o-demo-bar-select:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.24; }\n\na.mdc-list-item.sc-o-demo-bar-select {\n  color: inherit;\n  text-decoration: none; }\n\n.mdc-list-divider.sc-o-demo-bar-select {\n  height: 0;\n  margin: 0;\n  border: none;\n  border-bottom-width: 1px;\n  border-bottom-style: solid; }\n\n.mdc-list-divider.sc-o-demo-bar-select {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n\n.mdc-list-divider--padded.sc-o-demo-bar-select {\n  margin: 0 16px; }\n\n.mdc-list-divider--inset.sc-o-demo-bar-select {\n  \n  margin-left: 72px;\n  \n  margin-right: 0;\n  width: calc(100% - 72px); }\n  .mdc-list-group[dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-divider--inset.sc-o-demo-bar-select, [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-list-group.sc-o-demo-bar-select   .mdc-list-divider--inset.sc-o-demo-bar-select {\n    \n    margin-left: 0;\n    \n    margin-right: 72px; }\n\n.mdc-list-divider--inset.mdc-list-divider--padded.sc-o-demo-bar-select {\n  width: calc(100% - 72px - 16px); }\n\n.mdc-list-group.sc-o-demo-bar-select   .mdc-list.sc-o-demo-bar-select {\n  padding: 0; }\n\n.mdc-list-group__subheader.sc-o-demo-bar-select {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin: 0.75rem 16px; }\n\n.mdc-list-group__subheader.sc-o-demo-bar-select {\n  color: rgba(0, 0, 0, 0.87);\n  \n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n\n\@-webkit-keyframes mdc-select-float-native-control {\n  0% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1; } }\n\n\@keyframes mdc-select-float-native-control {\n  0% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n    opacity: 1; } }\n\n.mdc-line-ripple.sc-o-demo-bar-select {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  -webkit-transform: scaleX(0);\n  transform: scaleX(0);\n  -webkit-transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n  opacity: 0;\n  z-index: 2; }\n\n.mdc-line-ripple--active.sc-o-demo-bar-select {\n  -webkit-transform: scaleX(1);\n  transform: scaleX(1);\n  opacity: 1; }\n\n.mdc-line-ripple--deactivating.sc-o-demo-bar-select {\n  opacity: 0; }\n\n.mdc-notched-outline.sc-o-demo-bar-select {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: calc(100% - 1px);\n  height: calc(100% - 2px);\n  -webkit-transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  opacity: 0;\n  overflow: hidden; }\n  .mdc-notched-outline.sc-o-demo-bar-select   svg.sc-o-demo-bar-select {\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n\n.mdc-notched-outline__idle.sc-o-demo-bar-select {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: calc(100% - 4px);\n  height: calc(100% - 4px);\n  -webkit-transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  border: 1px solid;\n  opacity: 1; }\n\n.mdc-notched-outline__path.sc-o-demo-bar-select {\n  stroke-width: 1px;\n  -webkit-transition: stroke 150ms cubic-bezier(0.4, 0, 0.2, 1), stroke-width 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: stroke 150ms cubic-bezier(0.4, 0, 0.2, 1), stroke-width 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  fill: transparent; }\n\n.mdc-notched-outline--notched.sc-o-demo-bar-select {\n  opacity: 1; }\n\n.mdc-notched-outline--notched.sc-o-demo-bar-select    ~ .mdc-notched-outline__idle.sc-o-demo-bar-select {\n  opacity: 0; }\n\n.mdc-floating-label.sc-o-demo-bar-select {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  position: absolute;\n  bottom: 8px;\n  left: 0;\n  -webkit-transform-origin: left top;\n  transform-origin: left top;\n  -webkit-transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  line-height: 1.15rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: text;\n  overflow: hidden;\n  will-change: transform; }\n  [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select, .mdc-floating-label[dir=\"rtl\"].sc-o-demo-bar-select {\n    \n    right: 0;\n    \n    left: auto;\n    \n    -webkit-transform-origin: right top;\n    transform-origin: right top; }\n\n.mdc-floating-label--float-above.sc-o-demo-bar-select {\n  cursor: auto; }\n\n.mdc-floating-label--float-above.sc-o-demo-bar-select {\n  -webkit-transform: translateY(-100%) scale(0.75);\n  transform: translateY(-100%) scale(0.75); }\n\n.mdc-floating-label--shake.sc-o-demo-bar-select {\n  -webkit-animation: mdc-floating-label-shake-float-above-standard 250ms 1;\n  animation: mdc-floating-label-shake-float-above-standard 250ms 1; }\n\n\@-webkit-keyframes mdc-floating-label-shake-float-above-standard {\n  0% {\n    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); }\n  33% {\n    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    -webkit-transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75); }\n  66% {\n    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75); }\n  100% {\n    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); } }\n\n\@keyframes mdc-floating-label-shake-float-above-standard {\n  0% {\n    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); }\n  33% {\n    -webkit-animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    animation-timing-function: cubic-bezier(0.5, 0, 0.70173, 0.49582);\n    -webkit-transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(4% - 0%)) translateY(-100%) scale(0.75); }\n  66% {\n    -webkit-animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    animation-timing-function: cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);\n    -webkit-transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(-4% - 0%)) translateY(-100%) scale(0.75); }\n  100% {\n    -webkit-transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75);\n    transform: translateX(calc(0 - 0%)) translateY(-100%) scale(0.75); } }\n\n.mdc-select.sc-o-demo-bar-select {\n  background-image: url(\"data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E\");\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  height: 52px;\n  background-repeat: no-repeat;\n  background-position: right 8px bottom 12px; }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled) {\n    background-color: transparent; }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select {\n    color: rgba(0, 0, 0, 0.87); }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-floating-label.sc-o-demo-bar-select {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select {\n    border-bottom-color: rgba(0, 0, 0, 0.42); }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select:focus    ~ .mdc-line-ripple.sc-o-demo-bar-select {\n    background-color: #6200ee;\n    \n    background-color: var(--mdc-theme-primary, #6200ee); }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select:focus    ~ .mdc-floating-label.sc-o-demo-bar-select {\n    color: rgba(98, 0, 238, 0.87); }\n  .mdc-select.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select:hover {\n    border-bottom-color: rgba(0, 0, 0, 0.87); }\n  [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select.sc-o-demo-bar-select, .mdc-select[dir=\"rtl\"].sc-o-demo-bar-select {\n    background-position: left 8px bottom 12px; }\n  .mdc-select__native-control.sc-o-demo-bar-select {\n    \n    padding-left: 0;\n    \n    padding-right: 26px;\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1rem;\n    line-height: 1.75rem;\n    font-weight: 400;\n    letter-spacing: 0.00937em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    width: 100%;\n    padding-top: 20px;\n    padding-bottom: 4px;\n    border: none;\n    border-bottom: 1px solid;\n    border-radius: 0;\n    outline: none;\n    background-color: transparent;\n    white-space: nowrap;\n    cursor: pointer;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none; }\n    [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select, .mdc-select__native-control[dir=\"rtl\"].sc-o-demo-bar-select {\n      \n      padding-left: 26px;\n      \n      padding-right: 0; }\n    .mdc-select__native-control.sc-o-demo-bar-select::-ms-expand {\n      display: none; }\n\n\@-moz-document url-prefix(\"\") {\n  .mdc-select__native-control {\n    text-indent: -2px; } }\n  .mdc-select.sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select {\n    pointer-events: none; }\n  .mdc-select.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select:focus    ~ .mdc-line-ripple.sc-o-demo-bar-select::after {\n    -webkit-transform: scale(1, 2);\n    transform: scale(1, 2);\n    opacity: 1; }\n\n.mdc-select--box.sc-o-demo-bar-select {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  height: 56px;\n  border-radius: 4px 4px 0 0;\n  background-position: right 10px center;\n  overflow: hidden; }\n  .mdc-select--box.sc-o-demo-bar-select:not(.mdc-select--disabled) {\n    background-color: whitesmoke; }\n  .mdc-select--box.sc-o-demo-bar-select::before, .mdc-select--box.sc-o-demo-bar-select::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-select--box.sc-o-demo-bar-select::before {\n    -webkit-transition: opacity 15ms linear;\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  .mdc-select--box.mdc-ripple-upgraded.sc-o-demo-bar-select::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-select--box.mdc-ripple-upgraded.sc-o-demo-bar-select::after {\n    top: 0;\n    \n    left: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transform-origin: center center;\n    transform-origin: center center; }\n  .mdc-select--box.mdc-ripple-upgraded--unbounded.sc-o-demo-bar-select::after {\n    top: var(--mdc-ripple-top, 0);\n    \n    left: var(--mdc-ripple-left, 0); }\n  .mdc-select--box.mdc-ripple-upgraded--foreground-activation.sc-o-demo-bar-select::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n    animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-select--box.mdc-ripple-upgraded--foreground-deactivation.sc-o-demo-bar-select::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n    animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-select--box.sc-o-demo-bar-select::before, .mdc-select--box.sc-o-demo-bar-select::after {\n    top: calc(50% - 100%);\n    \n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .mdc-select--box.mdc-ripple-upgraded.sc-o-demo-bar-select::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-select--box.sc-o-demo-bar-select::before, .mdc-select--box.sc-o-demo-bar-select::after {\n    background-color: rgba(0, 0, 0, 0.87); }\n  .mdc-select--box.sc-o-demo-bar-select:hover::before {\n    opacity: 0.04; }\n  .mdc-select--box.sc-o-demo-bar-select:not(.mdc-ripple-upgraded):focus::before, .mdc-select--box.sc-o-demo-bar-select:not(.mdc-ripple-upgraded):focus-within::before, .mdc-select--box.mdc-ripple-upgraded--background-focused.sc-o-demo-bar-select::before {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select--box.sc-o-demo-bar-select, .mdc-select--box[dir=\"rtl\"].sc-o-demo-bar-select {\n    background-position: left 10px center; }\n  .mdc-select--box.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select {\n    \n    padding-left: 16px;\n    \n    padding-right: 26px;\n    height: 56px;\n    border-radius: 4px 4px 0 0; }\n    [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select--box.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select, .mdc-select--box.sc-o-demo-bar-select   .mdc-select__native-control[dir=\"rtl\"].sc-o-demo-bar-select {\n      \n      padding-left: 26px;\n      \n      padding-right: 16px; }\n  .mdc-select--box.sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select {\n    \n    left: 16px;\n    \n    right: initial;\n    bottom: 12px;\n    line-height: 1.75rem; }\n    [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select--box.sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select, .mdc-select--box.sc-o-demo-bar-select   .mdc-floating-label[dir=\"rtl\"].sc-o-demo-bar-select {\n      \n      left: initial;\n      \n      right: 16px; }\n    .mdc-select--box.sc-o-demo-bar-select   .mdc-floating-label--float-above.sc-o-demo-bar-select {\n      -webkit-transform: translateY(-40%) scale(0.75, 0.75);\n      transform: translateY(-40%) scale(0.75, 0.75); }\n\n.mdc-select--outlined.sc-o-demo-bar-select {\n  height: 56px;\n  border: none;\n  background-position: right 10px center; }\n  .mdc-select--outlined.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-notched-outline__idle.sc-o-demo-bar-select {\n    border-color: rgba(0, 0, 0, 0.24); }\n  .mdc-select--outlined.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-notched-outline__path.sc-o-demo-bar-select {\n    stroke: rgba(0, 0, 0, 0.24); }\n  .mdc-select--outlined.sc-o-demo-bar-select:not(.mdc-select--disabled):not(.mdc-select__native-control:focus)   .mdc-select__native-control.sc-o-demo-bar-select:hover    ~ .mdc-notched-outline__idle.sc-o-demo-bar-select {\n    border-color: rgba(0, 0, 0, 0.87); }\n  .mdc-select--outlined.sc-o-demo-bar-select:not(.mdc-select--disabled):not(.mdc-select__native-control:focus)   .mdc-select__native-control.sc-o-demo-bar-select:hover    ~ .mdc-notched-outline.sc-o-demo-bar-select   .mdc-notched-outline__path.sc-o-demo-bar-select {\n    stroke: rgba(0, 0, 0, 0.87); }\n  .mdc-select--outlined.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select:focus    ~ .mdc-notched-outline.sc-o-demo-bar-select   .mdc-notched-outline__path.sc-o-demo-bar-select {\n    stroke-width: 2px; }\n  .mdc-select--outlined.sc-o-demo-bar-select:not(.mdc-select--disabled)   .mdc-select__native-control.sc-o-demo-bar-select:focus    ~ .mdc-notched-outline.sc-o-demo-bar-select   .mdc-notched-outline__path.sc-o-demo-bar-select {\n    stroke: #6200ee;\n    \n    stroke: var(--mdc-theme-primary, #6200ee); }\n  .mdc-select--outlined.sc-o-demo-bar-select   .mdc-floating-label--float-above.sc-o-demo-bar-select {\n    -webkit-transform: translateY(-130%) scale(0.75);\n    transform: translateY(-130%) scale(0.75); }\n  .mdc-select--outlined.sc-o-demo-bar-select   .mdc-floating-label--shake.sc-o-demo-bar-select {\n    -webkit-animation: mdc-floating-label-shake-float-above-text-field-outlined 250ms 1;\n    animation: mdc-floating-label-shake-float-above-text-field-outlined 250ms 1; }\n  .mdc-select--outlined.sc-o-demo-bar-select   .mdc-notched-outline.sc-o-demo-bar-select {\n    border-radius: 4px; }\n  .mdc-select--outlined.sc-o-demo-bar-select   .mdc-notched-outline__idle.sc-o-demo-bar-select {\n    border-radius: 4px; }\n  [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select--outlined.sc-o-demo-bar-select, .mdc-select--outlined[dir=\"rtl\"].sc-o-demo-bar-select {\n    background-position: left 10px center; }\n  .mdc-select--outlined.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select {\n    \n    padding-left: 16px;\n    \n    padding-right: 26px;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    padding-top: 12px;\n    padding-bottom: 12px;\n    border: none;\n    background-color: transparent;\n    z-index: 1; }\n    [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select--outlined.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select, .mdc-select--outlined.sc-o-demo-bar-select   .mdc-select__native-control[dir=\"rtl\"].sc-o-demo-bar-select {\n      \n      padding-left: 26px;\n      \n      padding-right: 16px; }\n  .mdc-select--outlined.sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select {\n    \n    left: 16px;\n    \n    right: initial;\n    position: absolute;\n    bottom: 20px; }\n    [dir=\"rtl\"].sc-o-demo-bar-select   .mdc-select--outlined.sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select, .mdc-select--outlined.sc-o-demo-bar-select   .mdc-floating-label[dir=\"rtl\"].sc-o-demo-bar-select {\n      \n      left: initial;\n      \n      right: 16px; }\n\n.mdc-select--disabled.sc-o-demo-bar-select {\n  background-image: url(\"data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23#000%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E\");\n  opacity: .38;\n  cursor: default;\n  pointer-events: none; }\n  .mdc-select--disabled.sc-o-demo-bar-select   .mdc-floating-label.sc-o-demo-bar-select {\n    color: rgba(0, 0, 0, 0.37); }\n  .mdc-select--disabled.sc-o-demo-bar-select   .mdc-line-ripple.sc-o-demo-bar-select {\n    display: none; }\n  .mdc-select--disabled.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select {\n    border-bottom-style: dotted; }\n  .mdc-select--disabled.mdc-select--box.sc-o-demo-bar-select {\n    background-color: #fafafa; }\n  .mdc-select--disabled.mdc-select--outlined.sc-o-demo-bar-select   .mdc-select__native-control.sc-o-demo-bar-select {\n    border-bottom-style: none; }\n  .mdc-select--disabled.mdc-select--outlined.sc-o-demo-bar-select   .mdc-notched-outline__idle.sc-o-demo-bar-select {\n    border-color: rgba(0, 0, 0, 0.16); }\n  .mdc-select--disabled.mdc-select--outlined.sc-o-demo-bar-select   .mdc-notched-outline__path.sc-o-demo-bar-select {\n    stroke: rgba(0, 0, 0, 0.16); }\n\n.sc-o-demo-bar-select-h {\n  z-index: 9999; }\n  .sc-o-demo-bar-select-h   .mdc-menu__items.sc-o-demo-bar-select {\n    background: var(--mdc-theme-primary, #efefef); }\n  .sc-o-demo-bar-select-h   .mdc-list.sc-o-demo-bar-select {\n    min-width: 30em; }\n  .sc-o-demo-bar-select-h   .mdc-select.sc-o-demo-bar-select {\n    min-width: 30em; }\n  .sc-o-demo-bar-select-h   .mdc-simple-menu.sc-o-demo-bar-select {\n    min-width: 30em; }\n  \@media only screen and (max-width: 780px) {\n    .sc-o-demo-bar-select-h   .mdc-list.sc-o-demo-bar-select {\n      min-width: 20em;\n      width: 80%; }\n    .sc-o-demo-bar-select-h   .mdc-select.sc-o-demo-bar-select {\n      min-width: 20em;\n      width: 80%; }\n    .sc-o-demo-bar-select-h   .mdc-simple-menu.sc-o-demo-bar-select {\n      min-width: 20em;\n      width: 80%; } }\n"; }
}

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses$5 = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized',
};

const strings$3 = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  ICON_SELECTOR: '.mdc-toolbar__icon',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change',
};

const numbers$2 = {
  MAX_TITLE_SIZE: 2.125,
  MIN_TITLE_SIZE: 1.25,
  TOOLBAR_ROW_HEIGHT: 64,
  TOOLBAR_ROW_MOBILE_HEIGHT: 56,
  TOOLBAR_MOBILE_BREAKPOINT: 600,
};

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCToolbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$5;
  }

  static get strings() {
    return strings$3;
  }

  static get numbers() {
    return numbers$2;
  }

  static get defaultAdapter() {
    return {
      hasClass: (/* className: string */) => /* boolean */ false,
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerScrollHandler: (/* handler: EventListener */) => {},
      deregisterScrollHandler: (/* handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      getViewportWidth: () => /* number */ 0,
      getViewportScrollY: () => /* number */ 0,
      getOffsetHeight: () => /* number */ 0,
      getFirstRowElementOffsetHeight: () => /* number */ 0,
      notifyChange: (/* evtData: {flexibleExpansionRatio: number} */) => {},
      setStyle: (/* property: string, value: string */) => {},
      setStyleForTitleElement: (/* property: string, value: string */) => {},
      setStyleForFlexibleRowElement: (/* property: string, value: string */) => {},
      setStyleForFixedAdjustElement: (/* property: string, value: string */) => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCToolbarFoundation.defaultAdapter, adapter));
    this.resizeHandler_ = () => this.checkRowHeight_();
    this.scrollHandler_ = () => this.updateToolbarStyles_();
    this.checkRowHeightFrame_ = 0;
    this.scrollFrame_ = 0;
    this.executedLastChange_ = false;

    this.calculations_ = {
      toolbarRowHeight: 0,
      // Calculated Height ratio. We use ratio to calculate corresponding heights in resize event.
      toolbarRatio: 0, // The ratio of toolbar height to row height
      flexibleExpansionRatio: 0, // The ratio of flexible space height to row height
      maxTranslateYRatio: 0, // The ratio of max toolbar move up distance to row height
      scrollThresholdRatio: 0, // The ratio of max scrollTop that we should listen to to row height
      // Derived Heights based on the above key ratios.
      toolbarHeight: 0,
      flexibleExpansionHeight: 0, // Flexible row minus toolbar height (derived)
      maxTranslateYDistance: 0, // When toolbar only fix last row (derived)
      scrollThreshold: 0,
    };
    // Toolbar fixed behavior
    // If toolbar is fixed
    this.fixed_ = false;
    // If fixed is targeted only at the last row
    this.fixedLastrow_ = false;
    // Toolbar flexible behavior
    // If the first row is flexible
    this.hasFlexibleRow_ = false;
    // If use the default behavior
    this.useFlexDefaultBehavior_ = false;
  }

  init() {
    this.fixed_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED);
    this.fixedLastrow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FIXED_LASTROW) & this.fixed_;
    this.hasFlexibleRow_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.TOOLBAR_ROW_FLEXIBLE);
    if (this.hasFlexibleRow_) {
      this.useFlexDefaultBehavior_ = this.adapter_.hasClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
    }
    this.initKeyRatio_();
    this.setKeyHeights_();
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

  updateAdjustElementStyles() {
    if (this.fixed_) {
      this.adapter_.setStyleForFixedAdjustElement('margin-top', `${this.calculations_.toolbarHeight}px`);
    }
  }

  getFlexibleExpansionRatio_(scrollTop) {
    // To prevent division by zero when there is no flexibleExpansionHeight
    const delta = 0.0001;
    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
  }

  checkRowHeight_() {
    cancelAnimationFrame(this.checkRowHeightFrame_);
    this.checkRowHeightFrame_ = requestAnimationFrame(() => this.setKeyHeights_());
  }

  setKeyHeights_() {
    const newToolbarRowHeight = this.getRowHeight_();
    if (newToolbarRowHeight !== this.calculations_.toolbarRowHeight) {
      this.calculations_.toolbarRowHeight = newToolbarRowHeight;
      this.calculations_.toolbarHeight = this.calculations_.toolbarRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.flexibleExpansionHeight =
        this.calculations_.flexibleExpansionRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.maxTranslateYDistance =
        this.calculations_.maxTranslateYRatio * this.calculations_.toolbarRowHeight;
      this.calculations_.scrollThreshold =
        this.calculations_.scrollThresholdRatio * this.calculations_.toolbarRowHeight;
      this.updateAdjustElementStyles();
      this.updateToolbarStyles_();
    }
  }

  updateToolbarStyles_() {
    cancelAnimationFrame(this.scrollFrame_);
    this.scrollFrame_ = requestAnimationFrame(() => {
      const scrollTop = this.adapter_.getViewportScrollY();
      const hasScrolledOutOfThreshold = this.scrolledOutOfThreshold_(scrollTop);

      if (hasScrolledOutOfThreshold && this.executedLastChange_) {
        return;
      }

      const flexibleExpansionRatio = this.getFlexibleExpansionRatio_(scrollTop);

      this.updateToolbarFlexibleState_(flexibleExpansionRatio);
      if (this.fixedLastrow_) {
        this.updateToolbarFixedState_(scrollTop);
      }
      if (this.hasFlexibleRow_) {
        this.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
      }
      this.executedLastChange_ = hasScrolledOutOfThreshold;
      this.adapter_.notifyChange({flexibleExpansionRatio: flexibleExpansionRatio});
    });
  }

  scrolledOutOfThreshold_(scrollTop) {
    return scrollTop > this.calculations_.scrollThreshold;
  }

  initKeyRatio_() {
    const toolbarRowHeight = this.getRowHeight_();
    const firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
    this.calculations_.maxTranslateYRatio =
      this.fixedLastrow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
    this.calculations_.scrollThresholdRatio =
      (this.fixedLastrow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
  }

  getRowHeight_() {
    const breakpoint = MDCToolbarFoundation.numbers.TOOLBAR_MOBILE_BREAKPOINT;
    return this.adapter_.getViewportWidth() < breakpoint ?
      MDCToolbarFoundation.numbers.TOOLBAR_ROW_MOBILE_HEIGHT : MDCToolbarFoundation.numbers.TOOLBAR_ROW_HEIGHT;
  }

  updateToolbarFlexibleState_(flexibleExpansionRatio) {
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    if (flexibleExpansionRatio === 1) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MAX);
    } else if (flexibleExpansionRatio === 0) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FLEXIBLE_MIN);
    }
  }

  updateToolbarFixedState_(scrollTop) {
    const translateDistance = Math.max(0, Math.min(
      scrollTop - this.calculations_.flexibleExpansionHeight,
      this.calculations_.maxTranslateYDistance));
    this.adapter_.setStyle('transform', `translateY(${-translateDistance}px)`);

    if (translateDistance === this.calculations_.maxTranslateYDistance) {
      this.adapter_.addClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    } else {
      this.adapter_.removeClass(MDCToolbarFoundation.cssClasses.FIXED_AT_LAST_ROW);
    }
  }

  updateFlexibleRowElementStyles_(flexibleExpansionRatio) {
    if (this.fixed_) {
      const height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
      this.adapter_.setStyleForFlexibleRowElement('height',
        `${height + this.calculations_.toolbarRowHeight}px`);
    }
    if (this.useFlexDefaultBehavior_) {
      this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
    }
  }

  updateElementStylesDefaultBehavior_(flexibleExpansionRatio) {
    const maxTitleSize = MDCToolbarFoundation.numbers.MAX_TITLE_SIZE;
    const minTitleSize = MDCToolbarFoundation.numbers.MIN_TITLE_SIZE;
    const currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;

    this.adapter_.setStyleForTitleElement('font-size', `${currentTitleSize}rem`);
  }
}

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCToolbar extends MDCComponent {
  static attachTo(root) {
    return new MDCToolbar(root);
  }

  get firstRowElement_() {
    return this.root_.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR);
  }

  get titleElement_() {
    return this.root_.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR);
  }

  set fixedAdjustElement(fixedAdjustElement) {
    this.fixedAdjustElement_ = fixedAdjustElement;
    this.foundation_.updateAdjustElementStyles();
  }

  get fixedAdjustElement() {
    return this.fixedAdjustElement_;
  }

  initialize() {
    this.ripples_ = [].map.call(this.root_.querySelectorAll(MDCToolbarFoundation.strings.ICON_SELECTOR), (icon) => {
      const ripple = MDCRipple.attachTo(icon);
      ripple.unbounded = true;
      return ripple;
    });
  }

  destroy() {
    this.ripples_.forEach((ripple) => {
      ripple.destroy();
    });
    super.destroy();
  }


  getDefaultFoundation() {
    return new MDCToolbarFoundation({
      hasClass: (className) => this.root_.classList.contains(className),
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerScrollHandler: (handler) => window.addEventListener('scroll', handler),
      deregisterScrollHandler: (handler) => window.removeEventListener('scroll', handler),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => this.root_.offsetHeight,
      getFirstRowElementOffsetHeight: () => this.firstRowElement_.offsetHeight,
      notifyChange: (evtData) => this.emit(MDCToolbarFoundation.strings.CHANGE_EVENT, evtData),
      setStyle: (property, value) => this.root_.style.setProperty(property, value),
      setStyleForTitleElement: (property, value) => this.titleElement_.style.setProperty(property, value),
      setStyleForFlexibleRowElement: (property, value) => this.firstRowElement_.style.setProperty(property, value),
      setStyleForFixedAdjustElement: (property, value) => {
        if (this.fixedAdjustElement) {
          this.fixedAdjustElement.style.setProperty(property, value);
        }
      },
    });
  }
}

class DemoToolbarComponent {
    componentDidLoad() {
        this.rootEl = this.el.shadowRoot.querySelector('.mdc-toolbar');
        this.toolbar = new MDCToolbar(this.rootEl);
        this.toolbar.fixedAdjustElement = this.el.shadowRoot.querySelector('.mdc-toolbar-fixed-adjust');
    }
    componentDidUnload() {
        this.toolbar.destroy();
    }
    render() {
        return (h("div", { class: "mdc-typography" },
            h("header", { class: "mdc-toolbar mdc-toolbar--fixed" },
                h("div", { class: "mdc-toolbar__row" },
                    h("section", { id: "left-panel", class: "mdc-toolbar__section mdc-toolbar__section--align-start" },
                        h("h3", { class: "mdc-typography--subheading2" }, this.name),
                        h("slot", { name: "left" })),
                    h("section", { id: "center-panel", class: "mdc-toolbar__section" },
                        h("slot", { name: "center" })),
                    h("section", { id: "right-panel", class: "mdc-toolbar__section mdc-toolbar__section--align-end", role: "toolbar" },
                        h("slot", { name: "right" }))),
                h("slot", { name: "base" })),
            h("main", { class: "mdc-toolbar-fixed-adjust" })));
    }
    static get is() { return "o-demo-bar-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "options": {
            "type": "Any",
            "attr": "options"
        }
    }; }
    static get style() { return "\n.sc-o-demo-bar-toolbar-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.mdc-toolbar.sc-o-demo-bar-toolbar {\n  background-color: #6200ee;\n  \n  background-color: var(--mdc-theme-primary, #6200ee);\n  color: white;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 100%; }\n  .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar {\n    color: white; }\n    .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar::before, .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar::after {\n      background-color: white; }\n    .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar:hover::before {\n      opacity: 0.08; }\n    .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar:not(.mdc-ripple-upgraded):focus::before, .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.mdc-ripple-upgraded--background-focused.sc-o-demo-bar-toolbar::before {\n      -webkit-transition-duration: 75ms;\n      transition-duration: 75ms;\n      opacity: 0.24; }\n    .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar:not(.mdc-ripple-upgraded)::after {\n      -webkit-transition: opacity 150ms linear;\n      transition: opacity 150ms linear; }\n    .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.sc-o-demo-bar-toolbar:not(.mdc-ripple-upgraded):active::after {\n      -webkit-transition-duration: 75ms;\n      transition-duration: 75ms;\n      opacity: 0.32; }\n    .mdc-toolbar.sc-o-demo-bar-toolbar   .mdc-toolbar__icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar {\n      --mdc-ripple-fg-opacity: 0.32; }\n  .mdc-toolbar__row.sc-o-demo-bar-toolbar {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    width: 100%;\n    height: auto;\n    min-height: 64px; }\n    \@media (max-width: 959px) and (orientation: landscape) {\n      .mdc-toolbar__row.sc-o-demo-bar-toolbar {\n        min-height: 48px; } }\n    \@media (max-width: 599px) {\n      .mdc-toolbar__row.sc-o-demo-bar-toolbar {\n        min-height: 56px; } }\n  .mdc-toolbar__section.sc-o-demo-bar-toolbar {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n    -ms-flex-align: start;\n    align-items: start;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    min-width: 0;\n    height: 100%;\n    padding: 8px;\n    z-index: 1; }\n    \@media (max-width: 959px) and (orientation: landscape) {\n      .mdc-toolbar__section.sc-o-demo-bar-toolbar {\n        padding: 0; } }\n    \@media (max-width: 599px) {\n      .mdc-toolbar__section.sc-o-demo-bar-toolbar {\n        padding: 4px 0; } }\n    .mdc-toolbar__section--align-start.sc-o-demo-bar-toolbar {\n      \n      padding-left: 12px;\n      \n      padding-right: 0;\n      -webkit-box-pack: start;\n      -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n      justify-content: flex-start;\n      -webkit-box-ordinal-group: 0;\n      -webkit-order: -1;\n      -ms-flex-order: -1;\n      order: -1; }\n      [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__section--align-start.sc-o-demo-bar-toolbar, .mdc-toolbar__section--align-start[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n        \n        padding-left: 0;\n        \n        padding-right: 12px; }\n      \@media (max-width: 959px) and (orientation: landscape) {\n        .mdc-toolbar__section--align-start.sc-o-demo-bar-toolbar {\n          \n          padding-left: 4px;\n          \n          padding-right: 0; }\n          [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__section--align-start.sc-o-demo-bar-toolbar, .mdc-toolbar__section--align-start[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n            \n            padding-left: 0;\n            \n            padding-right: 4px; } }\n      \@media (max-width: 599px) {\n        .mdc-toolbar__section--align-start.sc-o-demo-bar-toolbar {\n          \n          padding-left: 4px;\n          \n          padding-right: 0; }\n          [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__section--align-start.sc-o-demo-bar-toolbar, .mdc-toolbar__section--align-start[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n            \n            padding-left: 0;\n            \n            padding-right: 4px; } }\n    .mdc-toolbar__section--align-end.sc-o-demo-bar-toolbar {\n      \n      padding-left: 0;\n      \n      padding-right: 12px;\n      -webkit-box-pack: end;\n      -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n      justify-content: flex-end;\n      -webkit-box-ordinal-group: 2;\n      -webkit-order: 1;\n      -ms-flex-order: 1;\n      order: 1; }\n      [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__section--align-end.sc-o-demo-bar-toolbar, .mdc-toolbar__section--align-end[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n        \n        padding-left: 12px;\n        \n        padding-right: 0; }\n      \@media (max-width: 959px) and (orientation: landscape) {\n        .mdc-toolbar__section--align-end.sc-o-demo-bar-toolbar {\n          \n          padding-left: 0;\n          \n          padding-right: 4px; }\n          [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__section--align-end.sc-o-demo-bar-toolbar, .mdc-toolbar__section--align-end[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n            \n            padding-left: 4px;\n            \n            padding-right: 0; } }\n      \@media (max-width: 599px) {\n        .mdc-toolbar__section--align-end.sc-o-demo-bar-toolbar {\n          \n          padding-left: 0;\n          \n          padding-right: 4px; }\n          [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__section--align-end.sc-o-demo-bar-toolbar, .mdc-toolbar__section--align-end[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n            \n            padding-left: 4px;\n            \n            padding-right: 0; } }\n  .mdc-toolbar__title.sc-o-demo-bar-toolbar {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.25rem;\n    line-height: 2rem;\n    font-weight: 500;\n    letter-spacing: 0.0125em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    \n    margin-left: 24px;\n    \n    margin-right: 0;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    align-self: center;\n    padding: 12px 0;\n    line-height: 1.5rem;\n    z-index: 1; }\n    [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__title.sc-o-demo-bar-toolbar, .mdc-toolbar__title[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n      \n      margin-left: 0;\n      \n      margin-right: 24px; }\n  .mdc-toolbar__icon.sc-o-demo-bar-toolbar, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar {\n    --mdc-ripple-fg-size: 0;\n    --mdc-ripple-left: 0;\n    --mdc-ripple-top: 0;\n    --mdc-ripple-fg-scale: 1;\n    --mdc-ripple-fg-translate-end: 0;\n    --mdc-ripple-fg-translate-start: 0;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    will-change: transform, opacity;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n    -ms-flex-align: start;\n    align-items: start;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    width: 48px;\n    height: 48px;\n    padding: 12px;\n    border: none;\n    outline: none;\n    background-color: transparent;\n    fill: currentColor;\n    color: inherit;\n    text-decoration: none;\n    cursor: pointer; }\n    .mdc-toolbar__icon.sc-o-demo-bar-toolbar::before, .mdc-toolbar__icon.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar::before, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar::after {\n      position: absolute;\n      border-radius: 50%;\n      opacity: 0;\n      pointer-events: none;\n      content: \"\"; }\n    .mdc-toolbar__icon.sc-o-demo-bar-toolbar::before, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar::before {\n      -webkit-transition: opacity 15ms linear;\n      transition: opacity 15ms linear;\n      z-index: 1; }\n    .mdc-toolbar__icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::before, .mdc-toolbar__menu-icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::before {\n      -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n      transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n    .mdc-toolbar__icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::after {\n      top: 0;\n      \n      left: 0;\n      -webkit-transform: scale(0);\n      transform: scale(0);\n      -webkit-transform-origin: center center;\n      transform-origin: center center; }\n    .mdc-toolbar__icon.mdc-ripple-upgraded--unbounded.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.mdc-ripple-upgraded--unbounded.sc-o-demo-bar-toolbar::after {\n      top: var(--mdc-ripple-top, 0);\n      \n      left: var(--mdc-ripple-left, 0); }\n    .mdc-toolbar__icon.mdc-ripple-upgraded--foreground-activation.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.mdc-ripple-upgraded--foreground-activation.sc-o-demo-bar-toolbar::after {\n      -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n      animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n    .mdc-toolbar__icon.mdc-ripple-upgraded--foreground-deactivation.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.mdc-ripple-upgraded--foreground-deactivation.sc-o-demo-bar-toolbar::after {\n      -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n      animation: 150ms mdc-ripple-fg-opacity-out;\n      -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n      transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n    .mdc-toolbar__icon.sc-o-demo-bar-toolbar::before, .mdc-toolbar__icon.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar::before, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar::after {\n      top: calc(50% - 50%);\n      \n      left: calc(50% - 50%);\n      width: 100%;\n      height: 100%; }\n    .mdc-toolbar__icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::before, .mdc-toolbar__icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::before, .mdc-toolbar__menu-icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::after {\n      top: var(--mdc-ripple-top, calc(50% - 50%));\n      \n      left: var(--mdc-ripple-left, calc(50% - 50%));\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: var(--mdc-ripple-fg-size, 100%); }\n    .mdc-toolbar__icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::after, .mdc-toolbar__menu-icon.mdc-ripple-upgraded.sc-o-demo-bar-toolbar::after {\n      width: var(--mdc-ripple-fg-size, 100%);\n      height: var(--mdc-ripple-fg-size, 100%); }\n\n.mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar    + .mdc-toolbar__title.sc-o-demo-bar-toolbar {\n  \n  margin-left: 8px;\n  \n  margin-right: 0; }\n  [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar    + .mdc-toolbar__title.sc-o-demo-bar-toolbar, .mdc-toolbar__menu-icon.sc-o-demo-bar-toolbar    + .mdc-toolbar__title[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n    \n    margin-left: 0;\n    \n    margin-right: 8px; }\n\n\@media (max-width: 599px) {\n  .mdc-toolbar__title.sc-o-demo-bar-toolbar {\n    \n    margin-left: 16px;\n    \n    margin-right: 0; }\n    [dir=\"rtl\"].sc-o-demo-bar-toolbar   .mdc-toolbar__title.sc-o-demo-bar-toolbar, .mdc-toolbar__title[dir=\"rtl\"].sc-o-demo-bar-toolbar {\n      \n      margin-left: 0;\n      \n      margin-right: 16px; } }\n\n.mdc-toolbar--fixed.sc-o-demo-bar-toolbar {\n  -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 4; }\n\n.mdc-toolbar--flexible.sc-o-demo-bar-toolbar {\n  --mdc-toolbar-ratio-to-extend-flexible: 4; }\n  .mdc-toolbar--flexible.sc-o-demo-bar-toolbar   .mdc-toolbar__row.sc-o-demo-bar-toolbar:first-child {\n    height: 256px;\n    height: calc(64px * var(--mdc-toolbar-ratio-to-extend-flexible, 4)); }\n    \@media (max-width: 599px) {\n      .mdc-toolbar--flexible.sc-o-demo-bar-toolbar   .mdc-toolbar__row.sc-o-demo-bar-toolbar:first-child {\n        height: 224px;\n        height: calc(56px * var(--mdc-toolbar-ratio-to-extend-flexible, 4)); } }\n    .mdc-toolbar--flexible.sc-o-demo-bar-toolbar   .mdc-toolbar__row.sc-o-demo-bar-toolbar:first-child::after {\n      position: absolute;\n      content: \"\"; }\n  .mdc-toolbar--flexible-default-behavior.sc-o-demo-bar-toolbar   .mdc-toolbar__title.sc-o-demo-bar-toolbar {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.25rem;\n    line-height: 2rem;\n    font-weight: 500;\n    letter-spacing: 0.0125em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    -webkit-align-self: flex-end;\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n    line-height: 1.5rem; }\n  .mdc-toolbar--flexible-default-behavior.sc-o-demo-bar-toolbar   .mdc-toolbar__row.sc-o-demo-bar-toolbar:first-child::after {\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: opacity .2s ease;\n    transition: opacity .2s ease;\n    opacity: 1; }\n  .mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized.sc-o-demo-bar-toolbar   .mdc-toolbar__row.sc-o-demo-bar-toolbar:first-child::after {\n    opacity: 0; }\n  .mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized.sc-o-demo-bar-toolbar   .mdc-toolbar__title.sc-o-demo-bar-toolbar {\n    font-weight: 500; }\n\n.mdc-toolbar--waterfall.mdc-toolbar--fixed.sc-o-demo-bar-toolbar {\n  -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  -webkit-transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  will-change: box-shadow; }\n  .mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--flexible-space-minimized.sc-o-demo-bar-toolbar {\n    -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--flexible-space-minimized.sc-o-demo-bar-toolbar {\n    -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--fixed-at-last-row.sc-o-demo-bar-toolbar {\n    -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n\n.mdc-toolbar-fixed-adjust.sc-o-demo-bar-toolbar {\n  margin-top: 64px; }\n  \@media (max-width: 959px) and (max-height: 599px) {\n    .mdc-toolbar-fixed-adjust.sc-o-demo-bar-toolbar {\n      margin-top: 48px; } }\n  \@media (max-width: 599px) {\n    .mdc-toolbar-fixed-adjust.sc-o-demo-bar-toolbar {\n      margin-top: 56px; } }\n\n.mdc-toolbar__section--shrink-to-fit.sc-o-demo-bar-toolbar {\n  -webkit-box-flex: 0;\n  -webkit-flex: none;\n  -ms-flex: none;\n  flex: none; }\n\n.mdc-typography.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased; }\n\n.mdc-typography--headline1.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 6rem;\n  line-height: 6rem;\n  font-weight: 300;\n  letter-spacing: -0.01562em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline2.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.75rem;\n  line-height: 3.75rem;\n  font-weight: 300;\n  letter-spacing: -0.00833em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline3.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3rem;\n  line-height: 3.125rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline4.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: 0.00735em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline5.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--headline6.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--subtitle1.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--subtitle2.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.375rem;\n  font-weight: 500;\n  letter-spacing: 0.00714em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--body1.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.03125em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--body2.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--caption.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.03333em;\n  text-decoration: inherit;\n  text-transform: inherit; }\n\n.mdc-typography--button.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase; }\n\n.mdc-typography--overline.sc-o-demo-bar-toolbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.16667em;\n  text-decoration: none;\n  text-transform: uppercase; }\n\n.sc-o-demo-bar-toolbar-h   section.sc-o-demo-bar-toolbar {\n  margin: 0 1.5em 0 1.2em;\n  transition: opacity .25s ease-in-out;\n  -moz-transition: opacity .25s ease-in-out;\n  -webkit-transition: opacity .25s ease-in-out; }\n  .sc-o-demo-bar-toolbar-h   section.sc-o-demo-bar-toolbar   .mdc-typography--subheading2.sc-o-demo-bar-toolbar {\n    color: var(--mdc-theme-text-primary-on-primary, black);\n    font-size: 1.2rem;\n    text-overflow: ellipsis; }\n\n\@media only screen and (max-width: 700px) {\n  .sc-o-demo-bar-toolbar-h   #left-panel.sc-o-demo-bar-toolbar {\n    display: none; }\n  .sc-o-demo-bar-toolbar-h   #right-panel.sc-o-demo-bar-toolbar {\n    display: none; } }\n"; }
}

class Devices {
}
Devices.iphoneX = (h("div", { class: "marvel-device iphone-x" },
    h("div", { class: "notch" },
        h("div", { class: "camera" }),
        h("div", { class: "speaker" })),
    h("div", { class: "top-bar" }),
    h("div", { class: "sleep" }),
    h("div", { class: "bottom-bar" }),
    h("div", { class: "volume" }),
    h("div", { class: "overflow" },
        h("div", { class: "shadow shadow--tr" }),
        h("div", { class: "shadow shadow--tl" }),
        h("div", { class: "shadow shadow--br" }),
        h("div", { class: "shadow shadow--bl" })),
    h("div", { class: "inner-shadow" }),
    h("div", { class: "screen" },
        h("slot", { name: "screen" }))));
Devices.iphone8 = (h("div", { class: "marvel-device iphone8 silver" },
    h("div", { class: "top-bar" }),
    h("div", { class: "sleep" }),
    h("div", { class: "volume" }),
    h("div", { class: "camera" }),
    h("div", { class: "sensor" }),
    h("div", { class: "speaker" }),
    h("div", { class: "screen" },
        h("slot", { name: "screen" })),
    h("div", { class: "home" }),
    h("div", { class: "bottom-bar" })));
Devices.note8 = (h("div", { class: "marvel-device note8" },
    h("div", { class: "inner" }),
    h("div", { class: "overflow" },
        h("div", { class: "shadow" })),
    h("div", { class: "speaker" }),
    h("div", { class: "sensors" }),
    h("div", { class: "more-sensors" }),
    h("div", { class: "sleep" }),
    h("div", { class: "volume" }),
    h("div", { class: "camera" }),
    h("div", { class: "screen" },
        h("slot", { name: "screen" }))));
Devices.nexus5 = (h("div", { class: "marvel-device nexus5" },
    h("div", { class: "top-bar" }),
    h("div", { class: "sleep" }),
    h("div", { class: "volume" }),
    h("div", { class: "camera" }),
    h("div", { class: "screen" },
        h("slot", { name: "screen" }))));
Devices.lumia920 = (h("div", { class: "marvel-device lumia920 yellow" },
    h("div", { class: "top-bar" }),
    h("div", { class: "volume" }),
    h("div", { class: "camera" }),
    h("div", { class: "speaker" }),
    h("div", { class: "screen" },
        h("slot", { name: "screen" }))));

class DemoDevicesComponent {
    constructor() {
        this.selectedDevice = 0;
        this.deviceArray = [Devices.iphoneX, Devices.iphone8, Devices.note8, Devices.nexus5, Devices.lumia920];
    }
    componentWillUpdate() {
        window.requestAnimationFrame(() => this._sizeFrame());
    }
    componentDidLoad() {
        this.evtListenerRotate = document.addEventListener('rotate-device', this.rotateDevice.bind(this));
        this.evtListenerDeviceChange = document.addEventListener('change-device', this.changeDevice.bind(this));
    }
    componentDidUnload() {
        document.removeEventListener('rotate-device', this.evtListenerRotate);
        document.removeEventListener('rotate-device', this.evtListenerDeviceChange);
    }
    _sizeFrame() {
        const slotEl = this.el.querySelector('[slot=screen]');
        const iFrameEl = this.el.querySelector('iframe');
        iFrameEl.width = `${slotEl.clientWidth}px`;
        iFrameEl.height = `${slotEl.clientHeight}px`;
        console.log('SlotW', slotEl.clientWidth);
        console.log('framW', iFrameEl.width);
        console.log('SlotH', slotEl.clientHeight);
        console.log('framH', iFrameEl.height);
    }
    changeDevice(evt) {
        if (evt.detail === 'navigate-next') {
            this.selectedDevice < 4 ? this.selectedDevice++ : this.selectedDevice = 0;
        }
        else if (evt.detail === 'navigate-before') {
            this.selectedDevice > 0 ? this.selectedDevice-- : this.selectedDevice = 4;
        }
    }
    rotateDevice() {
        this.el.forceUpdate();
        this.el.shadowRoot.querySelector('.marvel-device').classList.toggle('landscape');
    }
    render() {
        return this.deviceArray[this.selectedDevice];
    }
    static get is() { return "o-demo-devices"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "orientation": {
            "type": String,
            "attr": "orientation"
        },
        "selectedDevice": {
            "state": true
        }
    }; }
    static get style() { return "\n.sc-o-demo-devices-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices {\n  display: inline-block;\n  position: relative;\n  -webkit-box-sizing: content-box !important;\n  box-sizing: content-box !important; }\n\n.sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices   .screen.sc-o-demo-devices {\n  width: 100%;\n  position: relative;\n  height: 100%;\n  z-index: 3;\n  background: white;\n  overflow: hidden;\n  display: block;\n  border-radius: 1px;\n  -webkit-box-shadow: 0 0 0 3px #111;\n  box-shadow: 0 0 0 3px #111; }\n\n.sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  height: 3px;\n  background: black;\n  width: 100%;\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices   .middle-bar.sc-o-demo-devices {\n  width: 3px;\n  height: 4px;\n  top: 0px;\n  left: 90px;\n  background: black;\n  position: absolute; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices {\n  width: 375px;\n  height: 667px;\n  padding: 105px 24px;\n  background: #d9dbdc;\n  border-radius: 56px;\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices:before {\n  width: calc(100% - 12px);\n  height: calc(100% - 12px);\n  position: absolute;\n  top: 6px;\n  content: '';\n  left: 6px;\n  border-radius: 50px;\n  background: #f8f8f8;\n  z-index: 1; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices:after {\n  width: calc(100% - 16px);\n  height: calc(100% - 16px);\n  position: absolute;\n  top: 8px;\n  content: '';\n  left: 8px;\n  border-radius: 48px;\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #fff;\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #fff;\n  z-index: 2; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .home.sc-o-demo-devices {\n  border-radius: 100%;\n  width: 68px;\n  height: 68px;\n  position: absolute;\n  left: 50%;\n  margin-left: -34px;\n  bottom: 22px;\n  z-index: 3;\n  background: #303233;\n  background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .home.sc-o-demo-devices:before {\n  background: #f8f8f8;\n  position: absolute;\n  content: '';\n  border-radius: 100%;\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  top: 4px;\n  left: 4px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  height: 14px;\n  background: #bfbfc0;\n  position: absolute;\n  top: 68px;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  height: 14px;\n  background: #bfbfc0;\n  position: absolute;\n  bottom: 68px;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  position: absolute;\n  top: 190px;\n  right: -4px;\n  width: 4px;\n  height: 66px;\n  border-radius: 0px 2px 2px 0px;\n  background: #d9dbdc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  position: absolute;\n  left: -4px;\n  top: 188px;\n  z-index: 0;\n  height: 66px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: #d9dbdc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  position: absolute;\n  left: 2px;\n  top: -78px;\n  height: 40px;\n  width: 2px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  position: absolute;\n  left: 0px;\n  top: 82px;\n  height: 66px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 12px;\n  height: 12px;\n  position: absolute;\n  top: 24px;\n  left: 50%;\n  margin-left: -6px;\n  border-radius: 100%;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  top: 49px;\n  left: 134px;\n  z-index: 3;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  background: #292728;\n  width: 70px;\n  height: 6px;\n  position: absolute;\n  top: 54px;\n  left: 50%;\n  margin-left: -35px;\n  border-radius: 6px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.gold.sc-o-demo-devices {\n  background: #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.gold.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8.gold.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: white; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.gold.sc-o-demo-devices   .sleep.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8.gold.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  background: #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.gold.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #cebba9;\n  background: linear-gradient(135deg, #cebba9 0%, #f9e7d3 50%, #cebba9 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices {\n  background: #464646;\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7);\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices:before {\n  background: #080808; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices:after {\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #212121;\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #212121; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: #212121; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #464646; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #080808; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #080808;\n  background: linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.black.sc-o-demo-devices   .home.sc-o-demo-devices:before {\n  background: #080808; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices {\n  padding: 24px 105px;\n  height: 375px;\n  width: 667px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  top: 100%;\n  border-radius: 0px 0px 2px 2px;\n  right: 190px;\n  height: 4px;\n  width: 66px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 66px;\n  height: 4px;\n  top: -4px;\n  left: calc(100% - 188px - 66px);\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  width: 40px;\n  height: 2px;\n  top: 2px;\n  right: -78px;\n  left: auto;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  left: -82px;\n  width: 66px;\n  height: 4px;\n  top: 0;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  width: 14px;\n  height: 100%;\n  left: calc(100% - 68px -  14px);\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  width: 14px;\n  height: 100%;\n  left: 68px;\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  top: 50%;\n  margin-top: -34px;\n  margin-left: 0;\n  left: 22px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  top: 134px;\n  left: calc(100% - 49px - 16px); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 70px;\n  width: 6px;\n  left: calc(100% - 54px - 6px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -35px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  left: calc(100% - 32px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -5px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices {\n  width: 414px;\n  height: 736px;\n  padding: 112px 26px;\n  background: #d9dbdc;\n  border-radius: 56px;\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2);\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices:before {\n  width: calc(100% - 12px);\n  height: calc(100% - 12px);\n  position: absolute;\n  top: 6px;\n  content: '';\n  left: 6px;\n  border-radius: 50px;\n  background: #f8f8f8;\n  z-index: 1; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices:after {\n  width: calc(100% - 16px);\n  height: calc(100% - 16px);\n  position: absolute;\n  top: 8px;\n  content: '';\n  left: 8px;\n  border-radius: 48px;\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #fff;\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #fff;\n  z-index: 2; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .home.sc-o-demo-devices {\n  border-radius: 100%;\n  width: 68px;\n  height: 68px;\n  position: absolute;\n  left: 50%;\n  margin-left: -34px;\n  bottom: 24px;\n  z-index: 3;\n  background: #303233;\n  background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .home.sc-o-demo-devices:before {\n  background: #f8f8f8;\n  position: absolute;\n  content: '';\n  border-radius: 100%;\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  top: 4px;\n  left: 4px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  height: 14px;\n  background: #bfbfc0;\n  position: absolute;\n  top: 68px;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  height: 14px;\n  background: #bfbfc0;\n  position: absolute;\n  bottom: 68px;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  position: absolute;\n  top: 190px;\n  right: -4px;\n  width: 4px;\n  height: 66px;\n  border-radius: 0px 2px 2px 0px;\n  background: #d9dbdc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  position: absolute;\n  left: -4px;\n  top: 188px;\n  z-index: 0;\n  height: 66px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: #d9dbdc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  position: absolute;\n  left: 2px;\n  top: -78px;\n  height: 40px;\n  width: 2px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  position: absolute;\n  left: 0px;\n  top: 82px;\n  height: 66px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 12px;\n  height: 12px;\n  position: absolute;\n  top: 29px;\n  left: 50%;\n  margin-left: -6px;\n  border-radius: 100%;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 16px;\n  height: 16px;\n  position: absolute;\n  top: 54px;\n  left: 154px;\n  z-index: 3;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  background: #292728;\n  width: 70px;\n  height: 6px;\n  position: absolute;\n  top: 59px;\n  left: 50%;\n  margin-left: -35px;\n  border-radius: 6px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.gold.sc-o-demo-devices {\n  background: #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.gold.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8plus.gold.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: white; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.gold.sc-o-demo-devices   .sleep.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8plus.gold.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  background: #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.gold.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #cebba9;\n  background: linear-gradient(135deg, #cebba9 0%, #f9e7d3 50%, #cebba9 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices {\n  background: #464646;\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7);\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.7); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices:before {\n  background: #080808; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices:after {\n  -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #212121;\n  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 6px 3px #212121; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: #212121; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #464646; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #080808; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #080808;\n  background: linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.black.sc-o-demo-devices   .home.sc-o-demo-devices:before {\n  background: #080808; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices {\n  padding: 26px 112px;\n  height: 414px;\n  width: 736px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  top: 100%;\n  border-radius: 0px 0px 2px 2px;\n  right: 190px;\n  height: 4px;\n  width: 66px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 66px;\n  height: 4px;\n  top: -4px;\n  left: calc(100% - 188px - 66px);\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  width: 40px;\n  height: 2px;\n  top: 2px;\n  right: -78px;\n  left: auto;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  left: -82px;\n  width: 66px;\n  height: 4px;\n  top: 0;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  width: 14px;\n  height: 100%;\n  left: calc(100% - 68px -  14px);\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  width: 14px;\n  height: 100%;\n  left: 68px;\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  top: 50%;\n  margin-top: -34px;\n  margin-left: 0;\n  left: 24px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  top: 154px;\n  left: calc(100% - 54px - 16px); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 70px;\n  width: 6px;\n  left: calc(100% - 59px - 6px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -35px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone8plus.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  left: calc(100% - 29px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -5px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices {\n  padding: 105px 22px;\n  background: #2c2b2c;\n  width: 320px;\n  height: 568px;\n  border-radius: 50px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices:before {\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  position: absolute;\n  top: 4px;\n  content: '';\n  left: 4px;\n  border-radius: 46px;\n  background: #1e1e1e;\n  z-index: 1; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .sleep.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  position: absolute;\n  top: -4px;\n  right: 60px;\n  width: 60px;\n  height: 4px;\n  border-radius: 2px 2px 0px 0px;\n  background: #282727; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  position: absolute;\n  left: -4px;\n  top: 180px;\n  z-index: 0;\n  height: 27px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: #282727; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .volume.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  position: absolute;\n  left: 0px;\n  top: -75px;\n  height: 35px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .volume.sc-o-demo-devices:after, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  position: absolute;\n  left: 0px;\n  bottom: -64px;\n  height: 27px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .camera.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 32px;\n  left: 50%;\n  margin-left: -5px;\n  border-radius: 5px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .sensor.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 60px;\n  left: 160px;\n  z-index: 3;\n  margin-left: -32px;\n  border-radius: 5px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .speaker.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  background: #292728;\n  width: 64px;\n  height: 10px;\n  position: absolute;\n  top: 60px;\n  left: 50%;\n  margin-left: -32px;\n  border-radius: 5px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices {\n  padding: 22px 105px;\n  height: 320px;\n  width: 568px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  right: -4px;\n  top: calc(100% - 120px);\n  height: 60px;\n  width: 4px;\n  border-radius: 0px 2px 2px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 27px;\n  height: 4px;\n  top: -4px;\n  left: calc(100% - 180px);\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  width: 35px;\n  height: 4px;\n  top: 0px;\n  right: -75px;\n  left: auto;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  bottom: 0px;\n  left: -64px;\n  z-index: 999;\n  height: 4px;\n  width: 27px;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  top: 160px;\n  left: calc(100% - 60px);\n  margin-left: 0px;\n  margin-top: -32px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 64px;\n  width: 10px;\n  left: calc(100% - 60px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -32px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  left: calc(100% - 32px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -5px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .home.sc-o-demo-devices {\n  border-radius: 36px;\n  width: 68px;\n  -webkit-box-shadow: inset 0 0 0 4px #2c2b2c;\n  box-shadow: inset 0 0 0 4px #2c2b2c;\n  height: 68px;\n  position: absolute;\n  left: 50%;\n  margin-left: -34px;\n  bottom: 19px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  top: 70px;\n  position: absolute;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  bottom: 70px;\n  position: absolute;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  left: 19px;\n  bottom: 50%;\n  margin-bottom: -34px;\n  margin-left: 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  left: 70px;\n  top: 0px;\n  width: 3px;\n  height: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.landscape.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  right: 70px;\n  left: auto;\n  bottom: 0px;\n  width: 3px;\n  height: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices {\n  background: #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices:before {\n  background: #fcfcfc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #d6d6d6; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: #eaebec; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.silver.sc-o-demo-devices   .home.sc-o-demo-devices {\n  -webkit-box-shadow: inset 0 0 0 4px #bcbcbc;\n  box-shadow: inset 0 0 0 4px #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices {\n  background: #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices:before {\n  background: #fcfcfc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: white; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5s.gold.sc-o-demo-devices   .home.sc-o-demo-devices {\n  -webkit-box-shadow: inset 0 0 0 4px #f9e7d3;\n  box-shadow: inset 0 0 0 4px #f9e7d3; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices {\n  background: white;\n  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #242324;\n  border-radius: 36px;\n  width: 68px;\n  height: 68px;\n  z-index: 3;\n  position: absolute;\n  left: 50%;\n  margin-left: -34px;\n  bottom: 19px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .home.sc-o-demo-devices:after {\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 4px;\n  position: absolute;\n  display: block;\n  content: '';\n  top: 50%;\n  left: 50%;\n  margin-top: -11px;\n  margin-left: -11px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  left: 19px;\n  bottom: 50%;\n  margin-bottom: -34px;\n  margin-left: 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #dddddd; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.red.sc-o-demo-devices {\n  background: #f96b6c; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.red.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.red.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #ed5758; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.yellow.sc-o-demo-devices {\n  background: #f2dc60; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.yellow.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.yellow.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #e5ce4c; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.green.sc-o-demo-devices {\n  background: #97e563; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.green.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.green.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #85d94d; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.blue.sc-o-demo-devices {\n  background: #33a2db; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone5c.blue.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone5c.blue.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #2694cd; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices {\n  padding: 129px 27px;\n  width: 320px;\n  height: 480px;\n  background: #686868;\n  border-radius: 54px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices:before {\n  content: '';\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  z-index: 1;\n  border-radius: 50px;\n  background: #1e1e1e; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  top: 60px;\n  position: absolute;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  bottom: 90px;\n  position: absolute;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 72px;\n  left: 134px;\n  z-index: 3;\n  margin-left: -5px;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  background: #292728;\n  width: 64px;\n  height: 10px;\n  position: absolute;\n  top: 72px;\n  left: 50%;\n  z-index: 3;\n  margin-left: -32px;\n  border-radius: 5px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  background: #292728;\n  width: 40px;\n  height: 10px;\n  position: absolute;\n  top: 36px;\n  left: 50%;\n  z-index: 3;\n  margin-left: -20px;\n  border-radius: 5px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #242324;\n  border-radius: 100%;\n  width: 72px;\n  height: 72px;\n  z-index: 3;\n  position: absolute;\n  left: 50%;\n  margin-left: -36px;\n  bottom: 30px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .home.sc-o-demo-devices:after {\n  width: 20px;\n  height: 20px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 4px;\n  position: absolute;\n  display: block;\n  content: '';\n  top: 50%;\n  left: 50%;\n  margin-top: -11px;\n  margin-left: -11px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  position: absolute;\n  top: -4px;\n  right: 60px;\n  width: 60px;\n  height: 4px;\n  border-radius: 2px 2px 0px 0px;\n  background: #4D4D4D; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  position: absolute;\n  left: -4px;\n  top: 160px;\n  height: 27px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: #4D4D4D; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  position: absolute;\n  left: 0px;\n  top: -70px;\n  height: 35px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  position: absolute;\n  left: 0px;\n  bottom: -64px;\n  height: 27px;\n  width: 4px;\n  border-radius: 2px 0px 0px 2px;\n  background: inherit;\n  content: '';\n  display: block; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices {\n  padding: 27px 129px;\n  height: 320px;\n  width: 480px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  left: 90px;\n  bottom: 0px;\n  height: 100%;\n  width: 3px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  left: calc(100% - 60px);\n  top: 0px;\n  height: 100%;\n  width: 3px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  top: 134px;\n  left: calc(100% - 72px);\n  margin-left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  top: 50%;\n  margin-left: 0;\n  margin-top: -32px;\n  left: calc(100% - 72px);\n  width: 10px;\n  height: 64px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  height: 40px;\n  width: 10px;\n  left: calc(100% - 36px);\n  top: 50%;\n  margin-left: 0;\n  margin-top: -20px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  left: 30px;\n  bottom: 50%;\n  margin-left: 0;\n  margin-bottom: -36px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  height: 60px;\n  width: 4px;\n  right: -4px;\n  top: calc(100% - 120px);\n  border-radius: 0px 2px 2px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  top: -4px;\n  left: calc(100% - 187px);\n  height: 4px;\n  width: 27px;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  right: -70px;\n  left: auto;\n  top: 0px;\n  width: 35px;\n  height: 4px;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  width: 27px;\n  height: 4px;\n  bottom: 0px;\n  left: -64px;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.silver.sc-o-demo-devices {\n  background: #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.silver.sc-o-demo-devices:before {\n  background: #fcfcfc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.silver.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #fcfcfc;\n  -webkit-box-shadow: inset 0 0 0 1px #bcbcbc;\n  box-shadow: inset 0 0 0 1px #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.silver.sc-o-demo-devices   .home.sc-o-demo-devices:after {\n  border: 1px solid rgba(0, 0, 0, 0.2); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone4s.silver.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone4s.silver.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #d6d6d6; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices {\n  padding: 50px 15px 50px 15px;\n  width: 320px;\n  height: 568px;\n  background: #1e1e1e;\n  border-radius: 20px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices:before {\n  border-radius: 600px / 50px;\n  background: inherit;\n  content: '';\n  top: 0;\n  position: absolute;\n  height: 103.1%;\n  width: calc(100% - 26px);\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%); }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  width: calc(100% - 8px);\n  height: calc(100% - 6px);\n  position: absolute;\n  top: 3px;\n  left: 4px;\n  border-radius: 20px;\n  background: #181818; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  border-radius: 600px / 50px;\n  background: inherit;\n  content: '';\n  top: 0;\n  position: absolute;\n  height: 103.0%;\n  width: calc(100% - 26px);\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%); }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  width: 3px;\n  position: absolute;\n  left: -3px;\n  top: 110px;\n  height: 100px;\n  background: inherit;\n  border-radius: 2px 0px 0px 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 3px;\n  position: absolute;\n  right: -3px;\n  top: 70px;\n  height: 45px;\n  background: inherit;\n  border-radius: 0px 2px 2px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 18px;\n  left: 50%;\n  z-index: 3;\n  margin-left: -5px;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.sc-o-demo-devices   .camera.sc-o-demo-devices:before {\n  background: #3c3d3d;\n  width: 6px;\n  height: 6px;\n  content: '';\n  display: block;\n  position: absolute;\n  top: 2px;\n  left: -100px;\n  z-index: 3;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices {\n  padding: 15px 50px 15px 50px;\n  height: 320px;\n  width: 568px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices:before {\n  width: 103.1%;\n  height: calc(100% - 26px);\n  border-radius: 50px / 600px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  left: 3px;\n  top: 4px;\n  height: calc(100% - 8px);\n  width: calc(100% - 6px); }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  width: 103%;\n  height: calc(100% - 26px);\n  border-radius: 50px / 600px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  height: 3px;\n  width: 100px;\n  left: calc(100% - 210px);\n  top: -3px;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  height: 3px;\n  width: 45px;\n  right: 70px;\n  top: 100%;\n  border-radius: 0px 0px 2px 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  top: 50%;\n  left: calc(100% - 18px);\n  margin-left: 0;\n  margin-top: -5px; }\n\n.sc-o-demo-devices-h   .marvel-device.nexus5.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices:before {\n  top: -100px;\n  left: 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices {\n  padding: 60px 18px;\n  border-radius: 42px;\n  width: 320px;\n  height: 568px;\n  background: #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices:after {\n  width: calc(100% - 52px);\n  content: '';\n  display: block;\n  height: 26px;\n  background: inherit;\n  position: absolute;\n  border-radius: 500px / 40px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%); }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices:before {\n  top: -7px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices:after {\n  bottom: -7px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  border-radius: 37px;\n  width: calc(100% - 10px);\n  height: calc(100% - 10px);\n  top: 5px;\n  left: 5px;\n  background: radial-gradient(rgba(0, 0, 0, 0.02) 20%, transparent 60%) 0 0, radial-gradient(rgba(0, 0, 0, 0.02) 20%, transparent 60%) 3px 3px;\n  background-color: white;\n  background-size: 4px 4px;\n  background-position: center;\n  z-index: 2;\n  position: absolute; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .top-bar.sc-o-demo-devices:after {\n  width: calc(100% - 48px);\n  content: '';\n  display: block;\n  height: 26px;\n  background: inherit;\n  position: absolute;\n  border-radius: 500px / 40px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%); }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  top: -7px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .top-bar.sc-o-demo-devices:after {\n  bottom: -7px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  width: 3px;\n  position: absolute;\n  left: -3px;\n  top: 100px;\n  height: 100px;\n  background: #cecece;\n  border-radius: 2px 0px 0px 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  width: 68px;\n  height: 8px;\n  position: absolute;\n  top: 20px;\n  display: block;\n  z-index: 3;\n  left: 50%;\n  margin-left: -34px;\n  background-color: #bcbcbc;\n  background-position: top left;\n  border-radius: 4px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  display: block;\n  position: absolute;\n  top: 20px;\n  right: 110px;\n  background: #3c3d3d;\n  border-radius: 100%;\n  width: 8px;\n  height: 8px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .sensor.sc-o-demo-devices:after {\n  display: block;\n  content: '';\n  position: absolute;\n  top: 0px;\n  right: 12px;\n  background: #3c3d3d;\n  border-radius: 100%;\n  width: 8px;\n  height: 8px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  display: block;\n  position: absolute;\n  top: 24px;\n  right: 42px;\n  background: black;\n  border-radius: 100%;\n  width: 10px;\n  height: 10px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .camera.sc-o-demo-devices:before {\n  width: 4px;\n  height: 4px;\n  background: #3c3d3d;\n  border-radius: 100%;\n  position: absolute;\n  content: '';\n  top: 50%;\n  left: 50%;\n  margin-top: -2px;\n  margin-left: -2px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.sc-o-demo-devices   .home.sc-o-demo-devices {\n  position: absolute;\n  z-index: 3;\n  bottom: 17px;\n  left: 50%;\n  width: 70px;\n  height: 20px;\n  background: white;\n  border-radius: 18px;\n  display: block;\n  margin-left: -35px;\n  border: 2px solid black; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices {\n  padding: 18px 60px;\n  height: 320px;\n  width: 568px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices:after {\n  height: calc(100% - 52px);\n  width: 26px;\n  border-radius: 40px / 500px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices:before {\n  top: 50%;\n  left: -7px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices:after {\n  top: 50%;\n  left: auto;\n  right: -7px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices:after {\n  width: 26px;\n  height: calc(100% - 48px);\n  border-radius: 40px / 500px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  right: -7px;\n  top: 50%;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices:after {\n  left: -7px;\n  top: 50%;\n  right: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  height: 3px;\n  width: 100px;\n  left: calc(100% - 200px);\n  top: -3px;\n  border-radius: 2px 2px 0px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 68px;\n  width: 8px;\n  left: calc(100% - 20px);\n  top: 50%;\n  margin-left: 0;\n  margin-top: -34px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  right: 20px;\n  top: calc(100% - 110px); }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices:after {\n  left: -12px;\n  right: 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  top: calc(100% - 42px);\n  right: 24px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  width: 20px;\n  height: 70px;\n  bottom: 50%;\n  margin-bottom: -35px;\n  margin-left: 0;\n  left: 17px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.black.sc-o-demo-devices {\n  background: #1e1e1e; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.black.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  background: black; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.black.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  background: #1e1e1e; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.black.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  background: radial-gradient(rgba(0, 0, 0, 0.05) 20%, transparent 60%) 0 0, radial-gradient(rgba(0, 0, 0, 0.05) 20%, transparent 60%) 3px 3px;\n  background-color: #2c2b2c;\n  background-size: 4px 4px; }\n\n.sc-o-demo-devices-h   .marvel-device.s5.black.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #2c2b2c; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices {\n  padding: 80px 35px 125px 35px;\n  background: #ffdd00;\n  width: 320px;\n  height: 533px;\n  border-radius: 40px / 3px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  width: calc(100% - 24px);\n  height: calc(100% - 32px);\n  position: absolute;\n  top: 16px;\n  left: 12px;\n  border-radius: 24px;\n  background: black;\n  z-index: 1; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  background: #1e1e1e;\n  display: block;\n  content: '';\n  width: calc(100% - 4px);\n  height: calc(100% - 4px);\n  top: 2px;\n  left: 2px;\n  position: absolute;\n  border-radius: 22px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 3px;\n  position: absolute;\n  top: 130px;\n  height: 100px;\n  background: #1e1e1e;\n  right: -3px;\n  border-radius: 0px 2px 2px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  width: 3px;\n  position: absolute;\n  top: 190px;\n  content: '';\n  display: block;\n  height: 50px;\n  background: inherit;\n  right: 0px;\n  border-radius: 0px 2px 2px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  width: 3px;\n  position: absolute;\n  top: 460px;\n  content: '';\n  display: block;\n  height: 50px;\n  background: inherit;\n  right: 0px;\n  border-radius: 0px 2px 2px 0px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 34px;\n  right: 130px;\n  z-index: 5;\n  border-radius: 5px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  background: #292728;\n  width: 64px;\n  height: 10px;\n  position: absolute;\n  top: 38px;\n  left: 50%;\n  margin-left: -32px;\n  border-radius: 5px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices {\n  padding: 35px 80px 35px 125px;\n  height: 320px;\n  width: 568px;\n  border-radius: 2px / 100px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  height: calc(100% - 24px);\n  width: calc(100% - 32px);\n  left: 16px;\n  top: 12px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  height: 3px;\n  right: 130px;\n  width: 100px;\n  top: 100%;\n  border-radius: 0px 0px 2px 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  height: 3px;\n  right: 190px;\n  top: 0px;\n  width: 50px;\n  border-radius: 0px 0px 2px 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  height: 3px;\n  right: 430px;\n  top: 0px;\n  width: 50px;\n  border-radius: 0px 0px 2px 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  right: 30px;\n  top: calc(100% - 140px); }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  width: 10px;\n  height: 64px;\n  top: 50%;\n  margin-left: 0;\n  margin-top: -32px;\n  left: calc(100% - 48px); }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.black.sc-o-demo-devices {\n  background: black; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.white.sc-o-demo-devices {\n  background: white;\n  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2); }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.blue.sc-o-demo-devices {\n  background: #00acdd; }\n\n.sc-o-demo-devices-h   .marvel-device.lumia920.red.sc-o-demo-devices {\n  background: #CC3E32; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices {\n  padding: 72px 25px 100px 25px;\n  width: 320px;\n  height: 568px;\n  background: #bebebe;\n  border-radius: 34px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices:before {\n  content: '';\n  display: block;\n  width: calc(100% - 4px);\n  height: calc(100% - 4px);\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  background: #adadad;\n  border-radius: 32px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices:after {\n  content: '';\n  display: block;\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  background: #eeeeee;\n  border-radius: 30px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  width: calc(100% - 4px);\n  height: 635px;\n  position: absolute;\n  background: #424242;\n  top: 50px;\n  z-index: 1;\n  left: 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  content: '';\n  position: absolute;\n  width: calc(100% - 4px);\n  height: 100%;\n  position: absolute;\n  background: black;\n  top: 0px;\n  z-index: 1;\n  left: 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 16px;\n  width: 216px;\n  display: block;\n  position: absolute;\n  top: 22px;\n  z-index: 2;\n  left: 50%;\n  margin-left: -108px;\n  background: radial-gradient(#343434 25%, transparent 50%) 0 0, radial-gradient(#343434 25%, transparent 50%) 4px 4px;\n  background-size: 4px 4px;\n  background-position: top left; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .speaker.sc-o-demo-devices:after {\n  content: '';\n  height: 16px;\n  width: 216px;\n  display: block;\n  position: absolute;\n  top: 676px;\n  z-index: 2;\n  left: 50%;\n  margin-left: -108px;\n  background: inherit; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  display: block;\n  position: absolute;\n  top: 18px;\n  right: 38px;\n  background: #3c3d3d;\n  border-radius: 100%;\n  width: 24px;\n  height: 24px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .camera.sc-o-demo-devices:before {\n  width: 8px;\n  height: 8px;\n  background: black;\n  border-radius: 100%;\n  position: absolute;\n  content: '';\n  top: 50%;\n  left: 50%;\n  margin-top: -4px;\n  margin-left: -4px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  display: block;\n  position: absolute;\n  top: 29px;\n  left: 60px;\n  background: #3c3d3d;\n  border-radius: 100%;\n  width: 8px;\n  height: 8px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.sc-o-demo-devices   .sensor.sc-o-demo-devices:after {\n  display: block;\n  content: '';\n  position: absolute;\n  top: 0px;\n  right: 12px;\n  background: #3c3d3d;\n  border-radius: 100%;\n  width: 8px;\n  height: 8px;\n  z-index: 3; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices {\n  padding: 25px 72px 25px 100px;\n  height: 320px;\n  width: 568px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  height: calc(100% - 4px);\n  width: 635px;\n  left: calc(100% - 685px);\n  top: 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  width: 16px;\n  height: 216px;\n  left: calc(100% - 38px);\n  top: 50%;\n  margin-left: 0px;\n  margin-top: -108px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices:after {\n  width: 16px;\n  height: 216px;\n  left: calc(100% - 692px);\n  top: 50%;\n  margin-left: 0;\n  margin-top: -108px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  right: 18px;\n  top: calc(100% - 38px); }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices {\n  left: calc(100% - 29px);\n  top: 60px; }\n\n.sc-o-demo-devices-h   .marvel-device.htc-one.landscape.sc-o-demo-devices   .sensor.sc-o-demo-devices   .sc-o-demo-devices:after {\n  right: 0;\n  top: -12px; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices {\n  width: 576px;\n  height: 768px;\n  padding: 90px 25px;\n  background: #242324;\n  border-radius: 44px; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices:before {\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  position: absolute;\n  content: '';\n  display: block;\n  top: 4px;\n  left: 4px;\n  border-radius: 40px;\n  background: #1e1e1e; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 44px;\n  left: 50%;\n  margin-left: -5px;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #242324;\n  border-radius: 36px;\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  left: 50%;\n  margin-left: -25px;\n  bottom: 22px; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.sc-o-demo-devices   .home.sc-o-demo-devices:after {\n  width: 15px;\n  height: 15px;\n  margin-top: -8px;\n  margin-left: -8px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 4px;\n  position: absolute;\n  display: block;\n  content: '';\n  top: 50%;\n  left: 50%; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.landscape.sc-o-demo-devices {\n  height: 576px;\n  width: 768px;\n  padding: 25px 90px; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  left: calc(100% - 44px);\n  top: 50%;\n  margin-left: 0;\n  margin-top: -5px; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.landscape.sc-o-demo-devices   .home.sc-o-demo-devices {\n  top: 50%;\n  left: 22px;\n  margin-left: 0;\n  margin-top: -25px; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.silver.sc-o-demo-devices {\n  background: #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.silver.sc-o-demo-devices:before {\n  background: #fcfcfc; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.silver.sc-o-demo-devices   .home.sc-o-demo-devices {\n  background: #fcfcfc;\n  -webkit-box-shadow: inset 0 0 0 1px #bcbcbc;\n  box-shadow: inset 0 0 0 1px #bcbcbc; }\n\n.sc-o-demo-devices-h   .marvel-device.ipad.silver.sc-o-demo-devices   .home.sc-o-demo-devices:after {\n  border: 1px solid rgba(0, 0, 0, 0.2); }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices {\n  width: 960px;\n  height: 600px;\n  padding: 44px 44px 76px;\n  margin: 0 auto;\n  background: #bebebe;\n  border-radius: 34px; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices:before {\n  width: calc(100% - 8px);\n  height: calc(100% - 8px);\n  position: absolute;\n  content: '';\n  display: block;\n  top: 4px;\n  left: 4px;\n  border-radius: 30px;\n  background: #1e1e1e; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  width: calc(100% + 2 * 70px);\n  height: 40px;\n  position: absolute;\n  content: '';\n  display: block;\n  top: 680px;\n  left: -70px;\n  border-bottom-left-radius: 90px 18px;\n  border-bottom-right-radius: 90px 18px;\n  background: #bebebe;\n  -webkit-box-shadow: inset 0px -4px 13px 3px rgba(34, 34, 34, 0.6);\n  box-shadow: inset 0px -4px 13px 3px rgba(34, 34, 34, 0.6); }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .top-bar.sc-o-demo-devices:before {\n  width: 100%;\n  height: 24px;\n  content: '';\n  display: block;\n  top: 0;\n  left: 0;\n  background: #f0f0f0;\n  border-bottom: 2px solid #aaa;\n  border-radius: 5px;\n  position: relative; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .top-bar.sc-o-demo-devices:after {\n  width: 16%;\n  height: 14px;\n  content: '';\n  display: block;\n  top: 0;\n  background: #ddd;\n  position: absolute;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  border-radius: 0 0 20px 20px;\n  -webkit-box-shadow: inset 0px -3px 10px #999;\n  box-shadow: inset 0px -3px 10px #999; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  background: transparent;\n  width: calc(100% + 2 * 70px);\n  height: 26px;\n  position: absolute;\n  content: '';\n  display: block;\n  top: 680px;\n  left: -70px; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices:after {\n  height: calc(100% - 2px);\n  width: 80px;\n  content: '';\n  display: block;\n  top: 0;\n  position: absolute; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices:before {\n  left: 0;\n  background: #f0f0f0;\n  background: -webkit-gradient(linear, left top, right top, from(#747474), color-stop(5%, #c3c3c3), color-stop(14%, #ebebeb), color-stop(41%, #979797), color-stop(80%, #f0f0f0), color-stop(100%, #f0f0f0), to(#f0f0f0));\n  background: linear-gradient(to right, #747474 0%, #c3c3c3 5%, #ebebeb 14%, #979797 41%, #f0f0f0 80%, #f0f0f0 100%, #f0f0f0 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices:after {\n  right: 0;\n  background: #f0f0f0;\n  background: -webkit-gradient(linear, left top, right top, from(#f0f0f0), color-stop(0%, #f0f0f0), color-stop(20%, #f0f0f0), color-stop(59%, #979797), color-stop(86%, #ebebeb), color-stop(95%, #c3c3c3), to(#747474));\n  background: linear-gradient(to right, #f0f0f0 0%, #f0f0f0 0%, #f0f0f0 20%, #979797 59%, #ebebeb 86%, #c3c3c3 95%, #747474 100%); }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  background: #3c3d3d;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 20px;\n  left: 50%;\n  margin-left: -5px;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.macbook.sc-o-demo-devices   .home.sc-o-demo-devices {\n  display: none; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices {\n  width: 375px;\n  height: 812px;\n  padding: 26px;\n  background: #fdfdfd;\n  -webkit-box-shadow: inset 0 0 11px 0 black;\n  box-shadow: inset 0 0 11px 0 black;\n  border-radius: 66px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .overflow.sc-o-demo-devices {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border-radius: 66px;\n  overflow: hidden; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .shadow.sc-o-demo-devices {\n  border-radius: 100%;\n  width: 90px;\n  height: 90px;\n  position: absolute;\n  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0) 60%); }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .shadow--tl.sc-o-demo-devices {\n  top: -20px;\n  left: -20px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .shadow--tr.sc-o-demo-devices {\n  top: -20px;\n  right: -20px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .shadow--bl.sc-o-demo-devices {\n  bottom: -20px;\n  left: -20px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .shadow--br.sc-o-demo-devices {\n  bottom: -20px;\n  right: -20px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices:before {\n  width: calc(100% - 10px);\n  height: calc(100% - 10px);\n  position: absolute;\n  top: 5px;\n  content: '';\n  left: 5px;\n  border-radius: 61px;\n  background: black;\n  z-index: 1; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .inner-shadow.sc-o-demo-devices {\n  width: calc(100% - 20px);\n  height: calc(100% - 20px);\n  position: absolute;\n  top: 10px;\n  overflow: hidden;\n  left: 10px;\n  border-radius: 56px;\n  -webkit-box-shadow: inset 0 0 15px 0 rgba(255, 255, 255, 0.66);\n  box-shadow: inset 0 0 15px 0 rgba(255, 255, 255, 0.66);\n  z-index: 1; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .inner-shadow.sc-o-demo-devices:before {\n  -webkit-box-shadow: inset 0 0 20px 0 #FFFFFF;\n  box-shadow: inset 0 0 20px 0 #FFFFFF;\n  width: 100%;\n  height: 116%;\n  position: absolute;\n  top: -8%;\n  content: '';\n  left: 0;\n  border-radius: 200px / 112px;\n  z-index: 2; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .screen.sc-o-demo-devices {\n  border-radius: 40px;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  width: 100%;\n  position: absolute;\n  height: 8px;\n  background: rgba(0, 0, 0, 0.1);\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  top: 80px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  bottom: 80px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .volume.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .volume.sc-o-demo-devices:after, .sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  width: 3px;\n  background: #b5b5b5;\n  position: absolute; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  left: -3px;\n  top: 116px;\n  height: 32px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  height: 62px;\n  top: 62px;\n  content: '';\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  height: 62px;\n  top: 140px;\n  content: '';\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  height: 96px;\n  top: 200px;\n  right: -3px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  width: 6px;\n  height: 6px;\n  top: 9px;\n  border-radius: 100%;\n  position: absolute;\n  left: 154px;\n  background: #0d4d71; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 6px;\n  width: 60px;\n  left: 50%;\n  position: absolute;\n  top: 9px;\n  margin-left: -30px;\n  background: #171818;\n  border-radius: 6px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .notch.sc-o-demo-devices {\n  position: absolute;\n  width: 210px;\n  height: 30px;\n  top: 26px;\n  left: 108px;\n  z-index: 4;\n  background: black;\n  border-bottom-left-radius: 24px;\n  border-bottom-right-radius: 24px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .notch.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .notch.sc-o-demo-devices:after {\n  content: '';\n  height: 8px;\n  position: absolute;\n  top: 0;\n  width: 8px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .notch.sc-o-demo-devices:after {\n  background: radial-gradient(circle at bottom left, transparent 0, transparent 70%, black 70%, black 100%);\n  left: -8px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.sc-o-demo-devices   .notch.sc-o-demo-devices:before {\n  background: radial-gradient(circle at bottom right, transparent 0, transparent 70%, black 70%, black 100%);\n  right: -8px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices {\n  height: 375px;\n  width: 812px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  width: 8px;\n  height: 100%;\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .top-bar.sc-o-demo-devices {\n  left: 80px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .bottom-bar.sc-o-demo-devices {\n  right: 80px;\n  bottom: auto;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after, .sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  height: 3px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .inner-shadow.sc-o-demo-devices:before {\n  height: 100%;\n  width: 116%;\n  left: -8%;\n  top: 0;\n  border-radius: 112px / 200px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  bottom: -3px;\n  top: auto;\n  left: 116px;\n  width: 32px; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  width: 62px;\n  left: 62px;\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:after {\n  width: 62px;\n  left: 140px;\n  top: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  width: 96px;\n  left: 200px;\n  top: -3px;\n  right: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  left: 9px;\n  bottom: 154px;\n  top: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  width: 6px;\n  height: 60px;\n  left: 9px;\n  top: 50%;\n  margin-top: -30px;\n  margin-left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .notch.sc-o-demo-devices {\n  height: 210px;\n  width: 30px;\n  left: 26px;\n  bottom: 108px;\n  top: auto;\n  border-top-right-radius: 24px;\n  border-bottom-right-radius: 24px;\n  border-bottom-left-radius: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .notch.sc-o-demo-devices:before, .sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .notch.sc-o-demo-devices:after {\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .notch.sc-o-demo-devices:after {\n  background: radial-gradient(circle at bottom right, transparent 0, transparent 70%, black 70%, black 100%);\n  bottom: -8px;\n  top: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.iphone-x.landscape.sc-o-demo-devices   .notch.sc-o-demo-devices:before {\n  background: radial-gradient(circle at top right, transparent 0, transparent 70%, black 70%, black 100%);\n  top: -8px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices {\n  width: 400px;\n  height: 822px;\n  background: black;\n  border-radius: 34px;\n  padding: 45px 10px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .overflow.sc-o-demo-devices {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border-radius: 34px;\n  overflow: hidden; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 8px;\n  width: 56px;\n  left: 50%;\n  position: absolute;\n  top: 25px;\n  margin-left: -28px;\n  background: #171818;\n  z-index: 1;\n  border-radius: 8px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  height: 18px;\n  width: 18px;\n  left: 86px;\n  position: absolute;\n  top: 18px;\n  background: #212b36;\n  z-index: 1;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .camera.sc-o-demo-devices:before {\n  content: '';\n  height: 8px;\n  width: 8px;\n  left: -22px;\n  position: absolute;\n  top: 5px;\n  background: #212b36;\n  z-index: 1;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .sensors.sc-o-demo-devices {\n  height: 10px;\n  width: 10px;\n  left: 120px;\n  position: absolute;\n  top: 22px;\n  background: #1d233b;\n  z-index: 1;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .sensors.sc-o-demo-devices:before {\n  content: '';\n  height: 10px;\n  width: 10px;\n  left: 18px;\n  position: absolute;\n  top: 0;\n  background: #1d233b;\n  z-index: 1;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .more-sensors.sc-o-demo-devices {\n  height: 16px;\n  width: 16px;\n  left: 285px;\n  position: absolute;\n  top: 18px;\n  background: #33244a;\n  -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);\n  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);\n  z-index: 1;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .more-sensors.sc-o-demo-devices:before {\n  content: '';\n  height: 11px;\n  width: 11px;\n  left: 40px;\n  position: absolute;\n  top: 4px;\n  background: #214a61;\n  z-index: 1;\n  border-radius: 100%; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  width: 2px;\n  height: 56px;\n  background: black;\n  position: absolute;\n  top: 288px;\n  right: -2px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 2px;\n  height: 120px;\n  background: black;\n  position: absolute;\n  top: 168px;\n  left: -2px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  content: '';\n  top: 168px;\n  width: 2px;\n  position: absolute;\n  left: 0;\n  background: black;\n  height: 56px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .inner.sc-o-demo-devices {\n  width: 100%;\n  height: calc(100% - 8px);\n  position: absolute;\n  top: 2px;\n  content: '';\n  left: 0px;\n  border-radius: 34px;\n  border-top: 2px solid #9fa0a2;\n  border-bottom: 2px solid #9fa0a2;\n  background: black;\n  z-index: 1;\n  -webkit-box-shadow: inset 0 0 6px 0 rgba(255, 255, 255, 0.5);\n  box-shadow: inset 0 0 6px 0 rgba(255, 255, 255, 0.5); }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .shadow.sc-o-demo-devices {\n  -webkit-box-shadow: inset 0 0 60px 0 white, inset 0 0 30px 0 rgba(255, 255, 255, 0.5), 0 0 20px 0 white, 0 0 20px 0 rgba(255, 255, 255, 0.5);\n  box-shadow: inset 0 0 60px 0 white, inset 0 0 30px 0 rgba(255, 255, 255, 0.5), 0 0 20px 0 white, 0 0 20px 0 rgba(255, 255, 255, 0.5);\n  height: 101%;\n  position: absolute;\n  top: -0.5%;\n  content: '';\n  width: calc(100% - 20px);\n  left: 10px;\n  border-radius: 38px;\n  z-index: 5;\n  pointer-events: none; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.sc-o-demo-devices   .screen.sc-o-demo-devices {\n  border-radius: 14px;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices {\n  height: 400px;\n  width: 822px;\n  padding: 10px 45px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .speaker.sc-o-demo-devices {\n  height: 56px;\n  width: 8px;\n  top: 50%;\n  margin-top: -28px;\n  margin-left: 0;\n  right: 25px;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices {\n  top: 86px;\n  right: 18px;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .camera.sc-o-demo-devices:before {\n  top: -22px;\n  left: 5px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .sensors.sc-o-demo-devices {\n  top: 120px;\n  right: 22px;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .sensors.sc-o-demo-devices:before {\n  top: 18px;\n  left: 0; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .more-sensors.sc-o-demo-devices {\n  top: 285px;\n  right: 18px;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .more-sensors.sc-o-demo-devices:before {\n  top: 40px;\n  left: 4px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .sleep.sc-o-demo-devices {\n  bottom: -2px;\n  top: auto;\n  right: 288px;\n  width: 56px;\n  height: 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices {\n  width: 120px;\n  height: 2px;\n  top: -2px;\n  right: 168px;\n  left: auto; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .volume.sc-o-demo-devices:before {\n  right: 168px;\n  left: auto;\n  top: 0;\n  width: 56px;\n  height: 2px; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .inner.sc-o-demo-devices {\n  height: 100%;\n  width: calc(100% - 8px);\n  left: 2px;\n  top: 0;\n  border-top: 0;\n  border-bottom: 0;\n  border-left: 2px solid #9fa0a2;\n  border-right: 2px solid #9fa0a2; }\n\n.sc-o-demo-devices-h   .marvel-device.note8.landscape.sc-o-demo-devices   .shadow.sc-o-demo-devices {\n  width: 101%;\n  height: calc(100% - 20px);\n  left: -0.5%;\n  top: 10px; }\n\n.sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices, .sc-o-demo-devices-h   .marvel-device.sc-o-demo-devices, .sc-o-demo-devices-h   *.sc-o-demo-devices:before, .sc-o-demo-devices-h   *.sc-o-demo-devices:after {\n  -webkit-transition: all 120ms cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: all 120ms cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n"; }
}

class DemoFabComponent {
    componentDidLoad() {
        const rootEl = this.el.shadowRoot.querySelector('.mdc-fab');
        this.ripple = MDCRipple.attachTo(rootEl);
    }
    componentDidUnload() {
        this.ripple.destroy();
    }
    showContextMenu() {
        this.el.shadowRoot.querySelector('#fab-menu').classList.toggle('fab-menu--absolute--show');
    }
    handleClick(evt) {
        const target = evt.currentTarget.getAttribute('data-btn');
        target === 'rotate-screen' ? this.fabBtnRotate.emit(target)
            : this.fabBtnChangeDevice.emit(target);
    }
    render() {
        return [
            h("div", { id: "fab-menu", class: "fab-menu--absolute" },
                h("button", { "data-btn": "rotate-screen", onClick: (event) => this.handleClick(event), id: "rotate-screen", class: "mdc-fab mdc-fab--mini material-icons" },
                    h("span", { class: "mdc-fab__icon" },
                        h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                            h("path", { d: "M0 0h24v24H0z", fill: "none" }),
                            h("path", { d: "M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z" })))),
                h("button", { "data-btn": "navigate-before", onClick: (event) => this.handleClick(event), id: "navigate-before", class: "mdc-fab mdc-fab--mini material-icons app-fab--mini" },
                    h("span", { class: "mdc-fab__icon" },
                        h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                            h("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }),
                            h("path", { d: "M0 0h24v24H0z", fill: "none" })))),
                h("button", { "data-btn": "navigate-next", onClick: (event) => this.handleClick(event), id: "navigate-next", class: "mdc-fab mdc-fab--mini material-icons app-fab--mini" },
                    h("span", { class: "mdc-fab__icon" },
                        h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                            h("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" }),
                            h("path", { d: "M0 0h24v24H0z", fill: "none" }))))),
            h("button", { "data-btn": "menu-toggle", onClick: () => this.showContextMenu(), class: "mdc-fab material-icons app-fab--absolute" },
                h("span", { class: "mdc-fab__icon" },
                    h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
                        h("path", { d: "M0 0h24v24H0z", fill: "none" }),
                        h("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }))))
        ];
    }
    static get is() { return "o-demo-fab"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "rotate-device",
            "method": "fabBtnRotate",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "change-device",
            "method": "fabBtnChangeDevice",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "\n.sc-o-demo-fab-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n\@-webkit-keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n\@keyframes mdc-ripple-fg-radius-in {\n  from {\n    -webkit-animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n\@-webkit-keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n\@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n\@-webkit-keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n\@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug.sc-o-demo-fab {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug.sc-o-demo-fab::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-fab.sc-o-demo-fab {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  -webkit-box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: relative;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  -webkit-transition: opacity 15ms linear 30ms, -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity 15ms linear 30ms, -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  border: none;\n  border-radius: 50%;\n  fill: currentColor;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: hidden;\n  background-color: #018786;\n  color: #fff;\n  \n  color: var(--mdc-theme-on-secondary, #fff); }\n  .mdc-fab.sc-o-demo-fab::before, .mdc-fab.sc-o-demo-fab::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-fab.sc-o-demo-fab::before {\n    -webkit-transition: opacity 15ms linear;\n    transition: opacity 15ms linear;\n    z-index: 1; }\n  .mdc-fab.mdc-ripple-upgraded.sc-o-demo-fab::before {\n    -webkit-transform: scale(var(--mdc-ripple-fg-scale, 1));\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-fab.mdc-ripple-upgraded.sc-o-demo-fab::after {\n    top: 0;\n    \n    left: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transform-origin: center center;\n    transform-origin: center center; }\n  .mdc-fab.mdc-ripple-upgraded--unbounded.sc-o-demo-fab::after {\n    top: var(--mdc-ripple-top, 0);\n    \n    left: var(--mdc-ripple-left, 0); }\n  .mdc-fab.mdc-ripple-upgraded--foreground-activation.sc-o-demo-fab::after {\n    -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n    animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-fab.mdc-ripple-upgraded--foreground-deactivation.sc-o-demo-fab::after {\n    -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n    animation: 150ms mdc-ripple-fg-opacity-out;\n    -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-fab.sc-o-demo-fab::before, .mdc-fab.sc-o-demo-fab::after {\n    top: calc(50% - 100%);\n    \n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .mdc-fab.mdc-ripple-upgraded.sc-o-demo-fab::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-fab.sc-o-demo-fab::-moz-focus-inner {\n    padding: 0;\n    border: 0; }\n  .mdc-fab.sc-o-demo-fab:hover, .mdc-fab.sc-o-demo-fab:focus {\n    -webkit-box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n  .mdc-fab.sc-o-demo-fab:active {\n    -webkit-box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);\n    box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12); }\n  .mdc-fab.sc-o-demo-fab:active, .mdc-fab.sc-o-demo-fab:focus {\n    outline: none; }\n  .mdc-fab.sc-o-demo-fab:hover {\n    cursor: pointer; }\n  .mdc-fab.sc-o-demo-fab    > svg.sc-o-demo-fab {\n    width: 100%; }\n  \@supports not (-ms-ime-align: auto) {\n    .mdc-fab.sc-o-demo-fab {\n      \n      background-color: var(--mdc-theme-secondary, #018786); } }\n  .mdc-fab.sc-o-demo-fab   .mdc-fab__icon.sc-o-demo-fab {\n    width: 24px;\n    height: 24px;\n    font-size: 24px; }\n  .mdc-fab.sc-o-demo-fab::before, .mdc-fab.sc-o-demo-fab::after {\n    background-color: #fff; }\n    \@supports not (-ms-ime-align: auto) {\n      .mdc-fab.sc-o-demo-fab::before, .mdc-fab.sc-o-demo-fab::after {\n        \n        background-color: var(--mdc-theme-on-secondary, #fff); } }\n  .mdc-fab.sc-o-demo-fab:hover::before {\n    opacity: 0.08; }\n  .mdc-fab.sc-o-demo-fab:not(.mdc-ripple-upgraded):focus::before, .mdc-fab.mdc-ripple-upgraded--background-focused.sc-o-demo-fab::before {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  .mdc-fab.sc-o-demo-fab:not(.mdc-ripple-upgraded)::after {\n    -webkit-transition: opacity 150ms linear;\n    transition: opacity 150ms linear; }\n  .mdc-fab.sc-o-demo-fab:not(.mdc-ripple-upgraded):active::after {\n    -webkit-transition-duration: 75ms;\n    transition-duration: 75ms;\n    opacity: 0.32; }\n  .mdc-fab.mdc-ripple-upgraded.sc-o-demo-fab {\n    --mdc-ripple-fg-opacity: 0.32; }\n\n.mdc-fab--mini.sc-o-demo-fab {\n  width: 40px;\n  height: 40px; }\n\n.mdc-fab--extended.sc-o-demo-fab {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  padding: 0 20px;\n  width: auto;\n  max-width: 100%;\n  height: 48px;\n  border-radius: 24px; }\n  .mdc-fab--extended.sc-o-demo-fab   .mdc-fab__icon.sc-o-demo-fab {\n    \n    margin-left: -8px;\n    \n    margin-right: 12px; }\n    [dir=\"rtl\"].sc-o-demo-fab   .mdc-fab--extended.sc-o-demo-fab   .mdc-fab__icon.sc-o-demo-fab, .mdc-fab--extended.sc-o-demo-fab   .mdc-fab__icon[dir=\"rtl\"].sc-o-demo-fab {\n      \n      margin-left: 12px;\n      \n      margin-right: -8px; }\n  .mdc-fab--extended.sc-o-demo-fab   .mdc-fab__label.sc-o-demo-fab    + .mdc-fab__icon.sc-o-demo-fab {\n    \n    margin-left: 12px;\n    \n    margin-right: -8px; }\n    [dir=\"rtl\"].sc-o-demo-fab   .mdc-fab--extended.sc-o-demo-fab   .mdc-fab__label.sc-o-demo-fab    + .mdc-fab__icon.sc-o-demo-fab, .mdc-fab--extended.sc-o-demo-fab   .mdc-fab__label.sc-o-demo-fab    + .mdc-fab__icon[dir=\"rtl\"].sc-o-demo-fab {\n      \n      margin-left: -8px;\n      \n      margin-right: 12px; }\n\n.mdc-fab__label.sc-o-demo-fab {\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden; }\n\n.mdc-fab__icon.sc-o-demo-fab {\n  -webkit-transition: -webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  transition: -webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform; }\n\n.mdc-fab.sc-o-demo-fab   .mdc-fab__icon.sc-o-demo-fab {\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.mdc-fab--exited.sc-o-demo-fab {\n  -webkit-transform: scale(0);\n  transform: scale(0);\n  -webkit-transition: opacity 15ms linear 150ms, -webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: opacity 15ms linear 150ms, -webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: opacity 15ms linear 150ms, transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: opacity 15ms linear 150ms, transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);\n  opacity: 0; }\n  .mdc-fab--exited.sc-o-demo-fab   .mdc-fab__icon.sc-o-demo-fab {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transition: -webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    transition: -webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    transition: transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);\n    transition: transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1); }\n\n.sc-o-demo-fab-h   .fab-menu--absolute.sc-o-demo-fab {\n  display: none; }\n\n.sc-o-demo-fab-h   .app-fab--absolute.sc-o-demo-fab {\n  display: none; }\n\n\@media (min-width: 1024px) {\n  .sc-o-demo-fab-h   .fab-menu--absolute.sc-o-demo-fab {\n    display: block;\n    position: fixed;\n    bottom: 1.1rem;\n    right: 5rem;\n    z-index: 999;\n    visibility: hidden;\n    opacity: 0;\n    will-change: transform;\n    -webkit-transition: visibility 0s, opacity 0.5s linear;\n    transition: visibility 0s, opacity 0.5s linear; }\n    .sc-o-demo-fab-h   .fab-menu--absolute.sc-o-demo-fab   button.sc-o-demo-fab {\n      background-color: var(--mdc-theme-text-primary-on-primary);\n      margin: 4px; }\n  .sc-o-demo-fab-h   .fab-menu--absolute--show.sc-o-demo-fab {\n    visibility: visible;\n    opacity: 1;\n    -webkit-transition: visibility 0s, opacity 0.5s linear;\n    transition: visibility 0s, opacity 0.5s linear; }\n  .sc-o-demo-fab-h   .app-fab--absolute.sc-o-demo-fab {\n    display: block;\n    background-color: var(--mdc-theme-text-primary-on-primary);\n    position: fixed;\n    bottom: 1rem;\n    right: 1rem;\n    z-index: 999; } }\n"; }
}

class DemoResizerComponent {
    constructor() {
        this.desktop = [
            { size: '1600', name: 'Window xxlarge' },
            { size: '1440', name: 'Window xlarge' },
            { size: '1280', name: 'Window large' },
            { size: '1024', name: 'Window large' },
            { size: '900', name: 'Window medium' },
            { size: '840', name: 'Window medium' },
            { size: '600', name: 'Window small' },
            { size: '480', name: 'Window xsmall' }
        ];
        this.mobile = [
            { size: '1024', name: 'Tablet' },
            { size: '720', name: 'Phablet' },
            { size: '600', name: 'Mobile Landscape' },
            { size: '412', name: 'Mobile Portrait medium' },
            { size: '360', name: 'Mobile Portrait' },
            { size: '280', name: 'Mobile Portrait xsmall' },
        ];
    }
    handleClick(event) {
        let evt = event.currentTarget.getAttribute('data-size');
        this.resizeButtonClicked.emit(evt);
        this.setActiveViewPort(evt);
    }
    setActiveViewPort(size) {
        const sizeList = Array.from(this.el.shadowRoot.querySelectorAll('.item-resize-toolbar'));
        sizeList.forEach((el) => {
            el.classList.remove('active');
        });
        const activeEl = sizeList.filter((el) => {
            return el.getAttribute('data-size') === size;
        });
        if (activeEl.length) {
            activeEl[0].classList.add('active');
        }
    }
    render() {
        const viewports = this.viewport === 'desktop' ? this.desktop : this.mobile;
        return (h("div", { class: "resize-toolbar-container" },
            h("div", { class: "resize-toolbar" }, viewports.map(option => {
                var cssSize = { width: `${option.size}px` };
                return (h("div", { onClick: (event) => this.handleClick(event), class: "item-resize-toolbar", style: cssSize, "data-name": option.size, "data-size": option.size },
                    h("div", { class: "left device-resizer" },
                        option.size,
                        "px"),
                    h("div", { class: "rigth device-resizer" },
                        option.size,
                        "px")));
            }))));
    }
    static get is() { return "o-demo-resizer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "setActiveViewPort": {
            "method": true
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "viewport": {
            "type": String,
            "attr": "viewport"
        }
    }; }
    static get events() { return [{
            "name": "resizeButtonClicked",
            "method": "resizeButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "\n.sc-o-demo-resizer-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.sc-o-demo-resizer-h   .resize-toolbar-container.sc-o-demo-resizer {\n  margin-top: 4px;\n  color: #212121;\n  height: 16px;\n  white-space: nowrap;\n  font-weight: 500;\n  border-top: 1px solid #ddd;\n  background: #FFF;\n  position: relative; }\n\n.sc-o-demo-resizer-h   .resize-toolbar.sc-o-demo-resizer {\n  position: absolute;\n  left: -100px;\n  right: -100px; }\n\n.sc-o-demo-resizer-h   .item-resize-toolbar.sc-o-demo-resizer {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border-left: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n  padding: 1px;\n  color: #212121;\n  cursor: pointer;\n  font-size: 8px;\n  font-weight: 500;\n  height: 15px;\n  left: 0;\n  line-height: 16px;\n  margin-left: auto;\n  margin-right: auto;\n  position: absolute;\n  right: 0; }\n  .sc-o-demo-resizer-h   .item-resize-toolbar.sc-o-demo-resizer   .left.sc-o-demo-resizer {\n    float: left; }\n  .sc-o-demo-resizer-h   .item-resize-toolbar.sc-o-demo-resizer   .rigth.sc-o-demo-resizer {\n    float: right; }\n\n.sc-o-demo-resizer-h   .active.sc-o-demo-resizer {\n  background: rgba(0, 0, 0, 0.08); }\n"; }
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cssClasses$6 = {
  ROOT: 'mdc-snackbar',
  TEXT: 'mdc-snackbar__text',
  ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
  ACTION_BUTTON: 'mdc-snackbar__action-button',
  ACTIVE: 'mdc-snackbar--active',
  MULTILINE: 'mdc-snackbar--multiline',
  ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom',
};

const strings$4 = {
  TEXT_SELECTOR: '.mdc-snackbar__text',
  ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
  ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
  SHOW_EVENT: 'MDCSnackbar:show',
  HIDE_EVENT: 'MDCSnackbar:hide',
};

const numbers$3 = {
  MESSAGE_TIMEOUT: 2750,
};

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSnackbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$6;
  }

  static get strings() {
    return strings$4;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setAriaHidden: () => {},
      unsetAriaHidden: () => {},
      setActionAriaHidden: () => {},
      unsetActionAriaHidden: () => {},
      setActionText: (/* actionText: string */) => {},
      setMessageText: (/* message: string */) => {},
      setFocus: () => {},
      visibilityIsHidden: () => /* boolean */ false,
      registerCapturedBlurHandler: (/* handler: EventListener */) => {},
      deregisterCapturedBlurHandler: (/* handler: EventListener */) => {},
      registerVisibilityChangeHandler: (/* handler: EventListener */) => {},
      deregisterVisibilityChangeHandler: (/* handler: EventListener */) => {},
      registerCapturedInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterCapturedInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerActionClickHandler: (/* handler: EventListener */) => {},
      deregisterActionClickHandler: (/* handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      notifyShow: () => {},
      notifyHide: () => {},
    };
  }

  get active() {
    return this.active_;
  }

  constructor(adapter) {
    super(Object.assign(MDCSnackbarFoundation.defaultAdapter, adapter));

    this.active_ = false;
    this.actionWasClicked_ = false;
    this.dismissOnAction_ = true;
    this.firstFocus_ = true;
    this.pointerDownRecognized_ = false;
    this.snackbarHasFocus_ = false;
    this.snackbarData_ = null;
    this.queue_ = [];
    this.actionClickHandler_ = () => {
      this.actionWasClicked_ = true;
      this.invokeAction_();
    };
    this.visibilitychangeHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = true;

      if (!this.adapter_.visibilityIsHidden()) {
        setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
      }
    };
    this.interactionHandler_ = (evt) => {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        this.pointerDownRecognized_ = true;
      }
      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };
    this.blurHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = false;
      this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
    };
  }

  init() {
    this.adapter_.registerActionClickHandler(this.actionClickHandler_);
    this.adapter_.setAriaHidden();
    this.adapter_.setActionAriaHidden();
  }

  destroy() {
    this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
    this.adapter_.deregisterCapturedBlurHandler(this.blurHandler_);
    this.adapter_.deregisterVisibilityChangeHandler(this.visibilitychangeHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.deregisterCapturedInteractionHandler(evtType, this.interactionHandler_);
    });
  }

  dismissesOnAction() {
    return this.dismissOnAction_;
  }

  setDismissOnAction(dismissOnAction) {
    this.dismissOnAction_ = !!dismissOnAction;
  }

  show(data) {
    if (!data) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (!data.message) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data.actionHandler && !data.actionText) {
      throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
      this.queue_.push(data);
      return;
    }
    clearTimeout(this.timeoutId_);
    this.snackbarData_ = data;
    this.firstFocus_ = true;
    this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
    this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$6;

    this.adapter_.setMessageText(this.snackbarData_.message);

    if (this.snackbarData_.multiline) {
      this.adapter_.addClass(MULTILINE);
      if (this.snackbarData_.actionOnBottom) {
        this.adapter_.addClass(ACTION_ON_BOTTOM);
      }
    }

    if (this.snackbarData_.actionHandler) {
      this.adapter_.setActionText(this.snackbarData_.actionText);
      this.actionHandler_ = this.snackbarData_.actionHandler;
      this.setActionHidden_(false);
    } else {
      this.setActionHidden_(true);
      this.actionHandler_ = null;
      this.adapter_.setActionText(null);
    }

    this.active_ = true;
    this.adapter_.addClass(ACTIVE);
    this.adapter_.unsetAriaHidden();
    this.adapter_.notifyShow();

    this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$3.MESSAGE_TIMEOUT);
  }

  handlePossibleTabKeyboardFocus_() {
    const hijackFocus =
      this.firstFocus_ && !this.pointerDownRecognized_;

    if (hijackFocus) {
      this.setFocusOnAction_();
    }

    this.firstFocus_ = false;
  }

  setFocusOnAction_() {
    this.adapter_.setFocus();
    this.snackbarHasFocus_ = true;
    this.firstFocus_ = false;
  }

  invokeAction_() {
    try {
      if (!this.actionHandler_) {
        return;
      }

      this.actionHandler_();
    } finally {
      if (this.dismissOnAction_) {
        this.cleanup_();
      }
    }
  }

  cleanup_() {
    const allowDismissal = !this.snackbarHasFocus_ || this.actionWasClicked_;

    if (allowDismissal) {
      const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$6;

      this.adapter_.removeClass(ACTIVE);

      const handler = () => {
        clearTimeout(this.timeoutId_);
        this.adapter_.deregisterTransitionEndHandler(handler);
        this.adapter_.removeClass(MULTILINE);
        this.adapter_.removeClass(ACTION_ON_BOTTOM);
        this.setActionHidden_(true);
        this.adapter_.setAriaHidden();
        this.active_ = false;
        this.snackbarHasFocus_ = false;
        this.adapter_.notifyHide();
        this.showNext_();
      };

      this.adapter_.registerTransitionEndHandler(handler);
    }
  }

  showNext_() {
    if (!this.queue_.length) {
      return;
    }
    this.show(this.queue_.shift());
  }

  setActionHidden_(isHidden) {
    if (isHidden) {
      this.adapter_.setActionAriaHidden();
    } else {
      this.adapter_.unsetActionAriaHidden();
    }
  }
}

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const {Object<string, !VendorPropertyMapType>} */
const eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation',
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation',
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation',
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition',
  },
};

/** @const {Object<string, !VendorPropertyMapType>} */
const cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation',
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform',
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition',
  },
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return (windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function');
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return (eventType in eventTypeMap || eventType in cssPropertyMap);
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  const map = /** @type {!Object<string, !VendorPropertyMapType>} */ (
    eventType in eventTypeMap ? eventTypeMap : cssPropertyMap
  );
  const el = windowObj['document']['createElement']('div');
  let eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class MDCSnackbar extends MDCComponent {
  static attachTo(root) {
    return new MDCSnackbar(root);
  }

  show(data) {
    this.foundation_.show(data);
  }

  getDefaultFoundation() {
    const {
      TEXT_SELECTOR,
      ACTION_BUTTON_SELECTOR,
    } = MDCSnackbarFoundation.strings;
    const getText = () => this.root_.querySelector(TEXT_SELECTOR);
    const getActionButton = () => this.root_.querySelector(ACTION_BUTTON_SELECTOR);

    /* eslint brace-style: "off" */
    return new MDCSnackbarFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setAriaHidden: () => this.root_.setAttribute('aria-hidden', 'true'),
      unsetAriaHidden: () => this.root_.removeAttribute('aria-hidden'),
      setActionAriaHidden: () => getActionButton().setAttribute('aria-hidden', 'true'),
      unsetActionAriaHidden: () => getActionButton().removeAttribute('aria-hidden'),
      setActionText: (text) => {getActionButton().textContent = text;},
      setMessageText: (text) => {getText().textContent = text;},
      setFocus: () => getActionButton().focus(),
      visibilityIsHidden: () => document.hidden,
      registerCapturedBlurHandler: (handler) => getActionButton().addEventListener('blur', handler, true),
      deregisterCapturedBlurHandler: (handler) => getActionButton().removeEventListener('blur', handler, true),
      registerVisibilityChangeHandler: (handler) => document.addEventListener('visibilitychange', handler),
      deregisterVisibilityChangeHandler: (handler) => document.removeEventListener('visibilitychange', handler),
      registerCapturedInteractionHandler: (evt, handler) =>
        document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: (handler) => getActionButton().addEventListener('click', handler),
      deregisterActionClickHandler: (handler) => getActionButton().removeEventListener('click', handler),
      registerTransitionEndHandler:
        (handler) => this.root_.addEventListener(getCorrectEventName(window, 'transitionend'), handler),
      deregisterTransitionEndHandler:
        (handler) => this.root_.removeEventListener(getCorrectEventName(window, 'transitionend'), handler),
      notifyShow: () => this.emit(MDCSnackbarFoundation.strings.SHOW_EVENT),
      notifyHide: () => this.emit(MDCSnackbarFoundation.strings.HIDE_EVENT),
    });
  }

  get dismissesOnAction() {
    return this.foundation_.dismissesOnAction();
  }

  set dismissesOnAction(dismissesOnAction) {
    this.foundation_.setDismissOnAction(dismissesOnAction);
  }
}

class DemoSnackbarComponent {
    componentDidLoad() {
        const rootEl = this.el.shadowRoot.querySelector('.mdc-snackbar');
        this.snackbarToast = new MDCSnackbar(rootEl);
        this.snackbarToast.dismissesOnAction = true;
        // Compute events if there is any event add eventListeners
        if (this._computeEvents()) {
            this._computeEvents().forEach(el => {
                window.addEventListener(el, evt => {
                    const payload = {
                        message: `${evt.type} : ${JSON.stringify(evt.detail)} `,
                        actionText: 'Close',
                        multiline: false,
                        actionOnBottom: true,
                        actionHandler: () => false
                    };
                    this.snackbarToast.show(payload);
                }, false);
            });
        }
    }
    componentDidUnload() {
        this.snackbarToast.destroy();
        this._computeEvents().forEach(el => {
            window.removeEventListener(el, () => { }, true);
        });
    }
    _computeEvents() {
        return this.events && this.events !== '' ? this.events.split(',') : false;
    }
    render() {
        return (h("div", { class: "mdc-snackbar mdc-snackbar--align-start", "aria-live": "assertive", "aria-atomic": "true", "aria-hidden": "true" },
            h("div", { class: "mdc-snackbar__text" }),
            h("div", { class: "mdc-snackbar__action-wrapper" },
                h("button", { type: "button", class: "mdc-snackbar__action-button" }))));
    }
    static get is() { return "o-demo-snackbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "events": {
            "type": "Any",
            "attr": "events"
        }
    }; }
    static get style() { return "\n.sc-o-demo-snackbar-h {\n  --mdc-theme-primary: #fff;\n  --mdc-theme-text-primary-on-primary: #494949;\n  --mdc-theme-background: #c3c3c3; }\n\n.mdc-snackbar.sc-o-demo-snackbar {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding-right: 24px;\n  padding-left: 24px;\n  -webkit-transform: translate(-50%, 100%);\n  transform: translate(-50%, 100%);\n  -webkit-transition: -webkit-transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: -webkit-transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1);\n  background-color: #323232;\n  pointer-events: none;\n  will-change: transform; }\n  \@media (max-width: 599px) {\n    .mdc-snackbar.sc-o-demo-snackbar {\n      left: 0;\n      width: 100%;\n      -webkit-transform: translate(0, 100%);\n      transform: translate(0, 100%); } }\n  \@media (min-width: 600px) {\n    .mdc-snackbar.sc-o-demo-snackbar {\n      min-width: 288px;\n      max-width: 568px;\n      border-radius: 2px; } }\n\n\@media (min-width: 600px) {\n  .mdc-snackbar--align-start.sc-o-demo-snackbar {\n    \n    left: 24px;\n    \n    right: initial;\n    bottom: 24px;\n    -webkit-transform: translate(0, 200%);\n    transform: translate(0, 200%); }\n    [dir=\"rtl\"].sc-o-demo-snackbar   .mdc-snackbar--align-start.sc-o-demo-snackbar, .mdc-snackbar--align-start[dir=\"rtl\"].sc-o-demo-snackbar {\n      \n      left: initial;\n      \n      right: 24px; } }\n\n\@media (max-width: 599px) {\n  .mdc-snackbar--align-start.sc-o-demo-snackbar {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    -webkit-transform: translate(0, 100%);\n    transform: translate(0, 100%); } }\n\n.mdc-snackbar--active.sc-o-demo-snackbar {\n  -webkit-transform: translate(0);\n  transform: translate(0);\n  -webkit-transition: -webkit-transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: -webkit-transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1);\n  pointer-events: auto; }\n  .mdc-snackbar--active.sc-o-demo-snackbar:not(.mdc-snackbar--align-start) {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n    \@media (max-width: 599px) {\n      .mdc-snackbar--active.sc-o-demo-snackbar:not(.mdc-snackbar--align-start) {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        -webkit-transform: translate(0);\n        transform: translate(0); } }\n\n.mdc-snackbar__action-wrapper.sc-o-demo-snackbar {\n  \n  padding-left: 24px;\n  \n  padding-right: 0; }\n  [dir=\"rtl\"].sc-o-demo-snackbar   .mdc-snackbar__action-wrapper.sc-o-demo-snackbar, .mdc-snackbar__action-wrapper[dir=\"rtl\"].sc-o-demo-snackbar {\n    \n    padding-left: 0;\n    \n    padding-right: 24px; }\n\n.mdc-snackbar--action-on-bottom.sc-o-demo-snackbar {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.mdc-snackbar__text.sc-o-demo-snackbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.03125em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  \n  margin-left: 0;\n  \n  margin-right: auto;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 48px;\n  -webkit-transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  opacity: 0;\n  color: white; }\n  .mdc-snackbar[dir=\"rtl\"].sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar, [dir=\"rtl\"].sc-o-demo-snackbar   .mdc-snackbar.sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar {\n    \n    margin-left: auto;\n    \n    margin-right: 0; }\n  \@media (min-width: 600px) {\n    .mdc-snackbar__text.sc-o-demo-snackbar {\n      \n      padding-left: 0;\n      \n      padding-right: 24px; }\n      [dir=\"rtl\"].sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar, .mdc-snackbar__text[dir=\"rtl\"].sc-o-demo-snackbar {\n        \n        padding-left: 24px;\n        \n        padding-right: 0; } }\n\n.mdc-snackbar--action-on-bottom.sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar {\n  margin-right: inherit; }\n\n.mdc-snackbar--action-on-bottom.sc-o-demo-snackbar   .mdc-snackbar__action-wrapper.sc-o-demo-snackbar {\n  \n  margin-left: auto;\n  \n  margin-right: 0;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  margin-top: -12px;\n  margin-bottom: 8px; }\n  [dir=\"rtl\"].sc-o-demo-snackbar   .mdc-snackbar--action-on-bottom.sc-o-demo-snackbar   .mdc-snackbar__action-wrapper.sc-o-demo-snackbar, .mdc-snackbar--action-on-bottom.sc-o-demo-snackbar   .mdc-snackbar__action-wrapper[dir=\"rtl\"].sc-o-demo-snackbar {\n    \n    margin-left: 0;\n    \n    margin-right: auto; }\n\n.mdc-snackbar--multiline.sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar {\n  height: 80px; }\n\n.mdc-snackbar__action-button.sc-o-demo-snackbar {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: #018786;\n  \n  color: var(--mdc-theme-secondary, #018786);\n  padding: 0;\n  -webkit-transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  border: none;\n  outline: none;\n  background-color: transparent;\n  opacity: 0;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-appearance: none;\n  visibility: hidden; }\n  .mdc-snackbar__action-button.sc-o-demo-snackbar::-moz-focus-inner {\n    border: 0; }\n  .mdc-snackbar__action-button.sc-o-demo-snackbar:hover {\n    cursor: pointer; }\n  .mdc-snackbar__action-button.sc-o-demo-snackbar:not([aria-hidden]) {\n    visibility: inherit; }\n\n.mdc-snackbar--active.sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar, .mdc-snackbar--active.sc-o-demo-snackbar   .mdc-snackbar__action-button.sc-o-demo-snackbar:not([aria-hidden]) {\n  -webkit-transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  opacity: 1; }\n\n.mdc-snackbar--multiline.mdc-snackbar--action-on-bottom.sc-o-demo-snackbar   .mdc-snackbar__text.sc-o-demo-snackbar {\n  margin: 0; }\n\n.sc-o-demo-snackbar-h   .mdc-snackbar.sc-o-demo-snackbar {\n  z-index: 4; }\n"; }
}

export { DemoBarComponent as ODemoBar, DemoButtonsComponent as ODemoBarButtons, DemoSelectComponent as ODemoBarSelect, DemoToolbarComponent as ODemoBarToolbar, DemoDevicesComponent as ODemoDevices, DemoFabComponent as ODemoFab, DemoResizerComponent as ODemoResizer, DemoSnackbarComponent as ODemoSnackbar };
