const AppPage = require('./app.page');

class DragPage extends AppPage {
    constructor() {
        super('~Drag-drop-screen');
    }

    get dragL1() { return $('~drag-l1'); }
    get dragC1() { return $('~drag-c1'); }
    get dragR1() { return $('~drag-r1'); }
    get dragL2() { return $('~drag-l2'); }
    get dragC2() { return $('~drag-c2'); }
    get dragR2() { return $('~drag-r2'); }
    get dragL3() { return $('~drag-l3'); }
    get dragC3() { return $('~drag-c3'); }
    get dragR3() { return $('~drag-r3'); }

    get dropL1() { return $('~drop-l1'); }
    get dropC1() { return $('~drop-c1'); }
    get dropR1() { return $('~drop-r1'); }
    get dropL2() { return $('~drop-l2'); }
    get dropC2() { return $('~drop-c2'); }
    get dropR2() { return $('~drop-r2'); }
    get dropL3() { return $('~drop-l3'); }
    get dropC3() { return $('~drop-c3'); }
    get dropR3() { return $('~drop-r3'); }

    get retryButton() { return $('~button-Retry'); }
    get renewButton() { return $('~renew'); }

    async solvePuzzle() {
        await this.dragL1.dragAndDrop(await this.dropL1);
        await this.dragC1.dragAndDrop(await this.dropC1);
        await this.dragR1.dragAndDrop(await this.dropR1);
        await this.dragL2.dragAndDrop(await this.dropL2);
        await this.dragC2.dragAndDrop(await this.dropC2);
        await this.dragR2.dragAndDrop(await this.dropR2);
        await this.dragL3.dragAndDrop(await this.dropL3);
        await this.dragC3.dragAndDrop(await this.dropC3);
        await this.dragR3.dragAndDrop(await this.dropR3);
    }

    async waitForRetryButton() {
        return this.retryButton.waitForDisplayed();
    }

    async tapOnRetryButton() {
        return this.retryButton.click();
    }

    async waitForRenewButton() {
        return this.renewButton.waitForDisplayed();
    }
}

module.exports = new DragPage();
