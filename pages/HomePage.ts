import {Page, Locator} from "@playwright/test"

export class HomePage {
    private products: Locator;
    private homeIcon: Locator;


    public constructor (private page: Page ) {
        this.products = this.page.locator('a.card[data-test^="product-"]');
        this.homeIcon = this.page.locator('.navbar-brand');
    };
    
    async openHomepage() {
        await this.homeIcon.click();
    };

    async clickOnProduct(productName: string) {
        await this.products.first().waitFor({ state: 'visible', timeout: 5000 });
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
          const card = this.products.nth(i);
          const text = await card.textContent();
    
          if (text?.includes(productName)) {
            await card.click();
            return;
          }
        }
    };
    
}