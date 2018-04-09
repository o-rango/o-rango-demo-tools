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

  it('init test for mobiles', async () => {
    element.size = "1024";
    element.viewport ="desktop";
    await flush(element);
    expect( element.viewport ).toEqual('desktop');
  });
  });
});
