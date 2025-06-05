import { BaseComponent } from './base.component.ts';

export class CartStep extends BaseComponent {

    private checkoutButton = this.page.getByTestId('proceed-1'); 

    async proceedToCheckout() {
        await this.checkoutButton.click();
    };
}