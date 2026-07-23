// Os alertas nativos (Alert.alert do React Native) são renderizados de forma
// bem diferente no Android (Views nativas da plataforma) e no iOS (XCUIElementTypeAlert),
// por isso a necessidade de seletores e lógica específicos por plataforma.
const SELECTORS = {
    ANDROID: {
        ALERT_TITLE: '*//android.widget.TextView[@resource-id="com.wdiodemoapp:id/alert_title"]',
        ALERT_MESSAGE: '*//android.widget.TextView[@resource-id="android:id/message"]',
        ALERT_BUTTON: '*//android.widget.Button[@text="{BUTTON_TEXT}"]',
    },
    IOS: {
        ALERT: "-ios predicate string:type == 'XCUIElementTypeAlert'",
    },
};

class NativeAlert {
    async waitForIsShown(isShown = true) {
        const selector = driver.isAndroid ? SELECTORS.ANDROID.ALERT_TITLE : SELECTORS.IOS.ALERT;

        return $(selector).waitForExist({ timeout: 11000, reverse: !isShown });
    }

    async tapOnButtonWithText(buttonText) {
        const selector = driver.isAndroid
            ? SELECTORS.ANDROID.ALERT_BUTTON.replace('{BUTTON_TEXT}', buttonText.toUpperCase())
            : `~${buttonText}`;

        await $(selector).click();
    }

    async text() {
        if (driver.isIOS) {
            // getText() no elemento Alert inteiro só retorna o título nas versões mais
            // recentes do XCUITest driver/iOS. Buscamos os textos (título + mensagem)
            // individualmente e concatenamos, o que funciona em qualquer versão.
            // Usamos um único XPath (pai->filho) em vez de encadear estratégias diferentes
            // (predicate string + XPath relativo), que o driver não resolve como array.
            const staticTexts = await $$('//XCUIElementTypeAlert//XCUIElementTypeStaticText');
            const texts = [];
            for (let i = 0; i < staticTexts.length; i++) {
                texts.push(await staticTexts[i].getText());
            }
            return texts.filter(Boolean).join('\n');
        }

        const title = await $(SELECTORS.ANDROID.ALERT_TITLE).getText();
        const message = await $(SELECTORS.ANDROID.ALERT_MESSAGE).getText();
        return `${title}\n${message}`;
    }
}

module.exports = new NativeAlert();
