import {Page, Locator, expect} from "@playwright/test"

export class CheckOutPage {
    
    private productName: Locator;
    private productQty: Locator;
    private checkOutButton: Locator;
   
    public constructor (private page: Page ) {
        this.productName = this.page.locator('[data-test="product-title"]');
        this.productQty = this.page.locator('[data-test="product-quantity"]');
        this.checkOutButton = this.page.locator('[data-test="proceed-1"]');
    };
    

    async verifyProductCard(name: string, qty: number) {
        await expect(this.productName).toHaveText(name);
        await expect(this.productQty).toHaveCount(qty)
        await expect(this.checkOutButton).toBeVisible();
    };

    
}