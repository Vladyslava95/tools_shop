import {Page, Locator, expect} from "@playwright/test"
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    private addToCartButton = this.page.getByTestId('add-to-cart');
    private cartIcon = this.page.getByTestId('nav-cart');
    private productTitle = this.page.getByTestId('product-name');
    private productPrice = this.page.getByTestId('unit-price');
    private favorites = this.page.getByTestId('add-to-favorites');
    private alert = this.page.getByRole('alert');
    private itemQty = this.page.getByTestId('cart-quantity');

    async addToCart() {
        await this.addToCartButton.click();
    };

    async proceedToCheckout() {
        await this.cartIcon.click();
    };

    async verifyProductCard(name: string, price: number) {
        await expect(this.productTitle).toBeVisible();
        await expect(this.productTitle).toContainText(name);
        await expect(this.productPrice).toBeVisible();
        const priceText = await this.productPrice.first().innerText();
        const priceNum = parseFloat(priceText.replace('$', '').trim());
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