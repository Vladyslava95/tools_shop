import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CheckOutPage } from '../pages/CheckoutPage';

test('Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    expect(page).toHaveURL('/account');
    await loginPage.verifyPageTitle("My account");
    await loginPage.verifyAccountMenu("Jane Doe");

  });

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    expect(page).toHaveURL('/account');
    await homePage.openHomepage();
    await homePage.clickOnProduct('Combination Pliers');
    expect(page.url()).toContain('/product');
    await productPage.verifyProductCard("Combination Pliers", "14.15")

  });

  test('Verify  add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckOutPage(page)

    await loginPage.navigateTo();
    await loginPage.login();
    expect(page).toHaveURL('/account');

    await homePage.openHomepage();
    await homePage.clickOnProduct('Slip Joint Pliers');
    expect(page.url()).toContain('/product');

    await productPage.verifyProductCard("Slip Joint Pliers", "9.17")
    await productPage.addToCart();
    await productPage.verifyAlertIsShown('Product added to shopping cart.');
    await productPage.verifyIncreaseItemQty('1');

    await productPage.proceedToCheckout();
    expect(page).toHaveURL('/checkout');
    await checkoutPage.verifyProductCard('Slip Joint Pliers', 1 )


  });

  test('Product sorting by name', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    await homePage.openHomepage();
    await homePage.sortProducts("name,asc");
    const actualSortAsc = await homePage.getProductNames();
    const expectedSortAsc = actualSortAsc.sort((a, b) => a.localeCompare(b));
    expect(actualSortAsc).toEqual(expectedSortAsc);

    await homePage.sortProducts("name,desc");
    const actualSortDesc = await homePage.getProductNames();
    const expectedSortDesc = actualSortDesc.sort((a, b) => b.localeCompare(a));
    expect(actualSortDesc).toEqual(expectedSortDesc);
  });

  test('Product sorting by price', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    await homePage.openHomepage();
    await homePage.sortProducts("price,asc");
    const actualSortAsc = await homePage.getProductPrice();
    const expectedSortAsc = actualSortAsc.sort((a, b) => a - b);
    expect(actualSortAsc).toEqual(expectedSortAsc);

    await homePage.sortProducts("price,desc");
    const actualSortDesc = await homePage.getProductPrice();
    const expectedSortDesc = actualSortAsc.sort((a, b) => b - a);
    expect(actualSortDesc).toEqual(expectedSortDesc);
  });