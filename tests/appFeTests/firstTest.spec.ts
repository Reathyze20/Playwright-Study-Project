import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Extracting values", async ({ page }) => {
  //single text extraction
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toEqual("Submit");

  //multiple text extraction
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();
  expect(allRadioButtonsLabels).toContain("Option 2");
  console.log(allRadioButtonsLabels);

  //create a speaker object
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual("test@test.com");

  const placeHolderValue = await emailField.getAttribute("placeholder");
  expect(placeHolderValue).toEqual("Email");
});

test("Assertions", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");

  //General assertions
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  //Locator assertion
  expect(basicFormButton).toHaveText("Submit");
});
