import {Page, Locator} from "@playwright/test"
import { getAuthData } from '../utils';

export class LoginPage {
    private email: Locator;
    private password: Locator;
    private loginButton: Locator;

    public constructor (private page: Page ) {
        this.email = this.page.locator('[data-test="email"]');
        this.password = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-submit"]');
    }

    async navigateTo() {
        await this.page.goto('/auth/login')
    }

    async login(){
        const authData = getAuthData();
        await this.email.fill(authData.email);
        await this.password.fill(authData.password);
        await this.loginButton.click();
    } 
}