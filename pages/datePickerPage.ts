import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectCommonDatePickerDateFromToday(
    daysFromToday: number
  ): Promise<void> {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(daysFromToday);
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerDateFromToday(startDate: number, endDate: number) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const dateToAssertStart = await this.selectDateInTheCalendar(startDate);
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDate);
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(
    numberOfTheDaysFromToday: number
  ): Promise<string> {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();

    let date = new Date();
    date.setDate(date.getDate() + numberOfTheDaysFromToday);

    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("default", {
      month: "short",
    });
    const expectedMonthLong = date.toLocaleString("default", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert;
  }
}
