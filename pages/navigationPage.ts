import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

// Třída reprezentující navigaci na stránce, dědí z HelperBase
export class NavigationPage extends HelperBase {
  // Lokátory pro jednotlivé navigační prvky
  formsComboBoxNavigation: Locator;
  formLayoutsNavigation: Locator;
  datePickerNavigation: Locator;
  modalsOverlaysComboBoxNavigation: Locator;
  dialogNavigation: Locator;
  windowNavigation: Locator;
  popoverNavigation: Locator;
  toastrNavigation: Locator;
  tooltipNavigation: Locator;
  extraComponentComboBoxNavigation: Locator;
  calendarNavigation: Locator;
  chartsComboBoxNavigation: Locator;
  echartsNavigation: Locator;
  tablesDataComboBoxNavigation: Locator;
  smartTableNavigation: Locator;
  treeGridNavigation: Locator;
  authComboBoxNavigation: Locator;
  loginNavigation: Locator;
  registerNavigation: Locator;
  requestPasswordNavigation: Locator;

  constructor(page: Page) {
    super(page); // Volání konstruktoru rodičovské třídy

    // Inicializace lokátorů pro navigační prvky
    this.formsComboBoxNavigation = this.page.getByTitle("Forms");
    this.formLayoutsNavigation = this.page.getByTitle("Form Layouts");

    this.datePickerNavigation = this.page.getByTitle("Datepicker");
    this.modalsOverlaysComboBoxNavigation =
      this.page.getByTitle("Modal & Overlays");
    this.dialogNavigation = this.page.getByTitle("Dialog");
    this.windowNavigation = this.page.getByTitle("Window");
    this.popoverNavigation = this.page.getByTitle("Popover");
    this.toastrNavigation = this.page.getByTitle("Toastr");
    this.tooltipNavigation = this.page.getByTitle("Tooltip");

    this.extraComponentComboBoxNavigation =
      this.page.getByTitle("Extra Components");
    this.calendarNavigation = this.page.getByTitle("Calendar");
    this.chartsComboBoxNavigation = this.page.getByTitle("Charts");
    this.echartsNavigation = this.page.getByTitle("Echarts");

    this.tablesDataComboBoxNavigation = this.page.getByTitle("Tables & Data");
    this.smartTableNavigation = this.page.getByTitle("Smart Table");
    this.treeGridNavigation = this.page.getByTitle("Tree Grid");

    this.authComboBoxNavigation = this.page.getByTitle("Auth");
    this.loginNavigation = this.page.getByTitle("Login");
    this.registerNavigation = this.page.getByTitle("Register");
    this.requestPasswordNavigation = this.page.getByTitle("Request Password");
  }

  /**
   * Naviguje na stránku "Form Layouts"
   */
  async formLayoutsPage() {
    await this.selectGroupMenuItem(this.formsComboBoxNavigation); // Rozbalí menu "Forms"
    await this.page.getByText("Form Layouts").click(); // Klikne na položku "Form Layouts"
    await this.waitForNumberOfSeconds(10); // Počká 10 sekund
  }

  /**
   * Naviguje na stránku "Datepicker"
   */
  async datePickerPage() {
    await this.selectGroupMenuItem(this.formsComboBoxNavigation); // Rozbalí menu "Forms"
    await this.page.waitForTimeout(1000); // Počká 1 sekundu
    await this.page.getByText("Datepicker").click(); // Klikne na položku "Datepicker"
  }

  /**
   * Naviguje na stránku "Smart Table"
   */
  async smartTablePage() {
    await this.selectGroupMenuItem(this.tablesDataComboBoxNavigation); // Rozbalí menu "Tables & Data"
    await this.page.getByText("Smart Table").click(); // Klikne na položku "Smart Table"
  }

  /**
   * Naviguje na stránku "Toastr"
   */
  async toastrPage() {
    await this.selectGroupMenuItem(this.modalsOverlaysComboBoxNavigation); // Rozbalí menu "Modal & Overlays"
    await this.page.getByText("Toastr").click(); // Klikne na položku "Toastr"
  }

  /**
   * Naviguje na stránku "Tooltip"
   */
  async tooltipPage() {
    await this.selectGroupMenuItem(this.modalsOverlaysComboBoxNavigation); // Rozbalí menu "Modal & Overlays"
    await this.page.getByText("Tooltip").click(); // Klikne na položku "Tooltip"
  }

  /**
   * Rozbalí skupinovou položku menu, pokud není již rozbalená
   * @param groupMenuItem - Lokátor skupinové položky menu
   */
  private async selectGroupMenuItem(groupMenuItem: Locator) {
    const expandedState = await groupMenuItem.getAttribute("aria-expanded"); // Zjistí, zda je menu rozbalené

    if (expandedState == "false") {
      await groupMenuItem.click(); // Klikne na menu, pokud není rozbalené
    }
  }
}
