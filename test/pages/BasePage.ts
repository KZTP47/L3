import { expect, Locator, Page } from '@playwright/test';

/**
 * BasePage är en gemensam grundklass för flera sidor.
 *
 * VAD VI ÄNDRADE FRÅN ORIGINALUPPGIFTEN:
 * - I originaltestet upprepades samma navigering flera gånger.
 * - Här samlar vi sådant som finns på flera sidor: sidnavigering, kategorimenyn
 *   och länken till varukorgen.
 * - ProductPage och CartPage ärver från BasePage, så de får dessa funktioner gratis.
 */
export class BasePage {
  readonly page: Page;
  readonly categoryMenu: Locator;
  readonly cartLink: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Vänstermenyn där kategorier som "Desktops" och "Notebooks" finns.
    this.categoryMenu = page.locator('div.listbox');

    // Länken högst upp som öppnar varukorgen.
    this.cartLink = page.getByRole('link', { name: /Shopping cart/ });

    // Huvudrubriken på sidan. Den används för att kontrollera att vi hamnat rätt.
    this.pageHeading = page.getByRole('heading', { level: 1 });
  }

  // Öppnar en sida på Demo Web Shop. Standard är /computers eftersom båda testerna börjar där.
  async goto(path: string = '/computers'): Promise<void> {
    await this.page.goto(`https://demowebshop.tricentis.com${path}`);
  }

  // Klickar på en kategori och kontrollerar direkt att rätt kategorisida öppnades.
  async openCategory(categoryName: string): Promise<void> {
    await this.categoryMenu.getByRole('link', { name: categoryName, exact: true }).click();
    await expect(this.pageHeading).toContainText(categoryName);
  }

  // Öppnar varukorgen.
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
