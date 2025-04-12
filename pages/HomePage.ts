import {Page, Locator} from "@playwright/test"

export class HomePage {
    
    private homeIcon: Locator;


    public constructor (private page: Page ) {
        this.homeIcon = this.page.locator('.navbar-brand');
    };
    
    async openHomepage() {
        await this.homeIcon.click();
    };

    async clickOnProduct(productName: string) {
        await this.page.getByText(productName, { exact: true }).click({ timeout: 5000 });
      
    };
    
}