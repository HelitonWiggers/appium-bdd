Feature: Navegação e Lançamento de Itens no Carrinho

  Background:
    Given que estou autenticado e na tela de produtos

  @principal
  Scenario: Adicionar item ao carrinho
    When adiciono o produto "Sauce Labs Backpack"
    And abro o carrinho
    Then o carrinho deve conter o produto "Sauce Labs Backpack"

  @alternativo
  Scenario: Adicionar item inexistente
    When tento adicionar o produto "Produto Fantasma"
    Then devo ver uma indicação de indisponibilidade
