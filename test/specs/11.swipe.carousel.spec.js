const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const { SwipePage, Carousel } = require('../pageobjects/swipe.page');

describe('Navegação, ao interagir com o carrossel de swipe,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
        await TabBar.openSwipe();
        await SwipePage.waitForIsShown(true);
    });

    it('deve navegar horizontalmente entre os cards ao arrastar para esquerda e direita', async () => {
        expect(await Carousel.waitForCardActive(() => Carousel.openSourceCard)).to.be.true;

        expect(await Carousel.swipeUntilCardActive('left', () => Carousel.communityCard)).to.be.true;

        expect(await Carousel.swipeUntilCardActive('left', () => Carousel.jsFoundationCard)).to.be.true;

        expect(await Carousel.swipeUntilCardActive('right', () => Carousel.communityCard)).to.be.true;
    });

    it('deve encontrar o logo ao rolar verticalmente até o final da tela', async () => {
        await SwipePage.scrollToLogo();

        expect(await SwipePage.logo.isDisplayed()).to.be.true;
    });
});
