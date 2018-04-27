import { TestWindow } from '@stencil/core/testing';
import { DemoFabComponent } from './o-demo-fab';



describe('app-home', () => {

  it('should update', async () => {
    await window.flush();
  });


  let window: TestWindow;
  beforeEach(async () => {
    window = new TestWindow();
    let element = await window.load({
      components: [DemoFabComponent],
      html: '<o-demo-fab></o-demo-fab>'
    });
  });
});
