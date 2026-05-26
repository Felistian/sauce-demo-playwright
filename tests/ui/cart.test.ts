import { test } from '../../fixtures/base-test';
import * as allure from 'allure-js-commons';

test.describe('Cart Page Tests', () => {

    // 1. Inject 'loggedInInventoryPage' fixture directly here.
    // This logs in standard_user automatically in the background!
    test.beforeEach(async ({ loggedInInventoryPage }) => {
        await loggedInInventoryPage.addItemToCart('Sauce Labs Backpack');
        await loggedInInventoryPage.addItemToCart('Sauce Labs Bike Light');
        await loggedInInventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await loggedInInventoryPage.clickCartIcon();
    });

    test('@smoke @regression user should be able to see items in the cart', async ({ cartPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Cart');
        allure.story('User should be able to see items in the cart');
        allure.severity('critical');
        await test.step('Given — User has added items to the cart and is on the cart page', async () => {
            await cartPage.verifyCartPageLoaded();
        });
        await test.step('Then — Added items should be displayed in the cart with correct names and prices', async () => {
            await cartPage.verifyCartItemCount(3);
            await cartPage.verifyItemInCart('Sauce Labs Backpack', '$29.99');
            await cartPage.verifyItemInCart('Sauce Labs Bike Light', '$9.99');
            await cartPage.verifyItemInCart('Sauce Labs Bolt T-Shirt', '$15.99');
        });
    });

    test('@regression user should be able to remove items from the cart', async ({ cartPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Cart');
        allure.story('User should be able to remove items from the cart');
        allure.severity('critical');
        await test.step('Given — User has added items to the cart and is on the cart page', async () => {
            await cartPage.verifyCartPageLoaded();
        });
        await test.step('When — User removes an item from the cart', async () => {
            await cartPage.removeItem('Sauce Labs Backpack');
        });
        await test.step('Then — The item should be removed from the cart', async () => {
            await cartPage.verifyItemIsRemoved('Sauce Labs Backpack');
        });
    });

    test('@regression user should be able to continue shopping from the cart page', async ({ cartPage, inventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Cart');
        allure.story('User should be able to continue shopping from the cart page');
        allure.severity('critical');
        await test.step('Given — User has added items to the cart and is on the cart page', async () => {
            await cartPage.verifyCartPageLoaded();
        });
        await test.step('When — User clicks the continue shopping button', async () => {
            await cartPage.clickContinueShopping();
        });
        await test.step('Then — User should be navigated back to the inventory page', async () => {
            await inventoryPage.verifyInventoryPageLoaded();
        });
    });

    test('@regression user should be able to checkout from the cart page', async ({ cartPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Cart');
        allure.story('User should be able to checkout from the cart page');
        allure.severity('critical');
        await test.step('Given — User has added items to the cart and is on the cart page', async () => {
            await cartPage.verifyCartPageLoaded();
        });
        await test.step('When — User clicks the checkout button', async () => {
            await cartPage.clickCheckout();
        });
        await test.step('Then — User should be navigated to the checkout page', async () => {
            await cartPage.verifyCheckoutPageURL();
        });
    });

    test('@regression user should be able to view item details from the cart page', async ({ cartPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Cart');
        allure.story('User should be able to view item details from the cart page');
        allure.severity('critical');
        await test.step('Given — User has added items to the cart and is on the cart page', async () => {
            await cartPage.verifyCartPageLoaded();
        });
        await test.step('When — User clicks on the item name', async () => {
            await cartPage.clickItemName('Sauce Labs Backpack');
        });
        await test.step('Then — User should be navigated to the item details page', async () => {
            await cartPage.verifyItemDetailsPageURL('Sauce Labs Backpack');
        });
    });
});
