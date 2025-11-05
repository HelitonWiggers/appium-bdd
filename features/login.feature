Feature: Login e Logout no Mobile

  Background:
    Given que o app está aberto na tela de Login

  @principal
  Scenario: Login válido
    When eu informo usuário e senha válidos
    And toco em Entrar
    Then devo ver a lista de produtos

  @alternativo
  Scenario: Login inválido
    When eu informo usuário "invalido" e senha "errada"
    And toco em Entrar
    Then devo ver uma mensagem de erro de credenciais
