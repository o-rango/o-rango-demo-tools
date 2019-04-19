System.register(['./orango-demo-tools-a1d349ad.js'], function (exports, module) {
    'use strict';
    var registerInstance;
    return {
        setters: [function (module) {
                registerInstance = module.c;
            }],
        execute: function () {
            var DemoCaseComponent = /** @class */ (function () {
                function DemoCaseComponent(hostRef) {
                    registerInstance(this, hostRef);
                }
                return DemoCaseComponent;
            }());
            exports('o_demo_case', DemoCaseComponent);
        }
    };
});