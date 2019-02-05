import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-bar></o-demo-bar>');
    const element = await page.find('o-demo-bar');
    expect(element).toHaveClass('hydrated');
  });
});
