import {Page, Locator} from "@playwright/test"

export class ProductPage {
    private addToCartButton: Locator;
    private cartIcon: Locator;
   


    public constructor (private page: Page ) {
        this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
        this.cartIcon = this.page.locator('[data-test="nav-cart"]');
        
    }
    

    async addToCart() {
        await this.addToCartButton.click();
    };

    async proceedToCheckout() {
        await this.cartIcon.click();
    };

    
}