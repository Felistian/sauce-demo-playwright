# 🎭 Sauce Demo — Playwright + TypeScript Test Suite

A professional end-to-end test automation suite built with **Playwright** and **TypeScript**, testing the [Sauce Demo](https://www.saucedemo.com) web application and [DummyJSON](https://dummyjson.com) API.

Built as part of a structured learning journey to demonstrate real-world SDET skills targeting **Junior-Mid Remote Global SDET** roles.

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | UI + API test automation |
| TypeScript | Type-safe test code |
| Allure Report | Rich visual test reporting |
| GitHub Actions | CI/CD pipeline |
| DummyJSON API | API testing target |

---

## 📁 Project Structure

```
sauce-demo-playwright/
├── api/                          # API Page Objects
│   └── dummy-json-api.ts
├── data/
│   ├── api/
│   │   └── api-types.ts          # TypeScript interfaces for API
│   └── ui/
│       └── user.ts               # Test credentials
├── fixtures/
│   ├── base-test.ts              # UI fixtures + global afterEach
│   └── api-base-test.ts          # API fixture, extends base-test
├── pages/                        # Page Object Model
│   ├── base-page.ts              # Base class (38 methods)
│   ├── login-page.ts
│   ├── inventory-page.ts
│   └── cart-page.ts
├── tests/
│   ├── api/                      # API tests
│   │   ├── auth.test.ts
│   │   ├── products.test.ts
│   │   └── combined.test.ts
│   └── ui/                       # UI tests
│       ├── login.test.ts
│       ├── inventory.test.ts
│       ├── cart.test.ts
│       └── e2e/
│           └── full-flow.test.ts
└── utils/
    └── helpers.ts                # Shared utility functions
```

---

## ✅ Test Coverage

| Suite | Tests | Tags |
|---|---|---|
| Login | 10 | `@smoke` `@regression` |
| Inventory | 8 | `@smoke` `@regression` |
| Cart | 5 | `@smoke` `@regression` |
| DummyJSON Auth API | 3 | `@api` `@smoke` |
| DummyJSON Products API | 7 | `@api` `@regression` |
| Combined UI + API | 1 | `@integration` |
| Full Flow E2E | 1 | `@e2e` |
| **Total** | **35** | **100% passing** |

---

## 🏗️ Architecture

### Page Object Model (POM)
All pages extend `BasePage` which provides 38 reusable methods across navigation, interactions, waits, verifications, cookies, and screenshots.

```typescript
export class LoginPage extends BasePage {
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccessful(): Promise<void> {
        await this.verifyCurrentUrl(/.*inventory\.html/);
    }
}
```

### Fixtures
Shared test setup using Playwright's fixture system — eliminates repetitive `beforeEach` setup:

```typescript
// UI + API combined fixture chain
api-base-test → base-test → @playwright/test
```

### Assertions in Page Objects (Approach 2)
All assertions live in page objects — test files read like plain English:

```typescript
// ✅ Test file — clean, readable
await loginPage.login(users.standard.username, users.standard.password);
await loginPage.verifyLoginSuccessful();
```

---

## 🚦 Running Tests

### Prerequisites
```bash
node >= 18
npm install
npx playwright install chromium
```

### Environment Setup
```bash
cp .env.example .env
# Fill in your credentials
```

### Run All Tests
```bash
npx playwright test
```

### Run by Tag
```bash
npx playwright test --grep @smoke        # smoke tests
npx playwright test --grep @regression   # regression suite
npx playwright test --grep @api          # API tests only
npx playwright test --grep @integration  # combined tests
```

### View Reports
```bash
# Playwright HTML report
npx playwright show-report

# Allure report
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

## 📊 Allure Report

Tests are enriched with Allure metadata for structured reporting:

```
Behaviors
├── DummyJSON API (10)
│   ├── Authentication (3)
│   └── Products (7)
└── Sauce Demo (25)
    ├── Authentication (10)
    ├── Cart (5)
    ├── Inventory (8)
    └── Combined UI + API (1)
```

Each test includes:
- **Epic / Feature / Story** hierarchy
- **Severity** — Critical / Normal / Minor
- **test.step()** — Given / When / Then steps
- **Screenshots** on failure (auto-captured globally)

---

## 🔄 CI/CD

GitHub Actions runs smoke tests on every push to `main`:

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:
```

Artifacts uploaded on every run:
- `playwright-report` — HTML report
- `allure-results` — Allure raw results

---

## 🛠️ Personal Standard

This project follows the **Otniel Playwright Standard v1.2** — a personal automation standard covering:

- BasePage design philosophy ("every method must earn its place")
- Page Object Model structure and naming conventions
- Fixture vs beforeEach decision guide
- Assertion strategy (Approach 2 — assertions in POM)
- API testing patterns
- Allure metadata conventions
- CI/CD configuration
- Golden Rules (17 UI + 12 API)

---

## 👨‍💻 Author

**Otniel Felistianto**
SDET | 8+ years experience | Selenium → Playwright

---
