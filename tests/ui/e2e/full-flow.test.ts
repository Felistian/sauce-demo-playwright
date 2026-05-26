import { test } from '../../../fixtures/base-test';
import { users } from '../../../data/ui/user';
import * as allure from 'allure-js-commons';

test.describe('Full Flow Tests', () => {

    test('@e2e @smoke Standard user can complete full login → add to cart → checkout flow ', async ({ loginPage, inventoryPage, cartPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Full Flow');
        allure.story('Standard user can complete full login → add to cart → checkout flow');
        allure.severity('critical');

        await test.step('Given — User is on the login page', async () => {
            await loginPage.navigateToLogin();
            await loginPage.verifyLoginPageLoaded();
        });
        await test.step('When — User logs in with valid credentials', async () => {
            await loginPage.login(users.standard.username, users.standard.password);
        });
        await test.step('Then — User should be logged in successfully', async () => {
            await inventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User adds items to the cart and navigates to the cart page', async () => {
            await inventoryPage.addItemToCart('Sauce Labs Backpack');
            await inventoryPage.addItemToCart('Sauce Labs Bike Light');
            await inventoryPage.clickCartIcon();
        });
        await test.step('Then — User should see the correct items in the cart', async () => {
            await cartPage.verifyCartPageLoaded();
            await cartPage.verifyItemInCart('Sauce Labs Backpack', '$29.99');
            await cartPage.verifyItemInCart('Sauce Labs Bike Light', '$9.99');
        });
        await test.step('When — User clicks the checkout button', async () => {
            await cartPage.clickCheckout();
        });
        await test.step('Then — User should be on the checkout information page', async () => {
            await cartPage.verifyCheckoutPageURL();
        });

    });
});