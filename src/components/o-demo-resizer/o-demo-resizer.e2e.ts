import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-resizer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-resizer></o-demo-resizer>');
    const element = await page.find('o-demo-resizer');
    expect(element).toHaveClass('hydrated');
  });
});
