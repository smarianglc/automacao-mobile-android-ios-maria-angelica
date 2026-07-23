const { config: sharedConfig } = require('../wdio.shared.conf.js');

// Execução em dispositivos iOS reais na nuvem do BrowserStack.
// Requer as variáveis de ambiente:
//   BROWSERSTACK_USER, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_IOS_APP_ID
exports.config = {
    ...sharedConfig,

    specs: ['../../test/specs/**/*.spec.js'],
    // Não é necessário excluir o cenário de webview aqui: o próprio spec
    // (01.navigation.tabbar.spec.js) só registra aquele teste quando `driver.isAndroid`.

    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],

    capabilities: [
        {
            platformName: 'iOS',
            // A maioria dos planos trial/gratuitos do BrowserStack só libera 1 sessão em
            // paralelo. Ajuste via BROWSERSTACK_MAX_INSTANCES se o seu plano permitir mais.
            'wdio:maxInstances': Number(process.env.BROWSERSTACK_MAX_INSTANCES) || 1,
            'appium:app': process.env.BROWSERSTACK_IOS_APP_ID,
            'appium:automationName': 'XCUITest',
            'bstack:options': {
                deviceName: process.env.BROWSERSTACK_IOS_DEVICE || 'iPhone 15',
                osVersion: process.env.BROWSERSTACK_IOS_OS_VERSION || '17',
                projectName: 'native-demo-app',
                buildName: `ios-${process.env.CI_PIPELINE_ID || 'local'}`,
                sessionName: 'Automacao mobile iOS',
                debug: true,
                networkLogs: true,
            },
        },
    ],
};
