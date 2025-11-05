import { Given, When, Then, Before } from '@wdio/cucumber-framework'
import LoginPage from '../pages/LoginPage.js'
import ProductsPage from '../pages/ProductsPage.js'
import CartPage from '../pages/CartPage.js'

const VALID_USER = 'bob@example.com'
const VALID_PASS = '10203040'

let loginPage, productsPage, cartPage

Before(async () => {
  loginPage = new LoginPage()
  productsPage = new ProductsPage()
  cartPage = new CartPage()
})

Given(/^que estou autenticado e na tela de produtos$/, async () => {
  await loginPage.login(VALID_USER, VALID_PASS)
  await productsPage.aguardarCarregar()
})

When(/^adiciono o produto "([^"]*)"$/, async (produto) => {
  await productsPage.adicionarProdutoPorNome(produto)
})

When(/^abro o carrinho$/, async () => {
  await productsPage.abrirCarrinho()
})

Then(/^o carrinho deve conter o produto "([^"]*)"$/, async (produto) => {
  await cartPage.aguardarCarregar()
  const tem = await cartPage.temProduto(produto)
  expect(tem).toBe(true)
})

When(/^tento adicionar o produto "([^"]*)"$/, async (produto) => {
  await productsPage.adicionarProdutoPorNome(produto)
})

Then(/^devo ver uma indicação de indisponibilidade$/, async () => {
  const qtd = await productsPage.getQtdBadgeCarrinho()
  expect(qtd).toBe(0)
})

Given(/^que tenho "([^"]*)" no carrinho$/, async (produto) => {
  await loginPage.login(VALID_USER, VALID_PASS)
  await productsPage.aguardarCarregar()
  await productsPage.adicionarProdutoPorNome(produto)
  await productsPage.abrirCarrinho()
  const tem = await cartPage.temProduto(produto)
  expect(tem).toBe(true)
})
