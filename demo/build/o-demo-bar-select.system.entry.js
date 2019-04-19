System.register(['./orango-demo-tools-a1d349ad.js', './chunk-8a5d6327.js', './chunk-5987fd85.js', './chunk-d438f2cf.js'], function (exports, module) {
    'use strict';
    var registerInstance, createEvent, h, getElement, __extends, __assign, MDCFoundation, MDCComponent, closest, matches, __values, MDCRipple, MDCRippleFoundation;
    return {
        setters: [function (module) {
                registerInstance = module.c;
                createEvent = module.d;
                h = module.e;
                getElement = module.f;
            }, function (module) {
                __extends = module.a;
                __assign = module.b;
                MDCFoundation = module.c;
                MDCComponent = module.d;
                closest = module.e;
                matches = module.f;
                __values = module.g;
            }, function (module) {
                MDCRipple = module.a;
                MDCRippleFoundation = module.b;
            }, function () { }],
        execute: function () {
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
            var cssClasses = {
                LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
                LABEL_SHAKE: 'mdc-floating-label--shake',
                ROOT: 'mdc-floating-label',
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
            var MDCFloatingLabelFoundation = /** @class */ (function (_super) {
                __extends(MDCFloatingLabelFoundation, _super);
                function MDCFloatingLabelFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;
                    _this.shakeAnimationEndHandler_ = function () { return _this.handleShakeAnimationEnd_(); };
                    return _this;
                }
                Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
                    /**
                     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            getWidth: function () { return 0; },
                            registerInteractionHandler: function () { return undefined; },
                            deregisterInteractionHandler: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCFloatingLabelFoundation.prototype.init = function () {
                    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
                };
                MDCFloatingLabelFoundation.prototype.destroy = function () {
                    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
                };
                /**
                 * Returns the width of the label element.
                 */
                MDCFloatingLabelFoundation.prototype.getWidth = function () {
                    return this.adapter_.getWidth();
                };
                /**
                 * Styles the label to produce a shake animation to indicate an error.
                 * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
                 */
                MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
                    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
                    if (shouldShake) {
                        this.adapter_.addClass(LABEL_SHAKE);
                    }
                    else {
                        this.adapter_.removeClass(LABEL_SHAKE);
                    }
                };
                /**
                 * Styles the label to float or dock.
                 * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
                 */
                MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
                    var _a = MDCFloatingLabelFoundation.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
                    if (shouldFloat) {
                        this.adapter_.addClass(LABEL_FLOAT_ABOVE);
                    }
                    else {
                        this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
                        this.adapter_.removeClass(LABEL_SHAKE);
                    }
                };
                MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
                    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
                    this.adapter_.removeClass(LABEL_SHAKE);
                };
                return MDCFloatingLabelFoundation;
            }(MDCFoundation));
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
            var MDCFloatingLabel = /** @class */ (function (_super) {
                __extends(MDCFloatingLabel, _super);
                function MDCFloatingLabel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCFloatingLabel.attachTo = function (root) {
                    return new MDCFloatingLabel(root);
                };
                /**
                 * Styles the label to produce the label shake for errors.
                 * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
                 */
                MDCFloatingLabel.prototype.shake = function (shouldShake) {
                    this.foundation_.shake(shouldShake);
                };
                /**
                 * Styles the label to float/dock.
                 * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
                 */
                MDCFloatingLabel.prototype.float = function (shouldFloat) {
                    this.foundation_.float(shouldFloat);
                };
                MDCFloatingLabel.prototype.getWidth = function () {
                    return this.foundation_.getWidth();
                };
                MDCFloatingLabel.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        getWidth: function () { return _this.root_.scrollWidth; },
                        registerInteractionHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
                        deregisterInteractionHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCFloatingLabelFoundation(adapter);
                };
                return MDCFloatingLabel;
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
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var cssClasses$1 = {
                LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
                LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating',
            };
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCLineRippleFoundation = /** @class */ (function (_super) {
                __extends(MDCLineRippleFoundation, _super);
                function MDCLineRippleFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;
                    _this.transitionEndHandler_ = function (evt) { return _this.handleTransitionEnd(evt); };
                    return _this;
                }
                Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
                    /**
                     * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            hasClass: function () { return false; },
                            setStyle: function () { return undefined; },
                            registerEventHandler: function () { return undefined; },
                            deregisterEventHandler: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCLineRippleFoundation.prototype.init = function () {
                    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
                };
                MDCLineRippleFoundation.prototype.destroy = function () {
                    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
                };
                MDCLineRippleFoundation.prototype.activate = function () {
                    this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
                    this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
                };
                MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
                    this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
                };
                MDCLineRippleFoundation.prototype.deactivate = function () {
                    this.adapter_.addClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
                };
                MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
                    // Wait for the line ripple to be either transparent or opaque
                    // before emitting the animation end event
                    var isDeactivating = this.adapter_.hasClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
                    if (evt.propertyName === 'opacity') {
                        if (isDeactivating) {
                            this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
                            this.adapter_.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
                        }
                    }
                };
                return MDCLineRippleFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCLineRipple = /** @class */ (function (_super) {
                __extends(MDCLineRipple, _super);
                function MDCLineRipple() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCLineRipple.attachTo = function (root) {
                    return new MDCLineRipple(root);
                };
                /**
                 * Activates the line ripple
                 */
                MDCLineRipple.prototype.activate = function () {
                    this.foundation_.activate();
                };
                /**
                 * Deactivates the line ripple
                 */
                MDCLineRipple.prototype.deactivate = function () {
                    this.foundation_.deactivate();
                };
                /**
                 * Sets the transform origin given a user's click location.
                 * The `rippleCenter` is the x-coordinate of the middle of the ripple.
                 */
                MDCLineRipple.prototype.setRippleCenter = function (xCoordinate) {
                    this.foundation_.setRippleCenter(xCoordinate);
                };
                MDCLineRipple.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        hasClass: function (className) { return _this.root_.classList.contains(className); },
                        setStyle: function (propertyName, value) { return _this.root_.style.setProperty(propertyName, value); },
                        registerEventHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
                        deregisterEventHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCLineRippleFoundation(adapter);
                };
                return MDCLineRipple;
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
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var cssClasses$2 = {
                ANCHOR: 'mdc-menu-surface--anchor',
                ANIMATING_CLOSED: 'mdc-menu-surface--animating-closed',
                ANIMATING_OPEN: 'mdc-menu-surface--animating-open',
                FIXED: 'mdc-menu-surface--fixed',
                OPEN: 'mdc-menu-surface--open',
                ROOT: 'mdc-menu-surface',
            };
            // tslint:disable:object-literal-sort-keys
            var strings = {
                CLOSED_EVENT: 'MDCMenuSurface:closed',
                OPENED_EVENT: 'MDCMenuSurface:opened',
                FOCUSABLE_ELEMENTS: [
                    'button:not(:disabled)', '[href]:not([aria-disabled="true"])', 'input:not(:disabled)',
                    'select:not(:disabled)', 'textarea:not(:disabled)', '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
                ].join(', '),
            };
            // tslint:enable:object-literal-sort-keys
            var numbers = {
                /** Total duration of menu-surface open animation. */
                TRANSITION_OPEN_DURATION: 120,
                /** Total duration of menu-surface close animation. */
                TRANSITION_CLOSE_DURATION: 75,
                /** Margin left to the edge of the viewport when menu-surface is at maximum possible height. */
                MARGIN_TO_EDGE: 32,
                /** Ratio of anchor width to menu-surface width for switching from corner positioning to center positioning. */
                ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
            };
            /**
             * Enum for bits in the {@see Corner) bitmap.
             */
            var CornerBit;
            (function (CornerBit) {
                CornerBit[CornerBit["BOTTOM"] = 1] = "BOTTOM";
                CornerBit[CornerBit["CENTER"] = 2] = "CENTER";
                CornerBit[CornerBit["RIGHT"] = 4] = "RIGHT";
                CornerBit[CornerBit["FLIP_RTL"] = 8] = "FLIP_RTL";
            })(CornerBit || (CornerBit = {}));
            /**
             * Enum for representing an element corner for positioning the menu-surface.
             *
             * The START constants map to LEFT if element directionality is left
             * to right and RIGHT if the directionality is right to left.
             * Likewise END maps to RIGHT or LEFT depending on the directionality.
             */
            var Corner;
            (function (Corner) {
                Corner[Corner["TOP_LEFT"] = 0] = "TOP_LEFT";
                Corner[Corner["TOP_RIGHT"] = 4] = "TOP_RIGHT";
                Corner[Corner["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
                Corner[Corner["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
                Corner[Corner["TOP_START"] = 8] = "TOP_START";
                Corner[Corner["TOP_END"] = 12] = "TOP_END";
                Corner[Corner["BOTTOM_START"] = 9] = "BOTTOM_START";
                Corner[Corner["BOTTOM_END"] = 13] = "BOTTOM_END";
            })(Corner || (Corner = {}));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var cssClasses$3 = {
                MENU_SELECTED_LIST_ITEM: 'mdc-menu-item--selected',
                MENU_SELECTION_GROUP: 'mdc-menu__selection-group',
                ROOT: 'mdc-menu',
            };
            var strings$1 = {
                ARIA_SELECTED_ATTR: 'aria-selected',
                CHECKBOX_SELECTOR: 'input[type="checkbox"]',
                LIST_SELECTOR: '.mdc-list',
                SELECTED_EVENT: 'MDCMenu:selected',
            };
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var cssClasses$4 = {
                LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
                LIST_ITEM_CLASS: 'mdc-list-item',
                LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
                ROOT: 'mdc-list',
            };
            var strings$2 = {
                ACTION_EVENT: 'MDCList:action',
                ARIA_CHECKED: 'aria-checked',
                ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
                ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
                ARIA_CURRENT: 'aria-current',
                ARIA_ORIENTATION: 'aria-orientation',
                ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
                ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
                ARIA_SELECTED: 'aria-selected',
                CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
                CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
                CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$4.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " a\n  ",
                ENABLED_ITEMS_SELECTOR: '.mdc-list-item:not(.mdc-list-item--disabled)',
                FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$4.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$4.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$4.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
                RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)',
            };
            var numbers$1 = {
                UNSET_INDEX: -1,
            };
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
            function isNumberArray(selectedIndex) {
                return selectedIndex instanceof Array;
            }
            var MDCListFoundation = /** @class */ (function (_super) {
                __extends(MDCListFoundation, _super);
                function MDCListFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCListFoundation.defaultAdapter, adapter)) || this;
                    _this.wrapFocus_ = false;
                    _this.isVertical_ = true;
                    _this.isSingleSelectionList_ = false;
                    _this.selectedIndex_ = numbers$1.UNSET_INDEX;
                    _this.focusedItemIndex_ = numbers$1.UNSET_INDEX;
                    _this.useActivatedClass_ = false;
                    _this.ariaCurrentAttrValue_ = null;
                    _this.isCheckboxList_ = false;
                    _this.isRadioList_ = false;
                    return _this;
                }
                Object.defineProperty(MDCListFoundation, "strings", {
                    get: function () {
                        return strings$2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCListFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$4;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCListFoundation, "numbers", {
                    get: function () {
                        return numbers$1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCListFoundation, "defaultAdapter", {
                    get: function () {
                        return {
                            addClassForElementIndex: function () { return undefined; },
                            focusItemAtIndex: function () { return undefined; },
                            getAttributeForElementIndex: function () { return null; },
                            getFocusedElementIndex: function () { return 0; },
                            getListItemCount: function () { return 0; },
                            hasCheckboxAtIndex: function () { return false; },
                            hasRadioAtIndex: function () { return false; },
                            isCheckboxCheckedAtIndex: function () { return false; },
                            isFocusInsideList: function () { return false; },
                            notifyAction: function () { return undefined; },
                            removeClassForElementIndex: function () { return undefined; },
                            setAttributeForElementIndex: function () { return undefined; },
                            setCheckedCheckboxOrRadioAtIndex: function () { return undefined; },
                            setTabIndexForListItemChildren: function () { return undefined; },
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCListFoundation.prototype.layout = function () {
                    if (this.adapter_.getListItemCount() === 0) {
                        return;
                    }
                    if (this.adapter_.hasCheckboxAtIndex(0)) {
                        this.isCheckboxList_ = true;
                    }
                    else if (this.adapter_.hasRadioAtIndex(0)) {
                        this.isRadioList_ = true;
                    }
                };
                /**
                 * Sets the private wrapFocus_ variable.
                 */
                MDCListFoundation.prototype.setWrapFocus = function (value) {
                    this.wrapFocus_ = value;
                };
                /**
                 * Sets the isVertical_ private variable.
                 */
                MDCListFoundation.prototype.setVerticalOrientation = function (value) {
                    this.isVertical_ = value;
                };
                /**
                 * Sets the isSingleSelectionList_ private variable.
                 */
                MDCListFoundation.prototype.setSingleSelection = function (value) {
                    this.isSingleSelectionList_ = value;
                };
                /**
                 * Sets the useActivatedClass_ private variable.
                 */
                MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
                    this.useActivatedClass_ = useActivated;
                };
                MDCListFoundation.prototype.getSelectedIndex = function () {
                    return this.selectedIndex_;
                };
                MDCListFoundation.prototype.setSelectedIndex = function (index) {
                    if (!this.isIndexValid_(index)) {
                        return;
                    }
                    if (this.isCheckboxList_) {
                        this.setCheckboxAtIndex_(index);
                    }
                    else if (this.isRadioList_) {
                        this.setRadioAtIndex_(index);
                    }
                    else {
                        this.setSingleSelectionAtIndex_(index);
                    }
                };
                /**
                 * Focus in handler for the list items.
                 */
                MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
                    if (listItemIndex >= 0) {
                        this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
                    }
                };
                /**
                 * Focus out handler for the list items.
                 */
                MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
                    var _this = this;
                    if (listItemIndex >= 0) {
                        this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
                    }
                    /**
                     * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
                     * is moved to next element.
                     */
                    setTimeout(function () {
                        if (!_this.adapter_.isFocusInsideList()) {
                            _this.setTabindexToFirstSelectedItem_();
                        }
                    }, 0);
                };
                /**
                 * Key handler for the list.
                 */
                MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
                    var arrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
                    var arrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
                    var arrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
                    var arrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
                    var isHome = evt.key === 'Home' || evt.keyCode === 36;
                    var isEnd = evt.key === 'End' || evt.keyCode === 35;
                    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
                    var isSpace = evt.key === 'Space' || evt.keyCode === 32;
                    var currentIndex = this.adapter_.getFocusedElementIndex();
                    var nextIndex = numbers$1.UNSET_INDEX;
                    if (currentIndex === numbers$1.UNSET_INDEX) {
                        currentIndex = listItemIndex;
                        if (currentIndex < 0) {
                            // If this event doesn't have a mdc-list-item ancestor from the
                            // current list (not from a sublist), return early.
                            return;
                        }
                    }
                    if ((this.isVertical_ && arrowDown) || (!this.isVertical_ && arrowRight)) {
                        this.preventDefaultEvent_(evt);
                        nextIndex = this.focusNextElement(currentIndex);
                    }
                    else if ((this.isVertical_ && arrowUp) || (!this.isVertical_ && arrowLeft)) {
                        this.preventDefaultEvent_(evt);
                        nextIndex = this.focusPrevElement(currentIndex);
                    }
                    else if (isHome) {
                        this.preventDefaultEvent_(evt);
                        nextIndex = this.focusFirstElement();
                    }
                    else if (isEnd) {
                        this.preventDefaultEvent_(evt);
                        nextIndex = this.focusLastElement();
                    }
                    else if (isEnter || isSpace) {
                        if (isRootListItem) {
                            // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
                            var target = evt.target;
                            if (target && target.tagName === 'A' && isEnter) {
                                return;
                            }
                            this.preventDefaultEvent_(evt);
                            if (this.isSelectableList_()) {
                                this.setSelectedIndexOnAction_(currentIndex);
                            }
                            this.adapter_.notifyAction(currentIndex);
                        }
                    }
                    this.focusedItemIndex_ = currentIndex;
                    if (nextIndex >= 0) {
                        this.setTabindexAtIndex_(nextIndex);
                        this.focusedItemIndex_ = nextIndex;
                    }
                };
                /**
                 * Click handler for the list.
                 */
                MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
                    if (index === numbers$1.UNSET_INDEX) {
                        return;
                    }
                    if (this.isSelectableList_()) {
                        this.setSelectedIndexOnAction_(index, toggleCheckbox);
                    }
                    this.adapter_.notifyAction(index);
                    this.setTabindexAtIndex_(index);
                    this.focusedItemIndex_ = index;
                };
                /**
                 * Focuses the next element on the list.
                 */
                MDCListFoundation.prototype.focusNextElement = function (index) {
                    var count = this.adapter_.getListItemCount();
                    var nextIndex = index + 1;
                    if (nextIndex >= count) {
                        if (this.wrapFocus_) {
                            nextIndex = 0;
                        }
                        else {
                            // Return early because last item is already focused.
                            return index;
                        }
                    }
                    this.adapter_.focusItemAtIndex(nextIndex);
                    return nextIndex;
                };
                /**
                 * Focuses the previous element on the list.
                 */
                MDCListFoundation.prototype.focusPrevElement = function (index) {
                    var prevIndex = index - 1;
                    if (prevIndex < 0) {
                        if (this.wrapFocus_) {
                            prevIndex = this.adapter_.getListItemCount() - 1;
                        }
                        else {
                            // Return early because first item is already focused.
                            return index;
                        }
                    }
                    this.adapter_.focusItemAtIndex(prevIndex);
                    return prevIndex;
                };
                MDCListFoundation.prototype.focusFirstElement = function () {
                    this.adapter_.focusItemAtIndex(0);
                    return 0;
                };
                MDCListFoundation.prototype.focusLastElement = function () {
                    var lastIndex = this.adapter_.getListItemCount() - 1;
                    this.adapter_.focusItemAtIndex(lastIndex);
                    return lastIndex;
                };
                /**
                 * Ensures that preventDefault is only called if the containing element doesn't
                 * consume the event, and it will cause an unintended scroll.
                 */
                MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
                    var target = evt.target;
                    var tagName = ("" + target.tagName).toLowerCase();
                    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
                        evt.preventDefault();
                    }
                };
                MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
                    if (this.selectedIndex_ === index) {
                        return;
                    }
                    var selectedClassName = cssClasses$4.LIST_ITEM_SELECTED_CLASS;
                    if (this.useActivatedClass_) {
                        selectedClassName = cssClasses$4.LIST_ITEM_ACTIVATED_CLASS;
                    }
                    if (this.selectedIndex_ !== numbers$1.UNSET_INDEX) {
                        this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
                    }
                    this.adapter_.addClassForElementIndex(index, selectedClassName);
                    this.setAriaForSingleSelectionAtIndex_(index);
                    this.selectedIndex_ = index;
                };
                /**
                 * Sets aria attribute for single selection at given index.
                 */
                MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
                    // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
                    if (this.selectedIndex_ === numbers$1.UNSET_INDEX) {
                        this.ariaCurrentAttrValue_ =
                            this.adapter_.getAttributeForElementIndex(index, strings$2.ARIA_CURRENT);
                    }
                    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
                    var ariaAttribute = isAriaCurrent ? strings$2.ARIA_CURRENT : strings$2.ARIA_SELECTED;
                    if (this.selectedIndex_ !== numbers$1.UNSET_INDEX) {
                        this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
                    }
                    var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
                    this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
                };
                /**
                 * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
                 */
                MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
                    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);
                    if (this.selectedIndex_ !== numbers$1.UNSET_INDEX) {
                        this.adapter_.setAttributeForElementIndex(this.selectedIndex_, strings$2.ARIA_CHECKED, 'false');
                    }
                    this.adapter_.setAttributeForElementIndex(index, strings$2.ARIA_CHECKED, 'true');
                    this.selectedIndex_ = index;
                };
                MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
                    for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
                        var isChecked = false;
                        if (index.indexOf(i) >= 0) {
                            isChecked = true;
                        }
                        this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
                        this.adapter_.setAttributeForElementIndex(i, strings$2.ARIA_CHECKED, isChecked ? 'true' : 'false');
                    }
                    this.selectedIndex_ = index;
                };
                MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
                    if (this.focusedItemIndex_ === numbers$1.UNSET_INDEX && index !== 0) {
                        // If no list item was selected set first list item's tabindex to -1.
                        // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
                        this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
                    }
                    else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
                        this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
                    }
                    this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
                };
                /**
                 * @return Return true if it is single selectin list, checkbox list or radio list.
                 */
                MDCListFoundation.prototype.isSelectableList_ = function () {
                    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
                };
                MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
                    var targetIndex = 0;
                    if (this.isSelectableList_()) {
                        if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== numbers$1.UNSET_INDEX) {
                            targetIndex = this.selectedIndex_;
                        }
                        else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
                            targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) { return Math.min(currentIndex, minIndex); });
                        }
                    }
                    this.setTabindexAtIndex_(targetIndex);
                };
                MDCListFoundation.prototype.isIndexValid_ = function (index) {
                    var _this = this;
                    if (index instanceof Array) {
                        if (!this.isCheckboxList_) {
                            throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
                        }
                        if (index.length === 0) {
                            return true;
                        }
                        else {
                            return index.some(function (i) { return _this.isIndexInRange_(i); });
                        }
                    }
                    else if (typeof index === 'number') {
                        if (this.isCheckboxList_) {
                            throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
                        }
                        return this.isIndexInRange_(index);
                    }
                    else {
                        return false;
                    }
                };
                MDCListFoundation.prototype.isIndexInRange_ = function (index) {
                    var listSize = this.adapter_.getListItemCount();
                    return index >= 0 && index < listSize;
                };
                MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
                    if (toggleCheckbox === void 0) {
                        toggleCheckbox = true;
                    }
                    if (this.isCheckboxList_) {
                        this.toggleCheckboxAtIndex_(index, toggleCheckbox);
                    }
                    else {
                        this.setSelectedIndex(index);
                    }
                };
                MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
                    var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);
                    if (toggleCheckbox) {
                        isChecked = !isChecked;
                        this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
                    }
                    this.adapter_.setAttributeForElementIndex(index, strings$2.ARIA_CHECKED, isChecked ? 'true' : 'false');
                    // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.
                    var selectedIndexes = this.selectedIndex_ === numbers$1.UNSET_INDEX ? [] : this.selectedIndex_.slice();
                    if (isChecked) {
                        selectedIndexes.push(index);
                    }
                    else {
                        selectedIndexes = selectedIndexes.filter(function (i) { return i !== index; });
                    }
                    this.selectedIndex_ = selectedIndexes;
                };
                return MDCListFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCList = /** @class */ (function (_super) {
                __extends(MDCList, _super);
                function MDCList() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(MDCList.prototype, "vertical", {
                    set: function (value) {
                        this.foundation_.setVerticalOrientation(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCList.prototype, "listElements", {
                    get: function () {
                        return [].slice.call(this.root_.querySelectorAll(strings$2.ENABLED_ITEMS_SELECTOR));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCList.prototype, "wrapFocus", {
                    set: function (value) {
                        this.foundation_.setWrapFocus(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCList.prototype, "singleSelection", {
                    set: function (isSingleSelectionList) {
                        this.foundation_.setSingleSelection(isSingleSelectionList);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCList.prototype, "selectedIndex", {
                    get: function () {
                        return this.foundation_.getSelectedIndex();
                    },
                    set: function (index) {
                        this.foundation_.setSelectedIndex(index);
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCList.attachTo = function (root) {
                    return new MDCList(root);
                };
                MDCList.prototype.initialSyncWithDOM = function () {
                    this.handleClick_ = this.handleClickEvent_.bind(this);
                    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
                    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
                    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
                    this.listen('keydown', this.handleKeydown_);
                    this.listen('click', this.handleClick_);
                    this.listen('focusin', this.focusInEventListener_);
                    this.listen('focusout', this.focusOutEventListener_);
                    this.layout();
                    this.initializeListType();
                };
                MDCList.prototype.destroy = function () {
                    this.unlisten('keydown', this.handleKeydown_);
                    this.unlisten('click', this.handleClick_);
                    this.unlisten('focusin', this.focusInEventListener_);
                    this.unlisten('focusout', this.focusOutEventListener_);
                };
                MDCList.prototype.layout = function () {
                    var direction = this.root_.getAttribute(strings$2.ARIA_ORIENTATION);
                    this.vertical = direction !== strings$2.ARIA_ORIENTATION_HORIZONTAL;
                    // List items need to have at least tabindex=-1 to be focusable.
                    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])'))
                        .forEach(function (el) {
                        el.setAttribute('tabindex', '-1');
                    });
                    // Child button/a elements are not tabbable until the list item is focused.
                    [].slice.call(this.root_.querySelectorAll(strings$2.FOCUSABLE_CHILD_ELEMENTS))
                        .forEach(function (el) { return el.setAttribute('tabindex', '-1'); });
                    this.foundation_.layout();
                };
                /**
                 * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
                 */
                MDCList.prototype.initializeListType = function () {
                    var _this = this;
                    var checkboxListItems = this.root_.querySelectorAll(strings$2.ARIA_ROLE_CHECKBOX_SELECTOR);
                    var singleSelectedListItem = this.root_.querySelector("\n      ." + cssClasses$4.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + cssClasses$4.LIST_ITEM_SELECTED_CLASS + "\n    ");
                    var radioSelectedListItem = this.root_.querySelector(strings$2.ARIA_CHECKED_RADIO_SELECTOR);
                    if (checkboxListItems.length) {
                        var preselectedItems = this.root_.querySelectorAll(strings$2.ARIA_CHECKED_CHECKBOX_SELECTOR);
                        this.selectedIndex =
                            [].map.call(preselectedItems, function (listItem) { return _this.listElements.indexOf(listItem); });
                    }
                    else if (singleSelectedListItem) {
                        if (singleSelectedListItem.classList.contains(cssClasses$4.LIST_ITEM_ACTIVATED_CLASS)) {
                            this.foundation_.setUseActivatedClass(true);
                        }
                        this.singleSelection = true;
                        this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
                    }
                    else if (radioSelectedListItem) {
                        this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
                    }
                };
                MDCList.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    var adapter = {
                        addClassForElementIndex: function (index, className) {
                            var element = _this.listElements[index];
                            if (element) {
                                element.classList.add(className);
                            }
                        },
                        focusItemAtIndex: function (index) {
                            var element = _this.listElements[index];
                            if (element) {
                                element.focus();
                            }
                        },
                        getAttributeForElementIndex: function (index, attr) { return _this.listElements[index].getAttribute(attr); },
                        getFocusedElementIndex: function () { return _this.listElements.indexOf(document.activeElement); },
                        getListItemCount: function () { return _this.listElements.length; },
                        hasCheckboxAtIndex: function (index) {
                            var listItem = _this.listElements[index];
                            return !!listItem.querySelector(strings$2.CHECKBOX_SELECTOR);
                        },
                        hasRadioAtIndex: function (index) {
                            var listItem = _this.listElements[index];
                            return !!listItem.querySelector(strings$2.RADIO_SELECTOR);
                        },
                        isCheckboxCheckedAtIndex: function (index) {
                            var listItem = _this.listElements[index];
                            var toggleEl = listItem.querySelector(strings$2.CHECKBOX_SELECTOR);
                            return toggleEl.checked;
                        },
                        isFocusInsideList: function () {
                            return _this.root_.contains(document.activeElement);
                        },
                        notifyAction: function (index) {
                            _this.emit(strings$2.ACTION_EVENT, { index: index }, /** shouldBubble */ true);
                        },
                        removeClassForElementIndex: function (index, className) {
                            var element = _this.listElements[index];
                            if (element) {
                                element.classList.remove(className);
                            }
                        },
                        setAttributeForElementIndex: function (index, attr, value) {
                            var element = _this.listElements[index];
                            if (element) {
                                element.setAttribute(attr, value);
                            }
                        },
                        setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
                            var listItem = _this.listElements[index];
                            var toggleEl = listItem.querySelector(strings$2.CHECKBOX_RADIO_SELECTOR);
                            toggleEl.checked = isChecked;
                            var event = document.createEvent('Event');
                            event.initEvent('change', true, true);
                            toggleEl.dispatchEvent(event);
                        },
                        setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
                            var element = _this.listElements[listItemIndex];
                            var listItemChildren = [].slice.call(element.querySelectorAll(strings$2.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
                            listItemChildren.forEach(function (el) { return el.setAttribute('tabindex', tabIndexValue); });
                        },
                    };
                    return new MDCListFoundation(adapter);
                };
                /**
                 * Used to figure out which list item this event is targetting. Or returns -1 if
                 * there is no list item
                 */
                MDCList.prototype.getListItemIndex_ = function (evt) {
                    var eventTarget = evt.target;
                    var nearestParent = closest(eventTarget, "." + cssClasses$4.LIST_ITEM_CLASS + ", ." + cssClasses$4.ROOT);
                    // Get the index of the element if it is a list item.
                    if (nearestParent && matches(nearestParent, "." + cssClasses$4.LIST_ITEM_CLASS)) {
                        return this.listElements.indexOf(nearestParent);
                    }
                    return -1;
                };
                /**
                 * Used to figure out which element was clicked before sending the event to the foundation.
                 */
                MDCList.prototype.handleFocusInEvent_ = function (evt) {
                    var index = this.getListItemIndex_(evt);
                    this.foundation_.handleFocusIn(evt, index);
                };
                /**
                 * Used to figure out which element was clicked before sending the event to the foundation.
                 */
                MDCList.prototype.handleFocusOutEvent_ = function (evt) {
                    var index = this.getListItemIndex_(evt);
                    this.foundation_.handleFocusOut(evt, index);
                };
                /**
                 * Used to figure out which element was focused when keydown event occurred before sending the event to the
                 * foundation.
                 */
                MDCList.prototype.handleKeydownEvent_ = function (evt) {
                    var index = this.getListItemIndex_(evt);
                    var target = evt.target;
                    if (index >= 0) {
                        this.foundation_.handleKeydown(evt, target.classList.contains(cssClasses$4.LIST_ITEM_CLASS), index);
                    }
                };
                /**
                 * Used to figure out which element was clicked before sending the event to the foundation.
                 */
                MDCList.prototype.handleClickEvent_ = function (evt) {
                    var index = this.getListItemIndex_(evt);
                    var target = evt.target;
                    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
                    var toggleCheckbox = !matches(target, strings$2.CHECKBOX_RADIO_SELECTOR);
                    this.foundation_.handleClick(index, toggleCheckbox);
                };
                return MDCList;
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
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCMenuSurfaceFoundation = /** @class */ (function (_super) {
                __extends(MDCMenuSurfaceFoundation, _super);
                function MDCMenuSurfaceFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCMenuSurfaceFoundation.defaultAdapter, adapter)) || this;
                    _this.isOpen_ = false;
                    _this.isQuickOpen_ = false;
                    _this.isHoistedElement_ = false;
                    _this.isFixedPosition_ = false;
                    _this.openAnimationEndTimerId_ = 0;
                    _this.closeAnimationEndTimerId_ = 0;
                    _this.animationRequestId_ = 0;
                    _this.anchorCorner_ = Corner.TOP_START;
                    _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
                    _this.position_ = { x: 0, y: 0 };
                    return _this;
                }
                Object.defineProperty(MDCMenuSurfaceFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuSurfaceFoundation, "strings", {
                    get: function () {
                        return strings;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuSurfaceFoundation, "numbers", {
                    get: function () {
                        return numbers;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuSurfaceFoundation, "Corner", {
                    get: function () {
                        return Corner;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuSurfaceFoundation, "defaultAdapter", {
                    /**
                     * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            hasClass: function () { return false; },
                            hasAnchor: function () { return false; },
                            isElementInContainer: function () { return false; },
                            isFocused: function () { return false; },
                            isFirstElementFocused: function () { return false; },
                            isLastElementFocused: function () { return false; },
                            isRtl: function () { return false; },
                            getInnerDimensions: function () { return ({ height: 0, width: 0 }); },
                            getAnchorDimensions: function () { return null; },
                            getWindowDimensions: function () { return ({ height: 0, width: 0 }); },
                            getBodyDimensions: function () { return ({ height: 0, width: 0 }); },
                            getWindowScroll: function () { return ({ x: 0, y: 0 }); },
                            setPosition: function () { return undefined; },
                            setMaxHeight: function () { return undefined; },
                            setTransformOrigin: function () { return undefined; },
                            saveFocus: function () { return undefined; },
                            restoreFocus: function () { return undefined; },
                            focusFirstElement: function () { return undefined; },
                            focusLastElement: function () { return undefined; },
                            notifyClose: function () { return undefined; },
                            notifyOpen: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCMenuSurfaceFoundation.prototype.init = function () {
                    var _a = MDCMenuSurfaceFoundation.cssClasses, ROOT = _a.ROOT, OPEN = _a.OPEN;
                    if (!this.adapter_.hasClass(ROOT)) {
                        throw new Error(ROOT + " class required in root element.");
                    }
                    if (this.adapter_.hasClass(OPEN)) {
                        this.isOpen_ = true;
                    }
                };
                MDCMenuSurfaceFoundation.prototype.destroy = function () {
                    clearTimeout(this.openAnimationEndTimerId_);
                    clearTimeout(this.closeAnimationEndTimerId_);
                    // Cancel any currently running animations.
                    cancelAnimationFrame(this.animationRequestId_);
                };
                /**
                 * @param corner Default anchor corner alignment of top-left menu surface corner.
                 */
                MDCMenuSurfaceFoundation.prototype.setAnchorCorner = function (corner) {
                    this.anchorCorner_ = corner;
                };
                /**
                 * @param margin Set of margin values from anchor.
                 */
                MDCMenuSurfaceFoundation.prototype.setAnchorMargin = function (margin) {
                    this.anchorMargin_.top = margin.top || 0;
                    this.anchorMargin_.right = margin.right || 0;
                    this.anchorMargin_.bottom = margin.bottom || 0;
                    this.anchorMargin_.left = margin.left || 0;
                };
                /** Used to indicate if the menu-surface is hoisted to the body. */
                MDCMenuSurfaceFoundation.prototype.setIsHoisted = function (isHoisted) {
                    this.isHoistedElement_ = isHoisted;
                };
                /** Used to set the menu-surface calculations based on a fixed position menu. */
                MDCMenuSurfaceFoundation.prototype.setFixedPosition = function (isFixedPosition) {
                    this.isFixedPosition_ = isFixedPosition;
                };
                /** Sets the menu-surface position on the page. */
                MDCMenuSurfaceFoundation.prototype.setAbsolutePosition = function (x, y) {
                    this.position_.x = this.isFinite_(x) ? x : 0;
                    this.position_.y = this.isFinite_(y) ? y : 0;
                };
                MDCMenuSurfaceFoundation.prototype.setQuickOpen = function (quickOpen) {
                    this.isQuickOpen_ = quickOpen;
                };
                MDCMenuSurfaceFoundation.prototype.isOpen = function () {
                    return this.isOpen_;
                };
                /**
                 * Open the menu surface.
                 */
                MDCMenuSurfaceFoundation.prototype.open = function () {
                    var _this = this;
                    this.adapter_.saveFocus();
                    if (!this.isQuickOpen_) {
                        this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                    }
                    this.animationRequestId_ = requestAnimationFrame(function () {
                        _this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                        _this.dimensions_ = _this.adapter_.getInnerDimensions();
                        _this.autoPosition_();
                        if (_this.isQuickOpen_) {
                            _this.adapter_.notifyOpen();
                        }
                        else {
                            _this.openAnimationEndTimerId_ = setTimeout(function () {
                                _this.openAnimationEndTimerId_ = 0;
                                _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_OPEN);
                                _this.adapter_.notifyOpen();
                            }, numbers.TRANSITION_OPEN_DURATION);
                        }
                    });
                    this.isOpen_ = true;
                };
                /**
                 * Closes the menu surface.
                 */
                MDCMenuSurfaceFoundation.prototype.close = function () {
                    var _this = this;
                    if (!this.isQuickOpen_) {
                        this.adapter_.addClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                    }
                    requestAnimationFrame(function () {
                        _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.OPEN);
                        if (_this.isQuickOpen_) {
                            _this.adapter_.notifyClose();
                        }
                        else {
                            _this.closeAnimationEndTimerId_ = setTimeout(function () {
                                _this.closeAnimationEndTimerId_ = 0;
                                _this.adapter_.removeClass(MDCMenuSurfaceFoundation.cssClasses.ANIMATING_CLOSED);
                                _this.adapter_.notifyClose();
                            }, numbers.TRANSITION_CLOSE_DURATION);
                        }
                    });
                    this.isOpen_ = false;
                    this.maybeRestoreFocus_();
                };
                /** Handle clicks and close if not within menu-surface element. */
                MDCMenuSurfaceFoundation.prototype.handleBodyClick = function (evt) {
                    var el = evt.target;
                    if (this.adapter_.isElementInContainer(el)) {
                        return;
                    }
                    this.close();
                };
                /** Handle keys that close the surface. */
                MDCMenuSurfaceFoundation.prototype.handleKeydown = function (evt) {
                    var keyCode = evt.keyCode, key = evt.key, shiftKey = evt.shiftKey;
                    var isEscape = key === 'Escape' || keyCode === 27;
                    var isTab = key === 'Tab' || keyCode === 9;
                    if (isEscape) {
                        this.close();
                    }
                    else if (isTab) {
                        if (this.adapter_.isLastElementFocused() && !shiftKey) {
                            this.adapter_.focusFirstElement();
                            evt.preventDefault();
                        }
                        else if (this.adapter_.isFirstElementFocused() && shiftKey) {
                            this.adapter_.focusLastElement();
                            evt.preventDefault();
                        }
                    }
                };
                MDCMenuSurfaceFoundation.prototype.autoPosition_ = function () {
                    var _a;
                    // Compute measurements for autoposition methods reuse.
                    this.measurements_ = this.getAutoLayoutMeasurements_();
                    var corner = this.getOriginCorner_();
                    var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
                    var verticalAlignment = this.hasBit_(corner, CornerBit.BOTTOM) ? 'bottom' : 'top';
                    var horizontalAlignment = this.hasBit_(corner, CornerBit.RIGHT) ? 'right' : 'left';
                    var horizontalOffset = this.getHorizontalOriginOffset_(corner);
                    var verticalOffset = this.getVerticalOriginOffset_(corner);
                    var _b = this.measurements_, anchorSize = _b.anchorSize, surfaceSize = _b.surfaceSize;
                    var position = (_a = {},
                        _a[horizontalAlignment] = horizontalOffset,
                        _a[verticalAlignment] = verticalOffset,
                        _a);
                    // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.
                    if (anchorSize.width / surfaceSize.width > numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
                        horizontalAlignment = 'center';
                    }
                    // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element
                    if (this.isHoistedElement_ || this.isFixedPosition_) {
                        this.adjustPositionForHoistedElement_(position);
                    }
                    this.adapter_.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
                    this.adapter_.setPosition(position);
                    this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
                };
                /**
                 * @return Measurements used to position menu surface popup.
                 */
                MDCMenuSurfaceFoundation.prototype.getAutoLayoutMeasurements_ = function () {
                    var anchorRect = this.adapter_.getAnchorDimensions();
                    var bodySize = this.adapter_.getBodyDimensions();
                    var viewportSize = this.adapter_.getWindowDimensions();
                    var windowScroll = this.adapter_.getWindowScroll();
                    if (!anchorRect) {
                        // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                        anchorRect = {
                            top: this.position_.y,
                            right: this.position_.x,
                            bottom: this.position_.y,
                            left: this.position_.x,
                            width: 0,
                            height: 0,
                        };
                        // tslint:enable:object-literal-sort-keys
                    }
                    return {
                        anchorSize: anchorRect,
                        bodySize: bodySize,
                        surfaceSize: this.dimensions_,
                        viewportDistance: {
                            // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
                            top: anchorRect.top,
                            right: viewportSize.width - anchorRect.right,
                            bottom: viewportSize.height - anchorRect.bottom,
                            left: anchorRect.left,
                        },
                        viewportSize: viewportSize,
                        windowScroll: windowScroll,
                    };
                };
                /**
                 * Computes the corner of the anchor from which to animate and position the menu surface.
                 */
                MDCMenuSurfaceFoundation.prototype.getOriginCorner_ = function () {
                    // Defaults: open from the top left.
                    var corner = Corner.TOP_LEFT;
                    var _a = this.measurements_, viewportDistance = _a.viewportDistance, anchorSize = _a.anchorSize, surfaceSize = _a.surfaceSize;
                    var isBottomAligned = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
                    var availableTop = isBottomAligned ? viewportDistance.top + anchorSize.height + this.anchorMargin_.bottom
                        : viewportDistance.top + this.anchorMargin_.top;
                    var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom
                        : viewportDistance.bottom + anchorSize.height - this.anchorMargin_.top;
                    var topOverflow = surfaceSize.height - availableTop;
                    var bottomOverflow = surfaceSize.height - availableBottom;
                    if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
                        corner = this.setBit_(corner, CornerBit.BOTTOM);
                    }
                    var isRtl = this.adapter_.isRtl();
                    var isFlipRtl = this.hasBit_(this.anchorCorner_, CornerBit.FLIP_RTL);
                    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.RIGHT);
                    var isAlignedRight = (avoidHorizontalOverlap && !isRtl) ||
                        (!avoidHorizontalOverlap && isFlipRtl && isRtl);
                    var availableLeft = isAlignedRight ? viewportDistance.left + anchorSize.width + this.anchorMargin_.right :
                        viewportDistance.left + this.anchorMargin_.left;
                    var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right :
                        viewportDistance.right + anchorSize.width - this.anchorMargin_.left;
                    var leftOverflow = surfaceSize.width - availableLeft;
                    var rightOverflow = surfaceSize.width - availableRight;
                    if ((leftOverflow < 0 && isAlignedRight && isRtl) ||
                        (avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0) ||
                        (rightOverflow > 0 && leftOverflow < rightOverflow)) {
                        corner = this.setBit_(corner, CornerBit.RIGHT);
                    }
                    return corner;
                };
                /**
                 * @param corner Origin corner of the menu surface.
                 * @return Maximum height of the menu surface, based on available space. 0 indicates should not be set.
                 */
                MDCMenuSurfaceFoundation.prototype.getMenuSurfaceMaxHeight_ = function (corner) {
                    var viewportDistance = this.measurements_.viewportDistance;
                    var maxHeight = 0;
                    var isBottomAligned = this.hasBit_(corner, CornerBit.BOTTOM);
                    var isBottomAnchored = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
                    var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation.numbers.MARGIN_TO_EDGE;
                    // When maximum height is not specified, it is handled from CSS.
                    if (isBottomAligned) {
                        maxHeight = viewportDistance.top + this.anchorMargin_.top - MARGIN_TO_EDGE;
                        if (!isBottomAnchored) {
                            maxHeight += this.measurements_.anchorSize.height;
                        }
                    }
                    else {
                        maxHeight =
                            viewportDistance.bottom - this.anchorMargin_.bottom + this.measurements_.anchorSize.height - MARGIN_TO_EDGE;
                        if (isBottomAnchored) {
                            maxHeight -= this.measurements_.anchorSize.height;
                        }
                    }
                    return maxHeight;
                };
                /**
                 * @param corner Origin corner of the menu surface.
                 * @return Horizontal offset of menu surface origin corner from corresponding anchor corner.
                 */
                MDCMenuSurfaceFoundation.prototype.getHorizontalOriginOffset_ = function (corner) {
                    var anchorSize = this.measurements_.anchorSize;
                    // isRightAligned corresponds to using the 'right' property on the surface.
                    var isRightAligned = this.hasBit_(corner, CornerBit.RIGHT);
                    var avoidHorizontalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.RIGHT);
                    if (isRightAligned) {
                        var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.left : this.anchorMargin_.right;
                        // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
                        // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
                        // the right property is correct.
                        if (this.isHoistedElement_ || this.isFixedPosition_) {
                            return rightOffset - (this.measurements_.viewportSize.width - this.measurements_.bodySize.width);
                        }
                        return rightOffset;
                    }
                    return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin_.right : this.anchorMargin_.left;
                };
                /**
                 * @param corner Origin corner of the menu surface.
                 * @return Vertical offset of menu surface origin corner from corresponding anchor corner.
                 */
                MDCMenuSurfaceFoundation.prototype.getVerticalOriginOffset_ = function (corner) {
                    var anchorSize = this.measurements_.anchorSize;
                    var isBottomAligned = this.hasBit_(corner, CornerBit.BOTTOM);
                    var avoidVerticalOverlap = this.hasBit_(this.anchorCorner_, CornerBit.BOTTOM);
                    var y = 0;
                    if (isBottomAligned) {
                        y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin_.top : -this.anchorMargin_.bottom;
                    }
                    else {
                        y = avoidVerticalOverlap ? (anchorSize.height + this.anchorMargin_.bottom) : this.anchorMargin_.top;
                    }
                    return y;
                };
                /** Calculates the offsets for positioning the menu-surface when the menu-surface has been hoisted to the body. */
                MDCMenuSurfaceFoundation.prototype.adjustPositionForHoistedElement_ = function (position) {
                    var e_1, _a;
                    var _b = this.measurements_, windowScroll = _b.windowScroll, viewportDistance = _b.viewportDistance;
                    var props = Object.keys(position);
                    try {
                        for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                            var prop = props_1_1.value;
                            var value = position[prop] || 0;
                            // Hoisted surfaces need to have the anchor elements location on the page added to the
                            // position properties for proper alignment on the body.
                            value += viewportDistance[prop];
                            // Surfaces that are absolutely positioned need to have additional calculations for scroll
                            // and bottom positioning.
                            if (!this.isFixedPosition_) {
                                if (prop === 'top') {
                                    value += windowScroll.y;
                                }
                                else if (prop === 'bottom') {
                                    value -= windowScroll.y;
                                }
                                else if (prop === 'left') {
                                    value += windowScroll.x;
                                }
                                else { // prop === 'right'
                                    value -= windowScroll.x;
                                }
                            }
                            position[prop] = value;
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (props_1_1 && !props_1_1.done && (_a = props_1.return))
                                _a.call(props_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                };
                /**
                 * The last focused element when the menu surface was opened should regain focus, if the user is
                 * focused on or within the menu surface when it is closed.
                 */
                MDCMenuSurfaceFoundation.prototype.maybeRestoreFocus_ = function () {
                    var isRootFocused = this.adapter_.isFocused();
                    var childHasFocus = document.activeElement && this.adapter_.isElementInContainer(document.activeElement);
                    if (isRootFocused || childHasFocus) {
                        this.adapter_.restoreFocus();
                    }
                };
                MDCMenuSurfaceFoundation.prototype.hasBit_ = function (corner, bit) {
                    return Boolean(corner & bit); // tslint:disable-line:no-bitwise
                };
                MDCMenuSurfaceFoundation.prototype.setBit_ = function (corner, bit) {
                    return corner | bit; // tslint:disable-line:no-bitwise
                };
                /**
                 * isFinite that doesn't force conversion to number type.
                 * Equivalent to Number.isFinite in ES2015, which is not supported in IE.
                 */
                MDCMenuSurfaceFoundation.prototype.isFinite_ = function (num) {
                    return typeof num === 'number' && isFinite(num);
                };
                return MDCMenuSurfaceFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var cachedCssTransformPropertyName_;
            /**
             * Returns the name of the correct transform property to use on the current browser.
             */
            function getTransformPropertyName(globalObj, forceRefresh) {
                if (forceRefresh === void 0) {
                    forceRefresh = false;
                }
                if (cachedCssTransformPropertyName_ === undefined || forceRefresh) {
                    var el = globalObj.document.createElement('div');
                    cachedCssTransformPropertyName_ = 'transform' in el.style ? 'transform' : 'webkitTransform';
                }
                return cachedCssTransformPropertyName_;
            }
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCMenuSurface = /** @class */ (function (_super) {
                __extends(MDCMenuSurface, _super);
                function MDCMenuSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCMenuSurface.attachTo = function (root) {
                    return new MDCMenuSurface(root);
                };
                MDCMenuSurface.prototype.initialSyncWithDOM = function () {
                    var _this = this;
                    var parentEl = this.root_.parentElement;
                    this.anchorElement = parentEl && parentEl.classList.contains(cssClasses$2.ANCHOR) ? parentEl : null;
                    if (this.root_.classList.contains(cssClasses$2.FIXED)) {
                        this.setFixedPosition(true);
                    }
                    this.handleKeydown_ = function (evt) { return _this.foundation_.handleKeydown(evt); };
                    this.handleBodyClick_ = function (evt) { return _this.foundation_.handleBodyClick(evt); };
                    this.registerBodyClickListener_ = function () { return document.body.addEventListener('click', _this.handleBodyClick_); };
                    this.deregisterBodyClickListener_ = function () { return document.body.removeEventListener('click', _this.handleBodyClick_); };
                    this.listen('keydown', this.handleKeydown_);
                    this.listen(strings.OPENED_EVENT, this.registerBodyClickListener_);
                    this.listen(strings.CLOSED_EVENT, this.deregisterBodyClickListener_);
                };
                MDCMenuSurface.prototype.destroy = function () {
                    this.unlisten('keydown', this.handleKeydown_);
                    this.unlisten(strings.OPENED_EVENT, this.registerBodyClickListener_);
                    this.unlisten(strings.CLOSED_EVENT, this.deregisterBodyClickListener_);
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(MDCMenuSurface.prototype, "open", {
                    get: function () {
                        return this.foundation_.isOpen();
                    },
                    set: function (value) {
                        if (value) {
                            var focusableElements = this.root_.querySelectorAll(strings.FOCUSABLE_ELEMENTS);
                            this.firstFocusableElement_ = focusableElements[0];
                            this.lastFocusableElement_ = focusableElements[focusableElements.length - 1];
                            this.foundation_.open();
                        }
                        else {
                            this.foundation_.close();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuSurface.prototype, "quickOpen", {
                    set: function (quickOpen) {
                        this.foundation_.setQuickOpen(quickOpen);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Removes the menu-surface from it's current location and appends it to the
                 * body to overcome any overflow:hidden issues.
                 */
                MDCMenuSurface.prototype.hoistMenuToBody = function () {
                    document.body.appendChild(this.root_);
                    this.setIsHoisted(true);
                };
                /** Sets the foundation to use page offsets for an positioning when the menu is hoisted to the body. */
                MDCMenuSurface.prototype.setIsHoisted = function (isHoisted) {
                    this.foundation_.setIsHoisted(isHoisted);
                };
                /** Sets the element that the menu-surface is anchored to. */
                MDCMenuSurface.prototype.setMenuSurfaceAnchorElement = function (element) {
                    this.anchorElement = element;
                };
                /** Sets the menu-surface to position: fixed. */
                MDCMenuSurface.prototype.setFixedPosition = function (isFixed) {
                    if (isFixed) {
                        this.root_.classList.add(cssClasses$2.FIXED);
                    }
                    else {
                        this.root_.classList.remove(cssClasses$2.FIXED);
                    }
                    this.foundation_.setFixedPosition(isFixed);
                };
                /** Sets the absolute x/y position to position based on. Requires the menu to be hoisted. */
                MDCMenuSurface.prototype.setAbsolutePosition = function (x, y) {
                    this.foundation_.setAbsolutePosition(x, y);
                    this.setIsHoisted(true);
                };
                /**
                 * @param corner Default anchor corner alignment of top-left surface corner.
                 */
                MDCMenuSurface.prototype.setAnchorCorner = function (corner) {
                    this.foundation_.setAnchorCorner(corner);
                };
                MDCMenuSurface.prototype.setAnchorMargin = function (margin) {
                    this.foundation_.setAnchorMargin(margin);
                };
                MDCMenuSurface.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        hasClass: function (className) { return _this.root_.classList.contains(className); },
                        hasAnchor: function () { return !!_this.anchorElement; },
                        notifyClose: function () { return _this.emit(MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, {}); },
                        notifyOpen: function () { return _this.emit(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, {}); },
                        isElementInContainer: function (el) { return _this.root_.contains(el); },
                        isRtl: function () { return getComputedStyle(_this.root_).getPropertyValue('direction') === 'rtl'; },
                        setTransformOrigin: function (origin) {
                            var propertyName = getTransformPropertyName(window) + "-origin";
                            _this.root_.style.setProperty(propertyName, origin);
                        },
                        isFocused: function () { return document.activeElement === _this.root_; },
                        saveFocus: function () {
                            _this.previousFocus_ = document.activeElement;
                        },
                        restoreFocus: function () {
                            if (_this.root_.contains(document.activeElement)) {
                                if (_this.previousFocus_ && _this.previousFocus_.focus) {
                                    _this.previousFocus_.focus();
                                }
                            }
                        },
                        isFirstElementFocused: function () {
                            return _this.firstFocusableElement_ ? _this.firstFocusableElement_ === document.activeElement : false;
                        },
                        isLastElementFocused: function () {
                            return _this.lastFocusableElement_ ? _this.lastFocusableElement_ === document.activeElement : false;
                        },
                        focusFirstElement: function () {
                            return _this.firstFocusableElement_ && _this.firstFocusableElement_.focus && _this.firstFocusableElement_.focus();
                        },
                        focusLastElement: function () {
                            return _this.lastFocusableElement_ && _this.lastFocusableElement_.focus && _this.lastFocusableElement_.focus();
                        },
                        getInnerDimensions: function () {
                            return { width: _this.root_.offsetWidth, height: _this.root_.offsetHeight };
                        },
                        getAnchorDimensions: function () { return _this.anchorElement ? _this.anchorElement.getBoundingClientRect() : null; },
                        getWindowDimensions: function () {
                            return { width: window.innerWidth, height: window.innerHeight };
                        },
                        getBodyDimensions: function () {
                            return { width: document.body.clientWidth, height: document.body.clientHeight };
                        },
                        getWindowScroll: function () {
                            return { x: window.pageXOffset, y: window.pageYOffset };
                        },
                        setPosition: function (position) {
                            _this.root_.style.left = 'left' in position ? position.left + "px" : '';
                            _this.root_.style.right = 'right' in position ? position.right + "px" : '';
                            _this.root_.style.top = 'top' in position ? position.top + "px" : '';
                            _this.root_.style.bottom = 'bottom' in position ? position.bottom + "px" : '';
                        },
                        setMaxHeight: function (height) {
                            _this.root_.style.maxHeight = height;
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCMenuSurfaceFoundation(adapter);
                };
                return MDCMenuSurface;
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
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCMenuFoundation = /** @class */ (function (_super) {
                __extends(MDCMenuFoundation, _super);
                function MDCMenuFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCMenuFoundation.defaultAdapter, adapter)) || this;
                    _this.closeAnimationEndTimerId_ = 0;
                    return _this;
                }
                Object.defineProperty(MDCMenuFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$3;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuFoundation, "strings", {
                    get: function () {
                        return strings$1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenuFoundation, "defaultAdapter", {
                    /**
                     * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClassToElementAtIndex: function () { return undefined; },
                            removeClassFromElementAtIndex: function () { return undefined; },
                            addAttributeToElementAtIndex: function () { return undefined; },
                            removeAttributeFromElementAtIndex: function () { return undefined; },
                            elementContainsClass: function () { return false; },
                            closeSurface: function () { return undefined; },
                            getElementIndex: function () { return -1; },
                            getParentElement: function () { return null; },
                            getSelectedElementIndex: function () { return -1; },
                            notifySelected: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCMenuFoundation.prototype.destroy = function () {
                    if (this.closeAnimationEndTimerId_) {
                        clearTimeout(this.closeAnimationEndTimerId_);
                    }
                    this.adapter_.closeSurface();
                };
                MDCMenuFoundation.prototype.handleKeydown = function (evt) {
                    var key = evt.key, keyCode = evt.keyCode;
                    var isTab = key === 'Tab' || keyCode === 9;
                    if (isTab) {
                        this.adapter_.closeSurface();
                    }
                };
                MDCMenuFoundation.prototype.handleItemAction = function (listItem) {
                    var _this = this;
                    var index = this.adapter_.getElementIndex(listItem);
                    if (index < 0) {
                        return;
                    }
                    this.adapter_.notifySelected({ index: index });
                    this.adapter_.closeSurface();
                    // Wait for the menu to close before adding/removing classes that affect styles.
                    this.closeAnimationEndTimerId_ = setTimeout(function () {
                        var selectionGroup = _this.getSelectionGroup_(listItem);
                        if (selectionGroup) {
                            _this.handleSelectionGroup_(selectionGroup, index);
                        }
                    }, MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
                };
                /**
                 * Handles toggling the selected classes in a selection group when a selection is made.
                 */
                MDCMenuFoundation.prototype.handleSelectionGroup_ = function (selectionGroup, index) {
                    // De-select the previous selection in this group.
                    var selectedIndex = this.adapter_.getSelectedElementIndex(selectionGroup);
                    if (selectedIndex >= 0) {
                        this.adapter_.removeAttributeFromElementAtIndex(selectedIndex, strings$1.ARIA_SELECTED_ATTR);
                        this.adapter_.removeClassFromElementAtIndex(selectedIndex, cssClasses$3.MENU_SELECTED_LIST_ITEM);
                    }
                    // Select the new list item in this group.
                    this.adapter_.addClassToElementAtIndex(index, cssClasses$3.MENU_SELECTED_LIST_ITEM);
                    this.adapter_.addAttributeToElementAtIndex(index, strings$1.ARIA_SELECTED_ATTR, 'true');
                };
                /**
                 * Returns the parent selection group of an element if one exists.
                 */
                MDCMenuFoundation.prototype.getSelectionGroup_ = function (listItem) {
                    var parent = this.adapter_.getParentElement(listItem);
                    if (!parent) {
                        return null;
                    }
                    var isGroup = this.adapter_.elementContainsClass(parent, cssClasses$3.MENU_SELECTION_GROUP);
                    // Iterate through ancestors until we find the group or get to the list.
                    while (!isGroup && parent && !this.adapter_.elementContainsClass(parent, MDCListFoundation.cssClasses.ROOT)) {
                        parent = this.adapter_.getParentElement(parent);
                        isGroup = parent ? this.adapter_.elementContainsClass(parent, cssClasses$3.MENU_SELECTION_GROUP) : false;
                    }
                    if (isGroup) {
                        return parent;
                    }
                    else {
                        return null;
                    }
                };
                return MDCMenuFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCMenu = /** @class */ (function (_super) {
                __extends(MDCMenu, _super);
                function MDCMenu() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCMenu.attachTo = function (root) {
                    return new MDCMenu(root);
                };
                MDCMenu.prototype.initialize = function (menuSurfaceFactory, listFactory) {
                    if (menuSurfaceFactory === void 0) {
                        menuSurfaceFactory = function (el) { return new MDCMenuSurface(el); };
                    }
                    if (listFactory === void 0) {
                        listFactory = function (el) { return new MDCList(el); };
                    }
                    this.menuSurfaceFactory_ = menuSurfaceFactory;
                    this.listFactory_ = listFactory;
                };
                MDCMenu.prototype.initialSyncWithDOM = function () {
                    var _this = this;
                    this.menuSurface_ = this.menuSurfaceFactory_(this.root_);
                    var list = this.root_.querySelector(strings$1.LIST_SELECTOR);
                    if (list) {
                        this.list_ = this.listFactory_(list);
                        this.list_.wrapFocus = true;
                    }
                    else {
                        this.list_ = null;
                    }
                    this.handleKeydown_ = function (evt) { return _this.foundation_.handleKeydown(evt); };
                    this.handleItemAction_ = function (evt) { return _this.foundation_.handleItemAction(_this.items[evt.detail.index]); };
                    this.afterOpenedCallback_ = function () { return _this.handleAfterOpened_(); };
                    this.menuSurface_.listen(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.afterOpenedCallback_);
                    this.listen('keydown', this.handleKeydown_);
                    this.listen(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
                };
                MDCMenu.prototype.destroy = function () {
                    if (this.list_) {
                        this.list_.destroy();
                    }
                    this.menuSurface_.destroy();
                    this.menuSurface_.unlisten(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this.afterOpenedCallback_);
                    this.unlisten('keydown', this.handleKeydown_);
                    this.unlisten(MDCListFoundation.strings.ACTION_EVENT, this.handleItemAction_);
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(MDCMenu.prototype, "open", {
                    get: function () {
                        return this.menuSurface_.open;
                    },
                    set: function (value) {
                        this.menuSurface_.open = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenu.prototype, "wrapFocus", {
                    get: function () {
                        return this.list_ ? this.list_.wrapFocus : false;
                    },
                    set: function (value) {
                        if (this.list_) {
                            this.list_.wrapFocus = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenu.prototype, "items", {
                    /**
                     * Return the items within the menu. Note that this only contains the set of elements within
                     * the items container that are proper list items, and not supplemental / presentational DOM
                     * elements.
                     */
                    get: function () {
                        return this.list_ ? this.list_.listElements : [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCMenu.prototype, "quickOpen", {
                    set: function (quickOpen) {
                        this.menuSurface_.quickOpen = quickOpen;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @param corner Default anchor corner alignment of top-left menu corner.
                 */
                MDCMenu.prototype.setAnchorCorner = function (corner) {
                    this.menuSurface_.setAnchorCorner(corner);
                };
                MDCMenu.prototype.setAnchorMargin = function (margin) {
                    this.menuSurface_.setAnchorMargin(margin);
                };
                /**
                 * @return The item within the menu at the index specified.
                 */
                MDCMenu.prototype.getOptionByIndex = function (index) {
                    var items = this.items;
                    if (index < items.length) {
                        return this.items[index];
                    }
                    else {
                        return null;
                    }
                };
                MDCMenu.prototype.setFixedPosition = function (isFixed) {
                    this.menuSurface_.setFixedPosition(isFixed);
                };
                MDCMenu.prototype.hoistMenuToBody = function () {
                    this.menuSurface_.hoistMenuToBody();
                };
                MDCMenu.prototype.setIsHoisted = function (isHoisted) {
                    this.menuSurface_.setIsHoisted(isHoisted);
                };
                MDCMenu.prototype.setAbsolutePosition = function (x, y) {
                    this.menuSurface_.setAbsolutePosition(x, y);
                };
                /**
                 * Sets the element that the menu-surface is anchored to.
                 */
                MDCMenu.prototype.setAnchorElement = function (element) {
                    this.menuSurface_.anchorElement = element;
                };
                MDCMenu.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        addClassToElementAtIndex: function (index, className) {
                            var list = _this.items;
                            list[index].classList.add(className);
                        },
                        removeClassFromElementAtIndex: function (index, className) {
                            var list = _this.items;
                            list[index].classList.remove(className);
                        },
                        addAttributeToElementAtIndex: function (index, attr, value) {
                            var list = _this.items;
                            list[index].setAttribute(attr, value);
                        },
                        removeAttributeFromElementAtIndex: function (index, attr) {
                            var list = _this.items;
                            list[index].removeAttribute(attr);
                        },
                        elementContainsClass: function (element, className) { return element.classList.contains(className); },
                        closeSurface: function () { return _this.open = false; },
                        getElementIndex: function (element) { return _this.items.indexOf(element); },
                        getParentElement: function (element) { return element.parentElement; },
                        getSelectedElementIndex: function (selectionGroup) {
                            var selectedListItem = selectionGroup.querySelector("." + cssClasses$3.MENU_SELECTED_LIST_ITEM);
                            return selectedListItem ? _this.items.indexOf(selectedListItem) : -1;
                        },
                        notifySelected: function (evtData) {
                            return _this.emit(strings$1.SELECTED_EVENT, {
                                index: evtData.index,
                                item: _this.items[evtData.index],
                            });
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCMenuFoundation(adapter);
                };
                MDCMenu.prototype.handleAfterOpened_ = function () {
                    var list = this.items;
                    if (list.length > 0) {
                        list[0].focus();
                    }
                };
                return MDCMenu;
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
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var strings$3 = {
                NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch',
            };
            var numbers$2 = {
                // This should stay in sync with $mdc-notched-outline-padding * 2.
                NOTCH_ELEMENT_PADDING: 8,
            };
            var cssClasses$5 = {
                NO_LABEL: 'mdc-notched-outline--no-label',
                OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
                OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded',
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
            var MDCNotchedOutlineFoundation = /** @class */ (function (_super) {
                __extends(MDCNotchedOutlineFoundation, _super);
                function MDCNotchedOutlineFoundation(adapter) {
                    return _super.call(this, __assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
                }
                Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
                    get: function () {
                        return strings$3;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$5;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
                    get: function () {
                        return numbers$2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
                    /**
                     * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            setNotchWidthProperty: function () { return undefined; },
                            removeNotchWidthProperty: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
                 */
                MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
                    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
                    if (notchWidth > 0) {
                        notchWidth += numbers$2.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
                    }
                    this.adapter_.setNotchWidthProperty(notchWidth);
                    this.adapter_.addClass(OUTLINE_NOTCHED);
                };
                /**
                 * Removes notched outline selector to close the notch in the outline.
                 */
                MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
                    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
                    this.adapter_.removeClass(OUTLINE_NOTCHED);
                    this.adapter_.removeNotchWidthProperty();
                };
                return MDCNotchedOutlineFoundation;
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
            var MDCNotchedOutline = /** @class */ (function (_super) {
                __extends(MDCNotchedOutline, _super);
                function MDCNotchedOutline() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCNotchedOutline.attachTo = function (root) {
                    return new MDCNotchedOutline(root);
                };
                MDCNotchedOutline.prototype.initialSyncWithDOM = function () {
                    this.notchElement_ = this.root_.querySelector(strings$3.NOTCH_ELEMENT_SELECTOR);
                    var label = this.root_.querySelector('.' + MDCFloatingLabelFoundation.cssClasses.ROOT);
                    if (label) {
                        label.style.transitionDuration = '0s';
                        this.root_.classList.add(cssClasses$5.OUTLINE_UPGRADED);
                        requestAnimationFrame(function () {
                            label.style.transitionDuration = '';
                        });
                    }
                    else {
                        this.root_.classList.add(cssClasses$5.NO_LABEL);
                    }
                };
                /**
                 * Updates classes and styles to open the notch to the specified width.
                 * @param notchWidth The notch width in the outline.
                 */
                MDCNotchedOutline.prototype.notch = function (notchWidth) {
                    this.foundation_.notch(notchWidth);
                };
                /**
                 * Updates classes and styles to close the notch.
                 */
                MDCNotchedOutline.prototype.closeNotch = function () {
                    this.foundation_.closeNotch();
                };
                MDCNotchedOutline.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        setNotchWidthProperty: function (width) { return _this.notchElement_.style.setProperty('width', width + 'px'); },
                        removeNotchWidthProperty: function () { return _this.notchElement_.style.removeProperty('width'); },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCNotchedOutlineFoundation(adapter);
                };
                return MDCNotchedOutline;
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
            var cssClasses$6 = {
                DISABLED: 'mdc-select--disabled',
                FOCUSED: 'mdc-select--focused',
                INVALID: 'mdc-select--invalid',
                OUTLINED: 'mdc-select--outlined',
                REQUIRED: 'mdc-select--required',
                ROOT: 'mdc-select',
                SELECTED_ITEM_CLASS: 'mdc-list-item--selected',
                WITH_LEADING_ICON: 'mdc-select--with-leading-icon',
            };
            var strings$4 = {
                ARIA_CONTROLS: 'aria-controls',
                ARIA_SELECTED_ATTR: 'aria-selected',
                CHANGE_EVENT: 'MDCSelect:change',
                ENHANCED_VALUE_ATTR: 'data-value',
                HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
                LABEL_SELECTOR: '.mdc-floating-label',
                LEADING_ICON_SELECTOR: '.mdc-select__icon',
                LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
                MENU_SELECTOR: '.mdc-select__menu',
                NATIVE_CONTROL_SELECTOR: '.mdc-select__native-control',
                OUTLINE_SELECTOR: '.mdc-notched-outline',
                SELECTED_ITEM_SELECTOR: "." + cssClasses$6.SELECTED_ITEM_CLASS,
                SELECTED_TEXT_SELECTOR: '.mdc-select__selected-text',
            };
            var numbers$3 = {
                LABEL_SCALE: 0.75,
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
            var MDCSelectFoundation = /** @class */ (function (_super) {
                __extends(MDCSelectFoundation, _super);
                /* istanbul ignore next: optional argument is not a branch statement */
                /**
                 * @param adapter
                 * @param foundationMap Map from subcomponent names to their subfoundations.
                 */
                function MDCSelectFoundation(adapter, foundationMap) {
                    if (foundationMap === void 0) {
                        foundationMap = {};
                    }
                    var _this = _super.call(this, __assign({}, MDCSelectFoundation.defaultAdapter, adapter)) || this;
                    _this.leadingIcon_ = foundationMap.leadingIcon;
                    _this.helperText_ = foundationMap.helperText;
                    return _this;
                }
                Object.defineProperty(MDCSelectFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$6;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelectFoundation, "numbers", {
                    get: function () {
                        return numbers$3;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelectFoundation, "strings", {
                    get: function () {
                        return strings$4;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelectFoundation, "defaultAdapter", {
                    /**
                     * See {@link MDCSelectAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            hasClass: function () { return false; },
                            activateBottomLine: function () { return undefined; },
                            deactivateBottomLine: function () { return undefined; },
                            setValue: function () { return undefined; },
                            getValue: function () { return ''; },
                            floatLabel: function () { return undefined; },
                            getLabelWidth: function () { return 0; },
                            hasOutline: function () { return false; },
                            notchOutline: function () { return undefined; },
                            closeOutline: function () { return undefined; },
                            openMenu: function () { return undefined; },
                            closeMenu: function () { return undefined; },
                            isMenuOpen: function () { return false; },
                            setSelectedIndex: function () { return undefined; },
                            setDisabled: function () { return undefined; },
                            setRippleCenter: function () { return undefined; },
                            notifyChange: function () { return undefined; },
                            checkValidity: function () { return false; },
                            setValid: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCSelectFoundation.prototype.setSelectedIndex = function (index) {
                    this.adapter_.setSelectedIndex(index);
                    this.adapter_.closeMenu();
                    var didChange = true;
                    this.handleChange(didChange);
                };
                MDCSelectFoundation.prototype.setValue = function (value) {
                    this.adapter_.setValue(value);
                    var didChange = true;
                    this.handleChange(didChange);
                };
                MDCSelectFoundation.prototype.getValue = function () {
                    return this.adapter_.getValue();
                };
                MDCSelectFoundation.prototype.setDisabled = function (isDisabled) {
                    if (isDisabled) {
                        this.adapter_.addClass(cssClasses$6.DISABLED);
                    }
                    else {
                        this.adapter_.removeClass(cssClasses$6.DISABLED);
                    }
                    this.adapter_.setDisabled(isDisabled);
                    this.adapter_.closeMenu();
                    if (this.leadingIcon_) {
                        this.leadingIcon_.setDisabled(isDisabled);
                    }
                };
                /**
                 * @param content Sets the content of the helper text.
                 */
                MDCSelectFoundation.prototype.setHelperTextContent = function (content) {
                    if (this.helperText_) {
                        this.helperText_.setContent(content);
                    }
                };
                MDCSelectFoundation.prototype.layout = function () {
                    var openNotch = this.getValue().length > 0;
                    this.notchOutline(openNotch);
                };
                /**
                 * Handles value changes, via change event or programmatic updates.
                 */
                MDCSelectFoundation.prototype.handleChange = function (didChange) {
                    if (didChange === void 0) {
                        didChange = true;
                    }
                    var value = this.getValue();
                    var optionHasValue = value.length > 0;
                    var isRequired = this.adapter_.hasClass(cssClasses$6.REQUIRED);
                    this.notchOutline(optionHasValue);
                    if (!this.adapter_.hasClass(cssClasses$6.FOCUSED)) {
                        this.adapter_.floatLabel(optionHasValue);
                    }
                    if (didChange) {
                        this.adapter_.notifyChange(value);
                        if (isRequired) {
                            this.setValid(this.isValid());
                            if (this.helperText_) {
                                this.helperText_.setValidity(this.isValid());
                            }
                        }
                    }
                };
                /**
                 * Handles focus events from select element.
                 */
                MDCSelectFoundation.prototype.handleFocus = function () {
                    this.adapter_.addClass(cssClasses$6.FOCUSED);
                    this.adapter_.floatLabel(true);
                    this.notchOutline(true);
                    this.adapter_.activateBottomLine();
                    if (this.helperText_) {
                        this.helperText_.showToScreenReader();
                    }
                };
                /**
                 * Handles blur events from select element.
                 */
                MDCSelectFoundation.prototype.handleBlur = function () {
                    if (this.adapter_.isMenuOpen()) {
                        return;
                    }
                    this.adapter_.removeClass(cssClasses$6.FOCUSED);
                    this.handleChange(false);
                    this.adapter_.deactivateBottomLine();
                    var isRequired = this.adapter_.hasClass(cssClasses$6.REQUIRED);
                    if (isRequired) {
                        this.setValid(this.isValid());
                        if (this.helperText_) {
                            this.helperText_.setValidity(this.isValid());
                        }
                    }
                };
                MDCSelectFoundation.prototype.handleClick = function (normalizedX) {
                    if (this.adapter_.isMenuOpen()) {
                        return;
                    }
                    this.adapter_.setRippleCenter(normalizedX);
                    this.adapter_.openMenu();
                };
                MDCSelectFoundation.prototype.handleKeydown = function (event) {
                    if (this.adapter_.isMenuOpen()) {
                        return;
                    }
                    var isEnter = event.key === 'Enter' || event.keyCode === 13;
                    var isSpace = event.key === 'Space' || event.keyCode === 32;
                    var arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
                    var arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;
                    if (this.adapter_.hasClass(cssClasses$6.FOCUSED) && (isEnter || isSpace || arrowUp || arrowDown)) {
                        this.adapter_.openMenu();
                        event.preventDefault();
                    }
                };
                /**
                 * Opens/closes the notched outline.
                 */
                MDCSelectFoundation.prototype.notchOutline = function (openNotch) {
                    if (!this.adapter_.hasOutline()) {
                        return;
                    }
                    var isFocused = this.adapter_.hasClass(cssClasses$6.FOCUSED);
                    if (openNotch) {
                        var labelScale = numbers$3.LABEL_SCALE;
                        var labelWidth = this.adapter_.getLabelWidth() * labelScale;
                        this.adapter_.notchOutline(labelWidth);
                    }
                    else if (!isFocused) {
                        this.adapter_.closeOutline();
                    }
                };
                /**
                 * Sets the aria label of the leading icon.
                 */
                MDCSelectFoundation.prototype.setLeadingIconAriaLabel = function (label) {
                    if (this.leadingIcon_) {
                        this.leadingIcon_.setAriaLabel(label);
                    }
                };
                /**
                 * Sets the text content of the leading icon.
                 */
                MDCSelectFoundation.prototype.setLeadingIconContent = function (content) {
                    if (this.leadingIcon_) {
                        this.leadingIcon_.setContent(content);
                    }
                };
                MDCSelectFoundation.prototype.setValid = function (isValid) {
                    this.adapter_.setValid(isValid);
                };
                MDCSelectFoundation.prototype.isValid = function () {
                    return this.adapter_.checkValidity();
                };
                return MDCSelectFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var strings$5 = {
                ARIA_HIDDEN: 'aria-hidden',
                ROLE: 'role',
            };
            var cssClasses$7 = {
                HELPER_TEXT_PERSISTENT: 'mdc-select-helper-text--persistent',
                HELPER_TEXT_VALIDATION_MSG: 'mdc-select-helper-text--validation-msg',
            };
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCSelectHelperTextFoundation = /** @class */ (function (_super) {
                __extends(MDCSelectHelperTextFoundation, _super);
                function MDCSelectHelperTextFoundation(adapter) {
                    return _super.call(this, __assign({}, MDCSelectHelperTextFoundation.defaultAdapter, adapter)) || this;
                }
                Object.defineProperty(MDCSelectHelperTextFoundation, "cssClasses", {
                    get: function () {
                        return cssClasses$7;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelectHelperTextFoundation, "strings", {
                    get: function () {
                        return strings$5;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelectHelperTextFoundation, "defaultAdapter", {
                    /**
                     * See {@link MDCSelectHelperTextAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            addClass: function () { return undefined; },
                            removeClass: function () { return undefined; },
                            hasClass: function () { return false; },
                            setAttr: function () { return undefined; },
                            removeAttr: function () { return undefined; },
                            setContent: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Sets the content of the helper text field.
                 */
                MDCSelectHelperTextFoundation.prototype.setContent = function (content) {
                    this.adapter_.setContent(content);
                };
                /**
                 *  Sets the persistency of the helper text.
                 */
                MDCSelectHelperTextFoundation.prototype.setPersistent = function (isPersistent) {
                    if (isPersistent) {
                        this.adapter_.addClass(cssClasses$7.HELPER_TEXT_PERSISTENT);
                    }
                    else {
                        this.adapter_.removeClass(cssClasses$7.HELPER_TEXT_PERSISTENT);
                    }
                };
                /**
                 * @param isValidation True to make the helper text act as an error validation message.
                 */
                MDCSelectHelperTextFoundation.prototype.setValidation = function (isValidation) {
                    if (isValidation) {
                        this.adapter_.addClass(cssClasses$7.HELPER_TEXT_VALIDATION_MSG);
                    }
                    else {
                        this.adapter_.removeClass(cssClasses$7.HELPER_TEXT_VALIDATION_MSG);
                    }
                };
                /**
                 * Makes the helper text visible to screen readers.
                 */
                MDCSelectHelperTextFoundation.prototype.showToScreenReader = function () {
                    this.adapter_.removeAttr(strings$5.ARIA_HIDDEN);
                };
                /**
                 * Sets the validity of the helper text based on the select validity.
                 */
                MDCSelectHelperTextFoundation.prototype.setValidity = function (selectIsValid) {
                    var helperTextIsPersistent = this.adapter_.hasClass(cssClasses$7.HELPER_TEXT_PERSISTENT);
                    var helperTextIsValidationMsg = this.adapter_.hasClass(cssClasses$7.HELPER_TEXT_VALIDATION_MSG);
                    var validationMsgNeedsDisplay = helperTextIsValidationMsg && !selectIsValid;
                    if (validationMsgNeedsDisplay) {
                        this.adapter_.setAttr(strings$5.ROLE, 'alert');
                    }
                    else {
                        this.adapter_.removeAttr(strings$5.ROLE);
                    }
                    if (!helperTextIsPersistent && !validationMsgNeedsDisplay) {
                        this.hide_();
                    }
                };
                /**
                 * Hides the help text from screen readers.
                 */
                MDCSelectHelperTextFoundation.prototype.hide_ = function () {
                    this.adapter_.setAttr(strings$5.ARIA_HIDDEN, 'true');
                };
                return MDCSelectHelperTextFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCSelectHelperText = /** @class */ (function (_super) {
                __extends(MDCSelectHelperText, _super);
                function MDCSelectHelperText() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCSelectHelperText.attachTo = function (root) {
                    return new MDCSelectHelperText(root);
                };
                Object.defineProperty(MDCSelectHelperText.prototype, "foundation", {
                    get: function () {
                        return this.foundation_;
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCSelectHelperText.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        hasClass: function (className) { return _this.root_.classList.contains(className); },
                        setAttr: function (attr, value) { return _this.root_.setAttribute(attr, value); },
                        removeAttr: function (attr) { return _this.root_.removeAttribute(attr); },
                        setContent: function (content) {
                            _this.root_.textContent = content;
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCSelectHelperTextFoundation(adapter);
                };
                return MDCSelectHelperText;
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
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var strings$6 = {
                ICON_EVENT: 'MDCSelect:icon',
                ICON_ROLE: 'button',
            };
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var INTERACTION_EVENTS = ['click', 'keydown'];
            var MDCSelectIconFoundation = /** @class */ (function (_super) {
                __extends(MDCSelectIconFoundation, _super);
                function MDCSelectIconFoundation(adapter) {
                    var _this = _super.call(this, __assign({}, MDCSelectIconFoundation.defaultAdapter, adapter)) || this;
                    _this.savedTabIndex_ = null;
                    _this.interactionHandler_ = function (evt) { return _this.handleInteraction(evt); };
                    return _this;
                }
                Object.defineProperty(MDCSelectIconFoundation, "strings", {
                    get: function () {
                        return strings$6;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelectIconFoundation, "defaultAdapter", {
                    /**
                     * See {@link MDCSelectIconAdapter} for typing information on parameters and return types.
                     */
                    get: function () {
                        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                        return {
                            getAttr: function () { return null; },
                            setAttr: function () { return undefined; },
                            removeAttr: function () { return undefined; },
                            setContent: function () { return undefined; },
                            registerInteractionHandler: function () { return undefined; },
                            deregisterInteractionHandler: function () { return undefined; },
                            notifyIconAction: function () { return undefined; },
                        };
                        // tslint:enable:object-literal-sort-keys
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCSelectIconFoundation.prototype.init = function () {
                    var _this = this;
                    this.savedTabIndex_ = this.adapter_.getAttr('tabindex');
                    INTERACTION_EVENTS.forEach(function (evtType) {
                        _this.adapter_.registerInteractionHandler(evtType, _this.interactionHandler_);
                    });
                };
                MDCSelectIconFoundation.prototype.destroy = function () {
                    var _this = this;
                    INTERACTION_EVENTS.forEach(function (evtType) {
                        _this.adapter_.deregisterInteractionHandler(evtType, _this.interactionHandler_);
                    });
                };
                MDCSelectIconFoundation.prototype.setDisabled = function (disabled) {
                    if (!this.savedTabIndex_) {
                        return;
                    }
                    if (disabled) {
                        this.adapter_.setAttr('tabindex', '-1');
                        this.adapter_.removeAttr('role');
                    }
                    else {
                        this.adapter_.setAttr('tabindex', this.savedTabIndex_);
                        this.adapter_.setAttr('role', strings$6.ICON_ROLE);
                    }
                };
                MDCSelectIconFoundation.prototype.setAriaLabel = function (label) {
                    this.adapter_.setAttr('aria-label', label);
                };
                MDCSelectIconFoundation.prototype.setContent = function (content) {
                    this.adapter_.setContent(content);
                };
                MDCSelectIconFoundation.prototype.handleInteraction = function (evt) {
                    var isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;
                    if (evt.type === 'click' || isEnterKey) {
                        this.adapter_.notifyIconAction();
                    }
                };
                return MDCSelectIconFoundation;
            }(MDCFoundation));
            /**
             * @license
             * Copyright 2018 Google Inc.
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
            var MDCSelectIcon = /** @class */ (function (_super) {
                __extends(MDCSelectIcon, _super);
                function MDCSelectIcon() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCSelectIcon.attachTo = function (root) {
                    return new MDCSelectIcon(root);
                };
                Object.defineProperty(MDCSelectIcon.prototype, "foundation", {
                    get: function () {
                        return this.foundation_;
                    },
                    enumerable: true,
                    configurable: true
                });
                MDCSelectIcon.prototype.getDefaultFoundation = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = {
                        getAttr: function (attr) { return _this.root_.getAttribute(attr); },
                        setAttr: function (attr, value) { return _this.root_.setAttribute(attr, value); },
                        removeAttr: function (attr) { return _this.root_.removeAttribute(attr); },
                        setContent: function (content) {
                            _this.root_.textContent = content;
                        },
                        registerInteractionHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
                        deregisterInteractionHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
                        notifyIconAction: function () { return _this.emit(MDCSelectIconFoundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */); },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return new MDCSelectIconFoundation(adapter);
                };
                return MDCSelectIcon;
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
            var POINTER_EVENTS = ['mousedown', 'touchstart'];
            var VALIDATION_ATTR_WHITELIST = ['required', 'aria-required'];
            var MDCSelect = /** @class */ (function (_super) {
                __extends(MDCSelect, _super);
                function MDCSelect() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MDCSelect.attachTo = function (root) {
                    return new MDCSelect(root);
                };
                MDCSelect.prototype.initialize = function (labelFactory, lineRippleFactory, outlineFactory, menuFactory, iconFactory, helperTextFactory) {
                    if (labelFactory === void 0) {
                        labelFactory = function (el) { return new MDCFloatingLabel(el); };
                    }
                    if (lineRippleFactory === void 0) {
                        lineRippleFactory = function (el) { return new MDCLineRipple(el); };
                    }
                    if (outlineFactory === void 0) {
                        outlineFactory = function (el) { return new MDCNotchedOutline(el); };
                    }
                    if (menuFactory === void 0) {
                        menuFactory = function (el) { return new MDCMenu(el); };
                    }
                    if (iconFactory === void 0) {
                        iconFactory = function (el) { return new MDCSelectIcon(el); };
                    }
                    if (helperTextFactory === void 0) {
                        helperTextFactory = function (el) { return new MDCSelectHelperText(el); };
                    }
                    this.isMenuOpen_ = false;
                    this.nativeControl_ = this.root_.querySelector(strings$4.NATIVE_CONTROL_SELECTOR);
                    this.selectedText_ = this.root_.querySelector(strings$4.SELECTED_TEXT_SELECTOR);
                    var targetElement = this.nativeControl_ || this.selectedText_;
                    if (!targetElement) {
                        throw new Error('MDCSelect: Missing required element: Exactly one of the following selectors must be present: ' +
                            ("'" + strings$4.NATIVE_CONTROL_SELECTOR + "' or '" + strings$4.SELECTED_TEXT_SELECTOR + "'"));
                    }
                    this.targetElement_ = targetElement;
                    if (this.targetElement_.hasAttribute(strings$4.ARIA_CONTROLS)) {
                        var helperTextElement = document.getElementById(this.targetElement_.getAttribute(strings$4.ARIA_CONTROLS));
                        if (helperTextElement) {
                            this.helperText_ = helperTextFactory(helperTextElement);
                        }
                    }
                    if (this.selectedText_) {
                        this.enhancedSelectSetup_(menuFactory);
                    }
                    var labelElement = this.root_.querySelector(strings$4.LABEL_SELECTOR);
                    this.label_ = labelElement ? labelFactory(labelElement) : null;
                    var lineRippleElement = this.root_.querySelector(strings$4.LINE_RIPPLE_SELECTOR);
                    this.lineRipple_ = lineRippleElement ? lineRippleFactory(lineRippleElement) : null;
                    var outlineElement = this.root_.querySelector(strings$4.OUTLINE_SELECTOR);
                    this.outline_ = outlineElement ? outlineFactory(outlineElement) : null;
                    var leadingIcon = this.root_.querySelector(strings$4.LEADING_ICON_SELECTOR);
                    if (leadingIcon) {
                        this.root_.classList.add(cssClasses$6.WITH_LEADING_ICON);
                        this.leadingIcon_ = iconFactory(leadingIcon);
                        if (this.menuElement_) {
                            this.menuElement_.classList.add(cssClasses$6.WITH_LEADING_ICON);
                        }
                    }
                    if (!this.root_.classList.contains(cssClasses$6.OUTLINED)) {
                        this.ripple = this.createRipple_();
                    }
                    // The required state needs to be sync'd before the mutation observer is added.
                    this.initialSyncRequiredState_();
                    this.addMutationObserverForRequired_();
                };
                /**
                 * Initializes the select's event listeners and internal state based
                 * on the environment's state.
                 */
                MDCSelect.prototype.initialSyncWithDOM = function () {
                    var _this = this;
                    this.handleChange_ = function () { return _this.foundation_.handleChange(/* didChange */ true); };
                    this.handleFocus_ = function () { return _this.foundation_.handleFocus(); };
                    this.handleBlur_ = function () { return _this.foundation_.handleBlur(); };
                    this.handleClick_ = function (evt) {
                        if (_this.selectedText_) {
                            _this.selectedText_.focus();
                        }
                        _this.foundation_.handleClick(_this.getNormalizedXCoordinate_(evt));
                    };
                    this.handleKeydown_ = function (evt) { return _this.foundation_.handleKeydown(evt); };
                    this.handleMenuSelected_ = function (evtData) { return _this.selectedIndex = evtData.detail.index; };
                    this.handleMenuOpened_ = function () {
                        // Menu should open to the last selected element.
                        if (_this.selectedIndex >= 0) {
                            var selectedItemEl = _this.menu_.items[_this.selectedIndex];
                            selectedItemEl.focus();
                        }
                    };
                    this.handleMenuClosed_ = function () {
                        // isMenuOpen_ is used to track the state of the menu opening or closing since the menu.open function
                        // will return false if the menu is still closing and this method listens to the closed event which
                        // occurs after the menu is already closed.
                        _this.isMenuOpen_ = false;
                        _this.selectedText_.removeAttribute('aria-expanded');
                        if (document.activeElement !== _this.selectedText_) {
                            _this.foundation_.handleBlur();
                        }
                    };
                    this.targetElement_.addEventListener('change', this.handleChange_);
                    this.targetElement_.addEventListener('focus', this.handleFocus_);
                    this.targetElement_.addEventListener('blur', this.handleBlur_);
                    POINTER_EVENTS.forEach(function (evtType) {
                        _this.targetElement_.addEventListener(evtType, _this.handleClick_);
                    });
                    if (this.menuElement_) {
                        this.selectedText_.addEventListener('keydown', this.handleKeydown_);
                        this.menu_.listen(strings.CLOSED_EVENT, this.handleMenuClosed_);
                        this.menu_.listen(strings.OPENED_EVENT, this.handleMenuOpened_);
                        this.menu_.listen(strings$1.SELECTED_EVENT, this.handleMenuSelected_);
                        if (this.hiddenInput_ && this.hiddenInput_.value) {
                            // If the hidden input already has a value, use it to restore the select's value.
                            // This can happen e.g. if the user goes back or (in some browsers) refreshes the page.
                            var enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
                            enhancedAdapterMethods.setValue(this.hiddenInput_.value);
                        }
                        else if (this.menuElement_.querySelector(strings$4.SELECTED_ITEM_SELECTOR)) {
                            // If an element is selected, the select should set the initial selected text.
                            var enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
                            enhancedAdapterMethods.setValue(enhancedAdapterMethods.getValue());
                        }
                    }
                    // Initially sync floating label
                    this.foundation_.handleChange(/* didChange */ false);
                    if (this.root_.classList.contains(cssClasses$6.DISABLED)
                        || (this.nativeControl_ && this.nativeControl_.disabled)) {
                        this.disabled = true;
                    }
                };
                MDCSelect.prototype.destroy = function () {
                    var _this = this;
                    this.targetElement_.removeEventListener('change', this.handleChange_);
                    this.targetElement_.removeEventListener('focus', this.handleFocus_);
                    this.targetElement_.removeEventListener('blur', this.handleBlur_);
                    this.targetElement_.removeEventListener('keydown', this.handleKeydown_);
                    POINTER_EVENTS.forEach(function (evtType) {
                        _this.targetElement_.removeEventListener(evtType, _this.handleClick_);
                    });
                    if (this.menu_) {
                        this.menu_.unlisten(strings.CLOSED_EVENT, this.handleMenuClosed_);
                        this.menu_.unlisten(strings.OPENED_EVENT, this.handleMenuOpened_);
                        this.menu_.unlisten(strings$1.SELECTED_EVENT, this.handleMenuSelected_);
                        this.menu_.destroy();
                    }
                    if (this.ripple) {
                        this.ripple.destroy();
                    }
                    if (this.outline_) {
                        this.outline_.destroy();
                    }
                    if (this.leadingIcon_) {
                        this.leadingIcon_.destroy();
                    }
                    if (this.helperText_) {
                        this.helperText_.destroy();
                    }
                    if (this.validationObserver_) {
                        this.validationObserver_.disconnect();
                    }
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(MDCSelect.prototype, "value", {
                    get: function () {
                        return this.foundation_.getValue();
                    },
                    set: function (value) {
                        this.foundation_.setValue(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "selectedIndex", {
                    get: function () {
                        var selectedIndex = -1;
                        if (this.menuElement_ && this.menu_) {
                            var selectedEl = this.menuElement_.querySelector(strings$4.SELECTED_ITEM_SELECTOR);
                            selectedIndex = this.menu_.items.indexOf(selectedEl);
                        }
                        else if (this.nativeControl_) {
                            selectedIndex = this.nativeControl_.selectedIndex;
                        }
                        return selectedIndex;
                    },
                    set: function (selectedIndex) {
                        this.foundation_.setSelectedIndex(selectedIndex);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "disabled", {
                    get: function () {
                        return this.root_.classList.contains(cssClasses$6.DISABLED) ||
                            (this.nativeControl_ ? this.nativeControl_.disabled : false);
                    },
                    set: function (disabled) {
                        this.foundation_.setDisabled(disabled);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "leadingIconAriaLabel", {
                    set: function (label) {
                        this.foundation_.setLeadingIconAriaLabel(label);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "leadingIconContent", {
                    /**
                     * Sets the text content of the leading icon.
                     */
                    set: function (content) {
                        this.foundation_.setLeadingIconContent(content);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "helperTextContent", {
                    /**
                     * Sets the text content of the helper text.
                     */
                    set: function (content) {
                        this.foundation_.setHelperTextContent(content);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "valid", {
                    /**
                     * Checks if the select is in a valid state.
                     */
                    get: function () {
                        return this.foundation_.isValid();
                    },
                    /**
                     * Sets the current invalid state of the select.
                     */
                    set: function (isValid) {
                        this.foundation_.setValid(isValid);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MDCSelect.prototype, "required", {
                    /**
                     * Returns whether the select is required.
                     */
                    get: function () {
                        if (this.nativeControl_) {
                            return this.nativeControl_.required;
                        }
                        else {
                            return this.selectedText_.getAttribute('aria-required') === 'true';
                        }
                    },
                    /**
                     * Sets the control to the required state.
                     */
                    set: function (isRequired) {
                        if (this.nativeControl_) {
                            this.nativeControl_.required = isRequired;
                        }
                        else {
                            if (isRequired) {
                                this.selectedText_.setAttribute('aria-required', isRequired.toString());
                            }
                            else {
                                this.selectedText_.removeAttribute('aria-required');
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Recomputes the outline SVG path for the outline element.
                 */
                MDCSelect.prototype.layout = function () {
                    this.foundation_.layout();
                };
                MDCSelect.prototype.getDefaultFoundation = function () {
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    var adapter = __assign({}, (this.nativeControl_ ? this.getNativeSelectAdapterMethods_() : this.getEnhancedSelectAdapterMethods_()), this.getCommonAdapterMethods_(), this.getOutlineAdapterMethods_(), this.getLabelAdapterMethods_());
                    return new MDCSelectFoundation(adapter, this.getFoundationMap_());
                };
                /**
                 * Handles setup for the enhanced menu.
                 */
                MDCSelect.prototype.enhancedSelectSetup_ = function (menuFactory) {
                    var isDisabled = this.root_.classList.contains(cssClasses$6.DISABLED);
                    this.selectedText_.setAttribute('tabindex', isDisabled ? '-1' : '0');
                    this.hiddenInput_ = this.root_.querySelector(strings$4.HIDDEN_INPUT_SELECTOR);
                    this.menuElement_ = this.root_.querySelector(strings$4.MENU_SELECTOR);
                    this.menu_ = menuFactory(this.menuElement_);
                    this.menu_.hoistMenuToBody();
                    this.menu_.setAnchorElement(this.root_);
                    this.menu_.setAnchorCorner(Corner.BOTTOM_START);
                    this.menu_.wrapFocus = false;
                };
                MDCSelect.prototype.createRipple_ = function () {
                    var _this = this;
                    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
                    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    var adapter = __assign({}, MDCRipple.createAdapter(this), { registerInteractionHandler: function (evtType, handler) { return _this.targetElement_.addEventListener(evtType, handler); }, deregisterInteractionHandler: function (evtType, handler) { return _this.targetElement_.removeEventListener(evtType, handler); } });
                    // tslint:enable:object-literal-sort-keys
                    return new MDCRipple(this.root_, new MDCRippleFoundation(adapter));
                };
                MDCSelect.prototype.getNativeSelectAdapterMethods_ = function () {
                    var _this = this;
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    return {
                        getValue: function () { return _this.nativeControl_.value; },
                        setValue: function (value) {
                            _this.nativeControl_.value = value;
                        },
                        openMenu: function () { return undefined; },
                        closeMenu: function () { return undefined; },
                        isMenuOpen: function () { return false; },
                        setSelectedIndex: function (index) {
                            _this.nativeControl_.selectedIndex = index;
                        },
                        setDisabled: function (isDisabled) {
                            _this.nativeControl_.disabled = isDisabled;
                        },
                        setValid: function (isValid) {
                            if (isValid) {
                                _this.root_.classList.remove(cssClasses$6.INVALID);
                            }
                            else {
                                _this.root_.classList.add(cssClasses$6.INVALID);
                            }
                        },
                        checkValidity: function () { return _this.nativeControl_.checkValidity(); },
                    };
                    // tslint:enable:object-literal-sort-keys
                };
                MDCSelect.prototype.getEnhancedSelectAdapterMethods_ = function () {
                    var _this = this;
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    return {
                        getValue: function () {
                            var listItem = _this.menuElement_.querySelector(strings$4.SELECTED_ITEM_SELECTOR);
                            if (listItem && listItem.hasAttribute(strings$4.ENHANCED_VALUE_ATTR)) {
                                return listItem.getAttribute(strings$4.ENHANCED_VALUE_ATTR) || '';
                            }
                            return '';
                        },
                        setValue: function (value) {
                            var element = _this.menuElement_.querySelector("[" + strings$4.ENHANCED_VALUE_ATTR + "=\"" + value + "\"]");
                            _this.setEnhancedSelectedIndex_(element ? _this.menu_.items.indexOf(element) : -1);
                        },
                        openMenu: function () {
                            if (_this.menu_ && !_this.menu_.open) {
                                _this.menu_.open = true;
                                _this.isMenuOpen_ = true;
                                _this.selectedText_.setAttribute('aria-expanded', 'true');
                            }
                        },
                        closeMenu: function () {
                            if (_this.menu_ && _this.menu_.open) {
                                _this.menu_.open = false;
                            }
                        },
                        isMenuOpen: function () { return Boolean(_this.menu_) && _this.isMenuOpen_; },
                        setSelectedIndex: function (index) { return _this.setEnhancedSelectedIndex_(index); },
                        setDisabled: function (isDisabled) {
                            _this.selectedText_.setAttribute('tabindex', isDisabled ? '-1' : '0');
                            _this.selectedText_.setAttribute('aria-disabled', isDisabled.toString());
                            if (_this.hiddenInput_) {
                                _this.hiddenInput_.disabled = isDisabled;
                            }
                        },
                        checkValidity: function () {
                            var classList = _this.root_.classList;
                            if (classList.contains(cssClasses$6.REQUIRED) && !classList.contains(cssClasses$6.DISABLED)) {
                                // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
                                // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
                                return _this.selectedIndex !== -1 && (_this.selectedIndex !== 0 || Boolean(_this.value));
                            }
                            else {
                                return true;
                            }
                        },
                        setValid: function (isValid) {
                            _this.selectedText_.setAttribute('aria-invalid', (!isValid).toString());
                            if (isValid) {
                                _this.root_.classList.remove(cssClasses$6.INVALID);
                            }
                            else {
                                _this.root_.classList.add(cssClasses$6.INVALID);
                            }
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                };
                MDCSelect.prototype.getCommonAdapterMethods_ = function () {
                    var _this = this;
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    return {
                        addClass: function (className) { return _this.root_.classList.add(className); },
                        removeClass: function (className) { return _this.root_.classList.remove(className); },
                        hasClass: function (className) { return _this.root_.classList.contains(className); },
                        setRippleCenter: function (normalizedX) { return _this.lineRipple_ && _this.lineRipple_.setRippleCenter(normalizedX); },
                        activateBottomLine: function () { return _this.lineRipple_ && _this.lineRipple_.activate(); },
                        deactivateBottomLine: function () { return _this.lineRipple_ && _this.lineRipple_.deactivate(); },
                        notifyChange: function (value) {
                            var index = _this.selectedIndex;
                            _this.emit(strings$4.CHANGE_EVENT, { value: value, index: index }, true /* shouldBubble  */);
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                };
                MDCSelect.prototype.getOutlineAdapterMethods_ = function () {
                    var _this = this;
                    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
                    return {
                        hasOutline: function () { return Boolean(_this.outline_); },
                        notchOutline: function (labelWidth) { return _this.outline_ && _this.outline_.notch(labelWidth); },
                        closeOutline: function () { return _this.outline_ && _this.outline_.closeNotch(); },
                    };
                    // tslint:enable:object-literal-sort-keys
                };
                MDCSelect.prototype.getLabelAdapterMethods_ = function () {
                    var _this = this;
                    return {
                        floatLabel: function (shouldFloat) { return _this.label_ && _this.label_.float(shouldFloat); },
                        getLabelWidth: function () { return _this.label_ ? _this.label_.getWidth() : 0; },
                    };
                };
                /**
                 * Calculates where the line ripple should start based on the x coordinate within the component.
                 */
                MDCSelect.prototype.getNormalizedXCoordinate_ = function (evt) {
                    var targetClientRect = evt.target.getBoundingClientRect();
                    var xCoordinate = this.isTouchEvent_(evt) ? evt.touches[0].clientX : evt.clientX;
                    return xCoordinate - targetClientRect.left;
                };
                MDCSelect.prototype.isTouchEvent_ = function (evt) {
                    return Boolean(evt.touches);
                };
                /**
                 * Returns a map of all subcomponents to subfoundations.
                 */
                MDCSelect.prototype.getFoundationMap_ = function () {
                    return {
                        helperText: this.helperText_ ? this.helperText_.foundation : undefined,
                        leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
                    };
                };
                MDCSelect.prototype.setEnhancedSelectedIndex_ = function (index) {
                    var selectedItem = this.menu_.items[index];
                    this.selectedText_.textContent = selectedItem ? selectedItem.textContent.trim() : '';
                    var previouslySelected = this.menuElement_.querySelector(strings$4.SELECTED_ITEM_SELECTOR);
                    if (previouslySelected) {
                        previouslySelected.classList.remove(cssClasses$6.SELECTED_ITEM_CLASS);
                        previouslySelected.removeAttribute(strings$4.ARIA_SELECTED_ATTR);
                    }
                    if (selectedItem) {
                        selectedItem.classList.add(cssClasses$6.SELECTED_ITEM_CLASS);
                        selectedItem.setAttribute(strings$4.ARIA_SELECTED_ATTR, 'true');
                    }
                    // Synchronize hidden input's value with data-value attribute of selected item.
                    // This code path is also followed when setting value directly, so this covers all cases.
                    if (this.hiddenInput_) {
                        this.hiddenInput_.value = selectedItem ? selectedItem.getAttribute(strings$4.ENHANCED_VALUE_ATTR) || '' : '';
                    }
                    this.layout();
                };
                MDCSelect.prototype.initialSyncRequiredState_ = function () {
                    var isRequired = this.targetElement_.required
                        || this.targetElement_.getAttribute('aria-required') === 'true'
                        || this.root_.classList.contains(cssClasses$6.REQUIRED);
                    if (isRequired) {
                        if (this.nativeControl_) {
                            this.nativeControl_.required = true;
                        }
                        else {
                            this.selectedText_.setAttribute('aria-required', 'true');
                        }
                        this.root_.classList.add(cssClasses$6.REQUIRED);
                    }
                };
                MDCSelect.prototype.addMutationObserverForRequired_ = function () {
                    var _this = this;
                    var observerHandler = function (attributesList) {
                        attributesList.some(function (attributeName) {
                            if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) === -1) {
                                return false;
                            }
                            if (_this.selectedText_) {
                                if (_this.selectedText_.getAttribute('aria-required') === 'true') {
                                    _this.root_.classList.add(cssClasses$6.REQUIRED);
                                }
                                else {
                                    _this.root_.classList.remove(cssClasses$6.REQUIRED);
                                }
                            }
                            else {
                                if (_this.nativeControl_.required) {
                                    _this.root_.classList.add(cssClasses$6.REQUIRED);
                                }
                                else {
                                    _this.root_.classList.remove(cssClasses$6.REQUIRED);
                                }
                            }
                            return true;
                        });
                    };
                    var getAttributesList = function (mutationsList) {
                        return mutationsList
                            .map(function (mutation) { return mutation.attributeName; })
                            .filter(function (attributeName) { return attributeName; });
                    };
                    var observer = new MutationObserver(function (mutationsList) { return observerHandler(getAttributesList(mutationsList)); });
                    observer.observe(this.targetElement_, { attributes: true });
                    this.validationObserver_ = observer;
                };
                return MDCSelect;
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
            var DemoSelectComponent = /** @class */ (function () {
                function DemoSelectComponent(hostRef) {
                    registerInstance(this, hostRef);
                    this.selectedCaseChanged = createEvent(this, "selectedCaseChanged", 7);
                }
                DemoSelectComponent.prototype.componentDidLoad = function () {
                    var _this_1 = this;
                    var rootEl = this.el.shadowRoot.querySelector('.mdc-select');
                    this.select = new MDCSelect(rootEl);
                    this.select.selectedIndex = sessionStorage.getItem('o-demo-key') <= this.options.length ? sessionStorage.getItem('o-demo-key') : 0;
                    this.emitChange();
                    this.select.listen('change', function () {
                        _this_1.emitChange();
                    });
                };
                DemoSelectComponent.prototype.emitChange = function () {
                    document.title = this.options[this.select.selectedIndex];
                    sessionStorage.setItem('o-demo-key', this.select.selectedIndex);
                    this.selectedCaseChanged.emit(this.select.selectedIndex);
                };
                DemoSelectComponent.prototype.componentDidUnload = function () {
                    this.select.destroy();
                };
                DemoSelectComponent.prototype.render = function () {
                    return (h("div", { class: "mdc-select" }, h("select", { class: "mdc-select__native-control" }, this.options.map(function (option, index) { return (h("option", { value: index, id: index, role: "option", tabindex: "0" }, option)); })), h("label", { class: "mdc-floating-label" }, "Select Demo:"), h("div", { class: "mdc-line-ripple" })));
                };
                Object.defineProperty(DemoSelectComponent, "originalStyleUrls", {
                    get: function () {
                        return {
                            "$": ["o-demo-bar-select.scss"]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoSelectComponent.prototype, "el", {
                    get: function () { return getElement(this); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoSelectComponent, "style", {
                    get: function () { return "\@-webkit-keyframes mdc-select-float-native-control{0%{-webkit-transform:translateY(8px);transform:translateY(8px);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}\@keyframes mdc-select-float-native-control{0%{-webkit-transform:translateY(8px);transform:translateY(8px);opacity:0}to{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}.mdc-line-ripple{position:absolute;bottom:0;left:0;width:100%;height:2px;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transition:opacity .18s cubic-bezier(.4,0,.2,1),-webkit-transform .18s cubic-bezier(.4,0,.2,1);transition:opacity .18s cubic-bezier(.4,0,.2,1),-webkit-transform .18s cubic-bezier(.4,0,.2,1);transition:transform .18s cubic-bezier(.4,0,.2,1),opacity .18s cubic-bezier(.4,0,.2,1);transition:transform .18s cubic-bezier(.4,0,.2,1),opacity .18s cubic-bezier(.4,0,.2,1),-webkit-transform .18s cubic-bezier(.4,0,.2,1);opacity:0;z-index:2}.mdc-line-ripple--active{-webkit-transform:scaleX(1);transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating{opacity:0}.mdc-notched-outline{display:-ms-flexbox;display:flex;position:absolute;right:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}.mdc-notched-outline[dir=rtl],[dir=rtl] .mdc-notched-outline{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;-webkit-transition:border .15s cubic-bezier(.4,0,.2,1);transition:border .15s cubic-bezier(.4,0,.2,1);border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}.mdc-notched-outline__leading[dir=rtl],.mdc-notched-outline__trailing,[dir=rtl] .mdc-notched-outline__leading{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{-ms-flex-positive:1;flex-grow:1}.mdc-notched-outline__trailing[dir=rtl],[dir=rtl] .mdc-notched-outline__trailing{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:calc(100% - 24px)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.33333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl],[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}.mdc-floating-label{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;-webkit-transition:color .15s cubic-bezier(.4,0,.2,1),-webkit-transform .15s cubic-bezier(.4,0,.2,1);transition:color .15s cubic-bezier(.4,0,.2,1),-webkit-transform .15s cubic-bezier(.4,0,.2,1);transition:transform .15s cubic-bezier(.4,0,.2,1),color .15s cubic-bezier(.4,0,.2,1);transition:transform .15s cubic-bezier(.4,0,.2,1),color .15s cubic-bezier(.4,0,.2,1),-webkit-transform .15s cubic-bezier(.4,0,.2,1);line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}.mdc-floating-label[dir=rtl],[dir=rtl] .mdc-floating-label{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto;-webkit-transform:translateY(-50%) scale(.75);transform:translateY(-50%) scale(.75)}.mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-standard .25s 1;animation:mdc-floating-label-shake-float-above-standard .25s 1}\@-webkit-keyframes mdc-floating-label-shake-float-above-standard{0%{-webkit-transform:translateX(0) translateY(-50%) scale(.75);transform:translateX(0) translateY(-50%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(.5,0,.70173,.49582);animation-timing-function:cubic-bezier(.5,0,.70173,.49582);-webkit-transform:translateX(4%) translateY(-50%) scale(.75);transform:translateX(4%) translateY(-50%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);-webkit-transform:translateX(-4%) translateY(-50%) scale(.75);transform:translateX(-4%) translateY(-50%) scale(.75)}to{-webkit-transform:translateX(0) translateY(-50%) scale(.75);transform:translateX(0) translateY(-50%) scale(.75)}}\@keyframes mdc-floating-label-shake-float-above-standard{0%{-webkit-transform:translateX(0) translateY(-50%) scale(.75);transform:translateX(0) translateY(-50%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(.5,0,.70173,.49582);animation-timing-function:cubic-bezier(.5,0,.70173,.49582);-webkit-transform:translateX(4%) translateY(-50%) scale(.75);transform:translateX(4%) translateY(-50%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);-webkit-transform:translateX(-4%) translateY(-50%) scale(.75);transform:translateX(-4%) translateY(-50%) scale(.75)}to{-webkit-transform:translateX(0) translateY(-50%) scale(.75);transform:translateX(0) translateY(-50%) scale(.75)}}\@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-select--with-leading-icon:not(.mdc-select--disabled) .mdc-select__icon{color:#000;color:var(--mdc-theme-on-surface,#000)}.mdc-select--with-leading-icon .mdc-select__icon{display:inline-block;position:absolute;bottom:16px;-webkit-box-sizing:border-box;box-sizing:border-box;width:24px;height:24px;border:none;background-color:transparent;fill:currentColor;opacity:.54;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdc-select__icon:not([tabindex]),.mdc-select__icon[tabindex=\"-1\"]{cursor:default;pointer-events:none}.mdc-select-helper-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.03333em;text-decoration:inherit;text-transform:inherit;display:block;line-height:normal;margin:0;-webkit-transition:opacity .18s cubic-bezier(.4,0,.2,1);transition:opacity .18s cubic-bezier(.4,0,.2,1);opacity:0;will-change:opacity}.mdc-select-helper-text:before{display:inline-block;width:0;height:16px;content:\"\";vertical-align:0}.mdc-select-helper-text--persistent{-webkit-transition:none;transition:none;opacity:1;will-change:auto}.mdc-select{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;display:-ms-inline-flexbox;display:inline-flex;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;height:56px;overflow:hidden;will-change:opacity,transform,color}.mdc-select:not(.mdc-select--disabled){background-color:#f5f5f5}.mdc-select:after,.mdc-select:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-select:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-select.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-select.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-select.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-select.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-select.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-select:after,.mdc-select:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-select.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-select:after,.mdc-select:before{background-color:rgba(0,0,0,.87)}.mdc-select:hover:before{opacity:.04}.mdc-select.mdc-ripple-upgraded--background-focused:before,.mdc-select:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control,.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0,0,0,.87)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0,0,0,.6)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control,.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{border-bottom-color:rgba(0,0,0,.42)}.mdc-select:not(.mdc-select--disabled)+.mdc-select-helper-text{color:rgba(0,0,0,.6)}.mdc-select,.mdc-select__native-control{border-radius:4px 4px 0 0}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-line-ripple{background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:rgba(98,0,238,.87)}.mdc-select:not(.mdc-select--disabled) .mdc-select__native-control:hover{border-bottom-color:rgba(0,0,0,.87)}.mdc-select .mdc-floating-label--float-above{-webkit-transform:translateY(-70%) scale(.75);transform:translateY(-70%) scale(.75)}.mdc-select .mdc-floating-label{left:16px;right:auto;top:21px;pointer-events:none}.mdc-select .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select .mdc-floating-label{left:auto;right:16px}.mdc-select.mdc-select--with-leading-icon .mdc-floating-label{left:48px;right:auto}.mdc-select.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select.mdc-select--with-leading-icon .mdc-floating-label{left:auto;right:48px}.mdc-select.mdc-select--outlined .mdc-floating-label{left:4px;right:auto;top:17px}.mdc-select.mdc-select--outlined .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select.mdc-select--outlined .mdc-floating-label{left:auto;right:4px}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:36px;right:auto}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl],[dir=rtl] .mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:auto;right:36px}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{left:36px;right:auto}.mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{left:auto;right:36px}.mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width=\'10\' height=\'5\' viewBox=\'7 10 10 5\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' opacity=\'.54\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E\") no-repeat 50%;left:auto;right:8px;position:absolute;bottom:16px;width:24px;height:24px;-webkit-transition:-webkit-transform .15s cubic-bezier(.4,0,.2,1);transition:-webkit-transform .15s cubic-bezier(.4,0,.2,1);transition:transform .15s cubic-bezier(.4,0,.2,1);transition:transform .15s cubic-bezier(.4,0,.2,1), -webkit-transform .15s cubic-bezier(.4,0,.2,1);pointer-events:none}.mdc-select__dropdown-icon[dir=rtl],[dir=rtl] .mdc-select__dropdown-icon{left:8px;right:auto}.mdc-select--focused .mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width=\'10\' height=\'5\' viewBox=\'7 10 10 5\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%236200ee\' fill-rule=\'evenodd\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E\") no-repeat 50%;-webkit-transform:rotate(180deg) translateY(-5px);transform:rotate(180deg) translateY(-5px);-webkit-transition:-webkit-transform .15s cubic-bezier(.4,0,.2,1);transition:-webkit-transform .15s cubic-bezier(.4,0,.2,1);transition:transform .15s cubic-bezier(.4,0,.2,1);transition:transform .15s cubic-bezier(.4,0,.2,1), -webkit-transform .15s cubic-bezier(.4,0,.2,1)}.mdc-select__native-control{padding-top:20px}.mdc-select.mdc-select--focused .mdc-line-ripple:after{-webkit-transform:scaleY(2);transform:scaleY(2);opacity:1}.mdc-select+.mdc-select-helper-text{margin-right:12px;margin-left:12px}.mdc-select--outlined+.mdc-select-helper-text{margin-right:16px;margin-left:16px}.mdc-select--focused+.mdc-select-helper-text:not(.mdc-select-helper-text--validation-msg){opacity:1}.mdc-select__selected-text{min-width:200px;padding-top:22px}.mdc-select__native-control,.mdc-select__selected-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:56px;padding:20px 52px 4px 16px;border:none;border-bottom:1px solid;outline:none;background-color:transparent;color:inherit;white-space:nowrap;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.mdc-select__native-control[dir=rtl],.mdc-select__selected-text[dir=rtl],[dir=rtl] .mdc-select__native-control,[dir=rtl] .mdc-select__selected-text{padding-left:52px;padding-right:16px}.mdc-select__native-control::-ms-expand,.mdc-select__selected-text::-ms-expand{display:none}.mdc-select__native-control::-ms-value,.mdc-select__selected-text::-ms-value{background-color:transparent;color:inherit}\@-moz-document url-prefix(\"\"){.mdc-select__native-control,.mdc-select__selected-text{text-indent:-2px}}.mdc-select--outlined{border:none;overflow:visible}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.24)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__native-control:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__native-control:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__native-control:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px;border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee)}.mdc-select--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-text-field-outlined .25s 1;animation:mdc-floating-label-shake-float-above-text-field-outlined .25s 1}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl],.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing,[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:0 4px 4px 0}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl],[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:4px 0 0 4px}.mdc-select--outlined .mdc-select__native-control{border-radius:4px}.mdc-select--outlined:after,.mdc-select--outlined:before{content:none}.mdc-select--outlined:not(.mdc-select--disabled){background-color:transparent}.mdc-select--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-144%) scale(1);transform:translateY(-144%) scale(1);font-size:.75rem}.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-130%) scale(.75);transform:translateY(-130%) scale(.75);font-size:1rem}.mdc-select--outlined .mdc-select__native-control,.mdc-select--outlined .mdc-select__selected-text{display:-ms-flexbox;display:flex;padding:12px 52px 12px 16px;border:none;background-color:transparent;z-index:1}.mdc-select--outlined .mdc-select__native-control[dir=rtl],.mdc-select--outlined .mdc-select__selected-text[dir=rtl],[dir=rtl] .mdc-select--outlined .mdc-select__native-control,[dir=rtl] .mdc-select--outlined .mdc-select__selected-text{padding-left:52px;padding-right:16px}.mdc-select--outlined .mdc-select__selected-text{padding-top:14px}.mdc-select--outlined .mdc-select__icon{z-index:2}.mdc-select--outlined .mdc-floating-label{line-height:1.15rem;pointer-events:auto}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__native-control,.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__selected-text{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-line-ripple{background-color:#b00020;background-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:#b00020}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--invalid+.mdc-select-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__native-control:hover{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__native-control:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__native-control:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__native-control:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__selected-text:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px;border-color:#b00020;border-color:var(--mdc-theme-error,#b00020)}.mdc-select--invalid .mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width=\'10\' height=\'5\' viewBox=\'7 10 10 5\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'%23b00020\' fill-rule=\'evenodd\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E\") no-repeat 50%}.mdc-select--invalid+.mdc-select-helper-text--validation-msg{opacity:1}.mdc-select--required .mdc-floating-label:after{content:\"*\"}.mdc-select--disabled{background-color:#fafafa;cursor:default;pointer-events:none}.mdc-select--disabled .mdc-floating-label{color:rgba(0,0,0,.37)}.mdc-select--disabled .mdc-select__dropdown-icon{background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width=\'10\' height=\'5\' viewBox=\'7 10 10 5\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' opacity=\'.37\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E\") no-repeat 50%}.mdc-select--disabled .mdc-line-ripple{display:none}.mdc-select--disabled .mdc-select__icon{color:rgba(0,0,0,.37)}.mdc-select--disabled .mdc-select__native-control,.mdc-select--disabled .mdc-select__selected-text{color:rgba(0,0,0,.37);border-bottom-style:dotted}.mdc-select--disabled .mdc-select__selected-text{pointer-events:none}.mdc-select--disabled.mdc-select--outlined{background-color:transparent}.mdc-select--disabled.mdc-select--outlined .mdc-select__native-control,.mdc-select--disabled.mdc-select--outlined .mdc-select__selected-text{border-bottom-style:none}.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__leading,.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__notch,.mdc-select--disabled.mdc-select--outlined .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.16)}.mdc-select--with-leading-icon .mdc-select__icon{left:16px;right:auto}.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon .mdc-select__icon{left:auto;right:16px}.mdc-select--with-leading-icon .mdc-select__native-control,.mdc-select--with-leading-icon .mdc-select__selected-text{padding-left:48px;padding-right:32px}.mdc-select--with-leading-icon .mdc-select__native-control[dir=rtl],.mdc-select--with-leading-icon .mdc-select__selected-text[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon .mdc-select__native-control,[dir=rtl] .mdc-select--with-leading-icon .mdc-select__selected-text{padding-left:32px;padding-right:48px}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-144%) translateX(-32px) scale(1);transform:translateY(-144%) translateX(-32px) scale(1)}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-144%) translateX(32px) scale(1);transform:translateY(-144%) translateX(32px) scale(1)}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-130%) translateX(-32px) scale(.75);transform:translateY(-130%) translateX(-32px) scale(.75)}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-130%) translateX(32px) scale(.75);transform:translateY(-130%) translateX(32px) scale(.75)}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon .25s 1;animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon .25s 1}.mdc-select--with-leading-icon.mdc-select--outlined[dir=rtl] .mdc-floating-label--shake,[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-rtl .25s 1;animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-rtl .25s 1}.mdc-select--with-leading-icon.mdc-select__menu .mdc-list-item__text,.mdc-select--with-leading-icon.mdc-select__menu .mdc-list-item__text[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select__menu .mdc-list-item__text{padding-left:32px;padding-right:32px}.mdc-select__menu .mdc-list .mdc-list-item--selected{color:#000;color:var(--mdc-theme-on-surface,#000)}.mdc-select__menu .mdc-list .mdc-list-item--selected:after,.mdc-select__menu .mdc-list .mdc-list-item--selected:before{background-color:#000}\@supports not (-ms-ime-align:auto){.mdc-select__menu .mdc-list .mdc-list-item--selected:after,.mdc-select__menu .mdc-list .mdc-list-item--selected:before{background-color:var(--mdc-theme-on-surface,#000)}}.mdc-select__menu .mdc-list .mdc-list-item--selected:hover:before{opacity:.04}.mdc-select__menu .mdc-list .mdc-list-item--selected.mdc-ripple-upgraded--background-focused:before,.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-select__menu .mdc-list .mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}\@-webkit-keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon{0%{-webkit-transform:translateX(-32px) translateY(-130%) scale(.75);transform:translateX(-32px) translateY(-130%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(.5,0,.70173,.49582);animation-timing-function:cubic-bezier(.5,0,.70173,.49582);-webkit-transform:translateX(calc(4% - 32px)) translateY(-130%) scale(.75);transform:translateX(calc(4% - 32px)) translateY(-130%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);-webkit-transform:translateX(calc(-4% - 32px)) translateY(-130%) scale(.75);transform:translateX(calc(-4% - 32px)) translateY(-130%) scale(.75)}to{-webkit-transform:translateX(-32px) translateY(-130%) scale(.75);transform:translateX(-32px) translateY(-130%) scale(.75)}}\@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon{0%{-webkit-transform:translateX(-32px) translateY(-130%) scale(.75);transform:translateX(-32px) translateY(-130%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(.5,0,.70173,.49582);animation-timing-function:cubic-bezier(.5,0,.70173,.49582);-webkit-transform:translateX(calc(4% - 32px)) translateY(-130%) scale(.75);transform:translateX(calc(4% - 32px)) translateY(-130%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);-webkit-transform:translateX(calc(-4% - 32px)) translateY(-130%) scale(.75);transform:translateX(calc(-4% - 32px)) translateY(-130%) scale(.75)}to{-webkit-transform:translateX(-32px) translateY(-130%) scale(.75);transform:translateX(-32px) translateY(-130%) scale(.75)}}\@-webkit-keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-rtl{0%{-webkit-transform:translateX(32px) translateY(-130%) scale(.75);transform:translateX(32px) translateY(-130%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(.5,0,.70173,.49582);animation-timing-function:cubic-bezier(.5,0,.70173,.49582);-webkit-transform:translateX(calc(4% - -32px)) translateY(-130%) scale(.75);transform:translateX(calc(4% - -32px)) translateY(-130%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);-webkit-transform:translateX(calc(-4% - -32px)) translateY(-130%) scale(.75);transform:translateX(calc(-4% - -32px)) translateY(-130%) scale(.75)}to{-webkit-transform:translateX(32px) translateY(-130%) scale(.75);transform:translateX(32px) translateY(-130%) scale(.75)}}\@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-rtl{0%{-webkit-transform:translateX(32px) translateY(-130%) scale(.75);transform:translateX(32px) translateY(-130%) scale(.75)}33%{-webkit-animation-timing-function:cubic-bezier(.5,0,.70173,.49582);animation-timing-function:cubic-bezier(.5,0,.70173,.49582);-webkit-transform:translateX(calc(4% - -32px)) translateY(-130%) scale(.75);transform:translateX(calc(4% - -32px)) translateY(-130%) scale(.75)}66%{-webkit-animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);-webkit-transform:translateX(calc(-4% - -32px)) translateY(-130%) scale(.75);transform:translateX(calc(-4% - -32px)) translateY(-130%) scale(.75)}to{-webkit-transform:translateX(32px) translateY(-130%) scale(.75);transform:translateX(32px) translateY(-130%) scale(.75)}}:host{z-index:9999}:host label.mdc-floating-label.mdc-floating-label--float-above{color:grey!important}:host .mdc-floating-label{color:grey}:host .mdc-select{min-width:25em}\@media only screen and (max-width:780px){:host .mdc-select{min-width:20em;width:80%}}"; },
                    enumerable: true,
                    configurable: true
                });
                return DemoSelectComponent;
            }());
            exports('o_demo_bar_select', DemoSelectComponent);
        }
    };
});
