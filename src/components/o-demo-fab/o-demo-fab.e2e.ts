import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-fab', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-fab></o-demo-fab>');
    const element = await page.find('o-demo-fab');
    expect(element).toHaveClass('hydrated');
  });
});
