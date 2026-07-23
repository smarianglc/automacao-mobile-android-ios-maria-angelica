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

    // O primeiro boot de um simulador (antes de qualquer app rodar nele) pode passar
    // fácil de 2 minutos - o padrão do wdio.shared.conf.js é curto demais pra isso e
    // derrubava a criação da sessão por timeout do lado do cliente antes do Appium
    // conseguir terminar de bootar o simulador.
    connectionRetryTimeout: 300000,

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
            // Dá mais margem para o primeiro boot do simulador (o padrão do Appium, 120s,
            // não é suficiente na primeira vez que um simulador novo é usado na máquina)
            'appium:simulatorStartupTimeout': 300000,
            // Necessário para a detecção do contexto de webview no cenário de webview
            'appium:webviewConnectTimeout': 20 * 1000,
            'appium:additionalWebviewBundleIds': ['*'],
            // Evita perda de teclas ao digitar em campos de texto no simulador
            'appium:maxTypingFrequency': 30,
        },
    ],
};
