const path = require('node:path');
const { config: sharedConfig } = require('./wdio.shared.conf.js');

// Caminho do .apk. Baixe em https://github.com/webdriverio/native-demo-app/releases
// e ajuste ANDROID_APP_PATH se o nome do arquivo for diferente.
const ANDROID_APP_PATH =
    process.env.ANDROID_APP_PATH || path.join(process.cwd(), 'apps', 'android.apk');

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
            platformName: 'Android',
            'wdio:maxInstances': 1,
            // Ajuste o nome/versão do emulador conforme o AVD criado localmente (avdmanager/Android Studio)
            'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel_7_API_34',
            'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14.0',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:app': ANDROID_APP_PATH,
            'appium:appPackage': 'com.wdiodemoapp',
            'appium:appActivity': '.MainActivity',
            'appium:newCommandTimeout': 240,
            'appium:autoGrantPermissions': true,
        },
    ],
};
