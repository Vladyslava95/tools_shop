import { Page as page } from '@playwright/test';
import { BasePage } from './BasePage.ts';
import { LoginPage } from './LoginPage.ts';
import { HomePage } from './HomePage.ts';
import {CheckOutPage} from './CheckoutPage.ts';
import {ProductPage} from './ProductPage.ts';

export class Application extends BasePage {

    public login: LoginPage;
    public homepage: HomePage;
    public checkoutpage: CheckOutPage;
    public productpage: ProductPage;
    

    constructor(page: page) {
        super(page);
        this.login = new LoginPage(this.page);
        this.homepage = new HomePage(this.page);
        this.checkoutpage = new CheckOutPage(this.page);
        this.productpage = new ProductPage(this.page);

    }
}