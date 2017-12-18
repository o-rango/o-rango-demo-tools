import { flush, render } from '@stencil/core/testing';
import { DemoToolbarComponent } from './o-demo-bar-toolbar';

describe('my-component', () => {
  it('should build', () => {
    expect(new DemoToolbarComponent()).toBeTruthy();
  });

});
