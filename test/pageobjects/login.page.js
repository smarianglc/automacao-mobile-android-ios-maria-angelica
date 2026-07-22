const AppPage = require('./app.page');

const SELECTOR = '~Login-screen';

class LoginPage extends AppPage {
    constructor() {
        super(SELECTOR);
    }

    get loginTabButton() {
        return $('~button-login-container');
    }

    get signUpTabButton() {
        return $('~button-sign-up-container');
    }

    get loginButton() {
        return $('~button-LOGIN');
    }

    get signUpButton() {
        return $('~button-SIGN UP');
    }

    get emailInput() {
        return $('~input-email');
    }

    get passwordInput() {
        return $('~input-password');
    }

    get repeatPasswordInput() {
        return $('~input-repeat-password');
    }

    get biometricButton() {
        return $('~button-biometric');
    }

    async tapOnLoginTab() {
        await this.loginTabButton.click();
    }

    async tapOnSignUpTab() {
        await this.signUpTabButton.click();
    }

    async dismissKeyboardIfShown() {
        if (await driver.isKeyboardShown()) {
            await $(SELECTOR).click();
        }
    }

    async submitLoginForm({ email, password }) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.dismissKeyboardIfShown();

        await this.loginButton.scrollIntoView({ scrollableElement: await this.screen });
        await this.loginButton.click();
    }

    async submitSignUpForm({ email, password, repeatPassword }) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.repeatPasswordInput.setValue(repeatPassword);
        await this.dismissKeyboardIfShown();

        await this.signUpButton.scrollIntoView({ scrollableElement: await this.screen });
        await this.signUpButton.click();
    }

    /**
     * As mensagens de validação inline (react-native-elements `errorMessage`) não recebem
     * um testID/accessibility id próprio no app, então o texto exibido é o único
     * localizador confiável, com uma estratégia diferente por plataforma.
     */
    errorMessageSelector(message) {
        return driver.isAndroid
            ? `//android.widget.TextView[@text="${message}"]`
            : `-ios predicate string:type == 'XCUIElementTypeStaticText' AND label == '${message}'`;
    }

    async isErrorMessageDisplayed(message) {
        return $(this.errorMessageSelector(message)).isDisplayed();
    }

    async waitForErrorMessage(message) {
        return $(this.errorMessageSelector(message)).waitForDisplayed({ timeout: 5000 });
    }
}

module.exports = new LoginPage();
