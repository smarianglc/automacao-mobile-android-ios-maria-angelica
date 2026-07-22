const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const FormsPage = require('../pageobjects/forms.page');
const readCsv = require('../helpers/readCsv');

// Cenário data-driven: valores lidos de test/data/formInputs.csv
const formInputs = readCsv('data/formInputs.csv');

describe('Formulário, ao preencher o campo de texto,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openForms();
        await FormsPage.waitForIsShown(true);
    });

    formInputs.forEach(({ text }) => {
        it(`deve refletir o texto digitado "${text}" no resultado`, async () => {
            await FormsPage.typeInInput(text);
            await FormsPage.dismissKeyboardIfShown();

            await expect(await FormsPage.inputTextResult.getText()).to.include(text);
        });
    });
});
