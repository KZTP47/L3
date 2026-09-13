import { test } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';

/**
 * VAD VI ÄNDRADE FRÅN ORIGINALUPPGIFTEN:
 *
 * Originalet hade mycket upprepad kod:
 * - hitta kategorimenyn
 * - klicka på kategori
 * - klicka på produkt
 * - lägga produkt i varukorgen
 * - öppna varukorgen
 * - kontrollera antal
 *
 * Nu använder testet Page Object Model:
 * - ProductPage tar hand om produktflödet.
 * - CartPage tar hand om varukorgen.
 * - BasePage innehåller sådant som flera sidor delar.
 *
 * Resultatet är att testet läser mer som en instruktion och mindre som teknisk webbkod.
 */
test.describe('Update the shopping cart', () => {
  test(`Remove added 'desktops'-product from the shopping cart and verify its empty`, async ({ page }) => {
    // ARRANGE: skapa sidobjekt och förbered testet.
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.goto('/computers');
    await productPage.openCategory('Desktops');
    await productPage.addProductToCart('Build your own cheap computer');

    // Kontrollera att produkten verkligen hamnade i varukorgen innan vi tar bort den.
    await productPage.openCart();
    await cartPage.expectCartIsOpen();
    await cartPage.expectQuantity('1');

    // ACT: ta bort produkten från varukorgen.
    await cartPage.removeFirstItem();

    // ASSERT: kontrollera att varukorgen är tom efter borttagningen.
    await cartPage.expectCartIsEmpty();
  });

  test(`Increase amount of 'Notebooks'-products in the shopping cart and verify their quantity`, async ({ page }) => {
    // ARRANGE: skapa sidobjekt och bestäm vilket antal vi vill ändra till.
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const updatedQuantity = '9';

    await productPage.goto('/computers');
    await productPage.openCategory('Notebooks');
    await productPage.addProductToCart('14.1-inch Laptop');

    await productPage.openCart();
    await cartPage.expectCartIsOpen();
    await cartPage.expectQuantity('1');

    // ACT: ändra antal produkter i varukorgen.
    await cartPage.setQuantity(updatedQuantity);

    // ASSERT: kontrollera att det nya antalet sparades.
    await cartPage.expectQuantity(updatedQuantity);
  });
});
