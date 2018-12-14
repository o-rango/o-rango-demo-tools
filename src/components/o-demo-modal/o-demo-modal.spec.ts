import { flush, render } from '@stencil/core/testing';
import { DemoCaseComponent } from './o-demo-case';

describe('o-demo-case', () => {
  var element;

  it('should build', () => {
    expect(new DemoCaseComponent()).toBeTruthy();
  });

  beforeEach(async () => {
     element = await render({
      components: [DemoCaseComponent],
      html: '<o-demo-case name="Placeholders Square Avatar" ></o-demo-case>'
    });
  });

  it('Should have name prop defined when we pass it', async () => {
    await flush(element);
    expect( element.name ).toEqual('Placeholders Square Avatar');
  });
});
