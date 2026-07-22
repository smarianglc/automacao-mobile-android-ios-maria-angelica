const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const LoginPage = require('../pageobjects/login.page');
const { invalidEmails } = require('../data/loginValidation.json');

const ERROR_MESSAGE = 'Please enter a valid email address';

describe('Login, ao informar um e-mail em formato inválido,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginPage.waitForIsShown(true);
        await LoginPage.tapOnLoginTab();
    });

    // Cenário data-driven: cada linha de invalidEmails vira um teste independente
    invalidEmails.forEach(({ email, password }) => {
        it(`deve exibir mensagem de erro para o e-mail "${email}"`, async () => {
            await LoginPage.submitLoginForm({ email, password });

            await LoginPage.waitForErrorMessage(ERROR_MESSAGE);

            expect(await LoginPage.isErrorMessageDisplayed(ERROR_MESSAGE)).to.be.true;
        });
    });
});
