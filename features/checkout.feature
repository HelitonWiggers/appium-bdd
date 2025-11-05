Feature: Finalização de Compra

  Background:
    Given que tenho "Sauce Labs Backpack" no carrinho

  @principal
  Scenario: Finalizar compra com sucesso
    When inicio o checkout
    And informo os dados "Name" "Lastname" "ZipCode"
    And confirmo a finalização
    Then devo ver a confirmação do pedido

  @alternativo
  Scenario: Finalizar compra com CEP inválido
    When inicio o checkout
    And informo os dados "Name" "Lastname" "ABCDEF"
    And confirmo a finalização
    Then devo ver uma validação de CEP inválido
