const CONTEXT_REF = { NATIVE_APP: 'NATIVE_APP' };
const DOCUMENT_READY_STATE = 'complete';

class WebviewPage {
    /**
     * Espera o contexto de webview ser adicionado à lista de contexts do driver.
     * O app pode ter apenas um webview ativo por vez; o nome do contexto varia
     * a cada execução, então localizamos pelo package (Android) ou bundleId (iOS).
     */
    async waitForWebViewContextAdded() {
        await driver.waitUntil(
            async () => {
                const contexts = await driver.getContexts({
                    returnAndroidDescriptionData: true,
                    returnDetailedContexts: true,
                });

                const appIdentifier = driver.isIOS ? 'process-wdiodemoapp' : await driver.getCurrentPackage();

                return (
                    contexts.length > 1 &&
                    contexts.some((context) => {
                        if (driver.isIOS) {
                            return context.bundleId === appIdentifier && context.url !== 'about:blank';
                        }
                        return context.packageName === appIdentifier && context.androidWebviewData?.empty === false;
                    })
                );
            },
            { timeout: 45000, timeoutMsg: 'Contexto de webview não carregou', interval: 100 },
        );
    }

    async waitForDocumentFullyLoaded() {
        await driver.waitUntil(
            async () => (await driver.execute(() => document.readyState)) === DOCUMENT_READY_STATE,
            { timeout: 15000, timeoutMsg: 'Website não carregou', interval: 100 },
        );
    }

    async waitForWebsiteLoaded() {
        await this.waitForWebViewContextAdded();
        await driver.switchContext({ title: /WebdriverIO.*/, url: 'https://webdriver.io/' });
        await this.waitForDocumentFullyLoaded();
        await driver.switchContext(CONTEXT_REF.NATIVE_APP);
    }
}

module.exports = { WebviewPage: new WebviewPage(), CONTEXT_REF };
