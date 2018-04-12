import { flush, render } from '@stencil/core/testing';
import { DemoDevicesComponent } from './o-demo-devices';

describe('o-demo-bar-buttons', () => {
  it('should build', () => {
    expect(new DemoDevicesComponent()).toBeTruthy();
  });


  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DemoDevicesComponent],
        html: '<o-demo-devices></o-demo-devices>'
      });
    });
  });
});
