import { flush, render } from '@stencil/core/testing';
import { DemoBarComponent } from './o-demo-bar';

describe('my-component', () => {
  it('should build', () => {
    expect(new DemoBarComponent()).toBeTruthy();
  });
});
