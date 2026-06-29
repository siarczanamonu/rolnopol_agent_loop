import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
	test.beforeEach(async ({ page }) => {
		const response = await page.goto("/");
		expect(
			response,
			"expected a navigation response for the home page",
		).not.toBeNull();
		expect(response?.status()).toBe(200);
		expect(response?.headers()["content-type"]).toContain("text/html");
	});

	test("HP-01: page URL is http://localhost:3000/", async ({ page }) => {
		await expect(page).toHaveURL("http://localhost:3000/");
	});

	test('HP-02: page title is "Rolnopol"', async ({ page }) => {
		await expect(page).toHaveTitle("Rolnopol");
	});

	test('HP-03: hero heading h2 "Welcome to Rolnopol" is visible', async ({
		page,
	}) => {
		await expect(
			page.getByRole("heading", { level: 2, name: "Welcome to Rolnopol" }),
		).toBeVisible();
	});

	test('HP-04: tagline "Futuristic Farm & Resource Management" is visible', async ({
		page,
	}) => {
		await expect(
			page.getByText("Futuristic Farm & Resource Management"),
		).toBeVisible();
	});

	test("HP-05: shows key farm intelligence statistics", async ({ page }) => {
		for (const label of [
			"Active Users",
			"Managed Farms",
			"Total Area (ha)",
			"Total Staff",
			"Stock Animals",
		]) {
			await expect(page.getByText(label)).toBeVisible();
		}
	});

	test("HP-06: header Register link navigates to /register.html", async ({
		page,
	}) => {
		await page
			.getByRole("navigation")
			.getByRole("link", { name: "Register" })
			.click();
		await expect(page).toHaveURL(/\/register\.html$/);
	});

	test("HP-07: header Login link navigates to /login.html", async ({
		page,
	}) => {
		await page
			.getByRole("navigation")
			.getByRole("link", { name: "Login" })
			.click();
		await expect(page).toHaveURL(/\/login\.html$/);
	});

	test("HP-08: hero Sign In link navigates to /login.html", async ({
		page,
	}) => {
		await page.getByRole("main").getByRole("link", { name: "Sign In" }).click();
		await expect(page).toHaveURL(/\/login\.html$/);
	});

	test("HP-09: footer Contact link navigates to /contact.html", async ({
		page,
	}) => {
		await page
			.getByRole("contentinfo")
			.getByRole("link", { name: "Contact" })
			.click();
		await expect(page).toHaveURL(/\/contact\.html$/);
	});
});
