const path = require('node:path');
const { config: sharedConfig } = require('./wdio.shared.conf.js');

// Caminho do build para simulador (.zip ou .app). Baixe em
// https://github.com/webdriverio/native-demo-app/releases e ajuste IOS_APP_PATH
// se o nome do arquivo for diferente.
const IOS_APP_PATH = process.env.IOS_APP_PATH || path.join(process.cwd(), 'apps', 'ios-simulator.zip');

exports.config = {
    ...sharedConfig,

    runner: 'local',
    port: 4723,

    specs: ['../test/specs/**/*.spec.js'],

    services: [
        [
            'appium',
            {
                args: {
                    relaxedSecurity: true,
                    log: './logs/appium.log',
                },
            },
        ],
    ],

    capabilities: [
        {
            platformName: 'iOS',
            'wdio:maxInstances': 1,
            // Ajuste o nome/versão do simulador conforme o criado localmente (Xcode > Simulator)
            'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
            'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17.5',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'XCUITest',
            'appium:app': IOS_APP_PATH,
            'appium:newCommandTimeout': 240,
            // Necessário para a detecção do contexto de webview no cenário de webview
            'appium:webviewConnectTimeout': 20 * 1000,
            'appium:additionalWebviewBundleIds': ['*'],
            // Evita perda de teclas ao digitar em campos de texto no simulador
            'appium:maxTypingFrequency': 30,
        },
    ],
};
