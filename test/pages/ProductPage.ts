import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductPage hanterar produktsidor och produktlistor.
 *
 * VAD VI ÄNDRADE FRÅN ORIGINALUPPGIFTEN:
 * - I originaltestet klickade testfilen själv på produktnamn och "Add to cart".
 * - Nu ligger produktlogiken här istället.
 * - Testfilen kan därför säga vad den vill göra, utan att visa alla tekniska klick.
 */
export class ProductPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly closeBannerButton: Locator;

  constructor(page: Page) {
    super(page);

    // Knappen som lägger den öppnade produkten i varukorgen.
    this.addToCartButton = page.locator('.add-to-cart-panel').getByRole('button', { name: 'Add to cart' });

    // Det lilla krysset i den gröna bekräftelserutan efter att en vara lagts till.
    this.closeBannerButton = page.getByTitle('Close');
  }

  // Öppnar en produkt genom att klicka på produktens namn i listan.
  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }

  // Lägger den produkt som redan är öppen i varukorgen.
  async addCurrentProductToCart(): Promise<void> {
    await this.addToCartButton.click();
    await this.closeBannerButton.click();
  }

  // Kombinerar två steg: öppna en produkt och lägg den i varukorgen.
  async addProductToCart(productName: string): Promise<void> {
    await this.openProduct(productName);
    await this.addCurrentProductToCart();
  }
}
