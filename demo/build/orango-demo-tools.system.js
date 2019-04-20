System.register(['./orango-demo-tools-a1d349ad.js'], function (exports, module) {
    'use strict';
    var patchBrowser, defineCustomElements;
    return {
        setters: [function (module) {
                patchBrowser = module.a;
                defineCustomElements = module.b;
            }],
        execute: function () {
            patchBrowser().then(function (resourcesUrl) {
                defineCustomElements(window, { resourcesUrl: resourcesUrl });
            });
        }
    };
});
