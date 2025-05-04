import { test as base, expect } from '@playwright/test';
import { Application } from '../pages/AppManager';
import { getAuthData } from '../../utils';

export const test = base.extend<{
    app: Application;
    loggedInApp: Application;
}>({
    app: async ({ browser, page, }, use) => {
        test.info().annotations.push({
            type: 'Browser',
            description: `${browser.browserType().name()} ${browser.version()}`,
        });

        const app = new Application(page);
        await use(app);
    },

    loggedInApp: async ({ app, page, request}, use) => {
        const authData = getAuthData();
        const response = await request.post(`https://api.practicesoftwaretesting.com/users/login`, {
            data: {
              email: authData.email,
              password: authData.password ,
            },
          });

          expect(response.ok()).toBeTruthy();

          const json = await response.json() as { access_token: string };
          const token = json.access_token;
      
          await page.goto('/', { waitUntil: 'commit' });
          await page.evaluate(_token => window.localStorage.setItem('auth-token', _token), token);
      
          await use(app);
    },


});