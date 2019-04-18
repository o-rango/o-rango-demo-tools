System.register(['./orango-demo-tools-204882af.js'], function (exports, module) {
    'use strict';
    var registerInstance, createEvent, h;
    return {
        setters: [function (module) {
                registerInstance = module.b;
                createEvent = module.c;
                h = module.d;
            }],
        execute: function () {
            var DemoButtonsComponent = /** @class */ (function () {
                function DemoButtonsComponent(hostRef) {
                    registerInstance(this, hostRef);
                    this.toolbarButtonClicked = createEvent(this, "toolbarButtonClicked", 7);
                }
                DemoButtonsComponent.prototype.handleClick = function (event) {
                    var evt = event.currentTarget.getAttribute('data-btn');
                    this.toolbarButtonClicked.emit(evt);
                };
                DemoButtonsComponent.prototype.render = function () {
                    var _this = this;
                    return (h("div", { class: "toolbar-icons" }, h("button", { "data-btn": "other-devices", onClick: function (event) { return _this.handleClick(event); }, class: "toolbar-button" }, h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V6zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22V12zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1zm-1 10h-4v-8h4v8z" }))), h("button", { "data-btn": "mobile", onClick: function (event) { return _this.handleClick(event); }, class: "toolbar-button" }, h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" }))), h("button", { "data-btn": "desktop", onClick: function (event) { return _this.handleClick(event); }, class: "toolbar-button" }, h("svg", { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" })))));
                };
                Object.defineProperty(DemoButtonsComponent, "originalStyleUrls", {
                    get: function () {
                        return {
                            "$": ["o-demo-bar-buttons.scss"]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoButtonsComponent, "style", {
                    get: function () { return "\@-moz-document url-prefix(){:host .toolbar-icons{margin-top:1em}}:host .toolbar-button:focus{outline:none}:host .toolbar-button{-webkit-transition:all .2s ease;transition:all .2s ease;cursor:pointer;outline:none;background:none;border:none}:host .toolbar-button svg{fill:var(--o-demo-bar-buttons-color,#494949)}:host .toolbar-button.active svg{fill:var(--o-demo-bar-buttons-color,#8e8e8e)}"; },
                    enumerable: true,
                    configurable: true
                });
                return DemoButtonsComponent;
            }());
            exports('o_demo_bar_buttons', DemoButtonsComponent);
        }
    };
});
