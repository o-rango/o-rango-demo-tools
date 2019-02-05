import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-bar-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-bar-toolbar></o-demo-bar-toolbar>');
    const element = await page.find('o-demo-bar-toolbar');
    expect(element).toHaveClass('hydrated');
  });
});
