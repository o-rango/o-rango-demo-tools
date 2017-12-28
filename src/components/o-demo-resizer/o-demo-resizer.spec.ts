import { flush, render } from '@stencil/core/testing';
import { DemoResizerComponent } from './o-demo-resizer';

describe('o-demo-resizer', () => {
  it('should build', () => {
    expect(new DemoResizerComponent()).toBeTruthy();
  });


  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DemoResizerComponent],
        html: '<o-demo-resizer></o-demo-resizer>'
      });
    });
  });
});
