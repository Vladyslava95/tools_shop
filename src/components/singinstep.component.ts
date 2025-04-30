import {Page, Locator} from "@playwright/test"

export class SigninStep {

    private checkoutButton: Locator;

    public constructor (private page: Page ) {
        this.checkoutButton = this.page.getByTestId('proceed-2');    
    };

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };
}