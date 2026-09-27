import { Page } from "@playwright/test";

// Základní třída HelperBase, která poskytuje společné metody pro práci se stránkou
export class HelperBase {
  readonly page: Page; // Proměnná pro uchování instance stránky Playwrightu

  constructor(page: Page) {
    this.page = page; // Inicializace instance stránky
  }

  /**
   * Metoda pro čekání po zadaný počet sekund
   * @param timeInSeconds - Počet sekund, po které má test čekat
   */
  async waitForNumberOfSeconds(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000); // Převod sekund na milisekundy a čekání
  }
}
