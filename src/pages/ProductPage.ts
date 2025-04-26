import {Page, Locator, expect} from "@playwright/test"

export class ProductPage {
    private addToCartButton: Locator;
    private cartIcon: Locator;
    private productTitle: Locator;
    private productPrice: Locator;
    private favorites: Locator;
    private alert: Locator;
    private itemQty: Locator;
   


    public constructor (private page: Page ) {
        this.addToCartButton = this.page.getByTestId('add-to-cart');
        this.cartIcon = this.page.getByTestId('nav-cart');
        this.productTitle = this.page.getByTestId('product-name');
        this.productPrice = this.page.getByTestId('unit-price');
        this.favorites = this.page.getByTestId('add-to-favorites');
        this.alert = this.page.getByRole('alert');
        this.itemQty = this.page.getByTestId('cart-quantity');
    };
    

    async addToCart() {
        await this.addToCartButton.click();
    };

    async proceedToCheckout() {
        await this.cartIcon.click();
    };

    async verifyProductCard(name: string, price: string) {
        await expect(this.productTitle).toBeVisible();
        await expect(this.productTitle).toContainText(name);
        await expect(this.productPrice).toBeVisible();
        await expect(this.productPrice).toContainText(price);
        await expect(this.addToCartButton).toBeVisible();
        await expect(this.favorites).toBeVisible();
    };

    async verifyAlertIsShown(text: string) {
        await expect(this.alert).toHaveText(text);
        await expect(this.alert).toBeHidden({ timeout: 8_000 });
        
    };
    
    async verifyIncreaseItemQty(qty: string) {
        await expect(this.itemQty).toHaveText(qty);
        
    };
    
}