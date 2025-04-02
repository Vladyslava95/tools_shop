import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test('Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login();

    await expect(page).toHaveURL('/account');
    const pageTitle = page.locator('[data-test="page-title"]');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText("My account");
    const navMenu = page.locator('[data-test="nav-menu"]');
    await expect(navMenu).toBeVisible();
    await expect(navMenu).toContainText("Jane Doe");

  });

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    await expect(page).toHaveURL('/account');

    await homePage.openHomepage();
    await homePage.clickOnProduct('Combination Pliers');

    await expect(page.url()).toContain('/product');
    const productTitle = page.locator('[data-test="product-name"]');
    await expect(productTitle).toBeVisible();
    await expect(productTitle).toContainText("Combination Pliers");
    const utitPrice = page.locator('[data-test="unit-price"]');
    await expect(utitPrice).toBeVisible();
    await expect(utitPrice).toContainText("14.15");
    const addToCart = page.locator('[data-test="add-to-cart"]');
    await expect(addToCart).toBeVisible();
    const favorites = page.locator('[data-test="add-to-favorites"]');
    await expect(favorites).toBeVisible();

    

  });

  test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    await expect(page).toHaveURL('/account');

    await homePage.openHomepage();
    await homePage.clickOnProduct('Slip Joint Pliers');
    await expect(page.url()).toContain('/product');
    const productTitle = page.locator('[data-test="product-name"]');
    await expect(productTitle).toBeVisible();
    await expect(productTitle).toContainText("Slip Joint Pliers");
    const utitPrice = page.locator('[data-test="unit-price"]');
    await expect(utitPrice).toBeVisible();
    await expect(utitPrice).toContainText("9.17");

    await productPage.addToCart();
    const alert = page.getByRole('alert');
    await expect(alert).toHaveText('Product added to shopping cart.');
    await expect(alert).toBeHidden({ timeout: 8_000 });
    const itemQty = page.locator('[data-test="cart-quantity"]');
    await expect(itemQty).toHaveText('1');

    await productPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout');
    const productName = page.locator('[data-test="product-title"]');
    await expect(productName).toHaveText('Slip Joint Pliers');
    const productQty = page.locator('[data-test="product-title"]');
    await expect(productQty).toHaveCount(1);
    const checkOutButton = page.locator('[data-test="proceed-1"]');
    await expect(checkOutButton).toBeVisible();
   
  });