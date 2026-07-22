const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const LoginPage = require('../pageobjects/login.page');

const ERROR_MESSAGE = 'Please enter the same password';

describe('Cadastro, ao informar senha e confirmação diferentes,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginPage.waitForIsShown(true);
        await LoginPage.tapOnSignUpTab();
    });

    it('deve exibir a mensagem de erro de confirmação de senha', async () => {
        await LoginPage.submitSignUpForm({
            email: 'novo.usuario@webdriver.io',
            password: 'Test1234!',
            repeatPassword: 'OutraSenha1',
        });

        await LoginPage.waitForErrorMessage(ERROR_MESSAGE);

        expect(await LoginPage.isErrorMessageDisplayed(ERROR_MESSAGE)).to.be.true;
    });
});
