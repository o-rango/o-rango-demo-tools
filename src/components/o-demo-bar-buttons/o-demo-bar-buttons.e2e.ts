import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-bar-buttons', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-bar-buttons></o-demo-bar-buttons>');
    const element = await page.find('o-demo-bar-buttons');
    expect(element).toHaveClass('hydrated');
  });
});
