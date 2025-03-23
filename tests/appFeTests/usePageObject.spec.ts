import { test, expect } from "@playwright/test";
import { PageManager } from "../../pages/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to Form Layouts", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "Welcome1",
      "Option 2"
    );
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      "John Smich",
      "John@test.com",
      true
    );
  await pm.navigateTo().datePickerPage();
  await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
  await pm.onDatePickerPage().selectDatepickerDateFromToday(7, 14);
});
