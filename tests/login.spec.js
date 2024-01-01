// @ts-check
const { test, expect } = require("@playwright/test");

test("should register and login user", async ({ page }) => {
  await page.goto("/user/upload");

  await expect(page).toHaveTitle(/upload image/i);
});
