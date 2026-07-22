class AppPage {
    constructor(selector) {
        this.selector = selector;
    }

    get screen() {
        return $(this.selector);
    }

    async waitForIsShown(isShown = true) {
        return $(this.selector).waitForDisplayed({ reverse: !isShown });
    }
}

module.exports = AppPage;
