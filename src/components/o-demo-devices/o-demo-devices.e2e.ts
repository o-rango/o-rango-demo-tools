import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-devices', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-devices></o-demo-devices>');
    const element = await page.find('o-demo-devices');
    expect(element).toHaveClass('hydrated');
  });
});
