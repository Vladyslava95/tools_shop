import { Page as page } from '@playwright/test';
import { LoginPage } from './LoginPage.ts';
import { HomePage } from './HomePage.ts';
import {CheckOutPage} from './CheckoutPage.ts';
import {ProductPage} from './ProductPage.ts';


class BasePage {
    protected page: page;

    constructor(page: page) {
        this.page = page;
    }
}

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