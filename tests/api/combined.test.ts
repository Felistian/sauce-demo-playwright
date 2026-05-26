import { test, expect } from '../../fixtures/api-base-test';
import * as allure from 'allure-js-commons';

test.describe('Combined UI + API Tests (only a healtcheck in API and UI Loads', () => {

    test('@integration API is healthy and UI loads correctly', async ({ loggedInInventoryPage, api }) => {
        allure.epic('Sauce Demo');
        allure.feature('Combined UI + API Tests');
        allure.story('API and UI test combined');
        allure.severity('critical');

        await test.step('Given — get product data from API', async () => {
            const response = await api.getProductById(1);
            expect(response.status()).toBe(200);
        });

        await test.step('Then — SauceDemo UI loads correctly', async () => {
            await loggedInInventoryPage.verifyInventoryPageLoaded();
            await loggedInInventoryPage.verifyInventoryItemsDisplayed();
        });
    });
});