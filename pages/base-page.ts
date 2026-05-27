import { Page, Locator, expect } from '@playwright/test';
import { getFormattedTimestamp } from '../utils/helpers';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ===== NAVIGATION =====
    async goto(path: string = '/'): Promise<void> {
        await this.page.goto(path);
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async reload(): Promise<void> {
        await this.page.reload();
    }

    async waitForUrl(url: string | RegExp): Promise<void> {
        await this.page.waitForURL(url);
    }

    // ===== PAGE INFO =====
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    // ===== WAIT =====
    async waitForLoad(
        state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle'
    ): Promise<void> {
        await this.page.waitForLoadState(state);
    }

    async waitForElement(
        locator: Locator | string,
        options?: { timeout?: number; state?: 'attached' | 'detached' | 'visible' | 'hidden' }
    ): Promise<Locator> {
        const element = typeof locator === 'string'
            ? this.page.locator(locator) : locator;
        await element.waitFor(options);
        return element;
    }

    async waitForResponse(url: string | RegExp): Promise<void> {
        await this.page.waitForResponse(url);
    }

    // ===== SCROLLING =====
    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(
            () => window.scrollTo(0, document.body.scrollHeight)
        );
    }

    async scrollToElement(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    // ===== ELEMENT INTERACTIONS =====
    // Multi-step combinations — all add real value!

    async hoverAndClick(locator: Locator): Promise<void> {
        await locator.hover();
        await locator.click();
    }

    async scrollAndClick(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
        await locator.click();
    }

    async scrollAndFill(locator: Locator, text: string): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
        await locator.fill(text);
    }

    async waitAndClick(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
        await locator.click();
    }

    async checkCheckbox(locator: Locator): Promise<void> {
        if (!await locator.isChecked()) {
            await locator.check();
        }
    }

    async uncheckCheckbox(locator: Locator): Promise<void> {
        if (await locator.isChecked()) {
            await locator.uncheck();
        }
    }

    async uploadFile(locator: Locator, filePath: string): Promise<void> {
        await locator.setInputFiles(filePath);
    }

    async dragAndDrop(source: Locator, target: Locator): Promise<void> {
        await source.dragTo(target);
    }

    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    async acceptAlert(): Promise<void> {
        this.page.on('dialog', dialog => dialog.accept());
    }

    // ===== GETTERS =====
    async getElementText(locator: Locator): Promise<string> {
        return await locator.innerText();
    }

    async getElementAttribute(
        locator: Locator,
        attribute: string
    ): Promise<string | null> {
        return await locator.getAttribute(attribute);
    }

    // ===== SCREENSHOT =====
    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `screenshots/${name}_${getFormattedTimestamp()}.png`,
            fullPage: true
        });
    }

    // ===== COOKIES =====
    async getCookies(): Promise<unknown[]> {
        return await this.page.context().cookies();
    }

    async setCookie(name: string, value: string): Promise<void> {
        await this.page.context().addCookies([{
            name,
            value,
            url: this.page.url()
        }]);
    }

    async deleteCookie(name: string): Promise<void> {
        const cookies = await this.page.context().cookies();
        const filteredCookies = cookies.filter(c => c.name !== name);
        await this.page.context().clearCookies();
        await this.page.context().addCookies(filteredCookies);
    }

    async clearAllCookies(): Promise<void> {
        await this.page.context().clearCookies();
    }

    // ===== VERIFICATION =====
    async verifyPageTitle(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expectedUrl);
    }

    async verifyPageLoaded(): Promise<void> {
        await this.waitForLoad('networkidle');
    }

    async verifyElementExists(locator: Locator): Promise<void> {
        await expect(locator).toBeAttached();
    }

    async verifyElementDoesNotExist(locator: Locator): Promise<void> {
        await expect(locator).not.toBeAttached();
    }

}