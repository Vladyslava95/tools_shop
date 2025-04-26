import {Page, Locator, expect} from "@playwright/test";
import { getAuthData } from '../../utils';


export class LoginPage {
    private email: Locator;
    private password: Locator;
    private navMenu: Locator;
    private loginButton: Locator;
    private pageTitle: Locator;

    public constructor (private page: Page ) {
        this.email = this.page.getByTestId('email');
        this.password = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-submit');
        this.navMenu = this.page.getByTestId('nav-menu');
        this.pageTitle = page.getByTestId('page-title');;
    }

    async navigateTo() {
        await this.page.goto('/auth/login')
    };

    async login(){
        const authData = getAuthData();
        await this.email.fill(authData.email);
        await this.password.fill(authData.password);
        await this.loginButton.click();
    };

    async verifyAccountMenu(name: string) {
        await expect(this.navMenu).toBeVisible();
        await expect(this.navMenu).toContainText(name);
    };

    async verifyPageTitle(title: string) {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toContainText(title);
    };
    
}