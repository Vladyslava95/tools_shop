import { BasePage } from "./BasePage";
import { SortOptions, SortComponent  } from "../components/sort.component";

export class HomePage extends BasePage{
    
    private productName = this.page.getByTestId('product-name');
    private productPrice = this.page.getByTestId('product-price')
    private sortComponent = new SortComponent(this.page);
    private productCards = this.page.locator('.card');
    private homePage = this.page.locator('.navbar-brand');

    
    async navigateTo() {
        await this.page.goto('')
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
        const priceTexts = await this.productPrice.allInnerTexts();
        return priceTexts.map(text => parseFloat(text.replace('$', '').trim()));

    };

    async addFirstProductToCart(): Promise<{ name: string; price: number }> {
        const count = await this.productCards.count();

        const product = this.productCards.first();
        const name = await this.productName.first().innerText();
        const priceText = await this.productPrice.first().innerText();
        const price = parseFloat(priceText.replace('$', '').trim());

        await product.click();

        return { name, price }; 
    };

    async openHomePage() {
        await this.homePage.click();
    };

    async mockProductsResponse(json: unknown): Promise<void> {
        await this.page.route('https://api.practicesoftwaretesting.com/products*', async route => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(json),
            });
        });
    };

    async getProductCount() {
        const count = await this.productCards.count();
        return count;
 
    };
    
}