import { a as patchBrowser, b as defineCustomElements } from './p-2c32137b.js';

patchBrowser().then(resourcesUrl => {
  defineCustomElements(window, { resourcesUrl });
});
