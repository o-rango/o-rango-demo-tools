import { flush, render } from '@stencil/core/testing';
import { DemoSelectComponent } from './o-demo-bar-select';

describe('my-component', () => {
  it('should build', () => {
    expect(new DemoSelectComponent()).toBeTruthy();
  });


  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DemoSelectComponent],
        html: '<o-demo-bar-select></o-demo-bar-select>'
      });
    });

    it('should work without parameters', async () => {
      debugger;
      expect(element.textContent.trim()).toEqual('Hello, World! I\'m');
      await flush(element);
    });

  });
});
