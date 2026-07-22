const AppPage = require('./app.page');

class FormsPage extends AppPage {
    constructor() {
        super('~Forms-screen');
    }

    get input() {
        return $('~text-input');
    }

    get inputTextResult() {
        return $('~input-text-result');
    }

    get switchToggle() {
        return $('~switch');
    }

    get switchText() {
        return $('~switch-text');
    }

    get dropDown() {
        return $('~Dropdown');
    }

    get dropDownChevron() {
        return $('~dropdown-chevron');
    }

    get activeButton() {
        return $('~button-Active');
    }

    get inActiveButton() {
        return $('~button-Inactive');
    }

    async typeInInput(text) {
        await this.input.setValue(text);
    }

    async tapOnInputTextResult() {
        await this.inputTextResult.click();
    }

    async dismissKeyboardIfShown() {
        // Ver comentário em login.page.js: driver.hideKeyboard() é instável no iOS,
        // por isso tocamos fora do campo para fechar o teclado.
        if (await driver.isKeyboardShown()) {
            await this.tapOnInputTextResult();
        }
    }

    async tapOnSwitch() {
        await this.switchToggle.click();
    }

    async isSwitchActive() {
        return driver.isAndroid
            ? (await this.switchToggle.getAttribute('checked')) === 'true'
            : (await this.switchToggle.getText()) === '1';
    }

    async tapOnDropDown() {
        // No iOS o toque no dropdown completo não funciona, é necessário tocar no chevron
        if (driver.isIOS) {
            return this.dropDownChevron.click();
        }
        return this.dropDown.click();
    }

    async getDropDownText() {
        const selector = driver.isAndroid
            ? '//*[@content-desc="Dropdown"]//android.widget.EditText'
            : "-ios class chain:**/*[`name == \"Dropdown\"`]/**/*[`name == \"text_input\"`]";

        return $(selector).getText();
    }

    async tapOnActiveButton() {
        await this.activeButton.scrollIntoView({ maxScrolls: 2, scrollableElement: await this.screen });
        await this.activeButton.click();
    }

    async tapOnInActiveButton() {
        await this.inActiveButton.scrollIntoView({ maxScrolls: 2, scrollableElement: await this.screen });
        await this.inActiveButton.click();
    }
}

module.exports = new FormsPage();
