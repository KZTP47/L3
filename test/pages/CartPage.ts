import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage hanterar allt som sker inne i varukorgen.
 *
 * VAD VI ÄNDRADE FRÅN ORIGINALUPPGIFTEN:
 * - I originaltestet låg kontroller och klick direkt i testfilen.
 * - Här samlar vi varukorgens element och handlingar på ett ställe.
 * - Det gör testerna kortare och gör det enklare att ändra koden om sidan ändras.
 */
export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly quantityInput: Locator;
  readonly updateCartButton: Locator;
  readonly removeCheckbox: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Rubriken som visar att vi faktiskt är inne i varukorgen.
    this.heading = page.getByRole('heading', { name: 'Shopping cart', exact: true });

    // Inputfältet där antal produkter visas och kan ändras.
    this.quantityInput = page.locator('.qty-input');

    // Knappen som sparar ändringar i varukorgen.
    this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });

    // Kryssrutan som markerar att en produkt ska tas bort.
    this.removeCheckbox = page.locator('input[name="removefromcart"]');

    // Texten som visas när varukorgen är tom.
    this.emptyCartMessage = page.getByText('Your Shopping Cart is empty!');
  }

  // Kontrollerar att varukorgen är öppen.
  async expectCartIsOpen(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  // Ändrar antal produkter och klickar på uppdatera.
  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
    await this.updateCartButton.click();
  }

  // Kontrollerar att antal produkter är det vi förväntar oss.
  async expectQuantity(quantity: string): Promise<void> {
    await expect(this.quantityInput).toHaveValue(quantity);
  }

  // Tar bort första produkten från varukorgen.
  async removeFirstItem(): Promise<void> {
    await this.removeCheckbox.check();
    await this.updateCartButton.click();
  }

  // Kontrollerar att varukorgen är tom.
  async expectCartIsEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}
