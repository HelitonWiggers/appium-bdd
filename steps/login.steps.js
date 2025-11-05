import { Given, When, Then, Before } from '@wdio/cucumber-framework'
import LoginPage from '../pages/LoginPage.js'

let loginPage

Before(async () => {
  loginPage = new LoginPage()
})

Given(/^que o app está aberto na tela de Login$/, async () => {
  await loginPage.irParaTelaLogin()
})

When(/^eu informo usuário e senha válidos$/, async () => {
  await loginPage.login('bob@example.com', '10203040')
})

When(/^eu informo usuário "([^"]*)" e senha "([^"]*)"$/, async (u, s) => {
  await loginPage.irParaTelaLogin()
  await loginPage.preencherUsuario(u)
  await loginPage.preencherSenha(s)
});

When(/^toco em Entrar$/, async () => {
  await loginPage.clicarEntrar()
})

Then(/^devo ver a lista de produtos$/, async () => {
  const ok = await loginPage.validarProdutosVisiveis()
  expect(ok).toBe(true)
})

Then(/^devo ver uma mensagem de erro de credenciais$/, async () => {
  const ok = await loginPage.validarMensagemErro()
  expect(ok).toBe(true)
})
