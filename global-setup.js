const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const user = {
    email: "test@user.com",
    password: "password",
  };
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:2112/auth/register");
  await page.getByLabel(/email/i).fill(user.email);
  await page.getByLabel(/password/i).fill(user.password);
  await page.getByText(/register/i).click();
  await page.getByRole("link", { name: /login/i }).click();
  await page.getByLabel(/email/i).fill(user.email);
  await page.getByLabel(/password/i).fill(user.password);
  await page.getByText(/login/i).click();
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
};
