// Barra de navegação inferior, presente em todas as telas do app.
class TabBar {
    async openHome() {
        await $('~Home').click();
    }

    async openWebView() {
        await $('~Webview').click();
    }

    async openLogin() {
        await $('~Login').click();
    }

    async openForms() {
        await $('~Forms').click();
    }

    async openSwipe() {
        await $('~Swipe').click();
    }

    async openDrag() {
        await $('~Drag').click();
    }

    async waitForTabBarShown() {
        return $('~Home').waitForDisplayed({ timeout: 20000 });
    }
}

module.exports = new TabBar();
