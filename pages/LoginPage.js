export default class LoginPage {
  userCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/nameET',
    "~Username",
    "//*[@content-desc='Username input field']",
    "//android.widget.EditText[contains(@text,'Username') or contains(@hint,'Username')]",
    "(//android.widget.EditText)[1]"
  ]

  passCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/passwordET',
    "~Password",
    "//*[@content-desc='Password input field']",
    "//android.widget.EditText[contains(@text,'Password') or contains(@hint,'Password')]",
    "(//android.widget.EditText)[2]"
  ]

  loginBtnCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/loginBtn',
    "//*[@text='LOGIN' or @text='Log In' or @text='Sign In']",
    "//*[@content-desc='Login' or @content-desc='Login button']"
  ]

  productsTitleCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/productTV',
    "android=new UiSelector().textContains('Products')",
    "//*[@text='Products' or contains(@text,'Products')]"
  ]

  menuBtnCandidates = [
    'id=com.saucelabs.mydemoapp.android:id/menuIV',
    "~Open navigation menu",
    "//*[@content-desc[contains(.,'menu') or contains(.,'navigation')]]"
  ]

  profileTabCandidates = [
    "~Profile", "~Login",
    "android=new UiSelector().descriptionContains('Profile')",
    "android=new UiSelector().descriptionContains('Login')",
    "android=new UiSelector().textContains('Profile')",
    "android=new UiSelector().textContains('Login')",
    "//*[@content-desc='Profile' or @content-desc='Login']",
    "//*[@text='Profile' or @text='Login']",
    "//*[@resource-id='com.saucelabs.mydemoapp.android:id/bottomNavigationView']//*[contains(@content-desc,'Profile') or contains(@content-desc,'Login') or @text='Profile' or @text='Login']"
  ]

  loginItemCandidates = [
    "android=new UiSelector().textContains('Log In')",
    "android=new UiSelector().textContains('Login')",
    "android=new UiSelector().textContains('Sign In')",
    "android=new UiSelector().textContains('Entre')"
  ]

  logoutItemCandidates = [
    "android=new UiSelector().textContains('Log Out')",
    "android=new UiSelector().textContains('Logout')",
    "android=new UiSelector().textContains('Sair')"
  ]

  logoutConfirmCandidates = [
    "//*[@text='LOG OUT' or @text='OK' or @resource-id='android:id/button1']"
  ]

  async findFirstDisplayed(cands, timeoutMs = 8000, perTry = 800) {
    const start = Date.now()
    while (Date.now() - start < timeoutMs) {
      for (const sel of cands) {
        try {
          const el = await $(sel);
          await el.waitForDisplayed({ timeout: perTry })
          return el
        } catch (_) {}
      }
    }
    throw new Error(`Nenhum locator visível entre: ${cands.join(' | ')}`)
  }

  async isAnyVisible(cands, perTry = 1200) {
    for (const sel of cands) {
      try {
        const el = await $(sel);
        await el.waitForDisplayed({ timeout: perTry });
        return true
      } catch (_) {}
    }
    return false
  }

  async tapFirstVisible(cands, perTry = 1500) {
    for (const sel of cands) {
      try {
        const el = await $(sel)
        await el.waitForDisplayed({ timeout: perTry })
        await el.click()
        return true
      } catch (_) {}
    }
    return false
  }

  async abrirMenu() {
    if (await this.tapFirstVisible(this.menuBtnCandidates, 1200)) return
    try {
      await browser.touchAction([
        { action: 'press', x: 550, y: 300 },
        { action: 'moveTo', x: 550, y: 1000 },
        'release',
      ])
    } catch {}
    if (await this.tapFirstVisible(this.menuBtnCandidates, 1500)) return

    throw new Error('Não encontrei o botão de menu (hamburger).')
  }

  async naTelaProdutos() {
    return this.isAnyVisible(this.productsTitleCandidates, 1200)
  }

  async irParaTelaLoginViaBottomTab() {
    if (await this.isAnyVisible(this.userCandidates, 600)) return true;
    const tocou = await this.tapFirstVisible(this.profileTabCandidates, 1200)
    if (tocou) {
      try {
        await this.findFirstDisplayed(this.userCandidates, 12000)
        return true
      } catch {}
    }
    return false
  }

  async irParaTelaLoginViaMenu() {
    try { await this.abrirMenu(); } catch { return false; }

    if (await this.tapFirstVisible(this.loginItemCandidates, 1200)) {
      await this.findFirstDisplayed(this.userCandidates, 12000)
      return true;
    }

    if (await this.tapFirstVisible(this.logoutItemCandidates, 1000)) {
      await this.tapFirstVisible(this.logoutConfirmCandidates, 800).catch(() => {})
      try { await this.abrirMenu(); } catch {}
      if (await this.tapFirstVisible(this.loginItemCandidates, 1500)) {
        await this.findFirstDisplayed(this.userCandidates, 12000)
        return true
      }
    }

    if (await this.isAnyVisible(this.userCandidates, 800)) return true
    return false
  }

  async irParaTelaLogin() {
    if (await this.irParaTelaLoginViaBottomTab()) return
    if (await this.irParaTelaLoginViaMenu()) return
    if (await this.isAnyVisible(this.userCandidates, 800)) return
    throw new Error('Não consegui navegar até a tela de Login.')
  }

  async preencherUsuario(u) {
    const el = await this.findFirstDisplayed(this.userCandidates, 15000)
    await el.setValue(u)
  }

  async preencherSenha(s) {
    const el = await this.findFirstDisplayed(this.passCandidates, 15000)
    await el.setValue(s)
  }

  async clicarEntrar() {
    const el = await this.findFirstDisplayed(this.loginBtnCandidates, 15000)
    await el.click()
  }

  async login(u, s) {
    await this.irParaTelaLogin()
    await this.preencherUsuario(u)
    await this.preencherSenha(s)
    await this.clicarEntrar()
  }

  async validarProdutosVisiveis() {
    try {
      await this.findFirstDisplayed(this.productsTitleCandidates, 10000)
      return true
    } catch { return false; }
  }

  async validarMensagemErro() {
    const errorCandidates = [
      'id=com.saucelabs.mydemoapp.android:id/errorTV',
      "//*[@text[contains(.,'Sorry') or contains(.,'error') or contains(.,'Invalid')]]"
    ];
    return this.isAnyVisible(errorCandidates, 4000)
  }
}
