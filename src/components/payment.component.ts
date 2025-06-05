import {Page, Locator} from "@playwright/test";
import { BaseComponent } from './base.component.ts';

export  type PaymentOptions = 'bank-transfer'| 'cash-on-delivery'  | 'credit-card'  | 'buy-now-pay-later'| 'gift-card'; 

export class PaymentComponent extends BaseComponent {

    private dropdown = this.page.locator('select[data-test="payment-method"]');  

    async selectPaymentMethod(option: PaymentOptions) {
        await this.dropdown.selectOption(option);
      }
}