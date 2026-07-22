# Automação Mobile — native-demo-app (Android/iOS)

Suíte de testes automatizados para o [`native-demo-app`](https://github.com/webdriverio/native-demo-app), o
aplicativo oficial de demonstração do WebdriverIO, cobrindo login/cadastro, navegação entre telas,
preenchimento de formulários e verificação de mensagens de erro.

## Stack

| Categoria         | Tecnologia                                   |
|-------------------|-----------------------------------------------|
| Linguagem         | JavaScript (Node.js, CommonJS)                |
| Framework         | WebdriverIO v9                                |
| Driver mobile     | Appium (UiAutomator2 / XCUITest)              |
| Test runner       | Mocha                                         |
| Assertions        | Chai                                          |
| Relatórios        | Allure Report                                 |
| Cloud de devices  | BrowserStack App Automate (opcional)          |
| CI/CD             | GitHub Actions                                |

## Estrutura do projeto

```
config/
  wdio.shared.conf.js            # configuração comum (reporters, hooks, screenshot em falha)
  wdio.android.app.conf.js       # execução em emulador Android local
  wdio.ios.app.conf.js           # execução em simulador iOS local
  browserstack/
    wdio.android.bs.app.conf.js  # execução em dispositivo Android real (BrowserStack)
    wdio.ios.bs.app.conf.js      # execução em dispositivo iOS real (BrowserStack)
test/
  pageobjects/                   # Page Object Model (telas + componentes reutilizáveis)
  data/                          # massas de dados para os cenários data-driven (JSON/CSV)
  helpers/                       # utilitários (leitor de CSV)
  specs/                         # os 12 cenários de teste (01 a 12)
apps/                             # coloque aqui os binários .apk / .zip (não versionados)
.github/workflows/mobile-tests.yml  # pipeline de CI/CD
```

## Cenários de teste

| # | Spec | Cobre |
|---|------|-------|
| 01 | `01.navigation.tabbar.spec.js` | Navegação entre todas as telas via tab bar |
| 02 | `02.login.success.spec.js` | Login com credenciais válidas |
| 03 | `03.signup.success.spec.js` | Cadastro com dados válidos |
| 04 | `04.login.invalid.email.spec.js` | Mensagem de erro para e-mail inválido (data-driven, JSON) |
| 05 | `05.login.short.password.spec.js` | Mensagem de erro para senha curta (data-driven, JSON) |
| 06 | `06.signup.password.mismatch.spec.js` | Mensagem de erro de confirmação de senha divergente |
| 07 | `07.forms.textinput.spec.js` | Preenchimento de campo de texto (data-driven, CSV) |
| 08 | `08.forms.switch.spec.js` | Preenchimento/alternância de switch |
| 09 | `09.forms.dropdown.datadriven.spec.js` | Seleção de dropdown (data-driven, JSON) |
| 10 | `10.forms.button.alert.spec.js` | Mensagens de alerta nos botões Active/Inactive |
| 11 | `11.swipe.carousel.spec.js` | Navegação por swipe (carrossel horizontal/vertical) |
| 12 | `12.drag.puzzle.spec.js` | Navegação por gestos de drag and drop |

Os specs 01, 06, 08, 10, 11 e 12 vão além do mínimo pedido (10 cenários), cobrindo também
gestos de swipe/drag e o tratamento de alertas nativos.

## Pré-requisitos

- Node.js 18+ e npm
- Java JDK 11+ (necessário para o Appium/Android SDK)
- [Appium Doctor](https://github.com/appium/appium-doctor) para validar o ambiente:
  `npx appium-doctor --android` / `npx appium-doctor --ios`

### Instalação

```bash
npm install
```

O Appium já é instalado como dependência do projeto e é iniciado automaticamente pelo
`@wdio/appium-service` — não é necessário rodar `appium` manualmente. Porém, como o Appium 2/3
gerencia drivers separadamente do npm, é preciso registrar os drivers uma única vez após o
`npm install`:

```bash
npx appium driver install uiautomator2   # necessário para Android
npx appium driver install xcuitest       # necessário para iOS (macOS)
```

### Baixando o app de demonstração

Baixe os binários mais recentes em
**https://github.com/webdriverio/native-demo-app/releases** e salve em `apps/`:

- `apps/android.apk` — build Android
- `apps/ios-simulator.zip` — build iOS para simulador

Veja detalhes em [apps/README.md](apps/README.md). Caso use outro nome de arquivo, defina as
variáveis de ambiente `ANDROID_APP_PATH` / `IOS_APP_PATH` com o caminho completo.

## Execução em emulador/simulador local

### Android

1. Crie um AVD no Android Studio (ex.: `Pixel_7_API_34`, Android 14) e garanta que
   `ANDROID_HOME`/`ANDROID_SDK_ROOT` estejam exportados no seu shell (aponte para a pasta do SDK,
   normalmente `~/Library/Android/sdk` no macOS).
2. Inicie o emulador (ou deixe o Appium iniciá-lo, se configurado):
   ```bash
   emulator -avd NOME_DO_SEU_AVD &
   adb wait-for-device
   ```
3. Rode:
   ```bash
   npm run test:android
   ```
   Se o seu AVD não for exatamente `Pixel_7_API_34` com Android 14, exporte antes
   `ANDROID_DEVICE_NAME` (nome do AVD) e `ANDROID_PLATFORM_VERSION` (versão que aparece com
   `adb shell getprop ro.build.version.release`) — caso contrário o Appium recusa a sessão com
   `Unable to find an active device or emulator with OS X.X`.

### iOS (necessário macOS + Xcode)

1. Crie/abra um simulador (ex.: `iPhone 15`, iOS 17.5) via Xcode.
2. Rode:
   ```bash
   npm run test:ios
   ```
   Para outro device/versão, exporte `IOS_DEVICE_NAME` e `IOS_PLATFORM_VERSION`.

## Execução no BrowserStack (dispositivos reais)

1. Crie uma conta no [BrowserStack App Automate](https://www.browserstack.com/app-automate) e
   pegue usuário/chave em **Account Settings**.
2. Suba o `.apk`/`.ipa` pela [Upload API](https://www.browserstack.com/docs/app-automate/api-reference/appium/app-upload)
   para obter o `app_url` (`bs://<hash>`):
   ```bash
   curl -u "SEU_USUARIO:SUA_CHAVE" \
     -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
     -F "file=@apps/android.apk"
   ```
3. Exporte as variáveis de ambiente e rode a suíte:
   ```bash
   export BROWSERSTACK_USER=seu_usuario
   export BROWSERSTACK_ACCESS_KEY=sua_chave
   export BROWSERSTACK_APP_ID=bs://hash-retornado-no-upload
   npm run test:android:bstack
   ```
   Para iOS, use `BROWSERSTACK_IOS_APP_ID` e `npm run test:ios:bstack`.

## Evidências e relatórios

- **Screenshots automáticos**: qualquer teste que falhar tem um screenshot salvo em
  `screenshots/` e anexado automaticamente ao relatório Allure (ver hook `afterTest` em
  `config/wdio.shared.conf.js`).
- **Allure Report**: os resultados brutos vão para `allure-results/`. Para gerar e abrir o
  relatório HTML:
  ```bash
  npm run report:generate
  npm run report:open
  ```
  O relatório inclui resumo dos testes, screenshots das falhas, logs de execução (passos do
  WebdriverIO/console) e informações do ambiente (plataforma, dispositivo, versão, executor),
  geradas em `allure-results/environment.properties` pelo hook `onPrepare`.

## CI/CD (GitHub Actions)

O workflow [`.github/workflows/mobile-tests.yml`](.github/workflows/mobile-tests.yml) roda a cada
`push`/`pull request` para `main`, e também pode ser disparado manualmente em **Actions > Mobile
Tests > Run workflow**. Jobs:

- **`test-browserstack-android`** / **`test-browserstack-ios`** — rodam automaticamente em todo
  push/PR, usando dispositivos reais no BrowserStack (não dependem de emulador, por isso funcionam
  em qualquer runner `ubuntu-latest`). Só executam se a variável de repositório
  `BROWSERSTACK_APP_ID` (ou `BROWSERSTACK_IOS_APP_ID`) estiver configurada.
- **`test-android-emulator`** — disparado manualmente (`workflow_dispatch`); baixa o `.apk` da
  última release do `native-demo-app`, sobe um emulador Android de verdade no runner Linux (via
  [`reactivecircus/android-emulator-runner`](https://github.com/ReactiveCircus/android-emulator-runner),
  que usa a virtualização por KVM já disponível nos runners `ubuntu-latest` do GitHub) e roda a
  suíte contra ele.
- **`test-ios-simulator`** — disparado manualmente; roda em `macos-14`, que já vem com Xcode e
  simuladores de iOS pré-instalados, sem precisar de runner próprio.
- **`report`** — junta os resultados (`allure-results`) de qualquer job de teste que tenha
  rodado, gera o Allure Report e publica como artifact do workflow.

### Configurando os segredos/variáveis no GitHub

Em **Settings > Secrets and variables > Actions** do repositório:

- **Secrets** (`Repository secrets`): `BROWSERSTACK_USER`, `BROWSERSTACK_ACCESS_KEY`
- **Variables** (`Repository variables`): `BROWSERSTACK_APP_ID` e/ou `BROWSERSTACK_IOS_APP_ID`
  (o `app_url` retornado pela Upload API, ver seção acima)

Os artifacts gerados (`allure-results-*` e `allure-report`) ficam disponíveis para download na
página de execução do workflow, em **Actions > Mobile Tests > (execução) > Artifacts**.

## Boas práticas adotadas

- **Page Object Model**: cada tela do app tem sua própria classe (`test/pageobjects/*.page.js`),
  com componentes reutilizáveis (`TabBar`, `NativeAlert`, `Picker`) para elementos comuns entre
  telas, evitando duplicação de seletores nos specs.
- **Data-driven**: cenários de e-mail/senha inválidos e opções de dropdown são parametrizados via
  JSON (`test/data/*.json`); o preenchimento de texto é parametrizado via CSV
  (`test/data/formInputs.csv`), lido com o helper `test/helpers/readCsv.js`.
- **Seletores reais**: todos os `accessibility id` e mensagens de validação usados nos Page
  Objects foram conferidos no código-fonte público do `native-demo-app` (ex.: mensagens de erro
  do formulário de login, textos de alerta, ids dos componentes de drag/swipe/forms).
