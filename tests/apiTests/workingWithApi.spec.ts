import { test, expect } from "@playwright/test";
import tags from "../../src/test-data/tags.json"; // Import testovacích dat z JSON souboru

// Před každým testem nastavíme routování a přesměrování API požadavků
test.beforeEach(async ({ page }) => {
  // Zachytáváme požadavky na endpoint "*/**/api/tags" a vracíme testovací data
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags), // Vracíme obsah JSON souboru jako odpověď
    });
  });

  // Zachytáváme požadavky na endpoint "*/**/api/articles*" a manipulujeme s odpovědí
  await page.route("*/**/api/articles*", async (route) => {
    await page.waitForTimeout(500); // Umělé zpoždění pro simulaci latence
    const response = await route.fetch(); // Provede původní požadavek na server
    const responseBody = await response.json(); // Získá odpověď ve formátu JSON

    // Modifikujeme první článek v odpovědi
    responseBody.articles[0].title = "This is a test title"; // Nastavíme testovací titulek
    responseBody.articles[0].description =
      "This is a test description that should be visible"; // Nastavíme testovací popis

    // Vracíme modifikovanou odpověď
    await route.fulfill({
      body: JSON.stringify(responseBody), // Vracíme upravený JSON
    });
  });

  // Otevřeme testovanou stránku
  await page.goto("https://conduit.bondaracademy.com");
});

// Test ověřuje, že stránka obsahuje správný název aplikace
test("has title", async ({ page }) => {
  await page.waitForTimeout(500); // Umělé zpoždění
  await expect(page.locator(".navbar-brand")).toHaveText("conduit"); // Ověření textu v navigačním panelu
});

// Test ověřuje, že stránka obsahuje upravené články
test("has title no2", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("conduit"); // Ověření textu v navigačním panelu
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is a test title" // Ověření upraveného titulku článku
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "This is a test description that should be visible" // Ověření upraveného popisu článku
  );
});
