export default class BasePage {
  TIMEOUT = 10000

  $(locator) {
    return $(locator)
  }

  async waitAndTap(locator, timeout = this.TIMEOUT) {
    const el = await this.$(locator)
    await el.waitForDisplayed({ timeout })
    await el.click()
    return el
  }

  async waitAndType(locator, value, timeout = this.TIMEOUT, clear = true) {
    const el = await this.$(locator)
    await el.waitForDisplayed({ timeout })
    if (clear) await el.clearValue().catch(() => {});
    await el.setValue(value)
    return el;
  }

  async isVisible(locator, timeout = this.TIMEOUT) {
    try {
      const el = await this.$(locator);
      await el.waitForDisplayed({ timeout })
      return true
    } catch {
      return false
    }
  }

  async firstExisting(selectors, timeout = this.TIMEOUT) {
    for (const sel of selectors) {
      if (await this.isVisible(sel, Math.min(timeout, 2500))) {
        return this.$(sel)
      }
    }
    return this.$(selectors[0])
  }

  byTextContains(txt) {
    return `android=new UiSelector().textContains("${txt}")`;
  }

  siblingButtonNearText(txt, textContains = 'ADD TO CART') {
    return `//*[@text[contains(., "${txt}")]]/ancestor::*[self::android.view.ViewGroup or self::android.widget.LinearLayout][1]//*[contains(translate(@text,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'), "${textContains}")]`;
  }

  async scrollToText(txt, maxSwipes = 6) {
    for (let i = 0; i < maxSwipes; i++) {
      if (await this.isVisible(this.byTextContains(txt), 1200)) return true;
      await driver.touchPerform?.([
        { action: 'press', options: { x: 550, y: 1600 } },
        { action: 'wait', options: { ms: 200 } },
        { action: 'moveTo', options: { x: 550, y: 400 } },
        { action: 'release' },
      ]).catch(async () => {
        await browser.touchAction([
          { action: 'press', x: 550, y: 1600 },
          { action: 'moveTo', x: 550, y: 400 },
          'release',
        ]);
      });
    }
    return false
  }
}