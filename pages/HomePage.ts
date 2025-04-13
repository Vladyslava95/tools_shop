import {Page, Locator} from "@playwright/test"
import { SortOptions, SortComponent  } from "../components/sort.component";
export class HomePage {
    
    private homeIcon: Locator;
    private productName: Locator;
    private productPrice: Locator;
    private sortComponent: SortComponent;

    public constructor (private page: Page ) {
        this.homeIcon = this.page.locator('.navbar-brand');
        this.productName = this.page.locator('[data-test="product-name"]');
        this.productPrice = this.page.locator('[data-test="product-price"]');
        this.sortComponent = new SortComponent(page);
    };
    
    async openHomepage() {
        await this.homeIcon.click();
    };

    async clickOnProduct(productName: string) {
        await this.page.getByText(productName, { exact: true }).click({ timeout: 5000 });
      
    };

    async sortProducts(sortOption: SortOptions) {
        await this.sortComponent.selectSortOption(sortOption);
    };

    async getProductNames(): Promise<string[]> {
         return await this.productName.allInnerTexts();
    };

    async getProductPrice(): Promise<number[]> {
        const count = await this.productPrice.count();
        const price: number[] = [];

        for (let i = 0; i < count; i++) {
            const priceText = await this.productPrice.innerText();
            const numValue = parseFloat(priceText.replace('$', '').trim());
            price.push(numValue);
        }

        return price;

   };

    
}