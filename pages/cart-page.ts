import { Page,Locator,expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {

    // Locators
    private pageTitle: Locator;
    private cartItems: Locator;
    private checkoutButton: Locator;
    private continueShoppingButton: Locator;
    private cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }


    // Actions
    async navigateToCart(): Promise<void> {
        await this.goto('/cart.html');
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async removeItem(itemName: string): Promise<void> {
        const item = this.cartItems.filter({ has: this.page.getByText(itemName) });
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    async clickItemName(itemName: string): Promise<void> {
        const item = this.cartItems.filter({ has: this.page.getByText(itemName) });
        await item.getByRole('link').click();
    }

    // Verifications

    async verifyCartPageLoaded(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
    }

    async verifyItemInCart(itemName: string, price: string, quantity: string = '1'): Promise<void> {
        const item = this.cartItems.filter({ has: this.page.getByText(itemName) });
        await expect(item.locator('.inventory_item_price')).toHaveText(price);
        await expect(item.locator('.cart_quantity')).toHaveText(quantity);
    }

    async verifyCartItemCount(expectedCount: number): Promise<void> {
        await this.verifyElementCount(this.cartItems, expectedCount);
    }

    async verifyCartIsEmpty(): Promise<void> {
        await expect(this.cartItems).toHaveCount(0);
        await expect(this.cartBadge).not.toBeVisible();
    }

    async verifyItemIsRemoved(itemName: string): Promise<void> {
        const item = this.cartItems.filter({ has: this.page.getByText(itemName) });
        await expect(item).not.toBeVisible();
    }

    async verifyItemDetailsPageURL(itemName: string): Promise<void> {
        await this.verifyCurrentUrl(/.*inventory-item\.html/);
        await expect(this.page.locator('.inventory_details_name')).toHaveText(itemName);
    }

    async verifyCheckoutPageURL(): Promise<void> {  
        await this.verifyCurrentUrl(/.*checkout.*\.html/);
    }
}
