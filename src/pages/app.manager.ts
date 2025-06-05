import { Page as page } from '@playwright/test';
import { BasePage } from './base.page.ts';
import { LoginPage } from './login.ts';
import { HomePage } from './home.ts';
import {CheckOutPage} from './checkout.ts';
import {ProductPage} from './products.ts';

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