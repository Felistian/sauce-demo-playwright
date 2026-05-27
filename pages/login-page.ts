import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {

    // Locators
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.error-message-container');
    }

    // Actions

    async navigateToLogin(): Promise<void> {
        await this.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    // Verifications

    async verifyLoginPageLoaded(): Promise<void> {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async verifyLoginSuccessful(): Promise<void> {
        await this.verifyCurrentUrl(/.*inventory\.html/);
    }

    async verifyLoginFailed(expectedText: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedText);
    }

    async verifyErrorIsVisible(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }

    async verifyPasswordIsMasked(): Promise<void> {
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }

}