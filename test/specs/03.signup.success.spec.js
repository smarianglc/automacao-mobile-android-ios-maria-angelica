const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const LoginPage = require('../pageobjects/login.page');
const NativeAlert = require('../pageobjects/components/nativeAlert.component');

describe('Cadastro, ao informar dados válidos,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginPage.waitForIsShown(true);
        await LoginPage.tapOnSignUpTab();
    });

    it('deve concluir o cadastro com sucesso e exibir o alerta de confirmação', async () => {
        await LoginPage.submitSignUpForm({
            email: 'novo.usuario@webdriver.io',
            password: 'Test1234!',
            repeatPassword: 'Test1234!',
        });

        await NativeAlert.waitForIsShown(true);
        const alertText = await NativeAlert.text();

        expect(alertText).to.include('Signed Up');
        expect(alertText).to.include('You successfully signed up!');

        await NativeAlert.tapOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });
});
