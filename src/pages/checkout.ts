import {expect} from "@playwright/test"
import { BasePage } from "./base.page";
import { PaymentComponent, PaymentOptions } from "../components/payment.component";
import { BillingStep } from "../components/billingstep.component"; 
import { CartStep } from "../components/cartstep.component";
import { SigninStep } from "../components/singinstep.component";
import { getPaymentData } from '../../utilities/utils'

export class CheckOutPage extends BasePage {
    
    private productName = this.page.getByTestId('product-title');
    private productQty = this.page.getByTestId('product-quantity');
    private productPrice = this.page.getByTestId('product-price');
    private paymentMethod = new PaymentComponent(this.page);
    public cartStep = new CartStep(this.page);
    public billingStep = new BillingStep (this.page);
    public signinStep = new SigninStep(this.page);
    private creditCardNum = this.page.getByTestId('credit_card_number');
    private expDate = this.page.getByTestId('expiration_date');
    private cvv = this.page.getByTestId('cvv');
    private holderName = this.page.getByTestId('card_holder_name');
    private confirmButton = this.page.getByTestId('finish');
    private paymentSuccesMessage = this.page.getByTestId('payment-success-message');

    async verifyProductCard(name: string, qty: number, price: number) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productQty).toHaveCount(qty)
        const priceText = await this.productPrice.first().innerText();
        const priceNum = parseFloat(priceText.replace('$', '').trim());
    };
    
    async selectPayment(paymentMethod: PaymentOptions) {
      await this.paymentMethod.selectPaymentMethod(paymentMethod);
  };

    async enterCardData() {
      const paymentData = getPaymentData();
      await this.creditCardNum.fill(paymentData.cardNum);
      await this.expDate.fill(paymentData.expDate);
      await this.cvv.fill(paymentData.cvv);
      await this.holderName.fill(paymentData.cardHolder);
  };

    async confirmPayment() {
        await this.confirmButton.click();
        await expect(this.paymentSuccesMessage).toBeVisible();
    };


}

    
