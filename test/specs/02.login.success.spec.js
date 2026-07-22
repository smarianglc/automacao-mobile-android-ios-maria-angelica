const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const LoginPage = require('../pageobjects/login.page');
const NativeAlert = require('../pageobjects/components/nativeAlert.component');

describe('Login, ao informar credenciais válidas,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginPage.waitForIsShown(true);
        await LoginPage.tapOnLoginTab();
    });

    it('deve autenticar com sucesso e exibir o alerta de confirmação', async () => {
        await LoginPage.submitLoginForm({ email: 'test@webdriver.io', password: 'Test1234!' });

        await NativeAlert.waitForIsShown(true);
        const alertText = await NativeAlert.text();

        expect(alertText).to.include('Success');
        expect(alertText).to.include('You are logged in!');

        await NativeAlert.tapOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });
});
