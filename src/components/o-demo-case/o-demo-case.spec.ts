import { flush, render } from '@stencil/core/testing';
import { DemoCaseComponent } from './o-demo-case';

describe('my-component', () => {
  it('should build', () => {
    expect(new DemoCaseComponent()).toBeTruthy();
  });

});
