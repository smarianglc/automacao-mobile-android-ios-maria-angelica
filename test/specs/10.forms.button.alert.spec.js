const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const FormsPage = require('../pageobjects/forms.page');
const NativeAlert = require('../pageobjects/components/nativeAlert.component');

describe('Formulário, ao interagir com os botões Active/Inactive,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openForms();
        await FormsPage.waitForIsShown(true);
    });

    it('deve abrir o alerta ao tocar no botão Active e permitir fechá-lo pelos 3 botões', async () => {
        await FormsPage.tapOnActiveButton();
        await NativeAlert.waitForIsShown(true);
        expect(await NativeAlert.text()).to.include('This button is');
        await NativeAlert.tapOnButtonWithText('Ask me later');
        await NativeAlert.waitForIsShown(false);

        await FormsPage.tapOnActiveButton();
        await NativeAlert.waitForIsShown(true);
        await NativeAlert.tapOnButtonWithText('Cancel');
        await NativeAlert.waitForIsShown(false);

        await FormsPage.tapOnActiveButton();
        await NativeAlert.waitForIsShown(true);
        await NativeAlert.tapOnButtonWithText('OK');
        await NativeAlert.waitForIsShown(false);
    });

    it('não deve exibir alerta ao tocar no botão Inactive (desabilitado)', async () => {
        await NativeAlert.waitForIsShown(false);
        await FormsPage.tapOnInActiveButton();

        await driver.pause(1000);
        expect(await NativeAlert.waitForIsShown(false)).to.be.true;
    });
});
