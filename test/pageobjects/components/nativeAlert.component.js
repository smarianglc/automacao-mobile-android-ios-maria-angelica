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
            return $(SELECTORS.IOS.ALERT).getText();
        }

        const title = await $(SELECTORS.ANDROID.ALERT_TITLE).getText();
        const message = await $(SELECTORS.ANDROID.ALERT_MESSAGE).getText();
        return `${title}\n${message}`;
    }
}

module.exports = new NativeAlert();
