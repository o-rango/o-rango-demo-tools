import { flush, render } from '@stencil/core/testing';
import { DemoButtonsComponent } from './o-demo-bar-buttons';

describe('o-demo-bar-buttons', () => {
  it('should build', () => {
    expect(new DemoButtonsComponent()).toBeTruthy();
  });


  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DemoButtonsComponent],
        html: '<o-demo-bar-buttons></o-demo-bar-buttons>'
      });
    });
  });
});
