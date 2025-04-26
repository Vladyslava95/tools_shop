import { expect } from '@playwright/test';
import { test } from '../fixture/base';

test('Verify login with valid credentials', async ({app }) => {

    await app.login.navigateTo();
    await app.login.login();
    await app.login.verifyPageTitle("My account");
    await app.login.verifyAccountMenu("Jane Doe");

  });

test('Verify user can view product details', async ({ app }) => {
    await app.homepage.navigateTo();
    await app.homepage.clickOnProduct('Combination Pliers');
    await app.productpage.verifyProductCard("Combination Pliers", "14.15")

  });

  test('Verify  add product to cart', async ({ app }) => {

    await app.homepage.navigateTo();
    await app.homepage.clickOnProduct('Slip Joint Pliers');
    await app.productpage.verifyProductCard("Slip Joint Pliers", "9.17")
    await app.productpage.addToCart();
    await app.productpage.verifyAlertIsShown('Product added to shopping cart.');
    await app.productpage.verifyIncreaseItemQty('1');
    await app.productpage.proceedToCheckout();
    await app.checkoutpage.verifyProductCard('Slip Joint Pliers', 1 )

  });

  test('Product sorting by name', async ({ app }) => {
    await app.homepage.navigateTo();
    await app.homepage.sortProducts("name,asc");
    const actualSortAsc = await app.homepage.getProductNames();
    const expectedSortAsc = actualSortAsc.sort((a, b) => a.localeCompare(b));
    expect(actualSortAsc).toEqual(expectedSortAsc);

    await app.homepage.sortProducts("name,desc");
    const actualSortDesc = await app.homepage.getProductNames();
    const expectedSortDesc = actualSortDesc.sort((a, b) => b.localeCompare(a));
    expect(actualSortDesc).toEqual(expectedSortDesc);
  });


  test('Product sorting by price', async ({ app }) => {
    await app.homepage.navigateTo();
    await app.homepage.sortProducts("price,asc");
    const actualSortAsc = await app.homepage.getProductPrice();
    const expectedSortAsc = actualSortAsc.sort((a, b) => a - b);
    expect(actualSortAsc).toEqual(expectedSortAsc);

    await app.homepage.sortProducts("price,desc");
    const actualSortDesc = await app.homepage.getProductPrice();
    const expectedSortDesc = actualSortDesc.sort((a, b) => b - a);
    expect(actualSortDesc).toEqual(expectedSortDesc);
    
  });

  