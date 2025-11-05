# 🤖 Testes Automatizados Mobile (Android) - My Demo App

Este projeto foi desenvolvido como **parte do desafio técnico para Automatizador de Testes Sênior**, atendendo às exigências de configuração, estrutura e execução de testes automatizados mobile em **JavaScript**, utilizando **Appium**, **WebdriverIO** e **Cucumber (BDD)**.

---

## 🧱 Parte 1 - Configuração do Ambiente e Estrutura

### ⚙️ Configuração do Ambiente

O ambiente de testes foi preparado para execução de testes **mobile Android** com o **Appium 2.x**, integrando com o **WebdriverIO 9** e o **Cucumber.js**.

#### Principais Tecnologias Utilizadas

- Node.js 20+
- Appium 2.x (Server e Client)
- WebdriverIO 9.x
- @wdio/cucumber-framework
- Android SDK + AVD
- Allure Reports (para relatórios de testes)
- Estrutura baseada em Page Object Model (POM)

#### 📱 Dispositivo Utilizado

- **Emulador Android**: Pixel 6 (x86_64)
- **Versão do Android**: 13 (API Level 33)
- **App testado**: `my-demo-app.apk` (da SauceLabs)
- O arquivo APK está incluso no repositório, dentro da pasta do projeto.

---


📘 A arquitetura segue o padrão **Page Object**, garantindo isolamento da lógica de UI, manutenção facilitada e reuso de código entre cenários.

---

## 🧪 Parte 2 - Desenvolvimento dos Testes Mobile

### 🔐 Login e Logout

- Login com credenciais válidas  
- Login com credenciais inválidas  
- Exibição de mensagem de erro  
- Logout após login bem-sucedido  

### 🛒 Carrinho de Compras

- Adicionar produto existente ao carrinho  
- Verificar exibição e quantidade de itens  
- Tentar adicionar item inexistente (cenário negativo)  

### 💳 Finalização da Compra

- Preenchimento dos dados de checkout  
- Validação de campos obrigatórios  
- Confirmação de compra concluída  

---

## ▶️ Como Executar os Testes

### Pré-requisitos

- Node.js 18 ou superior  
- Appium Server 2.x  
  ```bash
  npm install -g appium

Android SDK e emulador configurados
Variável de ambiente ANDROID_HOME configurada
APK my-demo-app.apk presente na raiz do projeto

# Instalar dependências
npm install

# Executar todos os testes
npx wdio run wdio.conf.mjs

# Executar feature específica
npx wdio run wdio.conf.mjs --spec ./features/login.feature

🧠 Estratégia de Automação

BDD (Behavior Driven Development) com cenários legíveis e colaborativos
Page Object Model (POM) para modularidade e reutilização
Waits explícitos e estáveis, reduzindo flakiness
Hooks globais para inicialização, limpeza e resets entre cenários
Validação de fluxos positivos e negativos para robustez
Seletores híbridos (ID, XPath e Accessibility ID) para compatibilidade entre devices


🧩 Limitações e Considerações Técnicas

O desafio original sugeria uso de Maven, porém Maven é nativo de Java — no ecossistema Node.js, o equivalente é o package.json + npm scripts, o que foi corretamente adotado.
A integração com fazendas de devices (Farms), como BrowserStack ou SauceLabs, requer configurações adicionais de capabilities e wdio.conf.mjs e planos pagos, por isso opção via VSCode e Android Studio (alteração de hostname, user e key).
✅ O projeto é compatível, mas necessita Appium Grid ou serviços externos com suporte a WebdriverIO 9.
⚠️ Alguns farms ainda não oferecem suporte completo ao Appium 2.x + WDIO v9, o que pode exigir downgrade para Appium 1.22.
Em emuladores lentos, há risco de falhas intermitentes (flaky tests) — mitigado com waits explícitos e fallback de seletores.

🚀 Melhorias Sugeridas

 Integração contínua (CI/CD) com GitHub Actions
 Publicação automática do Allure Report após cada execução
 Suporte a iOS e dispositivos físicos via USB
 Adição de mocks de API e massas dinâmicas de teste
 Testes em diferentes versões do Android (API 29–34)
 Uso de Appium Inspector para atualização dinâmica de seletores

✨ Pontos de Destaque do Projeto
✅ Estrutura POM + BDD clara e reutilizável
✅ Steps descritivos e legíveis em português
✅ Configuração de ambiente 100% funcional e documentada
✅ Testes positivos e negativos cobrindo fluxo real de usuário
✅ Compatibilidade com Appium 2.x e WebdriverIO 9
✅ Código limpo, modular e orientado a boas práticas de QA Automation
