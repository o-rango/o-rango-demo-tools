System.register(['./orango-demo-tools-204882af.js', './chunk-8a5d6327.js', './chunk-5987fd85.js'], function (exports, module) {
    'use strict';
    var registerInstance, h, getElement, __extends, __assign, MDCFoundation, MDCComponent, MDCRipple;
    return {
        setters: [function (module) {
                registerInstance = module.b;
                h = module.d;
                getElement = module.e;
            }, function (module) {
                __extends = module.a;
                __assign = module.b;
                MDCFoundation = module.c;
                MDCComponent = module.d;
            }, function (module) {
                MDCRipple = module.a;
            }],
        execute: function () {
            /**
             * @license
             * Copyright 2017 Google Inc.
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
            var cssClasses = {
                FIXED: 'mdc-toolbar--fixed',
                FIXED_AT_LAST_ROW: 'mdc-toolbar--fixed-at-last-row',
                FIXED_LASTROW: 'mdc-toolbar--fixed-lastrow-only',
                FLEXIBLE_DEFAULT_BEHAVIOR: 'mdc-toolbar--flexible-default-behavior',
                FLEXIBLE_MAX: 'mdc-toolbar--flexible-space-maximized',
                FLEXIBLE_MIN: 'mdc-toolbar--flexible-space-minimized',
                TOOLBAR_ROW_FLEXIBLE: 'mdc-toolbar--flexible',
            };
            var strings = {
                CHANGE_EVENT: 'MDCToolbar:change',
                FIRST_ROW_SELECTOR: '.mdc-toolbar__row:first-child',
                ICON_SELECTOR: '.mdc-toolbar__icon',
                TITLE_SELECTOR: '.mdc-toolbar__title',
            };
            var numbers = {
                MAX_TITLE_SIZE: 2.125,
                MIN_TITLE_SIZE: 1.25,
                TOOLBAR_MOBILE_BREAKPOINT: 600,
                TOOLBAR_ROW_HEIGHT: 64,
                TOOLBAR_ROW_MOBILE_HEIGHT: 56,
            };
            /**
             * @license
             * Copyright 2017 Google Inc.
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
            var MDCToolbarFoundation = /** @class */ (function (_super) {
                __extends(MDCToolbarFoundation, _super);
                function MDCToolbarFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCToolbarFoundation.defaultAdapter, adapter)) || this;
                    _this.checkRowHeightFrame_ = 0;
                    _this.scrollFrame_ = 0;
                    _this.executedLastChange_ = false;
                    _this.isFixed_ = false;
                    _this.isFixedLastRow_ = false;
                    _this.hasFlexibleFirstRow_ = false;
                    _this.useFlexDefaultBehavior_ = false;
                    _this.calculations_ = {
                        flexibleExpansionHeight: 0,
                        flexibleExpansionRatio: 0,
                        maxTranslateYDistance: 0,
                        maxTranslateYRatio: 0,
                        scrollThreshold: 0,
                        scrollThresholdRatio: 0,
                        toolbarHeight: 0,
                        toolbarRatio: 0,
                        toolbarRowHeight: 0,
                    };
                    return _this;
                }
                Object.defineProperty(MDCToolbarFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCToolbarFoundation, "strings", {
                    get: function () {
                        return strings;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCToolbarFoundation, "numbers", {
                    get: function () {
                        return numbers;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCToolbarFoundation, "defaultAdapter", {
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            hasClass: function () { return false; },
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            registerScrollHandler: function () { return undefined; },
                            deregisterScrollHandler: function () { return undefined; },
                            registerResizeHandler: function () { return undefined; },
                            deregisterResizeHandler: function () { return undefined; },
                            getViewportWidth: function () { return 0; },
                            getViewportScrollY: function () { return 0; },
                            getOffsetHeight: function () { return 0; },
                            getFirstRowElementOffsetHeight: function () { return 0; },
                            notifyChange: function () { return undefined; },
                            setStyle: function () { return undefined; },
                            setStyleForTitleElement: function () { return undefined; },
                            setStyleForFlexibleRowElement: function () { return undefined; },
                            setStyleForFixedAdjustElement: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCToolbarFoundation.prototype.init = function () {
                    var _this = this;
                    this.isFixed_ = this.adapter_.hasClass(cssClasses.FIXED);
                    this.isFixedLastRow_ = this.adapter_.hasClass(cssClasses.FIXED_LASTROW) && this.isFixed_;
                    this.hasFlexibleFirstRow_ = this.adapter_.hasClass(cssClasses.TOOLBAR_ROW_FLEXIBLE);
                    if (this.hasFlexibleFirstRow_) {
                        this.useFlexDefaultBehavior_ = this.adapter_.hasClass(cssClasses.FLEXIBLE_DEFAULT_BEHAVIOR);
                    }
                    this.resizeHandler_ = function () { return _this.checkRowHeight_(); };
                    this.scrollHandler_ = function () { return _this.updateToolbarStyles_(); };
                    this.adapter_.registerResizeHandler(this.resizeHandler_);
                    this.adapter_.registerScrollHandler(this.scrollHandler_);
                    this.initKeyRatio_();
                    this.setKeyHeights_();
                };
                MDCToolbarFoundation.prototype.destroy = function () {
                    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
                    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
                };
                MDCToolbarFoundation.prototype.updateAdjustElementStyles = function () {
                    if (this.isFixed_) {
                        this.adapter_.setStyleForFixedAdjustElement('margin-top', this.calculations_.toolbarHeight + "px");
                    }
                };
                MDCToolbarFoundation.prototype.getFlexibleExpansionRatio_ = function (scrollTop) {
                    // To prevent division by zero when there is no flexibleExpansionHeight
                    var delta = 0.0001;
                    return Math.max(0, 1 - scrollTop / (this.calculations_.flexibleExpansionHeight + delta));
                };
                MDCToolbarFoundation.prototype.checkRowHeight_ = function () {
                    var _this = this;
                    cancelAnimationFrame(this.checkRowHeightFrame_);
                    this.checkRowHeightFrame_ = requestAnimationFrame(function () { return _this.setKeyHeights_(); });
                };
                MDCToolbarFoundation.prototype.setKeyHeights_ = function () {
                    var newToolbarRowHeight = this.getRowHeight_();
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
                };
                MDCToolbarFoundation.prototype.updateToolbarStyles_ = function () {
                    var _this = this;
                    cancelAnimationFrame(this.scrollFrame_);
                    this.scrollFrame_ = requestAnimationFrame(function () {
                        var scrollTop = _this.adapter_.getViewportScrollY();
                        var hasScrolledOutOfThreshold = _this.scrolledOutOfThreshold_(scrollTop);
                        if (hasScrolledOutOfThreshold && _this.executedLastChange_) {
                            return;
                        }
                        var flexibleExpansionRatio = _this.getFlexibleExpansionRatio_(scrollTop);
                        _this.updateToolbarFlexibleState_(flexibleExpansionRatio);
                        if (_this.isFixedLastRow_) {
                            _this.updateToolbarFixedState_(scrollTop);
                        }
                        if (_this.hasFlexibleFirstRow_) {
                            _this.updateFlexibleRowElementStyles_(flexibleExpansionRatio);
                        }
                        _this.executedLastChange_ = hasScrolledOutOfThreshold;
                        _this.adapter_.notifyChange({ flexibleExpansionRatio: flexibleExpansionRatio });
                    });
                };
                MDCToolbarFoundation.prototype.scrolledOutOfThreshold_ = function (scrollTop) {
                    return scrollTop > this.calculations_.scrollThreshold;
                };
                MDCToolbarFoundation.prototype.initKeyRatio_ = function () {
                    var toolbarRowHeight = this.getRowHeight_();
                    var firstRowMaxRatio = this.adapter_.getFirstRowElementOffsetHeight() / toolbarRowHeight;
                    this.calculations_.toolbarRatio = this.adapter_.getOffsetHeight() / toolbarRowHeight;
                    this.calculations_.flexibleExpansionRatio = firstRowMaxRatio - 1;
                    this.calculations_.maxTranslateYRatio =
                        this.isFixedLastRow_ ? this.calculations_.toolbarRatio - firstRowMaxRatio : 0;
                    this.calculations_.scrollThresholdRatio =
                        (this.isFixedLastRow_ ? this.calculations_.toolbarRatio : firstRowMaxRatio) - 1;
                };
                MDCToolbarFoundation.prototype.getRowHeight_ = function () {
                    var breakpoint = numbers.TOOLBAR_MOBILE_BREAKPOINT;
                    return this.adapter_.getViewportWidth() < breakpoint ?
                        numbers.TOOLBAR_ROW_MOBILE_HEIGHT : numbers.TOOLBAR_ROW_HEIGHT;
                };
                MDCToolbarFoundation.prototype.updateToolbarFlexibleState_ = function (flexibleExpansionRatio) {
                    this.adapter_.removeClass(cssClasses.FLEXIBLE_MAX);
                    this.adapter_.removeClass(cssClasses.FLEXIBLE_MIN);
                    if (flexibleExpansionRatio === 1) {
                        this.adapter_.addClass(cssClasses.FLEXIBLE_MAX);
                    }
                    else if (flexibleExpansionRatio === 0) {
                        this.adapter_.addClass(cssClasses.FLEXIBLE_MIN);
                    }
                };
                MDCToolbarFoundation.prototype.updateToolbarFixedState_ = function (scrollTop) {
                    var translateDistance = Math.max(0, Math.min(scrollTop - this.calculations_.flexibleExpansionHeight, this.calculations_.maxTranslateYDistance));
                    this.adapter_.setStyle('transform', "translateY(" + -translateDistance + "px)");
                    if (translateDistance === this.calculations_.maxTranslateYDistance) {
                        this.adapter_.addClass(cssClasses.FIXED_AT_LAST_ROW);
                    }
                    else {
                        this.adapter_.removeClass(cssClasses.FIXED_AT_LAST_ROW);
                    }
                };
                MDCToolbarFoundation.prototype.updateFlexibleRowElementStyles_ = function (flexibleExpansionRatio) {
                    if (this.isFixed_) {
                        var height = this.calculations_.flexibleExpansionHeight * flexibleExpansionRatio;
                        this.adapter_.setStyleForFlexibleRowElement('height', height + this.calculations_.toolbarRowHeight + "px");
                    }
                    if (this.useFlexDefaultBehavior_) {
                        this.updateElementStylesDefaultBehavior_(flexibleExpansionRatio);
                    }
                };
                MDCToolbarFoundation.prototype.updateElementStylesDefaultBehavior_ = function (flexibleExpansionRatio) {
                    var maxTitleSize = numbers.MAX_TITLE_SIZE;
                    var minTitleSize = numbers.MIN_TITLE_SIZE;
                    var currentTitleSize = (maxTitleSize - minTitleSize) * flexibleExpansionRatio + minTitleSize;
                    this.adapter_.setStyleForTitleElement('font-size', currentTitleSize + "rem");
                };
                return MDCToolbarFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2017 Google Inc.
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
            var strings$1 = MDCToolbarFoundation.strings;
            var MDCToolbar = /** @class */ (function (_super) {
                __extends(MDCToolbar, _super);
                function MDCToolbar() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCToolbar.attachTo = function (root) {
                    return new MDCToolbar(root);
                };
                MDCToolbar.prototype.initialize = function () {
                    var _this = this;
                    this.ripples_ = [];
                    this.fixedAdjustElement_ = null;
                    this.titleElement_ = this.root_.querySelector(strings$1.TITLE_SELECTOR);
                    var firstRowElement = this.root_.querySelector(strings$1.FIRST_ROW_SELECTOR);
                    if (!firstRowElement) {
                        throw new Error("MDCToolbar: Required sub-element '" + strings$1.FIRST_ROW_SELECTOR + "' is missing");
                    }
                    this.firstRowElement_ = firstRowElement;
                    [].forEach.call(this.root_.querySelectorAll(strings$1.ICON_SELECTOR), function (icon) {
                        var ripple = MDCRipple.attachTo(icon);
                        ripple.unbounded = true;
                        _this.ripples_.push(ripple);
                    });
                };
                MDCToolbar.prototype.destroy = function () {
                    this.ripples_.forEach(function (ripple) {
                        ripple.destroy();
                    });
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(MDCToolbar.prototype, "fixedAdjustElement", {
                    get: function () {
                        return this.fixedAdjustElement_;
                    },
                    set: function (element) {
                        this.fixedAdjustElement_ = element;
                        this.foundation_.updateAdjustElementStyles();
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCToolbar.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        hasClass: function (className) { return _this.root_.classList.contains(className); },
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        registerScrollHandler: function (handler) { return window.addEventListener('scroll', handler); },
                        deregisterScrollHandler: function (handler) { return window.removeEventListener('scroll', handler); },
                        registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
                        deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
                        getViewportWidth: function () { return window.innerWidth; },
                        getViewportScrollY: function () { return window.pageYOffset; },
                        getOffsetHeight: function () { return _this.root_.offsetHeight; },
                        getFirstRowElementOffsetHeight: function () { return _this.firstRowElement_.offsetHeight; },
                        notifyChange: function (evtData) { return _this.emit(strings$1.CHANGE_EVENT, evtData); },
                        setStyle: function (property, value) { return _this.root_.style.setProperty(property, value); },
                        setStyleForTitleElement: function (property, value) {
                            if (_this.titleElement_) {
                                _this.titleElement_.style.setProperty(property, value);
                            }
                        },
                        setStyleForFlexibleRowElement: function (property, value) { return _this.firstRowElement_.style.setProperty(property, value); },
                        setStyleForFixedAdjustElement: function (property, value) {
                            if (_this.fixedAdjustElement) {
                                _this.fixedAdjustElement.style.setProperty(property, value);
                            }
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCToolbarFoundation(adapter);
                };
                return MDCToolbar;
            }(MDCComponent));
            /**
             * @license
             * Copyright 2019 Google Inc.
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
            var DemoToolbarComponent = /** @class */ (function () {
                function DemoToolbarComponent(hostRef) {
                    registerInstance(this, hostRef);
                }
                DemoToolbarComponent.prototype.componentDidLoad = function () {
                    this.rootEl = this.el.shadowRoot.querySelector('.mdc-toolbar');
                    this.toolbar = new MDCToolbar(this.rootEl);
                    var elResizer = this.el.parentElement;
                    this.toolbar.fixedAdjustElement = elResizer;
                };
                DemoToolbarComponent.prototype.componentDidUnload = function () {
                    this.toolbar.destroy();
                };
                DemoToolbarComponent.prototype.render = function () {
                    return (h("div", { class: "mdc-typography" }, h("header", { class: "mdc-toolbar mdc-toolbar--fixed" }, h("div", { class: "mdc-toolbar__row" }, h("section", { id: "left-panel", class: "mdc-toolbar__section mdc-toolbar__section--align-start" }, h("h3", { class: "mdc-typography--subheading2" }, this.name), h("slot", { name: "left" })), h("section", { id: "center-panel", class: "mdc-toolbar__section" }, h("slot", { name: "center" })), h("section", { id: "right-panel", class: "mdc-toolbar__section mdc-toolbar__section--align-end", role: "toolbar" }, h("slot", { name: "right" }))), h("slot", { name: "base" }))));
                };
                Object.defineProperty(DemoToolbarComponent, "originalStyleUrls", {
                    get: function () {
                        return {
                            "$": ["o-demo-bar-toolbar.scss"]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoToolbarComponent.prototype, "el", {
                    get: function () { return getElement(this); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoToolbarComponent, "style", {
                    get: function () { return ".mdc-toolbar{background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee);color:#fff;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}.mdc-toolbar .mdc-toolbar__icon{color:#fff}.mdc-toolbar .mdc-toolbar__icon:after,.mdc-toolbar .mdc-toolbar__icon:before{background-color:#fff}.mdc-toolbar .mdc-toolbar__icon:hover:before{opacity:.08}.mdc-toolbar .mdc-toolbar__icon.mdc-ripple-upgraded--background-focused:before,.mdc-toolbar .mdc-toolbar__icon:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.24}.mdc-toolbar .mdc-toolbar__icon:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-toolbar .mdc-toolbar__icon:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.24}.mdc-toolbar .mdc-toolbar__icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-toolbar__row{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:auto;min-height:64px}\@media (max-width:959px) and (orientation:landscape){.mdc-toolbar__row{min-height:48px}}\@media (max-width:599px){.mdc-toolbar__row{min-height:56px}}.mdc-toolbar__section{display:-ms-inline-flexbox;display:inline-flex;-ms-flex:1;flex:1;-ms-flex-align:start;align-items:start;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0;height:100%;padding:8px;z-index:1}\@media (max-width:959px) and (orientation:landscape){.mdc-toolbar__section{padding:0}}\@media (max-width:599px){.mdc-toolbar__section{padding:4px 0}}.mdc-toolbar__section--align-start{padding-left:12px;padding-right:0;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-order:-1;order:-1}.mdc-toolbar__section--align-start[dir=rtl],[dir=rtl] .mdc-toolbar__section--align-start{padding-left:0;padding-right:12px}\@media (max-width:959px) and (orientation:landscape){.mdc-toolbar__section--align-start{padding-left:4px;padding-right:0}.mdc-toolbar__section--align-start[dir=rtl],[dir=rtl] .mdc-toolbar__section--align-start{padding-left:0;padding-right:4px}}\@media (max-width:599px){.mdc-toolbar__section--align-start{padding-left:4px;padding-right:0}.mdc-toolbar__section--align-start[dir=rtl],[dir=rtl] .mdc-toolbar__section--align-start{padding-left:0;padding-right:4px}}.mdc-toolbar__section--align-end{padding-left:0;padding-right:12px;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-order:1;order:1}.mdc-toolbar__section--align-end[dir=rtl],[dir=rtl] .mdc-toolbar__section--align-end{padding-left:12px;padding-right:0}\@media (max-width:959px) and (orientation:landscape){.mdc-toolbar__section--align-end{padding-left:0;padding-right:4px}.mdc-toolbar__section--align-end[dir=rtl],[dir=rtl] .mdc-toolbar__section--align-end{padding-left:4px;padding-right:0}}\@media (max-width:599px){.mdc-toolbar__section--align-end{padding-left:0;padding-right:4px}.mdc-toolbar__section--align-end[dir=rtl],[dir=rtl] .mdc-toolbar__section--align-end{padding-left:4px;padding-right:0}}.mdc-toolbar__title{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-left:24px;margin-right:0;-ms-flex-item-align:center;align-self:center;padding:12px 0;line-height:1.5rem;z-index:1}.mdc-toolbar__title[dir=rtl],[dir=rtl] .mdc-toolbar__title{margin-left:0;margin-right:24px}.mdc-toolbar__icon,.mdc-toolbar__menu-icon{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:start;align-items:start;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:48px;height:48px;padding:12px;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer}.mdc-toolbar__icon:after,.mdc-toolbar__icon:before,.mdc-toolbar__menu-icon:after,.mdc-toolbar__menu-icon:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-toolbar__icon:before,.mdc-toolbar__menu-icon:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-toolbar__icon.mdc-ripple-upgraded:before,.mdc-toolbar__menu-icon.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-toolbar__icon.mdc-ripple-upgraded:after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-toolbar__icon.mdc-ripple-upgraded--unbounded:after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-toolbar__icon.mdc-ripple-upgraded--foreground-activation:after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-toolbar__icon.mdc-ripple-upgraded--foreground-deactivation:after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-toolbar__icon:after,.mdc-toolbar__icon:before,.mdc-toolbar__menu-icon:after,.mdc-toolbar__menu-icon:before{top:0;left:0;width:100%;height:100%}.mdc-toolbar__icon.mdc-ripple-upgraded:after,.mdc-toolbar__icon.mdc-ripple-upgraded:before,.mdc-toolbar__menu-icon.mdc-ripple-upgraded:after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-toolbar__icon.mdc-ripple-upgraded:after,.mdc-toolbar__menu-icon.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-toolbar__menu-icon+.mdc-toolbar__title{margin-left:8px;margin-right:0}.mdc-toolbar__menu-icon+.mdc-toolbar__title[dir=rtl],[dir=rtl] .mdc-toolbar__menu-icon+.mdc-toolbar__title{margin-left:0;margin-right:8px}\@media (max-width:599px){.mdc-toolbar__title{margin-left:16px;margin-right:0}.mdc-toolbar__title[dir=rtl],[dir=rtl] .mdc-toolbar__title{margin-left:0;margin-right:16px}}.mdc-toolbar--fixed{-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);position:fixed;top:0;left:0;z-index:4}.mdc-toolbar--flexible{--mdc-toolbar-ratio-to-extend-flexible:4}.mdc-toolbar--flexible .mdc-toolbar__row:first-child{height:256px;height:calc(64px*var(--mdc-toolbar-ratio-to-extend-flexible, 4))}\@media (max-width:599px){.mdc-toolbar--flexible .mdc-toolbar__row:first-child{height:224px;height:calc(56px*var(--mdc-toolbar-ratio-to-extend-flexible, 4))}}.mdc-toolbar--flexible .mdc-toolbar__row:first-child:after{position:absolute;content:\"\"}.mdc-toolbar--flexible-default-behavior .mdc-toolbar__title{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;-ms-flex-item-align:end;align-self:flex-end;line-height:1.5rem}.mdc-toolbar--flexible-default-behavior .mdc-toolbar__row:first-child:after{top:0;left:0;width:100%;height:100%;-webkit-transition:opacity .2s ease;transition:opacity .2s ease;opacity:1}.mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized .mdc-toolbar__row:first-child:after{opacity:0}.mdc-toolbar--flexible-default-behavior.mdc-toolbar--flexible-space-minimized .mdc-toolbar__title{font-weight:500}.mdc-toolbar--waterfall.mdc-toolbar--fixed{-webkit-box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);-webkit-transition:-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);transition:-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);transition:box-shadow .28s cubic-bezier(.4,0,.2,1);transition:box-shadow .28s cubic-bezier(.4,0,.2,1), -webkit-box-shadow .28s cubic-bezier(.4,0,.2,1);will-change:box-shadow}.mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--flexible-space-minimized{-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--flexible-space-minimized{-webkit-box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mdc-toolbar--waterfall.mdc-toolbar--fixed.mdc-toolbar--fixed-lastrow-only.mdc-toolbar--fixed-at-last-row{-webkit-box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-toolbar-fixed-adjust{padding-top:64px}\@media (max-width:959px) and (max-height:599px){.mdc-toolbar-fixed-adjust{padding-top:48px}}\@media (max-width:599px){.mdc-toolbar-fixed-adjust{padding-top:56px}}.mdc-toolbar__section--shrink-to-fit{-ms-flex:none;flex:none}:host{--mdc-theme-primary:#fff;--mdc-theme-text-primary-on-primary:#494949;--mdc-theme-background:#c3c3c3;--vh:1vh;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}:host .mdc-toolbar--fixed{z-index:5}:host section{margin:0 1.5em 0 1.2em;transition:opacity .25s ease-in-out;-moz-transition:opacity .25s ease-in-out;-webkit-transition:opacity .25s ease-in-out}:host section .mdc-typography--subheading2{color:var(--mdc-theme-text-primary-on-primary,#000);font-size:1.1rem;text-overflow:ellipsis}\@media only screen and (max-width:900px){:host #left-panel{max-width:30%}:host #center-panel{min-width:40%}:host #right-panel{max-width:30%}}\@media only screen and (max-width:700px){:host #right-panel{display:none}:host #center-panel{min-width:100%;padding:0}:host #left-panel{display:none}}"; },
                    enumerable: true,
                    configurable: true
                });
                return DemoToolbarComponent;
            }());
            exports('o_demo_bar_toolbar', DemoToolbarComponent);
        }
    };
});
