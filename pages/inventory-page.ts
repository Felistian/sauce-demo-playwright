import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { parsePrice, isSortedAscending, isSortedDescending } from '../utils/helpers';

export class InventoryPage extends BasePage {

    // Locators
    // ===== LOCATORS =====
    private pageTitle: Locator;
    private sortDropdown: Locator;
    private inventoryItems: Locator;
    private itemNames: Locator;
    private itemPrices: Locator;
    private cartBadge: Locator;
    private burgerMenuButton: Locator;
    private allItems: Locator;
    private about: Locator;
    private logout: Locator;
    private resetAppState: Locator;
    private closeMenuButton: Locator;
    private cartIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.title');
        this.sortDropdown = page.locator('.product_sort_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.allItems = page.locator('#inventory_sidebar_link');
        this.about = page.locator('#about_sidebar_link');
        this.logout = page.locator('#logout_sidebar_link');
        this.resetAppState = page.locator('#reset_sidebar_link');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
        this.cartIcon = page.locator('.shopping_cart_link');

    }

    // Actions
    async navigateToInventory(): Promise<void> {
        await this.goto('/inventory.html');
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async addItemToCart(itemName: string): Promise<void> {
        const item = this.inventoryItems.filter({ has: this.page.getByText(itemName) });
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeItemFromCart(itemName: string): Promise<void> {
        const item = this.inventoryItems.filter({ has: this.page.getByText(itemName) });
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    async clickCartIcon(): Promise<void> {
        await this.cartIcon.click();
    }

    async clickBurgerMenu(): Promise<void> {
        await this.burgerMenuButton.click();
    }

    async clickAllItems(): Promise<void> {
        await this.allItems.click();
    }

    async clickAbout(): Promise<void> {
        await this.about.click();
    }

    async clickLogout(): Promise<void> {
        await this.logout.click();
    }

    async clickResetAppState(): Promise<void> {
        await this.resetAppState.click();
    }

    async clickCloseMenu(): Promise<void> {
        await this.closeMenuButton.click();
    }

    // Verifications
    async verifyInventoryPageLoaded(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.sortDropdown).toBeVisible();
        await expect(this.inventoryItems).toHaveCount(6);
    }

    async verifyInventoryItemsDisplayed(): Promise<void> {
        await expect.soft(this.inventoryItems).toHaveCount(6);
        await expect.soft(this.itemNames.nth(0)).toHaveText('Sauce Labs Backpack');
        await expect.soft(this.itemNames.nth(0)).toHaveText('Sauce Labs Backpack');
        await expect.soft(this.itemPrices.nth(0)).toHaveText('$29.99');
        await expect.soft(this.itemNames.nth(1)).toHaveText('Sauce Labs Bike Light');
        await expect.soft(this.itemPrices.nth(1)).toHaveText('$9.99');
        await expect.soft(this.itemNames.nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
        await expect.soft(this.itemPrices.nth(2)).toHaveText('$15.99');
        await expect.soft(this.itemNames.nth(3)).toHaveText('Sauce Labs Fleece Jacket');
        await expect.soft(this.itemPrices.nth(3)).toHaveText('$49.99');
        await expect.soft(this.itemNames.nth(4)).toHaveText('Sauce Labs Onesie');
        await expect.soft(this.itemPrices.nth(4)).toHaveText('$7.99');
        await expect.soft(this.itemNames.nth(5)).toHaveText('Test.allTheThings() T-Shirt (Red)');
        await expect.soft(this.itemPrices.nth(5)).toHaveText('$15.99');
    }

    async verifyItemsSortedByNameAZ(): Promise<void> {
        const names = await this.itemNames.allTextContents();
        expect(isSortedAscending(names)).toBe(true);
    }

    async verifyItemsSortedByNameZA(): Promise<void> {
        const names = await this.itemNames.allTextContents();
        expect(isSortedDescending(names)).toBe(true);
    }

    async verifyItemsSortedByPriceLowToHigh(): Promise<void> {
        const prices = await this.itemPrices.allTextContents();
        const numericPrices = prices.map(parsePrice);
        expect(isSortedAscending(numericPrices)).toBe(true);
    }

    async verifyItemsSortedByPriceHighToLow(): Promise<void> {
        const prices = await this.itemPrices.allTextContents();
        const numericPrices = prices.map(parsePrice);
        expect(isSortedDescending(numericPrices)).toBe(true);
    }

    async verifyCartBadgeCount(expectedCount: number): Promise<void> {
        if (expectedCount === 0) {
            await expect(this.cartBadge).toBeHidden();
        } else {
            await expect(this.cartBadge).toHaveText(expectedCount.toString());
        }
    }

    async verifyCartBadgeNotVisible(): Promise<void> {
        await expect(this.cartBadge).toBeHidden();
    }

    async verifySideMenuOptionsVisible(): Promise<void> {
        await expect(this.allItems).toBeVisible();
        await expect(this.about).toBeVisible();
        await expect(this.logout).toBeVisible();
        await expect(this.resetAppState).toBeVisible();
    }

    async verifyMenuOptionsHidden(): Promise<void> {
        await expect(this.allItems).toHaveAttribute('tabindex', '-1');
        await expect(this.about).toHaveAttribute('tabindex', '-1');
        await expect(this.logout).toHaveAttribute('tabindex', '-1');
        await expect(this.resetAppState).toHaveAttribute('tabindex', '-1');
    }

    async verifyAbout(): Promise<void> {
        await this.verifyCurrentUrl('https://saucelabs.com/');
    }

    async verifyAllItems(): Promise<void> {
        await this.verifyCurrentUrl(/.*inventory\.html/);
    }

    async verifyCartPageLoaded(): Promise<void> {
        await this.verifyCurrentUrl(/.*cart\.html/);
    }

}


