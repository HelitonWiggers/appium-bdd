export default class ProductsPage {
  productsTitleCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/productTV',
    "//*[@text='Products' or contains(@text,'Products')]"
  ]

  cartBtnCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/cartIV',
    "~Cart",
    "//*[@content-desc='Cart' or @resource-id='com.saucelabs.mydemoapp.android:id/cartIV']"
  ]

  cartBadgeCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/cartTV',
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/cartTV']"
  ]

  productNameXPath = (name) =>
    `//*[@resource-id='com.saucelabs.mydemoapp.android:id/titleTV' and (contains(@text,"${name}") or @text="${name}")]`;

  addToCartBtnRelCandidates = [
    ".//*[@resource-id='com.saucelabs.mydemoapp.android:id/addToCartIV']",
    ".//*[@resource-id='com.saucelabs.mydemoapp.android:id/addToCartTV' or @text='ADD TO CART' or @text='Add To Cart']"
  ]

  async isAnyVisible(cands, perTry = 1200) {
    for (const sel of cands) {
      try {
        const el = await $(sel);
        await el.waitForDisplayed({ timeout: perTry });
        return true;
      } catch (_) {}
    }
    return false;
  }

  async tapFirstVisible(cands, perTry = 1500) {
    for (const sel of cands) {
      try {
        const el = await $(sel);
        await el.waitForDisplayed({ timeout: perTry });
        await el.click();
        return true;
      } catch (_) {}
    }
    return false;
  }

  async findFirstDisplayed(cands, timeoutMs = 8000, perTry = 800) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      for (const sel of cands) {
        try {
          const el = await $(sel);
          await el.waitForDisplayed({ timeout: perTry });
          return el;
        } catch (_) {}
      }
    }
    throw new Error('Elemento não encontrado entre candidatos.');
  }

  async aguardarCarregar() {
    await this.findFirstDisplayed(this.productsTitleCandidates, 12000);
  }

  async abrirCarrinho() {
    const ok = await this.tapFirstVisible(this.cartBtnCandidates, 3000);
    if (!ok) throw new Error('Não consegui abrir o carrinho.');
  }

  async getQtdBadgeCarrinho() {
    for (const sel of this.cartBadgeCandidates) {
      try {
        const el = await $(sel);
        if (await el.isDisplayed()) {
          const txt = await el.getText();
          const n = parseInt(txt, 10);
          return isNaN(n) ? 0 : n;
        }
      } catch (_) {}
    }
    return 0;
  }

  async adicionarProdutoPorNome(nome) {
    let tentativas = 0;
    while (tentativas++ < 6) {
      const elems = await $$(this.productNameXPath(nome));
      if (elems.length) {
        const card = elems[0];
        for (const rel of this.addToCartBtnRelCandidates) {
          const btn = await card.$(rel);
          if (await btn.isExisting()) {
            await btn.click();
            return;
          }
        }
        await card.click();
        const addCand = [
          "//*[@text='ADD TO CART' or @text='Add To Cart']",
          "//*[@resource-id='com.saucelabs.mydemoapp.android:id/addToCartTV']",
          "//*[@resource-id='com.saucelabs.mydemoapp.android:id/addToCartIV']"
        ];
        for (const sel of addCand) {
          const btn = await $(sel);
          if (await btn.isExisting()) {
            await btn.click();
            break;
          }
        }
        await browser.back().catch(() => {});
        return;
      }
      await browser.touchAction([
        { action: 'press', x: 550, y: 1400 },
        { action: 'moveTo', x: 550, y: 400 },
        'release',
      ]);
    }
    throw new Error(`Produto não encontrado: ${nome}`);
  }
}
