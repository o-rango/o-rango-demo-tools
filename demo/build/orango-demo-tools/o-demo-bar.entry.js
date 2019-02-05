const h = window.OrangoDemoTools.h;

import { a as MDCRipple, b as MDCFoundation, c as MDCComponent } from './chunk-b0313d53.js';

class DemoBarComponent {
    constructor() {
        this.codeEditor = '';
        this.events = '';
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
    codeEditorChangedHandler(event) {
        console.log('code', event.detail);
        this._setIframe(event.detail);
    }
    selectedCaseChangedHandler(event) {
        this.caseOptionSelected = event.detail;
    }
    toolbarButtonClickedHandler(event) {
        switch (event.detail) {
            case 'code-editor':
                this.el.shadowRoot.querySelector('#modal-id').openDialog();
                document.addEventListener('on-editor-content', () => { console.log(this.codeEditor); });
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
                this.el.forceUpdate();
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
    _setIframe(code) {
        window.requestAnimationFrame(() => {
            this._cleanIframe();
            const iframeContainer = this.el.shadowRoot.querySelector('#iframeContainer');
            const iframe = document.createElement('iframe');
            const frameH = Math.max(document.documentElement.clientHeight);
            const frameW = this.deviceSize;
            const htmlContent = code ? code : this.demoCases[this.caseOptionSelected].querySelector('template').innerHTML;
            const html = code ? code : `<html><head></head><style>body{margin:0}</style><body unresolved ontouchstart id="frameBody">${htmlContent}</body></html>`;
            iframe.height = `${(frameH - 85).toString()}px`;
            iframe.width = `${frameW.toString()}px`;
            iframe.style.border = 'none';
            iframeContainer.appendChild(iframe);
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(html);
            iframe.contentWindow.document.close();
            this.codeEditor = html;
        });
    }
    render() {
        const bgClasses = { pattern: this.pattern && !this.deviceEmulate };
        const deviceClasses = { hide: this.deviceEmulate };
        // Templates for default view or Mobile View
        const defaultView = [h("div", { id: "iframeContainer", class: "defaultView" })];
        const mobileView = [h("o-demo-fab", null), h("o-demo-devices", null,
                h("div", { id: "iframeContainer", class: "pattern", slot: "screen" }))];
        return (h("div", { id: "demo-bar" },
            this.events.length !== 0 ? h("o-demo-snackbar", { events: this.events }) : null,
            h("o-demo-bar-toolbar", { name: this.name },
                h("o-demo-bar-select", { slot: "center", options: this.casesOptions }),
                h("o-demo-bar-buttons", { slot: "right" }),
                h("o-demo-resizer", { class: deviceClasses, size: this.deviceSize, viewport: this.device, slot: "base" })),
            h("div", { id: "frame-wrap", class: bgClasses }, this.deviceEmulate ? mobileView : defaultView)));
    }
    static get is() { return "o-demo-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "backgroundColor": {
            "type": String,
            "attr": "background-color"
        },
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
            "type": String,
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
            "name": "code-editor-changed",
            "method": "codeEditorChangedHandler"
        }, {
            "name": "selectedCaseChanged",
            "method": "selectedCaseChangedHandler"
        }, {
            "name": "toolbarButtonClicked",
            "method": "toolbarButtonClickedHandler"
        }, {
            "name": "resizeButtonClicked",
            "method": "resizeButtonClickedHandler"
        }]; }
    static get style() { return ":host #iframe-wrap{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;vertical-align:middle;z-index:0}:host .hide{display:none}:host o-demo-bar{z-index:999}:host o-demo-devices{margin-top:auto;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}:host #iframeContainer{margin:auto;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}:host #iframeContainer iframe{margin:0;border:0;position:relative;background-color:transparent;z-index:1}:host #iframeContainer.defaultView iframe{height:100vh}:host .bgcolor{background-color:rgba(0,0,0,0.04)}:host .pattern{-webkit-box-sizing:content-box;box-sizing:content-box;width:100%;height:100%;border:none;font:normal 100%/normal Arial, Helvetica, sans-serif;color:#fff;text-overflow:clip;background:linear-gradient(45deg, rgba(0,0,0,0.0980392) 25%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.0980392) 75%, rgba(0,0,0,0.0980392) 0),linear-gradient(45deg, rgba(0,0,0,0.0980392) 25%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.0980392) 75%, rgba(0,0,0,0.0980392) 0),#fff;background-position:0 0, 8px 8px;background-origin:padding-box;-webkit-background-clip:border-box;background-clip:border-box;background-size:16px 16px}"; }
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
    static get style() { return "\@-moz-document url-prefix(){:host .toolbar-icons{margin-top:1em}}:host .toolbar-button:focus{outline:none}:host .toolbar-button{-webkit-transition:all 200ms ease;transition:all 200ms ease;cursor:pointer;outline:none;background:none;border:none}:host .toolbar-button svg{fill:var(--o-demo-bar-buttons-color, #494949)}:host .toolbar-button.active svg{fill:var(--o-demo-bar-buttons-color, #8e8e8e)}"; }
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
class MDCFoundation$1 {
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
class MDCComponent$1 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$1(root, new MDCFoundation$1());
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
class MDCFoundation$2 {
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
class MDCComponent$2 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$2(root, new MDCFoundation$2());
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

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Floating Label.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the floating label into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCFloatingLabelAdapter {
  /**
   * Adds a class to the label element.
   * @param {string} className
   */
  addClass(className) {}

  /**
   * Removes a class from the label element.
   * @param {string} className
   */
  removeClass(className) {}

  /**
   * Returns the width of the label element.
   * @return {number}
   */
  getWidth() {}

  /**
   * Registers an event listener on the root element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerInteractionHandler(evtType, handler) {}

  /**
   * Deregisters an event listener on the root element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterInteractionHandler(evtType, handler) {}
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
class MDCFloatingLabelFoundation extends MDCFoundation$2 {
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
class MDCFloatingLabel extends MDCComponent$2 {
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
class MDCFoundation$3 {
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
class MDCComponent$3 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$3(root, new MDCFoundation$3());
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

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC TextField Line Ripple.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the line ripple into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCLineRippleAdapter {
  /**
   * Adds a class to the line ripple element.
   * @param {string} className
   */
  addClass(className) {}

  /**
   * Removes a class from the line ripple element.
   * @param {string} className
   */
  removeClass(className) {}

  /**
   * @param {string} className
   * @return {boolean}
   */
  hasClass(className) {}

  /**
   * Sets the style property with propertyName to value on the root element.
   * @param {string} propertyName
   * @param {string} value
   */
  setStyle(propertyName, value) {}

  /**
   * Registers an event listener on the line ripple element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerEventHandler(evtType, handler) {}

  /**
   * Deregisters an event listener on the line ripple element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterEventHandler(evtType, handler) {}
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
class MDCLineRippleFoundation extends MDCFoundation$3 {
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
class MDCLineRipple extends MDCComponent$3 {
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

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCRippleAdapter {
  /** @return {boolean} */
  browserSupportsCssVars() {}

  /** @return {boolean} */
  isUnbounded() {}

  /** @return {boolean} */
  isSurfaceActive() {}

  /** @return {boolean} */
  isSurfaceDisabled() {}

  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /** @param {!EventTarget} target */
  containsEventTarget(target) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  registerInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  deregisterInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  registerDocumentInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  deregisterDocumentInteractionHandler(evtType, handler) {}

  /**
   * @param {!Function} handler
   */
  registerResizeHandler(handler) {}

  /**
   * @param {!Function} handler
   */
  deregisterResizeHandler(handler) {}

  /**
   * @param {string} varName
   * @param {?number|string} value
   */
  updateCssVariable(varName, value) {}

  /** @return {!ClientRect} */
  computeBoundingRect() {}

  /** @return {{x: number, y: number}} */
  getWindowPageOffset() {}
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

/**
 * @typedef {{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
let ActivationStateType;

/**
 * @typedef {{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
let ListenerInfoType;

/**
 * @typedef {{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
let ListenersType;

/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }}
 */
let PointType;

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
class MDCRippleFoundation extends MDCFoundation$1 {
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
  supportsPressRipple_() {
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
    const supportsPressRipple = this.supportsPressRipple_();

    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
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
  }

  /** @override */
  destroy() {
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        const {FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
        this.adapter_.removeClass(FG_ACTIVATION);
      }

      const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.removeClass(ROOT);
        this.adapter_.removeClass(UNBOUNDED);
        this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  }

  /**
   * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
   * @private
   */
  registerRootHandlers_(supportsPressRipple) {
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach((type) => {
        this.adapter_.registerInteractionHandler(type, this.activateHandler_);
      });
      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
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
class MDCRipple$1 extends MDCComponent$1 {
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
    const ripple = new MDCRipple$1(root);
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
    return new MDCRippleFoundation(MDCRipple$1.createAdapter(this));
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
class MDCFoundation$4 {
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
class MDCComponent$4 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$4(root, new MDCFoundation$4());
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

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Notched Outline.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Notched Outline into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCNotchedOutlineAdapter {
  /**
   * Returns the width of the root element.
   * @return {number}
   */
  getWidth() {}

  /**
   * Returns the height of the root element.
   * @return {number}
   */
  getHeight() {}

  /**
   * Adds a class to the root element.
   * @param {string} className
   */
  addClass(className) {}

  /**
   * Removes a class from the root element.
   * @param {string} className
   */
  removeClass(className) {}

  /**
   * Sets the "d" attribute of the outline element's SVG path.
   * @param {string} value
   */
  setOutlinePathAttr(value) {}

  /**
   * Returns the idle outline element's computed style value of the given css property `propertyName`.
   * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
   * @param {string} propertyName
   * @return {string}
   */
  getIdleOutlineStyleValue(propertyName) {}
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
class MDCNotchedOutlineFoundation extends MDCFoundation$4 {
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
class MDCNotchedOutline extends MDCComponent$4 {
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

class MDCSelectFoundation extends MDCFoundation$1 {
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

class MDCSelect extends MDCComponent$1 {
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
    const adapter = Object.assign(MDCRipple$1.createAdapter(this), {
      registerInteractionHandler: (type, handler) => this.nativeControl_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.nativeControl_.removeEventListener(type, handler),
    });
    const foundation = new MDCRippleFoundation(adapter);
    return new MDCRipple$1(this.root_, foundation);
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
        this.select.selectedIndex = sessionStorage.getItem('o-demo-key') <= this.options.length ? sessionStorage.getItem('o-demo-key') : 0;
        this.emitChange();
        this.select.listen('change', () => {
            this.emitChange();
        });
    }
    emitChange() {
        document.title = this.options[this.select.selectedIndex];
        sessionStorage.setItem('o-demo-key', this.select.selectedIndex);
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
    static get style() { return "\@-webkit-keyframes mdc-select-float-native-control{0%{-webkit-transform:translateY(8px);transform:translateY(8px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}\@keyframes mdc-select-float-native-control{0%{-webkit-transform:translateY(8px);transform:translateY(8px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}.mdc-line-ripple{position:absolute;bottom:0;left:0;width:100%;height:2px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;z-index:2}.mdc-line-ripple--active{-webkit-transform:scaleX(1);transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating{opacity:0}.mdc-notched-outline{position:absolute;top:0;left:0;width:calc(100% - 1px);height:calc(100% - 2px);-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;overflow:hidden}.mdc-notched-outline svg{position:absolute;width:100%;height:100%}.mdc-notched-outline__idle{position:absolute;top:0;left:0;width:calc(100% - 4px);height:calc(100% - 4px);-webkit-transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);border:1px solid;opacity:1}.mdc-notched-outline__path{stroke-width:1px;-webkit-transition:stroke 150ms cubic-bezier(0.4, 0, 0.2, 1),stroke-width 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:stroke 150ms cubic-bezier(0.4, 0, 0.2, 1),stroke-width 150ms cubic-bezier(0.4, 0, 0.2, 1);fill:transparent}.mdc-notched-outline--notched{opacity:1}.mdc-notched-outline--notched ~ .mdc-notched-outline__idle{opacity:0}.mdc-floating-label{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;position:absolute;bottom:8px;left:0;-webkit-transform-origin:left top;transform-origin:left top;-webkit-transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);line-height:1.15rem;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=\"rtl\"] .mdc-floating-label,.mdc-floating-label[dir=\"rtl\"]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--float-above{-webkit-transform:translateY(-100%) scale(.75);transform:translateY(-100%) scale(.75)}.mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-standard 250ms 1;animation:mdc-floating-label-shake-float-above-standard 250ms 1}\@-webkit-keyframes mdc-floating-label-shake-float-above-standard{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.70173, 0.49582);animation-timing-function:cubic-bezier(0.5, 0, 0.70173, 0.49582);-webkit-transform:translateX(calc(4% - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(4% - 0%)) translateY(-100%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);animation-timing-function:cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(-4% - 0%)) translateY(-100%) scale(.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75)}}\@keyframes mdc-floating-label-shake-float-above-standard{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.70173, 0.49582);animation-timing-function:cubic-bezier(0.5, 0, 0.70173, 0.49582);-webkit-transform:translateX(calc(4% - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(4% - 0%)) translateY(-100%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);animation-timing-function:cubic-bezier(0.30244, 0.38135, 0.55, 0.95635);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(-4% - 0%)) translateY(-100%) scale(.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75);transform:translateX(calc(0 - 0%)) translateY(-100%) scale(.75)}}\@-webkit-keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}\@keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}\@keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-select{background-image:url(\"data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%22.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E\");display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;height:52px;background-repeat:no-repeat;background-position:right 8px bottom 12px}.mdc-select:not(.mdc-select--disabled){background-color:rgba(0,0,0,0)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control{color:rgba(0,0,0,0.87)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0,0,0,0.6)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control{border-bottom-color:rgba(0,0,0,0.42)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control:focus ~ .mdc-line-ripple{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control:focus ~ .mdc-floating-label{color:rgba(98,0,238,0.87)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control:hover{border-bottom-color:rgba(0,0,0,0.87)}[dir=\"rtl\"] .mdc-select,.mdc-select[dir=\"rtl\"]{background-position:left 8px bottom 12px}.mdc-select__native-control{padding-left:0;padding-right:26px;font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;width:100%;padding-top:20px;padding-bottom:4px;border:none;border-bottom:1px solid;border-radius:0;outline:none;background-color:transparent;white-space:nowrap;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}[dir=\"rtl\"] .mdc-select__native-control,.mdc-select__native-control[dir=\"rtl\"]{padding-left:26px;padding-right:0}.mdc-select__native-control::-ms-expand{display:none}\@-moz-document url-prefix(\"\"){.mdc-select__native-control{text-indent:-2px}}.mdc-select .mdc-floating-label{pointer-events:none}.mdc-select .mdc-select__native-control:focus ~ .mdc-line-ripple::after{-webkit-transform:scale(1, 2);transform:scale(1, 2);opacity:1}.mdc-select--box{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform, opacity;height:56px;border-radius:4px 4px 0 0;background-position:right 10px center;overflow:hidden}.mdc-select--box:not(.mdc-select--disabled){background-color:#f5f5f5}.mdc-select--box::before,.mdc-select--box::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-select--box::before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-select--box.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select--box.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-select--box.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-select--box.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards;animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards}.mdc-select--box.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:150ms mdc-ripple-fg-opacity-out;animation:150ms mdc-ripple-fg-opacity-out;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select--box::before,.mdc-select--box::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-select--box.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-select--box::before,.mdc-select--box::after{background-color:rgba(0,0,0,0.87)}.mdc-select--box:hover::before{opacity:.04}.mdc-select--box:not(.mdc-ripple-upgraded):focus::before,.mdc-select--box:not(.mdc-ripple-upgraded):focus-within::before,.mdc-select--box.mdc-ripple-upgraded--background-focused::before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}[dir=\"rtl\"] .mdc-select--box,.mdc-select--box[dir=\"rtl\"]{background-position:left 10px center}.mdc-select--box .mdc-select__native-control{padding-left:16px;padding-right:26px;height:56px;border-radius:4px 4px 0 0}[dir=\"rtl\"] .mdc-select--box .mdc-select__native-control,.mdc-select--box .mdc-select__native-control[dir=\"rtl\"]{padding-left:26px;padding-right:16px}.mdc-select--box .mdc-floating-label{left:16px;right:initial;bottom:12px;line-height:1.75rem}[dir=\"rtl\"] .mdc-select--box .mdc-floating-label,.mdc-select--box .mdc-floating-label[dir=\"rtl\"]{left:initial;right:16px}.mdc-select--box .mdc-floating-label--float-above{-webkit-transform:translateY(-40%) scale(0.75, 0.75);transform:translateY(-40%) scale(0.75, 0.75)}.mdc-select--outlined{height:56px;border:none;background-position:right 10px center}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__idle{border-color:rgba(0,0,0,0.24)}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__path{stroke:rgba(0,0,0,0.24)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select__native-control:focus) .mdc-select__native-control:hover ~ .mdc-notched-outline__idle{border-color:rgba(0,0,0,0.87)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select__native-control:focus) .mdc-select__native-control:hover ~ .mdc-notched-outline .mdc-notched-outline__path{stroke:rgba(0,0,0,0.87)}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__native-control:focus ~ .mdc-notched-outline .mdc-notched-outline__path{stroke-width:2px}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__native-control:focus ~ .mdc-notched-outline .mdc-notched-outline__path{stroke:#6200ee;stroke:var(--mdc-theme-primary, #6200ee)}.mdc-select--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-130%) scale(.75);transform:translateY(-130%) scale(.75)}.mdc-select--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1;animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}.mdc-select--outlined .mdc-notched-outline{border-radius:4px}.mdc-select--outlined .mdc-notched-outline__idle{border-radius:4px}[dir=\"rtl\"] .mdc-select--outlined,.mdc-select--outlined[dir=\"rtl\"]{background-position:left 10px center}.mdc-select--outlined .mdc-select__native-control{padding-left:16px;padding-right:26px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding-top:12px;padding-bottom:12px;border:none;background-color:transparent;z-index:1}[dir=\"rtl\"] .mdc-select--outlined .mdc-select__native-control,.mdc-select--outlined .mdc-select__native-control[dir=\"rtl\"]{padding-left:26px;padding-right:16px}.mdc-select--outlined .mdc-floating-label{left:16px;right:initial;position:absolute;bottom:20px}[dir=\"rtl\"] .mdc-select--outlined .mdc-floating-label,.mdc-select--outlined .mdc-floating-label[dir=\"rtl\"]{left:initial;right:16px}.mdc-select--disabled{background-image:url(\"data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23#000%22%20fill-rule%3D%22evenodd%22%20opacity%3D%22.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E\");opacity:.38;cursor:default;pointer-events:none}.mdc-select--disabled .mdc-floating-label{color:rgba(0,0,0,0.37)}.mdc-select--disabled .mdc-line-ripple{display:none}.mdc-select--disabled .mdc-select__native-control{border-bottom-style:dotted}.mdc-select--disabled.mdc-select--box{background-color:#fafafa}.mdc-select--disabled.mdc-select--outlined .mdc-select__native-control{border-bottom-style:none}.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__idle{border-color:rgba(0,0,0,0.16)}.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__path{stroke:rgba(0,0,0,0.16)}:host{z-index:9999}:host label.mdc-floating-label.mdc-floating-label--float-above{color:grey !important}:host .mdc-floating-label{color:grey}:host .mdc-select{min-width:25em}\@media only screen and (max-width: 780px){:host .mdc-select{min-width:20em;width:80%}}"; }
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
class MDCFoundation$5 {
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
class MDCComponent$5 {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent$5(root, new MDCFoundation$5());
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

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCRippleAdapter$1 {
  /** @return {boolean} */
  browserSupportsCssVars() {}

  /** @return {boolean} */
  isUnbounded() {}

  /** @return {boolean} */
  isSurfaceActive() {}

  /** @return {boolean} */
  isSurfaceDisabled() {}

  /** @param {string} className */
  addClass(className) {}

  /** @param {string} className */
  removeClass(className) {}

  /** @param {!EventTarget} target */
  containsEventTarget(target) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  registerInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  deregisterInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  registerDocumentInteractionHandler(evtType, handler) {}

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */
  deregisterDocumentInteractionHandler(evtType, handler) {}

  /**
   * @param {!Function} handler
   */
  registerResizeHandler(handler) {}

  /**
   * @param {!Function} handler
   */
  deregisterResizeHandler(handler) {}

  /**
   * @param {string} varName
   * @param {?number|string} value
   */
  updateCssVariable(varName, value) {}

  /** @return {!ClientRect} */
  computeBoundingRect() {}

  /** @return {{x: number, y: number}} */
  getWindowPageOffset() {}
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

const cssClasses$5 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
};

const strings$3 = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
};

const numbers$2 = {
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
let supportsCssVariables_$1;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
let supportsPassive_$1;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug$1(windowObj) {
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

function supportsCssVariables$1(windowObj, forceRefresh = false) {
  let supportsCssVariables = supportsCssVariables_$1;
  if (typeof supportsCssVariables_$1 === 'boolean' && !forceRefresh) {
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
    supportsCssVariables = !detectEdgePseudoVarBug$1(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_$1 = supportsCssVariables;
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
function applyPassive$1(globalObj = window, forceRefresh = false) {
  if (supportsPassive_$1 === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_$1 = isSupported;
  }

  return supportsPassive_$1 ? {passive: true} : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty$1(HTMLElementPrototype) {
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
function getNormalizedEventCoords$1(ev, pageOffset, clientRect) {
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

/**
 * @typedef {{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
let ActivationStateType$1;

/**
 * @typedef {{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
let ListenerInfoType$1;

/**
 * @typedef {{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
let ListenersType$1;

/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }}
 */
let PointType$1;

// Activation events registered on the root element of each instance for activation
const ACTIVATION_EVENT_TYPES$1 = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
const POINTER_DEACTIVATION_EVENT_TYPES$1 = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
let activatedTargets$1 = [];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */
class MDCRippleFoundation$1 extends MDCFoundation$5 {
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
    super(Object.assign(MDCRippleFoundation$1.defaultAdapter, adapter));

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
  supportsPressRipple_() {
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
    const supportsPressRipple = this.supportsPressRipple_();

    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      const {ROOT, UNBOUNDED} = MDCRippleFoundation$1.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.addClass(ROOT);
        if (this.adapter_.isUnbounded()) {
          this.adapter_.addClass(UNBOUNDED);
          // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
          this.layoutInternal_();
        }
      });
    }
  }

  /** @override */
  destroy() {
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        const {FG_ACTIVATION} = MDCRippleFoundation$1.cssClasses;
        this.adapter_.removeClass(FG_ACTIVATION);
      }

      const {ROOT, UNBOUNDED} = MDCRippleFoundation$1.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.removeClass(ROOT);
        this.adapter_.removeClass(UNBOUNDED);
        this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  }

  /**
   * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
   * @private
   */
  registerRootHandlers_(supportsPressRipple) {
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES$1.forEach((type) => {
        this.adapter_.registerInteractionHandler(type, this.activateHandler_);
      });
      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  }

  /**
   * @param {!Event} e
   * @private
   */
  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES$1.forEach((type) => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }

  /** @private */
  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES$1.forEach((type) => {
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
    POINTER_DEACTIVATION_EVENT_TYPES$1.forEach((type) => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }

  /** @private */
  removeCssVars_() {
    const {strings} = MDCRippleFoundation$1;
    Object.keys(strings).forEach((k) => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings[k], null);
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
      e && activatedTargets$1.length > 0 && activatedTargets$1.some((target) => this.adapter_.containsEventTarget(target));
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets$1.push(/** @type {!EventTarget} */ (e.target));
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets$1 = [];

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
    const {VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END} = MDCRippleFoundation$1.strings;
    const {FG_DEACTIVATION, FG_ACTIVATION} = MDCRippleFoundation$1.cssClasses;
    const {DEACTIVATION_TIMEOUT_MS} = MDCRippleFoundation$1.numbers;

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
      startPoint = getNormalizedEventCoords$1(
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
    const {FG_DEACTIVATION} = MDCRippleFoundation$1.cssClasses;
    const {hasDeactivationUXRun, isActivated} = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers$2.FG_DEACTIVATION_MS);
    }
  }

  /** @private */
  rmBoundedActivationClasses_() {
    const {FG_ACTIVATION} = MDCRippleFoundation$1.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation$1.numbers.TAP_DELAY_MS);
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
      return hypotenuse + MDCRippleFoundation$1.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = maxDim * MDCRippleFoundation$1.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;

    this.updateLayoutCssVars_();
  }

  /** @private */
  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE, VAR_LEFT, VAR_TOP, VAR_FG_SCALE,
    } = MDCRippleFoundation$1.strings;

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
    const {UNBOUNDED} = MDCRippleFoundation$1.cssClasses;
    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

  handleFocus() {
    requestAnimationFrame(() =>
      this.adapter_.addClass(MDCRippleFoundation$1.cssClasses.BG_FOCUSED));
  }

  handleBlur() {
    requestAnimationFrame(() =>
      this.adapter_.removeClass(MDCRippleFoundation$1.cssClasses.BG_FOCUSED));
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
class MDCRipple$2 extends MDCComponent$5 {
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
    const ripple = new MDCRipple$2(root);
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
    const MATCHES = getMatchesProperty$1(HTMLElement.prototype);

    return {
      browserSupportsCssVars: () => supportsCssVariables$1(window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      isSurfaceDisabled: () => instance.disabled,
      addClass: (className) => instance.root_.classList.add(className),
      removeClass: (className) => instance.root_.classList.remove(className),
      containsEventTarget: (target) => instance.root_.contains(target),
      registerInteractionHandler: (evtType, handler) =>
        instance.root_.addEventListener(evtType, handler, applyPassive$1()),
      deregisterInteractionHandler: (evtType, handler) =>
        instance.root_.removeEventListener(evtType, handler, applyPassive$1()),
      registerDocumentInteractionHandler: (evtType, handler) =>
        document.documentElement.addEventListener(evtType, handler, applyPassive$1()),
      deregisterDocumentInteractionHandler: (evtType, handler) =>
        document.documentElement.removeEventListener(evtType, handler, applyPassive$1()),
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
    return new MDCRippleFoundation$1(MDCRipple$2.createAdapter(this));
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
class RippleCapableSurface$1 {}

/** @protected {!Element} */
RippleCapableSurface$1.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface$1.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface$1.prototype.disabled;

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

const cssClasses$6 = {
  FIXED: 'mdc-toolbar--fixed',
  FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
  FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
  TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
  FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
  FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
  FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized',
};

const strings$4 = {
  TITLE_SELECTOR: '.mdc-toolbar__title',
  ICON_SELECTOR: '.mdc-toolbar__icon',
  FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
  CHANGE_EVENT: 'MDCToolbar:change',
};

const numbers$3 = {
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

class MDCToolbarFoundation extends MDCFoundation$5 {
  static get cssClasses() {
    return cssClasses$6;
  }

  static get strings() {
    return strings$4;
  }

  static get numbers() {
    return numbers$3;
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

class MDCToolbar extends MDCComponent$5 {
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
      const ripple = MDCRipple$2.attachTo(icon);
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
    static get style() { return ".mdc-toolbar{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee);color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}.mdc-toolbar .mdc-toolbar__icon{color:#fff}.mdc-toolbar .mdc-toolbar__icon::before,.mdc-toolbar .mdc-toolbar__icon::after{background-color:#fff}.mdc-toolbar .mdc-toolbar__icon:hover::before{opacity:.08}.mdc-toolbar .mdc-toolbar__icon:not(.mdc-ripple-upgraded):focus::before,.mdc-toolbar .mdc-toolbar__icon.mdc-ripple-upgraded--background-focused::before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.24}.mdc-toolbar .mdc-toolbar__icon:not(.mdc-ripple-upgraded)::after{-webkit-transition:opacity 150ms linear;transition:opacity 150ms linear}.mdc-toolbar .mdc-toolbar__icon:not(.mdc-ripple-upgraded):active::after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.32}.mdc-toolbar .mdc-toolbar__icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: .32}.mdc-toolbar__row{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:auto;min-height:64px}\@media (max-width: 959px) and (orientation: landscape){.mdc-toolbar__row{min-height:48px}}\@media (max-width: 599px){.mdc-toolbar__row{min-height:56px}}.mdc-toolbar__section{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-align:start;-webkit-align-items:start;-ms-flex-align:start;align-items:start;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0;height:100%;padding:8px;z-index:1}\@media (max-width: 959px) and (orientation: landscape){.mdc-toolbar__section{padding:0}}\@media (max-width: 599px){.mdc-toolbar__section{padding:4px 0}}.mdc-toolbar__section--align-start{padding-left:12px;padding-right:0;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;order:-1}[dir=\"rtl\"] .mdc-toolbar__section--align-start,.mdc-toolbar__section--align-start[dir=\"rtl\"]{padding-left:0;padding-right:12px}\@media (max-width: 959px) and (orientation: landscape){.mdc-toolbar__section--align-start{padding-left:4px;padding-right:0}[dir=\"rtl\"] .mdc-toolbar__section--align-start,.mdc-toolbar__section--align-start[dir=\"rtl\"]{padding-left:0;padding-right:4px}}\@media (max-width: 599px){.mdc-toolbar__section--align-start{padding-left:4px;padding-right:0}[dir=\"rtl\"] .mdc-toolbar__section--align-start,.mdc-toolbar__section--align-start[dir=\"rtl\"]{padding-left:0;padding-right:4px}}.mdc-toolbar__section--align-end{padding-left:0;padding-right:12px;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-ordinal-group:2;-webkit-order:1;-ms-flex-order:1;order:1}[dir=\"rtl\"] .mdc-toolbar__section--align-end,.mdc-toolbar__section--align-end[dir=\"rtl\"]{padding-left:12px;padding-right:0}\@media (max-width: 959px) and (orientation: landscape){.mdc-toolbar__section--align-end{padding-left:0;padding-right:4px}[dir=\"rtl\"] .mdc-toolbar__section--align-end,.mdc-toolbar__section--align-end[dir=\"rtl\"]{padding-left:4px;padding-right:0}}\@media (max-width: 599px){.mdc-toolbar__section--align-end{padding-left:0;padding-right:4px}[dir=\"rtl\"] .mdc-toolbar__section--align-end,.mdc-toolbar__section--align-end[dir=\"rtl\"]{padding-left:4px;padding-right:0}}.mdc-toolbar__title{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-left:24px;margin-right:0;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:12px 0;line-height:1.5rem;z-index:1}[dir=\"rtl\"] .mdc-toolbar__title,.mdc-toolbar__title[dir=\"rtl\"]{margin-left:0;margin-right:24px}.mdc-toolbar__icon,.mdc-toolbar__menu-icon{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform, opacity;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;-webkit-box-align:start;-webkit-align-items:start;-ms-flex-align:start;align-items:start;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:48px;height:48px;padding:12px;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer}.mdc-toolbar__icon::before,.mdc-toolbar__icon::after,.mdc-toolbar__menu-icon::before,.mdc-toolbar__menu-icon::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-toolbar__icon::before,.mdc-toolbar__menu-icon::before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-toolbar__icon.mdc-ripple-upgraded::before,.mdc-toolbar__menu-icon.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-toolbar__icon.mdc-ripple-upgraded::after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-toolbar__icon.mdc-ripple-upgraded--unbounded::after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-toolbar__icon.mdc-ripple-upgraded--foreground-activation::after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards;animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards}.mdc-toolbar__icon.mdc-ripple-upgraded--foreground-deactivation::after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:150ms mdc-ripple-fg-opacity-out;animation:150ms mdc-ripple-fg-opacity-out;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-toolbar__icon::before,.mdc-toolbar__icon::after,.mdc-toolbar__menu-icon::before,.mdc-toolbar__menu-icon::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-toolbar__icon.mdc-ripple-upgraded::before,.mdc-toolbar__icon.mdc-ripple-upgraded::after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded::before,.mdc-toolbar__menu-icon.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-toolbar__icon.mdc-ripple-upgraded::after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-toolbar__menu-icon+.mdc-toolbar__title{margin-left:8px;margin-right:0}[dir=\"rtl\"] .mdc-toolbar__menu-icon+.mdc-toolbar__title,.mdc-toolbar__menu-icon+.mdc-toolbar__title[dir=\"rtl\"]{margin-left:0;margin-right:8px}\@media (max-width: 599px){.mdc-toolbar__title{margin-left:16px;margin-right:0}[dir=\"rtl\"] .mdc-toolbar__title,.mdc-toolbar__title[dir=\"rtl\"]{margin-left:0;margin-right:16px}}.mdc-toolbar--fixed{-webkit-box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);position:fixed;top:0;left:0;z-index:4}.mdc-toolbar--flexible{--mdc-toolbar-ratio-to-extend-flexible: 4}.mdc-toolbar--flexible .mdc-toolbar__row:first-child{height:256px;height:calc(64px * var(--mdc-toolbar-ratio-to-extend-flexible, 4))}\@media (max-width: 599px){.mdc-toolbar--flexible .mdc-toolbar__row:first-child{height:224px;height:calc(56px * var(--mdc-toolbar-ratio-to-extend-flexible, 4))}}.mdc-toolbar--flexible .mdc-toolbar__row:first-child::after{position:absolute;content:\"\"}.mdc-toolbar--flexible-default-behavior .mdc-toolbar__title{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;line-height:1.5rem}.mdc-toolbar--flexible-default-behavior .mdc-toolbar__row:first-child::after{top:0;left:0;width:100%;height:100%;-webkit-transition:opacity .2s ease;transition:opacity .2s ease;opacity:1}.mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized .mdc-toolbar__row:first-child::after{opacity:0}.mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized .mdc-toolbar__title{font-weight:500}.mdc-toolbar--waterfall.mdc-toolbar--fixed{-webkit-box-shadow:0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12);box-shadow:0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12);-webkit-transition:-webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);will-change:box-shadow}.mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--flexible-space-minimized{-webkit-box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)}.mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--flexible-space-minimized{-webkit-box-shadow:0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12);box-shadow:0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)}.mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--fixed-at-last-row{-webkit-box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)}.mdc-toolbar-fixed-adjust{margin-top:64px}\@media (max-width: 959px) and (max-height: 599px){.mdc-toolbar-fixed-adjust{margin-top:48px}}\@media (max-width: 599px){.mdc-toolbar-fixed-adjust{margin-top:56px}}.mdc-toolbar__section--shrink-to-fit{-webkit-box-flex:0;-webkit-flex:none;-ms-flex:none;flex:none}:host{--mdc-theme-primary: #fff;--mdc-theme-text-primary-on-primary: #494949;--mdc-theme-background: #c3c3c3;--vh: 1vh;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}:host section{margin:0 1.5em 0 1.2em;transition:opacity .25s ease-in-out;-moz-transition:opacity .25s ease-in-out;-webkit-transition:opacity .25s ease-in-out}:host section .mdc-typography--subheading2{color:var(--mdc-theme-text-primary-on-primary, black);font-size:1.1rem;text-overflow:ellipsis}\@media only screen and (max-width: 700px){:host #left-panel{display:none}:host #right-panel{display:none}}"; }
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
        this.el.forceUpdate();
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
        this._sizeFrame();
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
    static get style() { return ":host .marvel-device{display:inline-block;position:relative;-webkit-box-sizing:content-box !important;box-sizing:content-box !important}:host .marvel-device .screen{width:100%;position:relative;height:100%;z-index:3;background:white;overflow:hidden;display:block;border-radius:1px;-webkit-box-shadow:0 0 0 3px #111;box-shadow:0 0 0 3px #111}:host .marvel-device .top-bar,:host .marvel-device .bottom-bar{height:3px;background:black;width:100%;display:block}:host .marvel-device .middle-bar{width:3px;height:4px;top:0px;left:90px;background:black;position:absolute}:host .marvel-device.iphone8{width:375px;height:667px;padding:105px 24px;background:#d9dbdc;border-radius:56px;-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.2);box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.2)}:host .marvel-device.iphone8:before{width:calc(100% - 12px);height:calc(100% - 12px);position:absolute;top:6px;content:'';left:6px;border-radius:50px;background:#f8f8f8;z-index:1}:host .marvel-device.iphone8:after{width:calc(100% - 16px);height:calc(100% - 16px);position:absolute;top:8px;content:'';left:8px;border-radius:48px;-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #fff;box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #fff;z-index:2}:host .marvel-device.iphone8 .home{border-radius:100%;width:68px;height:68px;position:absolute;left:50%;margin-left:-34px;bottom:22px;z-index:3;background:#303233;background:linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%)}:host .marvel-device.iphone8 .home:before{background:#f8f8f8;position:absolute;content:'';border-radius:100%;width:calc(100% - 8px);height:calc(100% - 8px);top:4px;left:4px}:host .marvel-device.iphone8 .top-bar{height:14px;background:#bfbfc0;position:absolute;top:68px;left:0}:host .marvel-device.iphone8 .bottom-bar{height:14px;background:#bfbfc0;position:absolute;bottom:68px;left:0}:host .marvel-device.iphone8 .sleep{position:absolute;top:190px;right:-4px;width:4px;height:66px;border-radius:0px 2px 2px 0px;background:#d9dbdc}:host .marvel-device.iphone8 .volume{position:absolute;left:-4px;top:188px;z-index:0;height:66px;width:4px;border-radius:2px 0px 0px 2px;background:#d9dbdc}:host .marvel-device.iphone8 .volume:before{position:absolute;left:2px;top:-78px;height:40px;width:2px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone8 .volume:after{position:absolute;left:0px;top:82px;height:66px;width:4px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone8 .camera{background:#3c3d3d;width:12px;height:12px;position:absolute;top:24px;left:50%;margin-left:-6px;border-radius:100%;z-index:3}:host .marvel-device.iphone8 .sensor{background:#3c3d3d;width:16px;height:16px;position:absolute;top:49px;left:134px;z-index:3;border-radius:100%}:host .marvel-device.iphone8 .speaker{background:#292728;width:70px;height:6px;position:absolute;top:54px;left:50%;margin-left:-35px;border-radius:6px;z-index:3}:host .marvel-device.iphone8.gold{background:#f9e7d3}:host .marvel-device.iphone8.gold .top-bar,:host .marvel-device.iphone8.gold .bottom-bar{background:white}:host .marvel-device.iphone8.gold .sleep,:host .marvel-device.iphone8.gold .volume{background:#f9e7d3}:host .marvel-device.iphone8.gold .home{background:#cebba9;background:linear-gradient(135deg, #cebba9 0%, #f9e7d3 50%, #cebba9 100%)}:host .marvel-device.iphone8.black{background:#464646;-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.7);box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.7)}:host .marvel-device.iphone8.black:before{background:#080808}:host .marvel-device.iphone8.black:after{-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #212121;box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #212121}:host .marvel-device.iphone8.black .top-bar,:host .marvel-device.iphone8.black .bottom-bar{background:#212121}:host .marvel-device.iphone8.black .volume,:host .marvel-device.iphone8.black .sleep{background:#464646}:host .marvel-device.iphone8.black .camera{background:#080808}:host .marvel-device.iphone8.black .home{background:#080808;background:linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%)}:host .marvel-device.iphone8.black .home:before{background:#080808}:host .marvel-device.iphone8.landscape{padding:24px 105px;height:375px;width:667px}:host .marvel-device.iphone8.landscape .sleep{top:100%;border-radius:0px 0px 2px 2px;right:190px;height:4px;width:66px}:host .marvel-device.iphone8.landscape .volume{width:66px;height:4px;top:-4px;left:calc(100% - 188px - 66px);border-radius:2px 2px 0px 0px}:host .marvel-device.iphone8.landscape .volume:before{width:40px;height:2px;top:2px;right:-78px;left:auto;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone8.landscape .volume:after{left:-82px;width:66px;height:4px;top:0;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone8.landscape .top-bar{width:14px;height:100%;left:calc(100% - 68px -  14px);top:0}:host .marvel-device.iphone8.landscape .bottom-bar{width:14px;height:100%;left:68px;top:0}:host .marvel-device.iphone8.landscape .home{top:50%;margin-top:-34px;margin-left:0;left:22px}:host .marvel-device.iphone8.landscape .sensor{top:134px;left:calc(100% - 49px - 16px)}:host .marvel-device.iphone8.landscape .speaker{height:70px;width:6px;left:calc(100% - 54px - 6px);top:50%;margin-left:0px;margin-top:-35px}:host .marvel-device.iphone8.landscape .camera{left:calc(100% - 32px);top:50%;margin-left:0px;margin-top:-5px}:host .marvel-device.iphone8plus{width:414px;height:736px;padding:112px 26px;background:#d9dbdc;border-radius:56px;-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.2);box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.2)}:host .marvel-device.iphone8plus:before{width:calc(100% - 12px);height:calc(100% - 12px);position:absolute;top:6px;content:'';left:6px;border-radius:50px;background:#f8f8f8;z-index:1}:host .marvel-device.iphone8plus:after{width:calc(100% - 16px);height:calc(100% - 16px);position:absolute;top:8px;content:'';left:8px;border-radius:48px;-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #fff;box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #fff;z-index:2}:host .marvel-device.iphone8plus .home{border-radius:100%;width:68px;height:68px;position:absolute;left:50%;margin-left:-34px;bottom:24px;z-index:3;background:#303233;background:linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%)}:host .marvel-device.iphone8plus .home:before{background:#f8f8f8;position:absolute;content:'';border-radius:100%;width:calc(100% - 8px);height:calc(100% - 8px);top:4px;left:4px}:host .marvel-device.iphone8plus .top-bar{height:14px;background:#bfbfc0;position:absolute;top:68px;left:0}:host .marvel-device.iphone8plus .bottom-bar{height:14px;background:#bfbfc0;position:absolute;bottom:68px;left:0}:host .marvel-device.iphone8plus .sleep{position:absolute;top:190px;right:-4px;width:4px;height:66px;border-radius:0px 2px 2px 0px;background:#d9dbdc}:host .marvel-device.iphone8plus .volume{position:absolute;left:-4px;top:188px;z-index:0;height:66px;width:4px;border-radius:2px 0px 0px 2px;background:#d9dbdc}:host .marvel-device.iphone8plus .volume:before{position:absolute;left:2px;top:-78px;height:40px;width:2px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone8plus .volume:after{position:absolute;left:0px;top:82px;height:66px;width:4px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone8plus .camera{background:#3c3d3d;width:12px;height:12px;position:absolute;top:29px;left:50%;margin-left:-6px;border-radius:100%;z-index:3}:host .marvel-device.iphone8plus .sensor{background:#3c3d3d;width:16px;height:16px;position:absolute;top:54px;left:154px;z-index:3;border-radius:100%}:host .marvel-device.iphone8plus .speaker{background:#292728;width:70px;height:6px;position:absolute;top:59px;left:50%;margin-left:-35px;border-radius:6px;z-index:3}:host .marvel-device.iphone8plus.gold{background:#f9e7d3}:host .marvel-device.iphone8plus.gold .top-bar,:host .marvel-device.iphone8plus.gold .bottom-bar{background:white}:host .marvel-device.iphone8plus.gold .sleep,:host .marvel-device.iphone8plus.gold .volume{background:#f9e7d3}:host .marvel-device.iphone8plus.gold .home{background:#cebba9;background:linear-gradient(135deg, #cebba9 0%, #f9e7d3 50%, #cebba9 100%)}:host .marvel-device.iphone8plus.black{background:#464646;-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.7);box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.7)}:host .marvel-device.iphone8plus.black:before{background:#080808}:host .marvel-device.iphone8plus.black:after{-webkit-box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #212121;box-shadow:inset 0 0 3px 0 rgba(0,0,0,0.1),inset 0 0 6px 3px #212121}:host .marvel-device.iphone8plus.black .top-bar,:host .marvel-device.iphone8plus.black .bottom-bar{background:#212121}:host .marvel-device.iphone8plus.black .volume,:host .marvel-device.iphone8plus.black .sleep{background:#464646}:host .marvel-device.iphone8plus.black .camera{background:#080808}:host .marvel-device.iphone8plus.black .home{background:#080808;background:linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%)}:host .marvel-device.iphone8plus.black .home:before{background:#080808}:host .marvel-device.iphone8plus.landscape{padding:26px 112px;height:414px;width:736px}:host .marvel-device.iphone8plus.landscape .sleep{top:100%;border-radius:0px 0px 2px 2px;right:190px;height:4px;width:66px}:host .marvel-device.iphone8plus.landscape .volume{width:66px;height:4px;top:-4px;left:calc(100% - 188px - 66px);border-radius:2px 2px 0px 0px}:host .marvel-device.iphone8plus.landscape .volume:before{width:40px;height:2px;top:2px;right:-78px;left:auto;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone8plus.landscape .volume:after{left:-82px;width:66px;height:4px;top:0;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone8plus.landscape .top-bar{width:14px;height:100%;left:calc(100% - 68px -  14px);top:0}:host .marvel-device.iphone8plus.landscape .bottom-bar{width:14px;height:100%;left:68px;top:0}:host .marvel-device.iphone8plus.landscape .home{top:50%;margin-top:-34px;margin-left:0;left:24px}:host .marvel-device.iphone8plus.landscape .sensor{top:154px;left:calc(100% - 54px - 16px)}:host .marvel-device.iphone8plus.landscape .speaker{height:70px;width:6px;left:calc(100% - 59px - 6px);top:50%;margin-left:0px;margin-top:-35px}:host .marvel-device.iphone8plus.landscape .camera{left:calc(100% - 29px);top:50%;margin-left:0px;margin-top:-5px}:host .marvel-device.iphone5s,:host .marvel-device.iphone5c{padding:105px 22px;background:#2c2b2c;width:320px;height:568px;border-radius:50px}:host .marvel-device.iphone5s:before,:host .marvel-device.iphone5c:before{width:calc(100% - 8px);height:calc(100% - 8px);position:absolute;top:4px;content:'';left:4px;border-radius:46px;background:#1e1e1e;z-index:1}:host .marvel-device.iphone5s .sleep,:host .marvel-device.iphone5c .sleep{position:absolute;top:-4px;right:60px;width:60px;height:4px;border-radius:2px 2px 0px 0px;background:#282727}:host .marvel-device.iphone5s .volume,:host .marvel-device.iphone5c .volume{position:absolute;left:-4px;top:180px;z-index:0;height:27px;width:4px;border-radius:2px 0px 0px 2px;background:#282727}:host .marvel-device.iphone5s .volume:before,:host .marvel-device.iphone5c .volume:before{position:absolute;left:0px;top:-75px;height:35px;width:4px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone5s .volume:after,:host .marvel-device.iphone5c .volume:after{position:absolute;left:0px;bottom:-64px;height:27px;width:4px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone5s .camera,:host .marvel-device.iphone5c .camera{background:#3c3d3d;width:10px;height:10px;position:absolute;top:32px;left:50%;margin-left:-5px;border-radius:5px;z-index:3}:host .marvel-device.iphone5s .sensor,:host .marvel-device.iphone5c .sensor{background:#3c3d3d;width:10px;height:10px;position:absolute;top:60px;left:160px;z-index:3;margin-left:-32px;border-radius:5px}:host .marvel-device.iphone5s .speaker,:host .marvel-device.iphone5c .speaker{background:#292728;width:64px;height:10px;position:absolute;top:60px;left:50%;margin-left:-32px;border-radius:5px;z-index:3}:host .marvel-device.iphone5s.landscape,:host .marvel-device.iphone5c.landscape{padding:22px 105px;height:320px;width:568px}:host .marvel-device.iphone5s.landscape .sleep,:host .marvel-device.iphone5c.landscape .sleep{right:-4px;top:calc(100% - 120px);height:60px;width:4px;border-radius:0px 2px 2px 0px}:host .marvel-device.iphone5s.landscape .volume,:host .marvel-device.iphone5c.landscape .volume{width:27px;height:4px;top:-4px;left:calc(100% - 180px);border-radius:2px 2px 0px 0px}:host .marvel-device.iphone5s.landscape .volume:before,:host .marvel-device.iphone5c.landscape .volume:before{width:35px;height:4px;top:0px;right:-75px;left:auto;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone5s.landscape .volume:after,:host .marvel-device.iphone5c.landscape .volume:after{bottom:0px;left:-64px;z-index:999;height:4px;width:27px;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone5s.landscape .sensor,:host .marvel-device.iphone5c.landscape .sensor{top:160px;left:calc(100% - 60px);margin-left:0px;margin-top:-32px}:host .marvel-device.iphone5s.landscape .speaker,:host .marvel-device.iphone5c.landscape .speaker{height:64px;width:10px;left:calc(100% - 60px);top:50%;margin-left:0px;margin-top:-32px}:host .marvel-device.iphone5s.landscape .camera,:host .marvel-device.iphone5c.landscape .camera{left:calc(100% - 32px);top:50%;margin-left:0px;margin-top:-5px}:host .marvel-device.iphone5s .home{border-radius:36px;width:68px;-webkit-box-shadow:inset 0 0 0 4px #2c2b2c;box-shadow:inset 0 0 0 4px #2c2b2c;height:68px;position:absolute;left:50%;margin-left:-34px;bottom:19px;z-index:3}:host .marvel-device.iphone5s .top-bar{top:70px;position:absolute;left:0}:host .marvel-device.iphone5s .bottom-bar{bottom:70px;position:absolute;left:0}:host .marvel-device.iphone5s.landscape .home{left:19px;bottom:50%;margin-bottom:-34px;margin-left:0px}:host .marvel-device.iphone5s.landscape .top-bar{left:70px;top:0px;width:3px;height:100%}:host .marvel-device.iphone5s.landscape .bottom-bar{right:70px;left:auto;bottom:0px;width:3px;height:100%}:host .marvel-device.iphone5s.silver{background:#bcbcbc}:host .marvel-device.iphone5s.silver:before{background:#fcfcfc}:host .marvel-device.iphone5s.silver .volume,:host .marvel-device.iphone5s.silver .sleep{background:#d6d6d6}:host .marvel-device.iphone5s.silver .top-bar,:host .marvel-device.iphone5s.silver .bottom-bar{background:#eaebec}:host .marvel-device.iphone5s.silver .home{-webkit-box-shadow:inset 0 0 0 4px #bcbcbc;box-shadow:inset 0 0 0 4px #bcbcbc}:host .marvel-device.iphone5s.gold{background:#f9e7d3}:host .marvel-device.iphone5s.gold:before{background:#fcfcfc}:host .marvel-device.iphone5s.gold .volume,:host .marvel-device.iphone5s.gold .sleep{background:#f9e7d3}:host .marvel-device.iphone5s.gold .top-bar,:host .marvel-device.iphone5s.gold .bottom-bar{background:white}:host .marvel-device.iphone5s.gold .home{-webkit-box-shadow:inset 0 0 0 4px #f9e7d3;box-shadow:inset 0 0 0 4px #f9e7d3}:host .marvel-device.iphone5c{background:white;-webkit-box-shadow:0 1px 2px 0 rgba(0,0,0,0.2);box-shadow:0 1px 2px 0 rgba(0,0,0,0.2)}:host .marvel-device.iphone5c .top-bar,:host .marvel-device.iphone5c .bottom-bar{display:none}:host .marvel-device.iphone5c .home{background:#242324;border-radius:36px;width:68px;height:68px;z-index:3;position:absolute;left:50%;margin-left:-34px;bottom:19px}:host .marvel-device.iphone5c .home:after{width:20px;height:20px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;position:absolute;display:block;content:'';top:50%;left:50%;margin-top:-11px;margin-left:-11px}:host .marvel-device.iphone5c.landscape .home{left:19px;bottom:50%;margin-bottom:-34px;margin-left:0px}:host .marvel-device.iphone5c .volume,:host .marvel-device.iphone5c .sleep{background:#dddddd}:host .marvel-device.iphone5c.red{background:#f96b6c}:host .marvel-device.iphone5c.red .volume,:host .marvel-device.iphone5c.red .sleep{background:#ed5758}:host .marvel-device.iphone5c.yellow{background:#f2dc60}:host .marvel-device.iphone5c.yellow .volume,:host .marvel-device.iphone5c.yellow .sleep{background:#e5ce4c}:host .marvel-device.iphone5c.green{background:#97e563}:host .marvel-device.iphone5c.green .volume,:host .marvel-device.iphone5c.green .sleep{background:#85d94d}:host .marvel-device.iphone5c.blue{background:#33a2db}:host .marvel-device.iphone5c.blue .volume,:host .marvel-device.iphone5c.blue .sleep{background:#2694cd}:host .marvel-device.iphone4s{padding:129px 27px;width:320px;height:480px;background:#686868;border-radius:54px}:host .marvel-device.iphone4s:before{content:'';width:calc(100% - 8px);height:calc(100% - 8px);position:absolute;top:4px;left:4px;z-index:1;border-radius:50px;background:#1e1e1e}:host .marvel-device.iphone4s .top-bar{top:60px;position:absolute;left:0}:host .marvel-device.iphone4s .bottom-bar{bottom:90px;position:absolute;left:0}:host .marvel-device.iphone4s .camera{background:#3c3d3d;width:10px;height:10px;position:absolute;top:72px;left:134px;z-index:3;margin-left:-5px;border-radius:100%}:host .marvel-device.iphone4s .speaker{background:#292728;width:64px;height:10px;position:absolute;top:72px;left:50%;z-index:3;margin-left:-32px;border-radius:5px}:host .marvel-device.iphone4s .sensor{background:#292728;width:40px;height:10px;position:absolute;top:36px;left:50%;z-index:3;margin-left:-20px;border-radius:5px}:host .marvel-device.iphone4s .home{background:#242324;border-radius:100%;width:72px;height:72px;z-index:3;position:absolute;left:50%;margin-left:-36px;bottom:30px}:host .marvel-device.iphone4s .home:after{width:20px;height:20px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;position:absolute;display:block;content:'';top:50%;left:50%;margin-top:-11px;margin-left:-11px}:host .marvel-device.iphone4s .sleep{position:absolute;top:-4px;right:60px;width:60px;height:4px;border-radius:2px 2px 0px 0px;background:#4D4D4D}:host .marvel-device.iphone4s .volume{position:absolute;left:-4px;top:160px;height:27px;width:4px;border-radius:2px 0px 0px 2px;background:#4D4D4D}:host .marvel-device.iphone4s .volume:before{position:absolute;left:0px;top:-70px;height:35px;width:4px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone4s .volume:after{position:absolute;left:0px;bottom:-64px;height:27px;width:4px;border-radius:2px 0px 0px 2px;background:inherit;content:'';display:block}:host .marvel-device.iphone4s.landscape{padding:27px 129px;height:320px;width:480px}:host .marvel-device.iphone4s.landscape .bottom-bar{left:90px;bottom:0px;height:100%;width:3px}:host .marvel-device.iphone4s.landscape .top-bar{left:calc(100% - 60px);top:0px;height:100%;width:3px}:host .marvel-device.iphone4s.landscape .camera{top:134px;left:calc(100% - 72px);margin-left:0}:host .marvel-device.iphone4s.landscape .speaker{top:50%;margin-left:0;margin-top:-32px;left:calc(100% - 72px);width:10px;height:64px}:host .marvel-device.iphone4s.landscape .sensor{height:40px;width:10px;left:calc(100% - 36px);top:50%;margin-left:0;margin-top:-20px}:host .marvel-device.iphone4s.landscape .home{left:30px;bottom:50%;margin-left:0;margin-bottom:-36px}:host .marvel-device.iphone4s.landscape .sleep{height:60px;width:4px;right:-4px;top:calc(100% - 120px);border-radius:0px 2px 2px 0px}:host .marvel-device.iphone4s.landscape .volume{top:-4px;left:calc(100% - 187px);height:4px;width:27px;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone4s.landscape .volume:before{right:-70px;left:auto;top:0px;width:35px;height:4px;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone4s.landscape .volume:after{width:27px;height:4px;bottom:0px;left:-64px;border-radius:2px 2px 0px 0px}:host .marvel-device.iphone4s.silver{background:#bcbcbc}:host .marvel-device.iphone4s.silver:before{background:#fcfcfc}:host .marvel-device.iphone4s.silver .home{background:#fcfcfc;-webkit-box-shadow:inset 0 0 0 1px #bcbcbc;box-shadow:inset 0 0 0 1px #bcbcbc}:host .marvel-device.iphone4s.silver .home:after{border:1px solid rgba(0,0,0,0.2)}:host .marvel-device.iphone4s.silver .volume,:host .marvel-device.iphone4s.silver .sleep{background:#d6d6d6}:host .marvel-device.nexus5{padding:50px 15px 50px 15px;width:320px;height:568px;background:#1e1e1e;border-radius:20px}:host .marvel-device.nexus5:before{border-radius:600px / 50px;background:inherit;content:'';top:0;position:absolute;height:103.1%;width:calc(100% - 26px);top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}:host .marvel-device.nexus5 .top-bar{width:calc(100% - 8px);height:calc(100% - 6px);position:absolute;top:3px;left:4px;border-radius:20px;background:#181818}:host .marvel-device.nexus5 .top-bar:before{border-radius:600px / 50px;background:inherit;content:'';top:0;position:absolute;height:103.0%;width:calc(100% - 26px);top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}:host .marvel-device.nexus5 .bottom-bar{display:none}:host .marvel-device.nexus5 .sleep{width:3px;position:absolute;left:-3px;top:110px;height:100px;background:inherit;border-radius:2px 0px 0px 2px}:host .marvel-device.nexus5 .volume{width:3px;position:absolute;right:-3px;top:70px;height:45px;background:inherit;border-radius:0px 2px 2px 0px}:host .marvel-device.nexus5 .camera{background:#3c3d3d;width:10px;height:10px;position:absolute;top:18px;left:50%;z-index:3;margin-left:-5px;border-radius:100%}:host .marvel-device.nexus5 .camera:before{background:#3c3d3d;width:6px;height:6px;content:'';display:block;position:absolute;top:2px;left:-100px;z-index:3;border-radius:100%}:host .marvel-device.nexus5.landscape{padding:15px 50px 15px 50px;height:320px;width:568px}:host .marvel-device.nexus5.landscape:before{width:103.1%;height:calc(100% - 26px);border-radius:50px / 600px}:host .marvel-device.nexus5.landscape .top-bar{left:3px;top:4px;height:calc(100% - 8px);width:calc(100% - 6px)}:host .marvel-device.nexus5.landscape .top-bar:before{width:103%;height:calc(100% - 26px);border-radius:50px / 600px}:host .marvel-device.nexus5.landscape .sleep{height:3px;width:100px;left:calc(100% - 210px);top:-3px;border-radius:2px 2px 0px 0px}:host .marvel-device.nexus5.landscape .volume{height:3px;width:45px;right:70px;top:100%;border-radius:0px 0px 2px 2px}:host .marvel-device.nexus5.landscape .camera{top:50%;left:calc(100% - 18px);margin-left:0;margin-top:-5px}:host .marvel-device.nexus5.landscape .camera:before{top:-100px;left:2px}:host .marvel-device.s5{padding:60px 18px;border-radius:42px;width:320px;height:568px;background:#bcbcbc}:host .marvel-device.s5:before,:host .marvel-device.s5:after{width:calc(100% - 52px);content:'';display:block;height:26px;background:inherit;position:absolute;border-radius:500px / 40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}:host .marvel-device.s5:before{top:-7px}:host .marvel-device.s5:after{bottom:-7px}:host .marvel-device.s5 .bottom-bar{display:none}:host .marvel-device.s5 .top-bar{border-radius:37px;width:calc(100% - 10px);height:calc(100% - 10px);top:5px;left:5px;background:radial-gradient(rgba(0,0,0,0.02) 20%, transparent 60%) 0 0,radial-gradient(rgba(0,0,0,0.02) 20%, transparent 60%) 3px 3px;background-color:white;background-size:4px 4px;background-position:center;z-index:2;position:absolute}:host .marvel-device.s5 .top-bar:before,:host .marvel-device.s5 .top-bar:after{width:calc(100% - 48px);content:'';display:block;height:26px;background:inherit;position:absolute;border-radius:500px / 40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}:host .marvel-device.s5 .top-bar:before{top:-7px}:host .marvel-device.s5 .top-bar:after{bottom:-7px}:host .marvel-device.s5 .sleep{width:3px;position:absolute;left:-3px;top:100px;height:100px;background:#cecece;border-radius:2px 0px 0px 2px}:host .marvel-device.s5 .speaker{width:68px;height:8px;position:absolute;top:20px;display:block;z-index:3;left:50%;margin-left:-34px;background-color:#bcbcbc;background-position:top left;border-radius:4px}:host .marvel-device.s5 .sensor{display:block;position:absolute;top:20px;right:110px;background:#3c3d3d;border-radius:100%;width:8px;height:8px;z-index:3}:host .marvel-device.s5 .sensor:after{display:block;content:'';position:absolute;top:0px;right:12px;background:#3c3d3d;border-radius:100%;width:8px;height:8px;z-index:3}:host .marvel-device.s5 .camera{display:block;position:absolute;top:24px;right:42px;background:black;border-radius:100%;width:10px;height:10px;z-index:3}:host .marvel-device.s5 .camera:before{width:4px;height:4px;background:#3c3d3d;border-radius:100%;position:absolute;content:'';top:50%;left:50%;margin-top:-2px;margin-left:-2px}:host .marvel-device.s5 .home{position:absolute;z-index:3;bottom:17px;left:50%;width:70px;height:20px;background:white;border-radius:18px;display:block;margin-left:-35px;border:2px solid black}:host .marvel-device.s5.landscape{padding:18px 60px;height:320px;width:568px}:host .marvel-device.s5.landscape:before,:host .marvel-device.s5.landscape:after{height:calc(100% - 52px);width:26px;border-radius:40px / 500px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}:host .marvel-device.s5.landscape:before{top:50%;left:-7px}:host .marvel-device.s5.landscape:after{top:50%;left:auto;right:-7px}:host .marvel-device.s5.landscape .top-bar:before,:host .marvel-device.s5.landscape .top-bar:after{width:26px;height:calc(100% - 48px);border-radius:40px / 500px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}:host .marvel-device.s5.landscape .top-bar:before{right:-7px;top:50%;left:auto}:host .marvel-device.s5.landscape .top-bar:after{left:-7px;top:50%;right:auto}:host .marvel-device.s5.landscape .sleep{height:3px;width:100px;left:calc(100% - 200px);top:-3px;border-radius:2px 2px 0px 0px}:host .marvel-device.s5.landscape .speaker{height:68px;width:8px;left:calc(100% - 20px);top:50%;margin-left:0;margin-top:-34px}:host .marvel-device.s5.landscape .sensor{right:20px;top:calc(100% - 110px)}:host .marvel-device.s5.landscape .sensor:after{left:-12px;right:0px}:host .marvel-device.s5.landscape .camera{top:calc(100% - 42px);right:24px}:host .marvel-device.s5.landscape .home{width:20px;height:70px;bottom:50%;margin-bottom:-35px;margin-left:0;left:17px}:host .marvel-device.s5.black{background:#1e1e1e}:host .marvel-device.s5.black .speaker{background:black}:host .marvel-device.s5.black .sleep{background:#1e1e1e}:host .marvel-device.s5.black .top-bar{background:radial-gradient(rgba(0,0,0,0.05) 20%, transparent 60%) 0 0,radial-gradient(rgba(0,0,0,0.05) 20%, transparent 60%) 3px 3px;background-color:#2c2b2c;background-size:4px 4px}:host .marvel-device.s5.black .home{background:#2c2b2c}:host .marvel-device.lumia920{padding:80px 35px 125px 35px;background:#ffdd00;width:320px;height:533px;border-radius:40px / 3px}:host .marvel-device.lumia920 .bottom-bar{display:none}:host .marvel-device.lumia920 .top-bar{width:calc(100% - 24px);height:calc(100% - 32px);position:absolute;top:16px;left:12px;border-radius:24px;background:black;z-index:1}:host .marvel-device.lumia920 .top-bar:before{background:#1e1e1e;display:block;content:'';width:calc(100% - 4px);height:calc(100% - 4px);top:2px;left:2px;position:absolute;border-radius:22px}:host .marvel-device.lumia920 .volume{width:3px;position:absolute;top:130px;height:100px;background:#1e1e1e;right:-3px;border-radius:0px 2px 2px 0px}:host .marvel-device.lumia920 .volume:before{width:3px;position:absolute;top:190px;content:'';display:block;height:50px;background:inherit;right:0px;border-radius:0px 2px 2px 0px}:host .marvel-device.lumia920 .volume:after{width:3px;position:absolute;top:460px;content:'';display:block;height:50px;background:inherit;right:0px;border-radius:0px 2px 2px 0px}:host .marvel-device.lumia920 .camera{background:#3c3d3d;width:10px;height:10px;position:absolute;top:34px;right:130px;z-index:5;border-radius:5px}:host .marvel-device.lumia920 .speaker{background:#292728;width:64px;height:10px;position:absolute;top:38px;left:50%;margin-left:-32px;border-radius:5px;z-index:3}:host .marvel-device.lumia920.landscape{padding:35px 80px 35px 125px;height:320px;width:568px;border-radius:2px / 100px}:host .marvel-device.lumia920.landscape .top-bar{height:calc(100% - 24px);width:calc(100% - 32px);left:16px;top:12px}:host .marvel-device.lumia920.landscape .volume{height:3px;right:130px;width:100px;top:100%;border-radius:0px 0px 2px 2px}:host .marvel-device.lumia920.landscape .volume:before{height:3px;right:190px;top:0px;width:50px;border-radius:0px 0px 2px 2px}:host .marvel-device.lumia920.landscape .volume:after{height:3px;right:430px;top:0px;width:50px;border-radius:0px 0px 2px 2px}:host .marvel-device.lumia920.landscape .camera{right:30px;top:calc(100% - 140px)}:host .marvel-device.lumia920.landscape .speaker{width:10px;height:64px;top:50%;margin-left:0;margin-top:-32px;left:calc(100% - 48px)}:host .marvel-device.lumia920.black{background:black}:host .marvel-device.lumia920.white{background:white;-webkit-box-shadow:0 1px 2px 0 rgba(0,0,0,0.2);box-shadow:0 1px 2px 0 rgba(0,0,0,0.2)}:host .marvel-device.lumia920.blue{background:#00acdd}:host .marvel-device.lumia920.red{background:#CC3E32}:host .marvel-device.htc-one{padding:72px 25px 100px 25px;width:320px;height:568px;background:#bebebe;border-radius:34px}:host .marvel-device.htc-one:before{content:'';display:block;width:calc(100% - 4px);height:calc(100% - 4px);position:absolute;top:2px;left:2px;background:#adadad;border-radius:32px}:host .marvel-device.htc-one:after{content:'';display:block;width:calc(100% - 8px);height:calc(100% - 8px);position:absolute;top:4px;left:4px;background:#eeeeee;border-radius:30px}:host .marvel-device.htc-one .top-bar{width:calc(100% - 4px);height:635px;position:absolute;background:#424242;top:50px;z-index:1;left:2px}:host .marvel-device.htc-one .top-bar:before{content:'';position:absolute;width:calc(100% - 4px);height:100%;position:absolute;background:black;top:0px;z-index:1;left:2px}:host .marvel-device.htc-one .bottom-bar{display:none}:host .marvel-device.htc-one .speaker{height:16px;width:216px;display:block;position:absolute;top:22px;z-index:2;left:50%;margin-left:-108px;background:radial-gradient(#343434 25%, transparent 50%) 0 0,radial-gradient(#343434 25%, transparent 50%) 4px 4px;background-size:4px 4px;background-position:top left}:host .marvel-device.htc-one .speaker:after{content:'';height:16px;width:216px;display:block;position:absolute;top:676px;z-index:2;left:50%;margin-left:-108px;background:inherit}:host .marvel-device.htc-one .camera{display:block;position:absolute;top:18px;right:38px;background:#3c3d3d;border-radius:100%;width:24px;height:24px;z-index:3}:host .marvel-device.htc-one .camera:before{width:8px;height:8px;background:black;border-radius:100%;position:absolute;content:'';top:50%;left:50%;margin-top:-4px;margin-left:-4px}:host .marvel-device.htc-one .sensor{display:block;position:absolute;top:29px;left:60px;background:#3c3d3d;border-radius:100%;width:8px;height:8px;z-index:3}:host .marvel-device.htc-one .sensor:after{display:block;content:'';position:absolute;top:0px;right:12px;background:#3c3d3d;border-radius:100%;width:8px;height:8px;z-index:3}:host .marvel-device.htc-one.landscape{padding:25px 72px 25px 100px;height:320px;width:568px}:host .marvel-device.htc-one.landscape .top-bar{height:calc(100% - 4px);width:635px;left:calc(100% - 685px);top:2px}:host .marvel-device.htc-one.landscape .speaker{width:16px;height:216px;left:calc(100% - 38px);top:50%;margin-left:0px;margin-top:-108px}:host .marvel-device.htc-one.landscape .speaker:after{width:16px;height:216px;left:calc(100% - 692px);top:50%;margin-left:0;margin-top:-108px}:host .marvel-device.htc-one.landscape .camera{right:18px;top:calc(100% - 38px)}:host .marvel-device.htc-one.landscape .sensor{left:calc(100% - 29px);top:60px}:host .marvel-device.htc-one.landscape .sensor :after{right:0;top:-12px}:host .marvel-device.ipad{width:576px;height:768px;padding:90px 25px;background:#242324;border-radius:44px}:host .marvel-device.ipad:before{width:calc(100% - 8px);height:calc(100% - 8px);position:absolute;content:'';display:block;top:4px;left:4px;border-radius:40px;background:#1e1e1e}:host .marvel-device.ipad .camera{background:#3c3d3d;width:10px;height:10px;position:absolute;top:44px;left:50%;margin-left:-5px;border-radius:100%}:host .marvel-device.ipad .top-bar,:host .marvel-device.ipad .bottom-bar{display:none}:host .marvel-device.ipad .home{background:#242324;border-radius:36px;width:50px;height:50px;position:absolute;left:50%;margin-left:-25px;bottom:22px}:host .marvel-device.ipad .home:after{width:15px;height:15px;margin-top:-8px;margin-left:-8px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;position:absolute;display:block;content:'';top:50%;left:50%}:host .marvel-device.ipad.landscape{height:576px;width:768px;padding:25px 90px}:host .marvel-device.ipad.landscape .camera{left:calc(100% - 44px);top:50%;margin-left:0;margin-top:-5px}:host .marvel-device.ipad.landscape .home{top:50%;left:22px;margin-left:0;margin-top:-25px}:host .marvel-device.ipad.silver{background:#bcbcbc}:host .marvel-device.ipad.silver:before{background:#fcfcfc}:host .marvel-device.ipad.silver .home{background:#fcfcfc;-webkit-box-shadow:inset 0 0 0 1px #bcbcbc;box-shadow:inset 0 0 0 1px #bcbcbc}:host .marvel-device.ipad.silver .home:after{border:1px solid rgba(0,0,0,0.2)}:host .marvel-device.macbook{width:960px;height:600px;padding:44px 44px 76px;margin:0 auto;background:#bebebe;border-radius:34px}:host .marvel-device.macbook:before{width:calc(100% - 8px);height:calc(100% - 8px);position:absolute;content:'';display:block;top:4px;left:4px;border-radius:30px;background:#1e1e1e}:host .marvel-device.macbook .top-bar{width:calc(100% + 2 * 70px);height:40px;position:absolute;content:'';display:block;top:680px;left:-70px;border-bottom-left-radius:90px 18px;border-bottom-right-radius:90px 18px;background:#bebebe;-webkit-box-shadow:inset 0px -4px 13px 3px rgba(34,34,34,0.6);box-shadow:inset 0px -4px 13px 3px rgba(34,34,34,0.6)}:host .marvel-device.macbook .top-bar:before{width:100%;height:24px;content:'';display:block;top:0;left:0;background:#f0f0f0;border-bottom:2px solid #aaa;border-radius:5px;position:relative}:host .marvel-device.macbook .top-bar:after{width:16%;height:14px;content:'';display:block;top:0;background:#ddd;position:absolute;margin-left:auto;margin-right:auto;left:0;right:0;border-radius:0 0 20px 20px;-webkit-box-shadow:inset 0px -3px 10px #999;box-shadow:inset 0px -3px 10px #999}:host .marvel-device.macbook .bottom-bar{background:transparent;width:calc(100% + 2 * 70px);height:26px;position:absolute;content:'';display:block;top:680px;left:-70px}:host .marvel-device.macbook .bottom-bar:before,:host .marvel-device.macbook .bottom-bar:after{height:calc(100% - 2px);width:80px;content:'';display:block;top:0;position:absolute}:host .marvel-device.macbook .bottom-bar:before{left:0;background:#f0f0f0;background:-webkit-gradient(linear, left top, right top, from(#747474), color-stop(5%, #c3c3c3), color-stop(14%, #ebebeb), color-stop(41%, #979797), color-stop(80%, #f0f0f0), color-stop(100%, #f0f0f0), to(#f0f0f0));background:linear-gradient(to right, #747474 0%, #c3c3c3 5%, #ebebeb 14%, #979797 41%, #f0f0f0 80%, #f0f0f0 100%, #f0f0f0 100%)}:host .marvel-device.macbook .bottom-bar:after{right:0;background:#f0f0f0;background:-webkit-gradient(linear, left top, right top, from(#f0f0f0), color-stop(0%, #f0f0f0), color-stop(20%, #f0f0f0), color-stop(59%, #979797), color-stop(86%, #ebebeb), color-stop(95%, #c3c3c3), to(#747474));background:linear-gradient(to right, #f0f0f0 0%, #f0f0f0 0%, #f0f0f0 20%, #979797 59%, #ebebeb 86%, #c3c3c3 95%, #747474 100%)}:host .marvel-device.macbook .camera{background:#3c3d3d;width:10px;height:10px;position:absolute;top:20px;left:50%;margin-left:-5px;border-radius:100%}:host .marvel-device.macbook .home{display:none}:host .marvel-device.iphone-x{width:375px;height:812px;padding:26px;background:#fdfdfd;-webkit-box-shadow:inset 0 0 11px 0 black;box-shadow:inset 0 0 11px 0 black;border-radius:66px}:host .marvel-device.iphone-x .overflow{width:100%;height:100%;position:absolute;top:0;left:0;border-radius:66px;overflow:hidden}:host .marvel-device.iphone-x .shadow{border-radius:100%;width:90px;height:90px;position:absolute;background:radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0) 60%)}:host .marvel-device.iphone-x .shadow--tl{top:-20px;left:-20px}:host .marvel-device.iphone-x .shadow--tr{top:-20px;right:-20px}:host .marvel-device.iphone-x .shadow--bl{bottom:-20px;left:-20px}:host .marvel-device.iphone-x .shadow--br{bottom:-20px;right:-20px}:host .marvel-device.iphone-x:before{width:calc(100% - 10px);height:calc(100% - 10px);position:absolute;top:5px;content:'';left:5px;border-radius:61px;background:black;z-index:1}:host .marvel-device.iphone-x .inner-shadow{width:calc(100% - 20px);height:calc(100% - 20px);position:absolute;top:10px;overflow:hidden;left:10px;border-radius:56px;-webkit-box-shadow:inset 0 0 15px 0 rgba(255,255,255,0.66);box-shadow:inset 0 0 15px 0 rgba(255,255,255,0.66);z-index:1}:host .marvel-device.iphone-x .inner-shadow:before{-webkit-box-shadow:inset 0 0 20px 0 #FFFFFF;box-shadow:inset 0 0 20px 0 #FFFFFF;width:100%;height:116%;position:absolute;top:-8%;content:'';left:0;border-radius:200px / 112px;z-index:2}:host .marvel-device.iphone-x .screen{border-radius:40px;-webkit-box-shadow:none;box-shadow:none}:host .marvel-device.iphone-x .top-bar,:host .marvel-device.iphone-x .bottom-bar{width:100%;position:absolute;height:8px;background:rgba(0,0,0,0.1);left:0}:host .marvel-device.iphone-x .top-bar{top:80px}:host .marvel-device.iphone-x .bottom-bar{bottom:80px}:host .marvel-device.iphone-x .volume,:host .marvel-device.iphone-x .volume:before,:host .marvel-device.iphone-x .volume:after,:host .marvel-device.iphone-x .sleep{width:3px;background:#b5b5b5;position:absolute}:host .marvel-device.iphone-x .volume{left:-3px;top:116px;height:32px}:host .marvel-device.iphone-x .volume:before{height:62px;top:62px;content:'';left:0}:host .marvel-device.iphone-x .volume:after{height:62px;top:140px;content:'';left:0}:host .marvel-device.iphone-x .sleep{height:96px;top:200px;right:-3px}:host .marvel-device.iphone-x .camera{width:6px;height:6px;top:9px;border-radius:100%;position:absolute;left:154px;background:#0d4d71}:host .marvel-device.iphone-x .speaker{height:6px;width:60px;left:50%;position:absolute;top:9px;margin-left:-30px;background:#171818;border-radius:6px}:host .marvel-device.iphone-x .notch{position:absolute;width:210px;height:30px;top:26px;left:108px;z-index:4;background:black;border-bottom-left-radius:24px;border-bottom-right-radius:24px}:host .marvel-device.iphone-x .notch:before,:host .marvel-device.iphone-x .notch:after{content:'';height:8px;position:absolute;top:0;width:8px}:host .marvel-device.iphone-x .notch:after{background:radial-gradient(circle at bottom left, transparent 0, transparent 70%, black 70%, black 100%);left:-8px}:host .marvel-device.iphone-x .notch:before{background:radial-gradient(circle at bottom right, transparent 0, transparent 70%, black 70%, black 100%);right:-8px}:host .marvel-device.iphone-x.landscape{height:375px;width:812px}:host .marvel-device.iphone-x.landscape .top-bar,:host .marvel-device.iphone-x.landscape .bottom-bar{width:8px;height:100%;top:0}:host .marvel-device.iphone-x.landscape .top-bar{left:80px}:host .marvel-device.iphone-x.landscape .bottom-bar{right:80px;bottom:auto;left:auto}:host .marvel-device.iphone-x.landscape .volume,:host .marvel-device.iphone-x.landscape .volume:before,:host .marvel-device.iphone-x.landscape .volume:after,:host .marvel-device.iphone-x.landscape .sleep{height:3px}:host .marvel-device.iphone-x.landscape .inner-shadow:before{height:100%;width:116%;left:-8%;top:0;border-radius:112px / 200px}:host .marvel-device.iphone-x.landscape .volume{bottom:-3px;top:auto;left:116px;width:32px}:host .marvel-device.iphone-x.landscape .volume:before{width:62px;left:62px;top:0}:host .marvel-device.iphone-x.landscape .volume:after{width:62px;left:140px;top:0}:host .marvel-device.iphone-x.landscape .sleep{width:96px;left:200px;top:-3px;right:auto}:host .marvel-device.iphone-x.landscape .camera{left:9px;bottom:154px;top:auto}:host .marvel-device.iphone-x.landscape .speaker{width:6px;height:60px;left:9px;top:50%;margin-top:-30px;margin-left:0}:host .marvel-device.iphone-x.landscape .notch{height:210px;width:30px;left:26px;bottom:108px;top:auto;border-top-right-radius:24px;border-bottom-right-radius:24px;border-bottom-left-radius:0}:host .marvel-device.iphone-x.landscape .notch:before,:host .marvel-device.iphone-x.landscape .notch:after{left:0}:host .marvel-device.iphone-x.landscape .notch:after{background:radial-gradient(circle at bottom right, transparent 0, transparent 70%, black 70%, black 100%);bottom:-8px;top:auto}:host .marvel-device.iphone-x.landscape .notch:before{background:radial-gradient(circle at top right, transparent 0, transparent 70%, black 70%, black 100%);top:-8px}:host .marvel-device.note8{width:400px;height:822px;background:black;border-radius:34px;padding:45px 10px}:host .marvel-device.note8 .overflow{width:100%;height:100%;position:absolute;top:0;left:0;border-radius:34px;overflow:hidden}:host .marvel-device.note8 .speaker{height:8px;width:56px;left:50%;position:absolute;top:25px;margin-left:-28px;background:#171818;z-index:1;border-radius:8px}:host .marvel-device.note8 .camera{height:18px;width:18px;left:86px;position:absolute;top:18px;background:#212b36;z-index:1;border-radius:100%}:host .marvel-device.note8 .camera:before{content:'';height:8px;width:8px;left:-22px;position:absolute;top:5px;background:#212b36;z-index:1;border-radius:100%}:host .marvel-device.note8 .sensors{height:10px;width:10px;left:120px;position:absolute;top:22px;background:#1d233b;z-index:1;border-radius:100%}:host .marvel-device.note8 .sensors:before{content:'';height:10px;width:10px;left:18px;position:absolute;top:0;background:#1d233b;z-index:1;border-radius:100%}:host .marvel-device.note8 .more-sensors{height:16px;width:16px;left:285px;position:absolute;top:18px;background:#33244a;-webkit-box-shadow:0 0 0 2px rgba(255,255,255,0.1);box-shadow:0 0 0 2px rgba(255,255,255,0.1);z-index:1;border-radius:100%}:host .marvel-device.note8 .more-sensors:before{content:'';height:11px;width:11px;left:40px;position:absolute;top:4px;background:#214a61;z-index:1;border-radius:100%}:host .marvel-device.note8 .sleep{width:2px;height:56px;background:black;position:absolute;top:288px;right:-2px}:host .marvel-device.note8 .volume{width:2px;height:120px;background:black;position:absolute;top:168px;left:-2px}:host .marvel-device.note8 .volume:before{content:'';top:168px;width:2px;position:absolute;left:0;background:black;height:56px}:host .marvel-device.note8 .inner{width:100%;height:calc(100% - 8px);position:absolute;top:2px;content:'';left:0px;border-radius:34px;border-top:2px solid #9fa0a2;border-bottom:2px solid #9fa0a2;background:black;z-index:1;-webkit-box-shadow:inset 0 0 6px 0 rgba(255,255,255,0.5);box-shadow:inset 0 0 6px 0 rgba(255,255,255,0.5)}:host .marvel-device.note8 .shadow{-webkit-box-shadow:inset 0 0 60px 0 white,inset 0 0 30px 0 rgba(255,255,255,0.5),0 0 20px 0 white,0 0 20px 0 rgba(255,255,255,0.5);box-shadow:inset 0 0 60px 0 white,inset 0 0 30px 0 rgba(255,255,255,0.5),0 0 20px 0 white,0 0 20px 0 rgba(255,255,255,0.5);height:101%;position:absolute;top:-0.5%;content:'';width:calc(100% - 20px);left:10px;border-radius:38px;z-index:5;pointer-events:none}:host .marvel-device.note8 .screen{border-radius:14px;-webkit-box-shadow:none;box-shadow:none}:host .marvel-device.note8.landscape{height:400px;width:822px;padding:10px 45px}:host .marvel-device.note8.landscape .speaker{height:56px;width:8px;top:50%;margin-top:-28px;margin-left:0;right:25px;left:auto}:host .marvel-device.note8.landscape .camera{top:86px;right:18px;left:auto}:host .marvel-device.note8.landscape .camera:before{top:-22px;left:5px}:host .marvel-device.note8.landscape .sensors{top:120px;right:22px;left:auto}:host .marvel-device.note8.landscape .sensors:before{top:18px;left:0}:host .marvel-device.note8.landscape .more-sensors{top:285px;right:18px;left:auto}:host .marvel-device.note8.landscape .more-sensors:before{top:40px;left:4px}:host .marvel-device.note8.landscape .sleep{bottom:-2px;top:auto;right:288px;width:56px;height:2px}:host .marvel-device.note8.landscape .volume{width:120px;height:2px;top:-2px;right:168px;left:auto}:host .marvel-device.note8.landscape .volume:before{right:168px;left:auto;top:0;width:56px;height:2px}:host .marvel-device.note8.landscape .inner{height:100%;width:calc(100% - 8px);left:2px;top:0;border-top:0;border-bottom:0;border-left:2px solid #9fa0a2;border-right:2px solid #9fa0a2}:host .marvel-device.note8.landscape .shadow{width:101%;height:calc(100% - 20px);left:-0.5%;top:10px}:host .marvel-device,:host .marvel-device,:host *:before,:host *:after{-webkit-transition:all 120ms cubic-bezier(0.175, 0.885, 0.32, 1.275);transition:all 120ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}"; }
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
    static get style() { return "\@-webkit-keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}\@keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}\@keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-fab{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform, opacity;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12);box-shadow:0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12);display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;position:relative;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:56px;height:56px;padding:0;-webkit-transition:opacity 15ms linear 30ms,-webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 15ms linear 30ms,-webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);border:none;fill:currentColor;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:hidden;background-color:#018786;color:#fff;color:var(--mdc-theme-on-secondary, #fff)}.mdc-fab::before,.mdc-fab::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-fab::before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-fab.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-fab.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-fab.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-fab.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards;animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards}.mdc-fab.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:150ms mdc-ripple-fg-opacity-out;animation:150ms mdc-ripple-fg-opacity-out;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-fab::before,.mdc-fab::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-fab.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover,.mdc-fab:focus{-webkit-box-shadow:0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12);box-shadow:0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)}.mdc-fab:active{-webkit-box-shadow:0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12);box-shadow:0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}\@supports not (-ms-ime-align: auto){.mdc-fab{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}.mdc-fab::before,.mdc-fab::after{background-color:#fff}\@supports not (-ms-ime-align: auto){.mdc-fab::before,.mdc-fab::after{background-color:var(--mdc-theme-on-secondary, #fff)}}.mdc-fab:hover::before{opacity:.08}.mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mdc-fab.mdc-ripple-upgraded--background-focused::before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.24}.mdc-fab:not(.mdc-ripple-upgraded)::after{-webkit-transition:opacity 150ms linear;transition:opacity 150ms linear}.mdc-fab:not(.mdc-ripple-upgraded):active::after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.32}.mdc-fab.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: .32}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.08929em;text-decoration:none;text-transform:uppercase;border-radius:24px;padding:0 20px;width:auto;max-width:100%;height:48px}.mdc-fab--extended .mdc-fab__icon{margin-left:-8px;margin-right:12px}[dir=\"rtl\"] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=\"rtl\"]{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:-8px}[dir=\"rtl\"] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=\"rtl\"]{margin-left:-8px;margin-right:12px}.mdc-fab__label{-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-fab__icon{-webkit-transition:-webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);transition:-webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.mdc-fab--exited{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:opacity 15ms linear 150ms,-webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity 15ms linear 150ms,-webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1),-webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);opacity:0}.mdc-fab--exited .mdc-fab__icon{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:-webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}:host{--mdc-theme-primary: #fff;--mdc-theme-text-primary-on-primary: #494949;--mdc-theme-background: #c3c3c3;--vh: 1vh;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}:host .fab-menu--absolute{display:none}:host .app-fab--absolute{display:none}\@media (min-width: 1024px){:host .fab-menu--absolute{display:block;position:fixed;bottom:1.1rem;right:5rem;z-index:999;visibility:hidden;opacity:0;will-change:transform;-webkit-transition:visibility 0s, opacity 0.5s linear;transition:visibility 0s, opacity 0.5s linear}:host .fab-menu--absolute button{background-color:var(--mdc-theme-text-primary-on-primary);margin:4px}:host .fab-menu--absolute--show{visibility:visible;opacity:1;-webkit-transition:visibility 0s, opacity 0.5s linear;transition:visibility 0s, opacity 0.5s linear}:host .app-fab--absolute{display:block;background-color:var(--mdc-theme-text-primary-on-primary);position:fixed;bottom:1rem;right:1rem;z-index:999}}"; }
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
    static get style() { return ":host .resize-toolbar-container{margin-top:4px;color:#212121;height:16px;white-space:nowrap;font-weight:500;border-top:1px solid #ddd;background:#FFF;position:relative}:host .resize-toolbar{position:absolute;left:-100px;right:-100px}:host .item-resize-toolbar{-webkit-box-sizing:border-box;box-sizing:border-box;border-left:1px solid #ddd;border-right:1px solid #ddd;padding:1px;color:#212121;cursor:pointer;font-size:7.5px;font-weight:400;height:16px;left:0;line-height:16px;margin-left:auto;margin-right:auto;position:absolute;right:0}:host .item-resize-toolbar .left{float:left}:host .item-resize-toolbar .rigth{float:right}:host .active{background:rgba(0,0,0,0.08)}"; }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const cssClasses$7 = {
  ROOT: 'mdc-snackbar',
  TEXT: 'mdc-snackbar__text',
  ACTION_WRAPPER: 'mdc-snackbar__action-wrapper',
  ACTION_BUTTON: 'mdc-snackbar__action-button',
  ACTIVE: 'mdc-snackbar--active',
  MULTILINE: 'mdc-snackbar--multiline',
  ACTION_ON_BOTTOM: 'mdc-snackbar--action-on-bottom',
};

const strings$5 = {
  TEXT_SELECTOR: '.mdc-snackbar__text',
  ACTION_WRAPPER_SELECTOR: '.mdc-snackbar__action-wrapper',
  ACTION_BUTTON_SELECTOR: '.mdc-snackbar__action-button',
  SHOW_EVENT: 'MDCSnackbar:show',
  HIDE_EVENT: 'MDCSnackbar:hide',
};

const numbers$4 = {
  MESSAGE_TIMEOUT: 2750,
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

class MDCSnackbarFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses$7;
  }

  static get strings() {
    return strings$5;
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
      isFocused: () => /* boolean */ false,
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
        setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$4.MESSAGE_TIMEOUT);
      }
    };
    this.interactionHandler_ = (evt) => {
      if (evt.type === 'focus' && !this.adapter_.isFocused()) {
        return;
      }
      if (evt.type === 'touchstart' || evt.type === 'mousedown') {
        this.pointerDownRecognized_ = true;
      }
      this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type === 'focus') {
        this.pointerDownRecognized_ = false;
      }
    };
    this.blurHandler_ = () => {
      clearTimeout(this.timeoutId_);
      this.snackbarHasFocus_ = false;
      this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$4.MESSAGE_TIMEOUT);
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

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$7;

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

    this.timeoutId_ = setTimeout(this.cleanup_.bind(this), this.snackbarData_.timeout || numbers$4.MESSAGE_TIMEOUT);
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
      const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses$7;

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
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string,
 *   styleProperty: string
 * }}
 */
let VendorPropertyMapType;

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

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.

const transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
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
      isFocused: () => document.activeElement === getActionButton(),
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
    static get style() { return ".mdc-snackbar{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:fixed;bottom:0;left:50%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-sizing:border-box;box-sizing:border-box;padding-right:24px;padding-left:24px;-webkit-transform:translate(-50%, 100%);transform:translate(-50%, 100%);-webkit-transition:-webkit-transform .25s 0ms cubic-bezier(0.4, 0, 1, 1);transition:-webkit-transform .25s 0ms cubic-bezier(0.4, 0, 1, 1);transition:transform .25s 0ms cubic-bezier(0.4, 0, 1, 1);transition:transform .25s 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform .25s 0ms cubic-bezier(0.4, 0, 1, 1);background-color:#323232;pointer-events:none;will-change:transform}\@media (max-width: 599px){.mdc-snackbar{left:0;width:100%;-webkit-transform:translate(0, 100%);transform:translate(0, 100%)}}\@media (min-width: 600px){.mdc-snackbar{min-width:288px;max-width:568px;border-radius:2px}}\@media (min-width: 600px){.mdc-snackbar--align-start{left:24px;right:initial;bottom:24px;-webkit-transform:translate(0, 200%);transform:translate(0, 200%)}[dir=\"rtl\"] .mdc-snackbar--align-start,.mdc-snackbar--align-start[dir=\"rtl\"]{left:initial;right:24px}}\@media (max-width: 599px){.mdc-snackbar--align-start{bottom:0;left:0;width:100%;-webkit-transform:translate(0, 100%);transform:translate(0, 100%)}}.mdc-snackbar--active{-webkit-transform:translate(0);transform:translate(0);-webkit-transition:-webkit-transform .25s 0ms cubic-bezier(0, 0, 0.2, 1);transition:-webkit-transform .25s 0ms cubic-bezier(0, 0, 0.2, 1);transition:transform .25s 0ms cubic-bezier(0, 0, 0.2, 1);transition:transform .25s 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform .25s 0ms cubic-bezier(0, 0, 0.2, 1);pointer-events:auto}.mdc-snackbar--active:not(.mdc-snackbar--align-start){-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0)}\@media (max-width: 599px){.mdc-snackbar--active:not(.mdc-snackbar--align-start){bottom:0;left:0;width:100%;-webkit-transform:translate(0);transform:translate(0)}}.mdc-snackbar__action-wrapper{padding-left:24px;padding-right:0}[dir=\"rtl\"] .mdc-snackbar__action-wrapper,.mdc-snackbar__action-wrapper[dir=\"rtl\"]{padding-left:0;padding-right:24px}.mdc-snackbar--action-on-bottom{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.mdc-snackbar__text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.5rem;font-weight:400;letter-spacing:.03125em;text-decoration:inherit;text-transform:inherit;margin-left:0;margin-right:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:48px;-webkit-transition:opacity .3s 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity .3s 0ms cubic-bezier(0.4, 0, 1, 1);opacity:0;color:#fff}.mdc-snackbar[dir=\"rtl\"] .mdc-snackbar__text,[dir=\"rtl\"] .mdc-snackbar .mdc-snackbar__text{margin-left:auto;margin-right:0}\@media (min-width: 600px){.mdc-snackbar__text{padding-left:0;padding-right:24px}[dir=\"rtl\"] .mdc-snackbar__text,.mdc-snackbar__text[dir=\"rtl\"]{padding-left:24px;padding-right:0}}.mdc-snackbar--action-on-bottom .mdc-snackbar__text{margin-right:inherit}.mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper{margin-left:auto;margin-right:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;margin-top:-12px;margin-bottom:8px}[dir=\"rtl\"] .mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper,.mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper[dir=\"rtl\"]{margin-left:0;margin-right:auto}.mdc-snackbar--multiline .mdc-snackbar__text{height:80px}.mdc-snackbar__action-button{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.08929em;text-decoration:none;text-transform:uppercase;color:#018786;color:var(--mdc-theme-secondary, #018786);padding:0;-webkit-transition:opacity .3s 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity .3s 0ms cubic-bezier(0.4, 0, 1, 1);border:none;outline:none;background-color:transparent;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;visibility:hidden}.mdc-snackbar__action-button::-moz-focus-inner{border:0}.mdc-snackbar__action-button:hover{cursor:pointer}.mdc-snackbar__action-button:not([aria-hidden]){visibility:inherit}.mdc-snackbar--active .mdc-snackbar__text,.mdc-snackbar--active .mdc-snackbar__action-button:not([aria-hidden]){-webkit-transition:opacity .3s 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity .3s 0ms cubic-bezier(0.4, 0, 1, 1);opacity:1}.mdc-snackbar--multiline.mdc-snackbar--action-on-bottom .mdc-snackbar__text{margin:0}:host .mdc-snackbar{z-index:4}"; }
}

export { DemoBarComponent as ODemoBar, DemoButtonsComponent as ODemoBarButtons, DemoSelectComponent as ODemoBarSelect, DemoToolbarComponent as ODemoBarToolbar, DemoDevicesComponent as ODemoDevices, DemoFabComponent as ODemoFab, DemoResizerComponent as ODemoResizer, DemoSnackbarComponent as ODemoSnackbar };
