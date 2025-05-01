import {Page, Locator} from "@playwright/test"

export  type PaymentOptions = 'bank-transfer'| 'cash-on-delivery'  | 'credit-card'  | 'buy-now-pay-later'| 'gift-card'; 

export class PaymentComponent {

    private dropdown: Locator;

    public constructor (private page: Page ) {
        this.dropdown = this.page.locator('select[data-test="payment-method"]');    
    };


    async selectPaymentMethod(option: PaymentOptions) {
        await this.dropdown.selectOption(option);
      }
}