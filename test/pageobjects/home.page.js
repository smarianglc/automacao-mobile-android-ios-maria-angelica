const AppPage = require('./app.page');

class HomePage extends AppPage {
    constructor() {
        super('~Home-screen');
    }
}

module.exports = new HomePage();
