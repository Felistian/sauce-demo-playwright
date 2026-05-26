import { test } from '../../fixtures/base-test';
import * as allure from 'allure-js-commons';

test.describe('Inventory Page Tests', () => {

    test('@smoke @regression user should be able to see the inventory items', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to see the inventory items');
        allure.severity('critical');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('Then — Inventory items should be displayed with correct names and prices', async () => {
            await loggedInInventoryPage.verifyInventoryItemsDisplayed();
        });
    });

    test('@smoke @regression user should be able to sort items by name and price', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to sort items by name and price');
        allure.severity('normal');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User sorts items by name A-Z', async () => {
            await loggedInInventoryPage.sortBy('az');
        });
        await test.step('Then — Items should be sorted by name in ascending order', async () => {
            await loggedInInventoryPage.verifyItemsSortedByNameAZ();
        });
        await test.step('When — User sorts items by name Z-A', async () => {
            await loggedInInventoryPage.sortBy('za');
        });
        await test.step('Then — Items should be sorted by name in descending order', async () => {
            await loggedInInventoryPage.verifyItemsSortedByNameZA();
        });
        await test.step('When — User sorts items by price low to high', async () => {
            await loggedInInventoryPage.sortBy('lohi');
        });
        await test.step('Then — Items should be sorted by price in ascending order', async () => {
            await loggedInInventoryPage.verifyItemsSortedByPriceLowToHigh();
        });
        await test.step('When — User sorts items by price high to low', async () => {
            await loggedInInventoryPage.sortBy('hilo');
        });
        await test.step('Then — Items should be sorted by price in descending order', async () => {
            await loggedInInventoryPage.verifyItemsSortedByPriceHighToLow();
        });
    });

    test('@regression user should be able to open and close the side menu', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to open and close the side menu');
        allure.severity('critical');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User opens the side menu', async () => {
            await loggedInInventoryPage.clickBurgerMenu();
        });
        await test.step('Then — Menu options should be visible', async () => {
            await loggedInInventoryPage.verifySideMenuOptionsVisible();
        });
        await test.step('When — User closes the side menu', async () => {
            await loggedInInventoryPage.clickCloseMenu();
        });
        await test.step('Then — Menu options should be hidden', async () => {
            await loggedInInventoryPage.verifyMenuOptionsHidden();
        });
    });

    test('@regression user should be able to log out successfully', async ({ loggedInInventoryPage, loginPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to log out successfully');
        allure.severity('critical');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User opens the side menu', async () => {
            await loggedInInventoryPage.clickBurgerMenu();
        });
        await test.step('And — User clicks the logout option', async () => {
            await loggedInInventoryPage.clickLogout();
        });
        await test.step('Then — User should be logged out and redirected to the login page', async () => {
            await loginPage.verifyLoginPageLoaded();
        });
    });

    test('@regression user should be able to reset app state successfully', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to reset app state successfully');
        allure.severity('critical');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User adds an item to the cart', async () => {
            await loggedInInventoryPage.addItemToCart('Sauce Labs Backpack');
        });
        await test.step('And — User opens the side menu', async () => {
            await loggedInInventoryPage.clickBurgerMenu();
        });
        await test.step('And — User clicks the reset app state option', async () => {
            await loggedInInventoryPage.clickResetAppState();
        });
        await test.step('Then — Cart should be reset and item should be removed', async () => {
            await loggedInInventoryPage.verifyCartBadgeNotVisible();
        });
    });

    test('@smoke @regression user should be able to add and remove items from the cart', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to add and remove items from the cart');
        allure.severity('critical');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User adds an item to the cart', async () => {
            await loggedInInventoryPage.addItemToCart('Sauce Labs Backpack');
        });
        await test.step('Then — Cart badge should show 1 item', async () => {
            await loggedInInventoryPage.verifyCartBadgeCount(1);
        });
        await test.step('When — User removes the item from the cart', async () => {
            await loggedInInventoryPage.removeItemFromCart('Sauce Labs Backpack');
        });
        await test.step('Then — Cart badge should be hidden', async () => {
            await loggedInInventoryPage.verifyCartBadgeNotVisible();
        });
    });

    test('@smoke @regression user should be able to navigate to the cart page', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should be able to navigate to the cart page');
        allure.severity('critical');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User clicks the cart icon', async () => {
            await loggedInInventoryPage.clickCartIcon();
        });
        await test.step('Then — User should be redirected to the cart page', async () => {
            await loggedInInventoryPage.verifyCartPageLoaded();
        });
    });

    test('@regression user should navigate to about page', async ({ loggedInInventoryPage }) => {
        allure.epic('Sauce Demo');
        allure.feature('Inventory');
        allure.story('user should navigate to about page');
        allure.severity('normal');
        await test.step('Given — User is logged in and on the inventory page', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
        });
        await test.step('When — User opens the side menu', async () => {
            await loggedInInventoryPage.clickBurgerMenu();
        });
        await test.step('And — User clicks the about option', async () => {
            await loggedInInventoryPage.clickAbout();
        });
        await test.step('Then — User should be redirected to the about page', async () => {
            await loggedInInventoryPage.verifyAbout();
        });
    });

});
