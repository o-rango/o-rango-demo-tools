import { flush, render } from '@stencil/core/testing';
import { DemoSelectComponent } from './o-demo-bar-select';

describe('my-component', () => {
  it('should build', () => {
    expect(new DemoSelectComponent()).toBeTruthy();
  });
});
