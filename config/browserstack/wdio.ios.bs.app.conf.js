const { config: sharedConfig } = require('../wdio.shared.conf.js');

// Execução em dispositivos iOS reais na nuvem do BrowserStack.
// Requer as variáveis de ambiente:
//   BROWSERSTACK_USER, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_IOS_APP_ID
exports.config = {
    ...sharedConfig,

    specs: ['../../test/specs/**/*.spec.js'],
    // O teste de webview depende de troca de contexto validada apenas para Android nesta suíte
    exclude: ['../../test/specs/**/*.webview.spec.js'],

    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],

    capabilities: [
        {
            platformName: 'iOS',
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
