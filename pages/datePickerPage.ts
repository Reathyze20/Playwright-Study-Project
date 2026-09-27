import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

// Třída reprezentující stránku s DatePickerem, dědí z HelperBase
export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page); // Volání konstruktoru rodičovské třídy
  }

  // Metoda pro výběr data v "Common Date Picker" relativně k dnešnímu dni
  async selectCommonDatePickerDateFromToday(
    daysFromToday: number
  ): Promise<void> {
    const calendarInputField = this.page.getByPlaceholder("Form Picker"); // Najde pole kalendáře podle placeholderu
    await calendarInputField.click(); // Klikne na pole kalendáře
    const dateToAssert = await this.selectDateInTheCalendar(daysFromToday); // Vybere datum v kalendáři
    await expect(calendarInputField).toHaveValue(dateToAssert); // Ověří, že hodnota pole odpovídá vybranému datu
  }

  // Metoda pro výběr rozsahu dat v "Range Picker" relativně k dnešnímu dni
  async selectDatepickerDateFromToday(startDate: number, endDate: number) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker"); // Najde pole kalendáře podle placeholderu
    await calendarInputField.click(); // Klikne na pole kalendáře
    const dateToAssertStart = await this.selectDateInTheCalendar(startDate); // Vybere počáteční datum
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDate); // Vybere koncové datum
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`; // Sestaví text reprezentující rozsah dat
    await expect(calendarInputField).toHaveValue(dateToAssert); // Ověří, že hodnota pole odpovídá vybranému rozsahu dat
  }

  // Soukromá metoda pro výběr konkrétního data v kalendáři
  private async selectDateInTheCalendar(
    numberOfTheDaysFromToday: number
  ): Promise<string> {
    const calendarInputField = this.page.getByPlaceholder("Form Picker"); // Najde pole kalendáře podle placeholderu
    await calendarInputField.click(); // Klikne na pole kalendáře

    // Vypočítá požadované datum na základě aktuálního dne
    let date = new Date();
    date.setDate(date.getDate() + numberOfTheDaysFromToday);

    // Získá jednotlivé části data (den, měsíc, rok) ve správném formátu
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("default", {
      month: "short",
    });
    const expectedMonthLong = date.toLocaleString("default", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`; // Sestaví datum ve formátu "MMM DD, YYYY"

    // Získá aktuální měsíc a rok z kalendáře
    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`; // Očekávaný měsíc a rok
    // Posouvá kalendář dopředu, dokud nenajde správný měsíc a rok
    while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    // Klikne na konkrétní den v kalendáři
    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert; // Vrátí datum ve formátu "MMM DD, YYYY"
  }
}
