import { test, expect } from '@playwright/test';
import { DummyJsonApi } from '../../api/dummy-json-api';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';


test.describe('DummyJSON Products API', () => {

    let api: DummyJsonApi;

    test.beforeEach(async ({ request }) => {
        api = new DummyJsonApi(request);
    });

    test('@api @smoke GET products returns 200', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('GET products returns 200');
        allure.severity('normal');
        await test.step('When — GET all products', async () => {
            const response = await api.getProducts();

            await test.step('Then — status 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('Then — returns product list', async () => {
                const body = await response.json();
                expect(body.products).toBeDefined();
                expect(body.products.length).toBeGreaterThan(0);
                expect(body.total).toBeGreaterThan(0);
            });
        });
    });

    test('@api @smoke GET product by id returns correct product', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('GET product by id returns correct product');
        allure.severity('normal');
        await test.step('When — GET product with id 1', async () => {
            const response = await api.getProductById(1);

            await test.step('Then — status 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('Then — returns correct product', async () => {
                const body = await response.json();
                expect(body.id).toBe(1);
                expect(body.title).toBeDefined();
                expect(body.price).toBeDefined();
                expect(body.price).toBeGreaterThan(0);
            });
        });
    });

    test('@api @regression GET product by invalid id returns 404', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('GET product by invalid id returns 404');
        allure.severity('normal');
        await test.step('When — GET product with invalid id', async () => {
            const response = await api.getProductById(999999);

            await test.step('Then — status 404', async () => {
                expect(response.status()).toBe(404);
            });
        });
    });

    test('@api @smoke POST create product returns 201', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('POST create product returns 201');
        allure.severity('normal');
        await test.step('When — POST create new product', async () => {
            const response = await api.createProduct({
                title: 'Test Product',
                price: 99.99,
                description: 'Test Description',
                category: 'test'
            });

            await test.step('Then — status 201', async () => {
                expect(response.status()).toBe(201);
            });

            await test.step('Then — returns created product', async () => {
                const body = await response.json();
                expect(body.id).toBeDefined();
                expect(body.title).toBe('Test Product');
                expect(body.price).toBe(99.99);
            });
        });
    });

    test('@api @regression PUT update product', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('PUT update product');
        allure.severity('normal');
        await test.step('When — PUT update product 1', async () => {
            const response = await api.updateProduct(1, {
                title: 'Updated Product Title',
                price: 199.99
            });

            await test.step('Then — status 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('Then — returns updated product', async () => {
                const body = await response.json();
                expect(body.title).toBe('Updated Product Title');
                expect(body.price).toBe(199.99);
            });
        });
    });

    test('@api @regression DELETE product returns 200', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('DELETE product returns 200');
        allure.severity(Severity.NORMAL);
        await test.step('When — DELETE product 1', async () => {
            const response = await api.deleteProduct(1);

            await test.step('Then — status 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('Then — returns deleted product', async () => {
                const body = await response.json();
                expect(body.isDeleted).toBe(true);
            });
        });
    });

    test('@api @regression GET search products', async () => {
        allure.epic('DummyJSON');
        allure.feature('Products');
        allure.story('GET search products');
        allure.severity('normal');
        await test.step('When — search products with query', async () => {
            const response = await api.searchProducts('phone');

            await test.step('Then — status 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('Then — returns matching products', async () => {
                const body = await response.json();
                expect(body.products).toBeDefined();
                expect(body.products.length).toBeGreaterThan(0);
                expect(body.total).toBeGreaterThan(0);
            });
        });
    });
});