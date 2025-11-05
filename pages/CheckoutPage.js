export default class CheckoutPage {
  firstNameCandidates = [
    "//*[@text='First Name' or contains(@hint,'First') or contains(@text,'First')]",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/firstNameET']",
    "(//android.widget.EditText)[1]"
  ]
  lastNameCandidates = [
    "//*[@text='Last Name' or contains(@hint,'Last') or contains(@text,'Last')]",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/lastNameET']",
    "(//android.widget.EditText)[2]"
  ]
  zipCandidates = [
    "//*[@text='Zip Code' or contains(@hint,'Zip') or contains(@text,'Zip')]",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/zipET']",
    "(//android.widget.EditText)[3]"
  ]

  continueCandidates = [
    "//*[@text='Continue' or @text='CONTINUE']",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/continueBtn']"
  ]

  reviewTitleCandidates = [
    "//*[@text='Review Order' or contains(@text,'Review')]"
  ]

  placeOrderCandidates = [
    "//*[@text='Place Order' or @text='PLACE ORDER']",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/completeTV']"
  ]

  confirmationCandidates = [
    "//*[@text[contains(.,'Thank you') or contains(.,'Order')]]",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/completeTV' and contains(@text,'Thank')]"
  ]

  async findFirstDisplayed(cands, timeoutMs = 8000, perTry = 800) {
    const start = Date.now()
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

  async preencherEndereco({ first, last, zip }) {
    const f = await this.findFirstDisplayed(this.firstNameCandidates, 10000)
    await f.setValue(first);
    const l = await this.findFirstDisplayed(this.lastNameCandidates, 8000)
    await l.setValue(last);
    const z = await this.findFirstDisplayed(this.zipCandidates, 8000)
    await z.setValue(zip);
    const cont = await this.findFirstDisplayed(this.continueCandidates, 8000)
    await cont.click();
  }

  async revisarPedido() {
    await this.findFirstDisplayed(this.reviewTitleCandidates, 10000)
  }

  async finalizarPedido() {
    const btn = await this.findFirstDisplayed(this.placeOrderCandidates, 10000)
    await btn.click();
  }

  async pedidoConcluido() {
    try {
      await this.findFirstDisplayed(this.confirmationCandidates, 10000)
      return true;
    } catch { return false; }
  }
}
