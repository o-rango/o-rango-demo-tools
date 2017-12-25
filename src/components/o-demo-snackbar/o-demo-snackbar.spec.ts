import { flush, render } from '@stencil/core/testing';
import { DemoSnackbarComponent } from './o-demo-snackbar';

describe('o-demo-bar-buttons', () => {
  it('should build', () => {
    expect(new DemoSnackbarComponent()).toBeTruthy();
  });


  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [DemoSnackbarComponent],
        html: '<o-demo-snackbar></o-demo-snackbar>'
      });
    });
  });
});
