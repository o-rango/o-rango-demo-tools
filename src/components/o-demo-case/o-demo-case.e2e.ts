import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-case', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-case></o-demo-case>');
    const element = await page.find('o-demo-case');
    expect(element).toHaveClass('hydrated');
  });
});
