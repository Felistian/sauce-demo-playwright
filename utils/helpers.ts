/**
 * Converts a currency string (e.g., "$29.99", "Item total: $29.99") to a raw float.
 * Useful for mathematical assertions or numerical sorting.
 */
export function parsePrice(priceText: string): number {
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Formats a numeric value into standard Sauce Demo USD currency format.
 * Example: 29.99 -> "$29.99"
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Generates dynamic, realistic mock data for checkout forms.
 * Prevents test data collisions.
 */
export function generateFakeCheckoutData(): CheckoutData {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return {
    firstName: `TestUser${randomSuffix}`,
    lastName: `Doe${randomSuffix}`,
    postalCode: `${Math.floor(10000 + Math.random() * 90000)}`
  };
}

/**
 * Checks if an array of strings or numbers is sorted in ascending order.
 */
export function isSortedAscending<T extends string | number>(arr: T[]): boolean {
  return arr.every((val, i) => i === 0 || arr[i - 1] <= val);
}

/**
 * Checks if an array of strings or numbers is sorted in descending order.
 */
export function isSortedDescending<T extends string | number>(arr: T[]): boolean {
  return arr.every((val, i) => i === 0 || arr[i - 1] >= val);
}

/**
 * Returns a human-readable timestamp safe for filenames and logs.
 * Example format: 2026-05-25_15-40-15
 */
export function getFormattedTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

/**
 * Safely fetches an environment variable or falls back to a default value.
 * Throws a clean error if a critical key is missing.
 */
export function getEnvVar(key: string, required = false, defaultValue = ''): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`CRITICAL CONFIG ERROR: Environment variable '${key}' is missing but required! Check your .env file.`);
  }
  return value || defaultValue;
}
