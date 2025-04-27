import {expect} from "@playwright/test"
import { BasePage } from "./BasePage";
import { PaymentComponent, PaymentOptions } from "../components/payment.component";

export class CheckOutPage extends BasePage {
    
    private productName = this.page.getByTestId('product-title');
    private productQty = this.page.getByTestId('product-quantity');
    private checkOutButton = this.page.getByTestId('proceed-1');
    private productPrice = this.page.getByTestId('product-price');
    private checkOutButton2 = this.page.getByTestId('proceed-2');
    private checkOutButton3 = this.page.getByTestId('proceed-3');
    private paymentMethod = new PaymentComponent(this.page);
    private creditCardNum = this.page.getByTestId('credit_card_number');
    private expDate = this.page.getByTestId('expiration_date');
    private cvv = this.page.getByTestId('cvv');
    private holderName = this.page.getByTestId('card_holder_name');
    private confirmButton = this.page.getByTestId('finish');
    private paymentSuccesMessage = this.page.getByTestId('payment-success-message');

    async verifyProductCard(name: string, qty: number, price: number) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productQty).toHaveCount(qty)
        await expect(this.checkOutButton).toBeVisible();

        const priceText = await this.productPrice.first().innerText();
        const priceNum = parseFloat(priceText.replace('$', '').trim());
    };

    async proceedToCheckout() {
        await this.checkOutButton.click();
    };

    async proceedToCheckout2() {
        await this.checkOutButton2.click();
    };

    async proceedToCheckout3() {
        await this.checkOutButton3.click();
    };

  async selectPayment(paymentMethod: PaymentOptions) {
    await this.paymentMethod.selectPaymentMethod(paymentMethod);
  };

  async enterCardData(cardNum: string,  expDate: string, cvv: string, cardHolder: string) {
    await this.creditCardNum.fill(cardNum);
    await this.expDate.fill(expDate);
    await this.cvv.fill(cvv);
    await this.holderName.fill(cardHolder);
};

async confirmPayment() {
    await this.confirmButton.click();
    await expect(this.paymentSuccesMessage).toBeVisible();
};

}

    
