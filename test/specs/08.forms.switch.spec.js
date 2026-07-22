const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const FormsPage = require('../pageobjects/forms.page');

describe('Formulário, ao interagir com o switch,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openForms();
        await FormsPage.waitForIsShown(true);
    });

    it('deve ligar e desligar o switch corretamente', async () => {
        expect(await FormsPage.isSwitchActive()).to.equal(false);

        await FormsPage.tapOnSwitch();
        expect(await FormsPage.isSwitchActive()).to.equal(true);

        await FormsPage.tapOnSwitch();
        expect(await FormsPage.isSwitchActive()).to.equal(false);
    });
});
