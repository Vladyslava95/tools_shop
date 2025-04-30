import {Page, Locator} from "@playwright/test"

export class BillingStep {

    private checkoutButton: Locator;

    public constructor (private page: Page ) {
        this.checkoutButton = this.page.getByTestId('proceed-3');    
    };

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };
}