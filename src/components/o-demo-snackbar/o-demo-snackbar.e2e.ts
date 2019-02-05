import { newE2EPage } from '@stencil/core/testing';

describe('o-demo-snackbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<o-demo-snackbar></o-demo-snackbar>');
    const element = await page.find('o-demo-snackbar');
    expect(element).toHaveClass('hydrated');
  });
});
