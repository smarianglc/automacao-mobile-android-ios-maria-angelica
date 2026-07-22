const { expect } = require('chai');
const TabBar = require('../pageobjects/components/tabBar.component');
const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');
const FormsPage = require('../pageobjects/forms.page');
const { SwipePage } = require('../pageobjects/swipe.page');
const DragPage = require('../pageobjects/drag.page');
const { WebviewPage } = require('../pageobjects/webview.page');

describe('Navegação entre telas, ao usar a barra de navegação inferior,', () => {
    beforeEach(async () => {
        await TabBar.waitForTabBarShown();
    });

    it('deve navegar para a tela de Login', async () => {
        await TabBar.openLogin();
        await LoginPage.waitForIsShown(true);

        expect(await LoginPage.screen.isDisplayed()).to.be.true;
    });

    it('deve navegar para a tela de Forms', async () => {
        await TabBar.openForms();
        await FormsPage.waitForIsShown(true);

        expect(await FormsPage.screen.isDisplayed()).to.be.true;
    });

    it('deve navegar para a tela de Swipe', async () => {
        await TabBar.openSwipe();
        await SwipePage.waitForIsShown(true);

        expect(await SwipePage.screen.isDisplayed()).to.be.true;
    });

    it('deve navegar para a tela de Drag & Drop', async () => {
        await TabBar.openDrag();
        await DragPage.waitForIsShown(true);

        expect(await DragPage.screen.isDisplayed()).to.be.true;
    });

    it('deve navegar para a Webview e voltar para a tela Home', async () => {
        await TabBar.openWebView();
        await WebviewPage.waitForWebsiteLoaded();

        await TabBar.openHome();
        await HomePage.waitForIsShown(true);

        expect(await HomePage.screen.isDisplayed()).to.be.true;
    });
});
