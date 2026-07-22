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

    /**
     * Recebe um getter (ex.: `() => Carousel.jsFoundationCard`), não um elemento já resolvido.
     * O carrossel virtualiza os itens (só monta as cartas próximas da posição atual), então
     * resolver o seletor cedo demais - antes do swipe que a traz pra perto - pode pegar um
     * elemento inexistente/obsoleto. Resolvendo a cada tentativa evitamos isso.
     *
     * Logo após a tela abrir ou um swipe terminar, o layout também pode levar alguns
     * instantes para assentar (animação do carrossel), então checar a posição imediatamente
     * pode dar falso negativo - por isso o polling.
     */
    async waitForCardActive(cardGetter, timeout = 5000) {
        return driver.waitUntil(async () => this.isCardActive(await cardGetter()), {
            timeout,
            timeoutMsg: 'A carta esperada não ficou ativa no carrossel a tempo',
        });
    }

    /**
     * O comando de alto nível `driver.swipe()` (baseado em scrollableElement/percent) não
     * gera um gesto forte o suficiente para "arrastar" este carrossel em todos os
     * dispositivos/versões testados. Usamos o gesto nativo do driver, que dá controle direto
     * sobre a distância do swipe dentro dos limites do elemento.
     */
    async swipe(direction) {
        const carouselElement = await this.carousel;

        if (driver.isAndroid) {
            await driver.execute('mobile: swipeGesture', {
                elementId: carouselElement.elementId,
                direction,
                percent: 0.75,
            });
        } else {
            await driver.execute('mobile: swipe', {
                elementId: carouselElement.elementId,
                direction,
                velocity: 250,
            });
        }
    }

    async swipeLeft() {
        await this.swipe('left');
    }

    async swipeRight() {
        await this.swipe('right');
    }

    /**
     * Sob carga (emulador/simulador mais lento, várias sessões seguidas), o gesto de swipe
     * às vezes não é reconhecido pelo app na primeira tentativa. Em vez de deixar o teste
     * quebrar por isso, repetimos o gesto algumas vezes antes de desistir.
     *
     * `cardGetter` é uma função (ex.: `() => Carousel.jsFoundationCard`), não um elemento já
     * resolvido - ver comentário em `waitForCardActive` sobre por quê.
     */
    async swipeUntilCardActive(direction, cardGetter, { retries = 2, timeout = 6000 } = {}) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            await this.swipe(direction);
            try {
                return await this.waitForCardActive(cardGetter, timeout);
            } catch (error) {
                if (attempt === retries) {
                    throw error;
                }
            }
        }
    }
}

module.exports = { SwipePage: new SwipePage(), Carousel: new Carousel() };
