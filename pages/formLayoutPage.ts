import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

// Třída reprezentující stránku s formuláři, dědí z HelperBase
export class FormLayoutPage extends HelperBase {
  constructor(page: Page) {
    super(page); // Volání konstruktoru rodičovské třídy
  }

  /**
   * Metoda pro vyplnění a odeslání formuláře "Using the Grid"
   * @param email - Emailová adresa uživatele
   * @param password - Heslo uživatele
   * @param optionText - Text možnosti, která má být vybrána (např. radio button)
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    // Najde formulář "Using the Grid" podle textu v kartě
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // Vyplní pole pro email
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);

    // Vyplní pole pro heslo
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);

    // Vybere radio button podle zadaného textu
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    // Klikne na tlačítko pro odeslání formuláře
    await usingTheGridForm.getByRole("button").click();
  }

  /**
   * Metoda pro vyplnění a odeslání "Inline form"
   * @param name - Jméno a příjmení uživatele
   * @param email - Platná emailová adresa uživatele
   * @param rememberMe - Boolean hodnota, zda má být zaškrtnuto "Remember me"
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    // Najde formulář "Inline form" podle textu v kartě
    const inlineForm = this.page.locator("nb-card", {
      hasText: "Inline form",
    });

    // Vyplní pole pro jméno
    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);

    // Vyplní pole pro email
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);

    // Pokud je `rememberMe` true, zaškrtne checkbox
    if (rememberMe)
      await inlineForm.getByRole("checkbox").check({ force: true });

    // Klikne na tlačítko pro odeslání formuláře
    await inlineForm.getByRole("button").click();
  }
}
