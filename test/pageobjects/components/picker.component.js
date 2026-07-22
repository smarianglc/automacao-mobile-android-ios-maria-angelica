// Componente de dropdown/picker nativo usado na tela de Forms.
const SELECTORS = {
    ANDROID_LISTVIEW: '//android.widget.ListView',
    IOS_PICKERWHEEL: "-ios predicate string:type == 'XCUIElementTypePickerWheel'",
    IOS_DONE_BUTTON: '~done_button',
};

class Picker {
    async waitForIsShown(isShown = true) {
        const selector = driver.isIOS ? SELECTORS.IOS_PICKERWHEEL : SELECTORS.ANDROID_LISTVIEW;
        await $(selector).waitForExist({ timeout: 11000, reverse: !isShown });
    }

    async selectValue(value) {
        await this.waitForIsShown(true);

        if (driver.isIOS) {
            await $(SELECTORS.IOS_PICKERWHEEL).addValue(value);
            await $(SELECTORS.IOS_DONE_BUTTON).click();
        } else {
            await $(`${SELECTORS.ANDROID_LISTVIEW}/*[@text="${value}"]`).click();
        }

        await this.waitForIsShown(false);
    }
}

module.exports = new Picker();
