// @ts-check
const { test, expect } = require("@playwright/test");

test("should register and login user", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /register/i }).click();

  await expect(page).toHaveTitle(/register/i);
  await page.getByLabel(/email/i).fill("test@test.com");
  await page.getByLabel(/password/i).fill("1234");

  await page.getByRole("button", { name: /register/i }).click();

  await page.getByRole("link", { name: /login/i }).click();

  await expect(page).toHaveTitle(/login/i);

  await page.getByLabel(/email/i).fill("test@test.com");
  await page.getByLabel(/password/i).fill("1234");

  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByRole("listitem")).toHaveCount(3);
});
