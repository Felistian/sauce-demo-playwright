// fixtures/base-test.ts (updated)
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { users } from '../data/ui/user';
import { getFormattedTimestamp } from '../utils/helpers';

// 1. Declare the type of fixtures we want to share
type MyFixtures = {
  loginPage: LoginPage;
  loginPageLoaded: LoginPage;
  inventoryPage: InventoryPage;
  loggedInInventoryPage: InventoryPage;
  cartPage: CartPage;
};

// 2. Extend the base test to automatically instantiate pages
export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loginPageLoaded: async ({ loginPage }, use) => {
    await loginPage.navigateToLogin();
    await loginPage.verifyLoginPageLoaded();
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // Automatically logs in the standard user and navigates to the inventory page
  loggedInInventoryPage: async ({ page, loginPage }, use) => {
    const inventory = new InventoryPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventory.verifyInventoryPageLoaded();
    await use(inventory);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

// 3. Define the global afterEach failure screenshot hook
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    const safeTitle = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    await page.screenshot({
      path: `screenshots/failure_${safeTitle}_${getFormattedTimestamp()}.png`,
      fullPage: true,
    });
  }
});

// 4. Re-export expect
export { expect } from '@playwright/test';
