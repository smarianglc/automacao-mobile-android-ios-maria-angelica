const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const FormsPage = require('../pageobjects/forms.page');
const Picker = require('../pageobjects/components/picker.component');
const dropdownOptions = require('../data/dropdownOptions.json');

describe('Formulário, ao selecionar valores do dropdown (data-driven),', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openForms();
        await FormsPage.waitForIsShown(true);
    });

    dropdownOptions.forEach(({ value }) => {
        it(`deve selecionar a opção "${value}"`, async () => {
            await FormsPage.tapOnDropDown();
            await Picker.selectValue(value);

            expect(await FormsPage.getDropDownText()).to.include(value);
        });
    });
});
