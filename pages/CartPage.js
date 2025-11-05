export default class CartPage {
  cartTitleCandidates = [
    "//*[@text='My Cart' or contains(@text,'Cart')]",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/toolbar']//*[@text='Cart' or contains(@text,'Cart')]"
  ]

  productNameInCartXPath = (name) =>
    `//*[@resource-id='com.saucelabs.mydemoapp.android:id/titleTV' and (contains(@text,"${name}") or @text="${name}")]`

  proceedToCheckoutCandidates = [
    "//*[@text='Proceed To Checkout' or @text='PROCEED TO CHECKOUT']",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/checkoutTV']",
    "//*[@content-desc='Proceed To Checkout']"
  ]

  async findFirstDisplayed(cands, timeoutMs = 8000, perTry = 800) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      for (const sel of cands) {
        try {
          const el = await $(sel)
          await el.waitForDisplayed({ timeout: perTry })
          return el;
        } catch (_) {}
      }
    }
    throw new Error('Elemento não encontrado entre candidatos.')
  }

  async aguardarCarregar() {
    await this.findFirstDisplayed(this.cartTitleCandidates, 10000)
  }

  async temProduto(nome) {
    try {
      const el = await $(this.productNameInCartXPath(nome))
      await el.waitForDisplayed({ timeout: 4000 })
      return true;
    } catch { return false; }
  }

  async iniciarCheckout() {
    const btn = await this.findFirstDisplayed(this.proceedToCheckoutCandidates, 8000)
    await btn.click();
  }
}
