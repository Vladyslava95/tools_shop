import {Page, Locator} from "@playwright/test";
import { BaseComponent } from './base.component.ts';

export class SigninStep extends BaseComponent {

    private checkoutButton = this.page.getByTestId('proceed-2'); 

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };
}