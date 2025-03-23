import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutPage } from "./formLayoutPage";
import { DatepickerPage } from "./datePickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutPage;
  private readonly datepickerPage: DatepickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutPage = new FormLayoutPage(this.page);
    this.datepickerPage = new DatepickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutPage;
  }

  onDatePickerPage() {
    return this.datepickerPage;
  }
}
