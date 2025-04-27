import {expect} from "@playwright/test"
import { BasePage } from "./BasePage";

export class CheckOutPage extends BasePage {
    
    private productName = this.page.getByTestId('product-title');
    private productQty = this.page.getByTestId('product-quantity');
    private checkOutButton = this.page.getByTestId('proceed-1');


    async verifyProductCard(name: string, qty: number) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productQty).toHaveCount(qty)
        await expect(this.checkOutButton).toBeVisible();
    };

};

    
