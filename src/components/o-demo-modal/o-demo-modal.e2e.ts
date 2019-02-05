import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-modal></o-demo-modal>');
    const element = await page.find('o-demo-modal');
    expect(element).toHaveClass('hydrated');
  });
});
