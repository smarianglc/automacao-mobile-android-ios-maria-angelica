const fs = require('node:fs');
const path = require('node:path');
const allure = require('@wdio/allure-reporter').default;

const ALLURE_RESULTS_DIR = path.join(process.cwd(), 'allure-results');
const SCREENSHOTS_DIR = path.join(process.cwd(), 'screenshots');

exports.config = {
    //
    // ====================
    // Test files (sobrescrito pelas configs específicas de plataforma)
    // ====================
    specs: [],
    capabilities: [],

    //
    // ===================
    // Configurações gerais
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 3 * 60 * 1000,
    },

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                addConsoleLogs: true,
            },
        ],
    ],

    //
    // =====
    // Hooks
    // =====
    onPrepare: function (config, capabilities) {
        if (!fs.existsSync(ALLURE_RESULTS_DIR)) {
            fs.mkdirSync(ALLURE_RESULTS_DIR, { recursive: true });
        }

        // Informações do ambiente de teste, exibidas no Allure Report
        const cap = Array.isArray(capabilities) ? capabilities[0] : capabilities;
        const environment = {
            'Node.js': process.version,
            Plataforma: cap?.platformName || 'N/A',
            Dispositivo: cap?.['appium:deviceName'] || 'N/A',
            'Versao da plataforma': cap?.['appium:platformVersion'] || 'N/A',
            'Automation Name': cap?.['appium:automationName'] || 'N/A',
            Executor: process.env.CI ? 'GitLab CI/CD' : 'Local',
        };
        const envContent = Object.entries(environment)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
        fs.writeFileSync(path.join(ALLURE_RESULTS_DIR, 'environment.properties'), envContent);
    },

    before: async function (capabilities) {
        // Reduz o timeout padrão da estratégia UiSelector no Android (10s -> 3s)
        if (driver.isAndroid) {
            await driver.updateSettings({ waitForSelectorTimeout: 3 * 1000 });
        }
    },

    // Screenshot automático sempre que um teste falha, anexado também ao Allure Report
    afterTest: async function (test, context, { error, passed }) {
        if (!passed) {
            if (!fs.existsSync(SCREENSHOTS_DIR)) {
                fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
            }

            const safeName = `${test.parent}-${test.title}`
                .replace(/[^a-z0-9]+/gi, '_')
                .toLowerCase();
            const filePath = path.join(SCREENSHOTS_DIR, `${safeName}-${Date.now()}.png`);

            await browser.saveScreenshot(filePath);
            allure.addAttachment('Screenshot da falha', fs.readFileSync(filePath), 'image/png');

            if (error) {
                allure.addAttachment('Stack trace', error.stack || error.message, 'text/plain');
            }
        }
    },
};
