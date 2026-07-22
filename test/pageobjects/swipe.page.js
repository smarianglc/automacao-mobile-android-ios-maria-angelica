const AppPage = require('./app.page');

class SwipePage extends AppPage {
    constructor() {
        super('~Swipe-screen');
    }

    get logo() {
        return $('~WebdriverIO logo');
    }

    async scrollToLogo() {
        await this.logo.scrollIntoView({
            scrollableElement: await this.screen,
            direction: 'up',
            maxScrolls: 5,
            percent: 0.99,
        });
    }
}

class Carousel {
    locatorStrategy(selector) {
        return driver.isIOS ? `~${selector}` : `//*[@resource-id="${selector}"]`;
    }

    get carousel() {
        return $(this.locatorStrategy('Carousel'));
    }

    get openSourceCard() {
        return $(this.locatorStrategy('__CAROUSEL_ITEM_0__'));
    }

    get communityCard() {
        return $(this.locatorStrategy('__CAROUSEL_ITEM_1__'));
    }

    get jsFoundationCard() {
        return $(this.locatorStrategy('__CAROUSEL_ITEM_2__'));
    }

    get supportVideosCard() {
        return $(this.locatorStrategy('__CAROUSEL_ITEM_3__'));
    }

    get extendableCard() {
        return $(this.locatorStrategy('__CAROUSEL_ITEM_4__'));
    }

    get compatibleCard() {
        return $(this.locatorStrategy('__CAROUSEL_ITEM_5__'));
    }

    /**
     * Das 6 cartas do carrossel apenas 1 fica totalmente visível por vez.
     * A carta ativa é identificada checando se sua posição x é 0.
     */
    async isCardActive(card) {
        const rect = await driver.getElementRect(await card.elementId);
        return rect.x === 0;
    }

    async swipeLeft() {
        await driver.swipe({ direction: 'left', scrollableElement: this.carousel, percent: 0.8 });
    }

    async swipeRight() {
        await driver.swipe({ direction: 'right', scrollableElement: this.carousel, percent: 0.8 });
    }
}

module.exports = { SwipePage: new SwipePage(), Carousel: new Carousel() };
