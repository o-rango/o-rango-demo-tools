System.register(['./orango-demo-tools-a1d349ad.js'], function (exports, module) {
    'use strict';
    var registerInstance, h, getElement;
    return {
        setters: [function (module) {
                registerInstance = module.c;
                h = module.e;
                getElement = module.f;
            }],
        execute: function () {
            var win = window;
            var DemoBarComponent = /** @class */ (function () {
                function DemoBarComponent(hostRef) {
                    registerInstance(this, hostRef);
                    this.codeEditor = '';
                    this.events = '';
                    this.caseOptionSelected = 0;
                    this.pattern = true;
                    this.device = 'desktop';
                    this.deviceSize = '1024';
                    this.deviceEmulate = false;
                }
                // LifeCycle Hooks
                DemoBarComponent.prototype.componentWillLoad = function () {
                    document.body.style.margin = '0';
                    this.demoCases = this.el.querySelectorAll('o-demo-case');
                    this.casesOptions = this._setSelect();
                };
                DemoBarComponent.prototype.componentDidLoad = function () {
                    this.resizeComponent = this.el.shadowRoot.querySelector('o-demo-resizer');
                    this._setIframe();
                    this.setViewPort();
                    this.stencilDevServer();
                };
                DemoBarComponent.prototype.componentDidUpdate = function () {
                    this._setIframe();
                    this.setViewPort();
                };
                // Utils
                DemoBarComponent.prototype.setViewPort = function () {
                    var _this = this;
                    win.requestAnimationFrame(function () { return _this.resizeComponent.setActiveViewPort(_this.deviceSize); });
                };
                DemoBarComponent.prototype.stencilDevServer = function () {
                    var _this = this;
                    if ("WebSocket" in win && win['s-dev-server']) {
                        var ws = new WebSocket("ws://localhost:" + win.location.port + "/");
                        ws.onopen = function () {
                            console.log('reload-content-stencil-server-activated');
                            _this._setIframe();
                            setTimeout(function () {
                                _this.el.forceUpdate();
                            }, 20);
                        };
                    }
                    ;
                };
                DemoBarComponent.prototype.codeEditorChangedHandler = function (event) {
                    console.log('code', event.detail);
                    this._setIframe(event.detail);
                };
                DemoBarComponent.prototype.selectedCaseChangedHandler = function (event) {
                    this.caseOptionSelected = event.detail;
                };
                DemoBarComponent.prototype.toolbarButtonClickedHandler = function (event) {
                    var _this = this;
                    switch (event.detail) {
                        case 'code-editor':
                            this.el.shadowRoot.querySelector('#modal-id').openDialog();
                            document.addEventListener('on-editor-content', function () { console.log(_this.codeEditor); });
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
                        setTimeout(function () {
                            _this.el.forceUpdate();
                            _this.setViewPort();
                        }, 20);
                    }
                };
                DemoBarComponent.prototype.resizeButtonClickedHandler = function (event) {
                    this.el.shadowRoot.querySelector('iframe').width = event.detail;
                    this.deviceSize = event.detail;
                };
                DemoBarComponent.prototype._setSelect = function () {
                    return Array.from(this.demoCases).map(function (item) {
                        return item.getAttribute('name');
                    });
                };
                DemoBarComponent.prototype._cleanIframe = function () {
                    var oldFrame = this.el.shadowRoot.querySelector('iframe');
                    if (oldFrame) {
                        oldFrame.remove();
                    }
                };
                DemoBarComponent.prototype._setIframe = function (code) {
                    var _this = this;
                    win.requestAnimationFrame(function () {
                        _this._cleanIframe();
                        var iframeContainer = _this.el.shadowRoot.querySelector('#iframeContainer');
                        var iframe = document.createElement('iframe');
                        var frameH = Math.max(document.documentElement.clientHeight);
                        var frameW = _this.deviceSize;
                        var htmlContent = code ? code : _this.demoCases[_this.caseOptionSelected].querySelector('template').innerHTML;
                        var html = code ? code : "<html><head></head><style>body{margin:0}</style><body unresolved ontouchstart id=\"frameBody\">" + htmlContent + "</body></html>";
                        iframe.height = frameH.toString() + "px";
                        iframe.width = frameW.toString() + "px";
                        iframe.style.border = 'none';
                        iframeContainer.appendChild(iframe);
                        iframe.contentWindow.document.open();
                        iframe.contentWindow.document.write(html);
                        iframe.contentWindow.document.close();
                        _this.codeEditor = html;
                    });
                };
                DemoBarComponent.prototype.render = function () {
                    var bgClasses = { pattern: this.pattern && !this.deviceEmulate };
                    var deviceClasses = { hide: this.deviceEmulate };
                    // Templates for default view or Mobile View
                    var defaultView = [h("div", { id: "iframeContainer", class: "defaultView" })];
                    var mobileView = [h("o-demo-fab", null), h("o-demo-devices", null, h("div", { id: "iframeContainer", class: "pattern", slot: "screen" }))];
                    return (h("div", { id: "demo-bar" }, this.events.length !== 0 ? h("o-demo-snackbar", { events: this.events }) : null, h("o-demo-bar-toolbar", { name: this.name }, h("o-demo-bar-select", { slot: "center", options: this.casesOptions }), h("o-demo-bar-buttons", { slot: "right" }), h("o-demo-resizer", { class: deviceClasses, size: this.deviceSize, viewport: this.device, slot: "base" })), h("div", { id: "frame-wrap", class: bgClasses }, this.deviceEmulate ? mobileView : defaultView)));
                };
                Object.defineProperty(DemoBarComponent, "originalStyleUrls", {
                    get: function () {
                        return {
                            "$": ["o-demo-bar.scss"]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoBarComponent.prototype, "el", {
                    get: function () { return getElement(this); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoBarComponent, "style", {
                    get: function () { return ":host #iframe-wrap{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;position:relative;vertical-align:middle;z-index:0}:host .hide{display:none}:host o-demo-bar{z-index:999}:host o-demo-devices{margin-top:auto}:host #iframeContainer,:host o-demo-devices{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}:host #iframeContainer{margin:auto}:host #iframeContainer iframe{margin:0;border:0;position:relative;background-color:transparent;z-index:1}:host #iframeContainer.defaultView iframe{height:100vh}:host .bgcolor{background-color:rgba(0,0,0,.04)}:host .pattern{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;width:100%;height:100%;border:none;font:normal 100%/normal Arial,Helvetica,sans-serif;color:#fff;-o-text-overflow:clip;text-overflow:clip;background:-webkit-linear-gradient(45deg,rgba(0,0,0,.0980392) 25%,transparent 0,transparent 75%,rgba(0,0,0,.0980392) 0,rgba(0,0,0,.0980392) 0),-webkit-linear-gradient(45deg,rgba(0,0,0,.0980392) 25%,transparent 0,transparent 75%,rgba(0,0,0,.0980392) 0,rgba(0,0,0,.0980392) 0),#fff;background:-moz-linear-gradient(45deg,rgba(0,0,0,.0980392) 25%,transparent 25%,transparent 75%,rgba(0,0,0,.0980392) 75%,rgba(0,0,0,.0980392) 0),-moz-linear-gradient(45deg,rgba(0,0,0,.0980392) 25%,transparent 25%,transparent 75%,rgba(0,0,0,.0980392) 75%,rgba(0,0,0,.0980392) 0),#fff;background:linear-gradient(45deg,rgba(0,0,0,.0980392) 25%,transparent 0,transparent 75%,rgba(0,0,0,.0980392) 0,rgba(0,0,0,.0980392) 0),linear-gradient(45deg,rgba(0,0,0,.0980392) 25%,transparent 0,transparent 75%,rgba(0,0,0,.0980392) 0,rgba(0,0,0,.0980392) 0),#fff;background-position:0 0,8px 8px;-webkit-background-origin:padding-box;background-origin:padding-box;-webkit-background-clip:border-box;background-clip:border-box;-webkit-background-size:16px 16px;background-size:16px 16px}"; },
                    enumerable: true,
                    configurable: true
                });
                return DemoBarComponent;
            }());
            exports('o_demo_bar', DemoBarComponent);
        }
    };
});
