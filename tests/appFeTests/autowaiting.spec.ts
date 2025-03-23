import { Expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test("Autowaiting", async ({ page }) => {
  const successButton = page.locator("bg-success");
  await successButton.click();
});
