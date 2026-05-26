import { test, expect } from '../../fixtures/api-base-test';
import * as allure from 'allure-js-commons';

test.describe('DummyJSON Auth API', () => {

    test('@api @smoke POST login returns token', async ({ api }) => {
        allure.epic('DummyJSON');
        allure.feature('Auth');
        allure.story('POST login returns token');
        allure.severity('critical');
        await test.step('When — POST login with valid credentials', async () => {
            const response = await api.login({
                username: 'emilys',
                password: 'emilyspass'
            });

            await test.step('Then — status should be 200', async () => {
                expect(response.status()).toBe(200);
                expect(response.ok()).toBeTruthy();
            });

            await test.step('Then — response should contain token', async () => {
                const body = await response.json();
                expect(body.accessToken).toBeDefined();
                expect(body.accessToken).toBeTruthy();
                expect(body.username).toBe('emilys');
            });
        });
    });

    test('@api @smoke GET auth/me with valid token', async ({ api }) => {
        allure.epic('DummyJSON');
        allure.feature('Auth');
        allure.story('GET auth/me with valid token');
        allure.severity('critical');
        await test.step('Given — user is logged in', async () => {
            await api.loginAndGetToken({
                username: 'emilys',
                password: 'emilyspass'
            });
        });

        await test.step('When — GET auth/me with token', async () => {
            const response = await api.getMe();

            await test.step('Then — status should be 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('Then — returns correct user', async () => {
                const body = await response.json();
                expect(body.username).toBe('emilys');
                expect(body.email).toBeDefined();
            });
        });
    });

    test('@api @regression POST login with invalid credentials', async ({ api }) => {
        allure.epic('DummyJSON');
        allure.feature('Auth');
        allure.story('POST login with invalid credentials');
        allure.severity('critical');
        await test.step('When — POST login with wrong credentials', async () => {
            const response = await api.login({
                username: 'wronguser',
                password: 'wrongpass'
            });

            await test.step('Then — status should be 400', async () => {
                expect(response.status()).toBe(400);
            });
        });
    });
});