const { test, expect } = require('@playwright/test');

test.describe('Demo Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo website before each test
    await page.goto('https://www.saucedemo.com/');
  });

  test('should login with valid credentials', async ({ page }) => {
    // Test data
    const username = 'standard_user';
    const password = 'secret_sauce';

    // Perform login
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    // Verify successful login by checking the URL and inventory container
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_container')).toBeVisible();
  });

  test('should display error with invalid credentials', async ({ page }) => {
    // Test data
    const username = 'invalid_user';
    const password = 'wrong_password';

    // Attempt login with invalid credentials
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match any user in this service');
  });

  test('should be able to add item to cart', async ({ page }) => {
    // Login first
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add first item to cart
    const addToCartButton = page.locator('.inventory_item').first().locator('button').first();
    await addToCartButton.click();

    // Verify cart badge updates
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('should be able to sort products', async ({ page }) => {
    // Login first
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Sort products by price (low to high)
    await page.selectOption('.product_sort_container', 'lohi');

    // Get all prices and verify they're in ascending order
    const prices = await page.$$eval('.inventory_item_price', elements => 
      elements.map(el => parseFloat(el.textContent.replace('$', '')))
    );
    
    const isSorted = prices.every((price, i, arr) => 
      i === 0 || price >= arr[i - 1]
    );
    
    expect(isSorted).toBeTruthy();
  });
});