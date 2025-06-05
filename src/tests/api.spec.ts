import { expect } from '@playwright/test';
import { test } from '../fixture/base';
import jsonMock from "../../utilities/products.mock.json";

  test('Mock product data and verify product showing on page', async ({ app }) => {
    await app.homepage.mockProductsResponse(jsonMock);
    await app.homepage.navigateTo();
    const expectedCount = 6;
    const actualCount = await app.homepage.getProductCount();
    await expect(expectedCount).toEqual(actualCount);  
  });
