import {expect} from "@playwright/test";
import { getAuthData } from '../../utilities/utils';
import { BasePage } from "./base.page";


export class LoginPage extends BasePage {
    private email =  this.page.getByTestId('email');
    private password = this.page.getByTestId('password');
    private navMenu = this.page.getByTestId('nav-menu');
    private loginButton = this.page.getByTestId('login-submit');
    private pageTitle = this.page.getByTestId('page-title');;


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