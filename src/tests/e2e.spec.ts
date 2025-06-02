import { expect } from '@playwright/test';
import { test } from '../fixture/base';

  test('Verify login with valid credentials', {
    tag: '@smoke',
  }, async ({app }) => {
      await test.step('Open Login page', async () => {
        await app.login.navigateTo();
      });
      
      await test.step('Log in to account', async () => {
        await app.login.login();
        await app.login.verifyPageTitle("My account");
        await app.login.verifyAccountMenu("Jane Doe");
      });
    });

  test('Verify user can view product details', {
    tag: '@smoke',
  }, async ({ app }) => {
      await test.step('Open Home page', async () => {
        await app.homepage.navigateTo();
        await app.homepage.clickOnProduct('Combination Pliers');
        await app.productpage.verifyProductCard("Combination Pliers", 14.15);
      });
    });

  test('Verify  add product to cart', {
    tag: '@smoke',
  }, async ({ app }) => {
    await test.step('Open Home page', async () => {
      await app.homepage.navigateTo();
    });

    await test.step('Select product', async () => {
      await app.homepage.clickOnProduct('Slip Joint Pliers');
      await app.productpage.verifyProductCard("Slip Joint Pliers", 9.17)
    });

    await test.step('Add product to the cart', async () => {
      await app.productpage.addToCart();
      await app.productpage.verifyAlertIsShown('Product added to shopping cart.');
      await app.productpage.verifyIncreaseItemQty('1');
    });

    await test.step('Procee to checkout', async () => {
      await app.productpage.proceedToCheckout();
      await app.checkoutpage.verifyProductCard('Slip Joint Pliers', 1, 9.17 )
    });

  });

  test('Product sorting by name', {
    tag: '@smoke',
  }, async ({ app }) => {
    await test.step('Open Home page', async () => {
      await app.homepage.navigateTo();
    });

    await test.step('Sort product by name asc', async () => {
      await app.homepage.sortProducts("name,asc");
      const actualSortAsc = await app.homepage.getProductNames();
      const expectedSortAsc = actualSortAsc.sort((a, b) => a.localeCompare(b));
      expect(actualSortAsc).toEqual(expectedSortAsc);
    });

    await test.step('Sort product by name desc', async () => {
      await app.homepage.sortProducts("name,desc");
      const actualSortDesc = await app.homepage.getProductNames();
      const expectedSortDesc = actualSortDesc.sort((a, b) => b.localeCompare(a));
      expect(actualSortDesc).toEqual(expectedSortDesc);
    });
  });

  test('Product sorting by price',{
    tag: '@smoke',
  }, async ({ app }) => {
    await test.step('Open Home page', async () => {
      await app.homepage.navigateTo();
    });

    await test.step('Sort product by price asc', async () => {
      await app.homepage.sortProducts("price,asc");
      const actualSortAsc = await app.homepage.getProductPrice();
      const expectedSortAsc = actualSortAsc.sort((a, b) => a - b);
      expect(actualSortAsc).toEqual(expectedSortAsc);
    });

    await test.step('Sort product by price desc', async () => {
      await app.homepage.sortProducts("price,desc");
      const actualSortDesc = await app.homepage.getProductPrice();
      const expectedSortDesc = actualSortDesc.sort((a, b) => b - a);
      expect(actualSortDesc).toEqual(expectedSortDesc);
    });
  });

  test('Verify chekout flow', {
    tag: '@smoke',
  }, async ({ loggedInApp}) => {
    let name: string;
    let price: number;

    await test.step('Open Home page', async () => {
      await loggedInApp.homepage.openHomePage();
    });

    await test.step('Select first product', async () => {
      const result = await loggedInApp.homepage.selectFirstProduct();
      name = result.name;
      price = result.price;
      await loggedInApp.productpage.verifyProductCard(name, price);
    });

    await test.step('Add  product to the cart', async () => {
      await loggedInApp.productpage.addToCart();
    });

    await test.step('Proceed to Checkout', async () => {
      await loggedInApp.productpage.proceedToCheckout();
      await loggedInApp.checkoutpage.verifyProductCard(name, 1, price);
    });

    await test.step('Proceed to car step', async () => {
      await loggedInApp.checkoutpage.cartstep.proceedToCheckout();
    });

    await test.step('Proceed to sign in step', async () => {
      await loggedInApp.checkoutpage.signinstep.proceedToCheckout();
    });

    await test.step('Proceed to  billing step', async () => {
      await loggedInApp.checkoutpage.billingstep.fillAddressData();
      await loggedInApp.checkoutpage.billingstep.proceedToCheckout();
      await loggedInApp.checkoutpage.selectPayment('credit-card');
      await loggedInApp.checkoutpage.enterCardData();
      await loggedInApp.checkoutpage.confirmPayment();
    });
  });

  