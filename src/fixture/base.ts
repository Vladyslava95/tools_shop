import { test as base } from '@playwright/test';
import { Application } from '../pages/AppManager';

export const test = base.extend<{
    app: Application;
    loggedInApp: Application;
}>({
    app: async ({ browser, page }, use) => {
        test.info().annotations.push({
            type: 'Browser',
            description: `${browser.browserType().name()} ${browser.version()}`,
        });

        const app = new Application(page);
        await use(app);
    },

    loggedInApp: async ({ page }, use) => {
        const app = new Application(page);

        await app.login.navigateTo();
        await app.login.login();
        await use(app);
    },

});