const { config: sharedConfig } = require('../wdio.shared.conf.js');

// Execução em dispositivos Android reais na nuvem do BrowserStack.
// Requer as variáveis de ambiente:
//   BROWSERSTACK_USER, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_APP_ID
// BROWSERSTACK_APP_ID é o "app_url" (bs://<hash>) retornado ao subir o app com
// a BrowserStack App Automate Upload API.
exports.config = {
    ...sharedConfig,

    specs: ['../../test/specs/**/*.spec.js'],

    user: process.env.BROWSERSTACK_USER,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],

    capabilities: [
        {
            platformName: 'Android',
            'appium:app': process.env.BROWSERSTACK_APP_ID,
            'appium:automationName': 'UiAutomator2',
            'bstack:options': {
                deviceName: process.env.BROWSERSTACK_ANDROID_DEVICE || 'Google Pixel 8',
                osVersion: process.env.BROWSERSTACK_ANDROID_OS_VERSION || '14.0',
                projectName: 'native-demo-app',
                buildName: `android-${process.env.CI_PIPELINE_ID || 'local'}`,
                sessionName: 'Automacao mobile Android',
                debug: true,
                networkLogs: true,
            },
        },
    ],
};
