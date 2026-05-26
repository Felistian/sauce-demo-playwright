// fixtures/api-base-test.ts
import { test as baseTest } from './base-test';
import { DummyJsonApi } from '../api/dummy-json-api';

// Define the fixtures interface for API tests
export type ApiFixtures = {
  api: DummyJsonApi;
};

// Extend the base test to include the API fixture
export const test = baseTest.extend<ApiFixtures>({
  api: async ({ request }, use) => {
    // Create a new instance of DummyJsonApi using the Playwright request context
    const apiInstance = new DummyJsonApi(request);
    await use(apiInstance);
  },
});

// Re-export expect for convenience
export { expect } from './base-test';
