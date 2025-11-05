import { When, Then, Before } from '@wdio/cucumber-framework'
import CartPage from '../pages/CartPage.js'
import CheckoutPage from '../pages/CheckoutPage.js'

let cartPage, checkoutPage

Before(async () => {
  cartPage = new CartPage()
  checkoutPage = new CheckoutPage()
})

When(/^inicio o checkout$/, async () => {
  await cartPage.aguardarCarregar()
  await cartPage.iniciarCheckout()
})

When(/^informo os dados "([^"]*)" "([^"]*)" "([^"]*)"$/, async (nome, sobrenome, cep) => {
  await checkoutPage.preencherEndereco({ first: nome, last: sobrenome, zip: cep })
})

When(/^confirmo a finalização$/, async () => {
  await checkoutPage.revisarPedido()
  await checkoutPage.finalizarPedido()
})

Then(/^devo ver a confirmação do pedido$/, async () => {
  const ok = await checkoutPage.pedidoConcluido()
  expect(ok).toBe(true)
})

Then(/^devo ver uma validação de CEP inválido$/, async () => {
  let aindaNoEndereco = false
  try {
    await checkoutPage.findFirstDisplayed(checkoutPage.firstNameCandidates, 4000)
    aindaNoEndereco = true
  } catch {
    aindaNoEndereco = false
  }
  expect(aindaNoEndereco).toBe(true)
})
