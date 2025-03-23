import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
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
    super(page);
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

  async formLayoutsPage() {
    await this.selectGroupMenuItem(this.formsComboBoxNavigation);
    await this.page.getByText("Form Layouts").click();
    await this.waitForNumberOfSeconds(10);
  }

  async datePickerPage() {
    await this.selectGroupMenuItem(this.formsComboBoxNavigation);
    await this.page.waitForTimeout(1000);
    await this.page.getByText("Datepicker").click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem(this.tablesDataComboBoxNavigation);
    await this.page.getByText("Smart Table").click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem(this.modalsOverlaysComboBoxNavigation);
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem(this.modalsOverlaysComboBoxNavigation);
    await this.page.getByText("Tooltip").click();
  }

  private async selectGroupMenuItem(groupMenuItem: Locator) {
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");

    if (expandedState == "false") {
      await groupMenuItem.click();
    }
  }
}
