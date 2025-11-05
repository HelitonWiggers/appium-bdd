import { Before, After } from '@wdio/cucumber-framework';

Before(async () => {
  try {
    await browser.setTimeout({ implicit: 0 });
  } catch (e) {
    console.warn('Não foi possível setar implicit timeout, seguindo sem alterar.', e.message)
  }
})

After(async () => {
  try { await browser.back(); } catch {}
})
