import { Page, expect } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutPage } from "./formLayoutPage";
import { DatepickerPage } from "./datePickerPage";

// Třída PageManager slouží jako správce stránek a poskytuje přístup k jednotlivým stránkám aplikace
export class PageManager {
  private readonly page: Page; // Instance stránky Playwrightu
  private readonly navigationPage: NavigationPage; // Instance třídy NavigationPage
  private readonly formLayoutPage: FormLayoutPage; // Instance třídy FormLayoutPage
  private readonly datepickerPage: DatepickerPage; // Instance třídy DatepickerPage

  constructor(page: Page) {
    this.page = page; // Inicializace instance stránky
    this.navigationPage = new NavigationPage(this.page); // Inicializace navigační stránky
    this.formLayoutPage = new FormLayoutPage(this.page); // Inicializace stránky s formuláři
    this.datepickerPage = new DatepickerPage(this.page); // Inicializace stránky s DatePickerem
  }

  /**
   * Vrací instanci NavigationPage pro práci s navigací
   */
  navigateTo() {
    return this.navigationPage;
  }

  /**
   * Vrací instanci FormLayoutPage pro práci s formuláři
   */
  onFormLayoutsPage() {
    return this.formLayoutPage;
  }

  /**
   * Vrací instanci DatepickerPage pro práci s DatePickerem
   */
  onDatePickerPage() {
    return this.datepickerPage;
  }
}
