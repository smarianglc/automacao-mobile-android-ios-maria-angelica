const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const DragPage = require('../pageobjects/drag.page');

describe('Navegação, ao resolver o quebra-cabeça de drag and drop,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openDrag();
        await DragPage.waitForIsShown(true);
    });

    it('deve completar o quebra-cabeça e permitir reiniciar', async () => {
        await DragPage.solvePuzzle();

        await DragPage.waitForRetryButton();
        expect(await DragPage.retryButton.isDisplayed()).to.be.true;

        await DragPage.tapOnRetryButton();
        await DragPage.waitForRenewButton();
        expect(await DragPage.renewButton.isDisplayed()).to.be.true;
    });
});
