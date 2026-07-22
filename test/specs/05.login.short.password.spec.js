const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const LoginPage = require('../pageobjects/login.page');
const { shortPasswords } = require('../data/loginValidation.json');

const ERROR_MESSAGE = 'Please enter at least 8 characters';

describe('Login, ao informar uma senha com menos de 8 caracteres,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openLogin();
        await LoginPage.waitForIsShown(true);
        await LoginPage.tapOnLoginTab();
    });

    shortPasswords.forEach(({ email, password }) => {
        it(`deve exibir mensagem de erro para a senha "${password}"`, async () => {
            await LoginPage.submitLoginForm({ email, password });

            await LoginPage.waitForErrorMessage(ERROR_MESSAGE);

            expect(await LoginPage.isErrorMessageDisplayed(ERROR_MESSAGE)).to.be.true;
        });
    });
});
