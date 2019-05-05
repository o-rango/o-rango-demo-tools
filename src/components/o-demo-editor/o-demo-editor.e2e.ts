import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-editor></o-demo-editor>');
    const element = await page.find('o-demo-editor');
    expect(element).toHaveClass('hydrated');
  });
});
