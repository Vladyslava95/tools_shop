import { Page as page } from '@playwright/test';

export class BasePage {
    protected page: page;

    constructor(page: page) {
        this.page = page;
    }
}

