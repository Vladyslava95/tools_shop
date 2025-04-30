import {Page, Locator} from "@playwright/test"


export class CartStep {

    private checkoutButton: Locator;

    public constructor (private page: Page ) {
        this.checkoutButton = this.page.getByTestId('proceed-1');    
    };

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };
}