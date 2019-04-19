var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register(['./orango-demo-tools-a1d349ad.js'], function (exports, module) {
    'use strict';
    var registerInstance, createEvent, h, getElement;
    return {
        setters: [function (module) {
                registerInstance = module.c;
                createEvent = module.d;
                h = module.e;
                getElement = module.f;
            }],
        execute: function () {
            var DemoResizerComponent = /** @class */ (function () {
                function DemoResizerComponent(hostRef) {
                    registerInstance(this, hostRef);
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
                    this.resizeButtonClicked = createEvent(this, "resizeButtonClicked", 7);
                }
                DemoResizerComponent.prototype.handleClick = function (event) {
                    var evt = event.currentTarget.getAttribute('data-size');
                    this.resizeButtonClicked.emit(evt);
                    this.setActiveViewPort(evt);
                };
                DemoResizerComponent.prototype.setActiveViewPort = function (size) {
                    return __awaiter(this, void 0, void 0, function () {
                        var sizeList, activeEl;
                        return __generator(this, function (_a) {
                            sizeList = Array.from(this.el.shadowRoot.querySelectorAll('.item-resize-toolbar'));
                            sizeList.forEach(function (el) {
                                el.classList.remove('active');
                            });
                            activeEl = sizeList.filter(function (el) {
                                return el.getAttribute('data-size') === size;
                            });
                            if (activeEl.length) {
                                activeEl[0].classList.add('active');
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                DemoResizerComponent.prototype.render = function () {
                    var _this = this;
                    var viewports = this.viewport === 'desktop' ? this.desktop : this.mobile;
                    return (h("div", { class: "resize-toolbar-container" }, h("div", { class: "resize-toolbar" }, viewports.map(function (option) {
                        var cssSize = { width: option.size + "px" };
                        return (h("div", { onClick: function (event) { return _this.handleClick(event); }, class: "item-resize-toolbar", style: cssSize, "data-name": option.size, "data-size": option.size }, h("div", { class: "left device-resizer" }, option.size, "px"), h("div", { class: "rigth device-resizer" }, option.size, "px")));
                    }))));
                };
                Object.defineProperty(DemoResizerComponent, "originalStyleUrls", {
                    get: function () {
                        return {
                            "$": ["o-demo-resizer.scss"]
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoResizerComponent.prototype, "el", {
                    get: function () { return getElement(this); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DemoResizerComponent, "style", {
                    get: function () { return ":host .resize-toolbar-container{margin-top:4px;color:#212121;height:16px;white-space:nowrap;font-weight:500;border-top:1px solid #ddd;background:#fff;position:relative}:host .resize-toolbar{position:absolute;left:-100px;right:-100px}:host .item-resize-toolbar{-webkit-box-sizing:border-box;box-sizing:border-box;border-left:1px solid #ddd;border-right:1px solid #ddd;padding:1px;color:#212121;cursor:pointer;font-size:7.5px;font-weight:400;height:16px;left:0;line-height:16px;margin-left:auto;margin-right:auto;position:absolute;right:0}:host .item-resize-toolbar .left{float:left}:host .item-resize-toolbar .rigth{float:right}:host .active{background:rgba(0,0,0,.08)}"; },
                    enumerable: true,
                    configurable: true
                });
                return DemoResizerComponent;
            }());
            exports('o_demo_resizer', DemoResizerComponent);
        }
    };
});
