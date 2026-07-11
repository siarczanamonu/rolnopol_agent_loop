import { expect, test } from "@playwright/test";
import { URLS } from "../config/urls";
import { HomePage } from "../pages/HomePage";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
	homePage = new HomePage(page);
	await homePage.goto();
});

test.describe("Strona główna Rolnopol – wczytanie i treść", () => {
	test("wczytuje stronę z poprawnym tytułem", async () => {
		await homePage.expectPageLoaded();
	});

	test("wyświetla pełną nawigację górną", async () => {
		await homePage.expectNavbarVisible();
	});

	test("wyświetla sekcję hero z nagłówkiem i opisem", async () => {
		await homePage.expectHeroVisible();
	});

	test("wyświetla wszystkie karty statystyk", async () => {
		await homePage.expectStatsCardsVisible();
	});

	test("wyświetla wartości statystyk większe od zera", async () => {
		const activeUsers = await homePage.getActiveUsersCount();
		const managedFarms = await homePage.getManagedFarmsCount();
		const totalStaff = await homePage.getTotalStaffCount();

		expect(activeUsers).toBeGreaterThan(0);
		expect(managedFarms).toBeGreaterThan(0);
		expect(totalStaff).toBeGreaterThan(0);
	});

	test("wyświetla przyciski CTA (Get Started Free, Sign In)", async () => {
		await homePage.expectCtaButtonsVisible();
	});

	test("wyświetla stopkę z linkiem Contact i tekstem copyright", async () => {
		await homePage.expectFooterVisible();
	});
});

test.describe("Strona główna Rolnopol – nawigacja z poziomu menu górnego", () => {
	test("link Home prowadzi na stronę główną", async () => {
		await homePage.clickHomeLink();
		await expect(homePage.page).toHaveURL(URLS.home);
	});

	test("link Alerts prowadzi na stronę alerts", async () => {
		await homePage.clickAlertsLink();
		await expect(homePage.page).toHaveURL(URLS.alerts);
	});

	test("link Documentation prowadzi na stronę dokumentacji", async () => {
		await homePage.clickDocumentationLink();
		await expect(homePage.page).toHaveURL(URLS.documentation);
	});

	test("link API Explorer prowadzi na stronę swagger", async () => {
		await homePage.clickApiExplorerLink();
		await expect(homePage.page).toHaveURL(URLS.apiExplorer);
	});

	test("link Register prowadzi na stronę rejestracji", async () => {
		await homePage.clickRegisterLink();
		await expect(homePage.page).toHaveURL(URLS.register);
	});

	test("link Login prowadzi na stronę logowania", async () => {
		await homePage.clickLoginLink();
		await expect(homePage.page).toHaveURL(URLS.login);
	});
});

test.describe("Strona główna Rolnopol – nawigacja przez przyciski CTA", () => {
	test("przycisk Get Started Free prowadzi na stronę rejestracji", async () => {
		await homePage.clickGetStartedButton();
		await expect(homePage.page).toHaveURL(URLS.register);
	});

	test("przycisk Sign In prowadzi na stronę logowania", async () => {
		await homePage.clickSignInButton();
		await expect(homePage.page).toHaveURL(URLS.login);
	});
});

test.describe("Strona główna Rolnopol – stopka i linki zewnętrzne", () => {
	test("link Contact w stopce prowadzi na stronę kontaktu", async () => {
		await homePage.clickContactLink();
		await expect(homePage.page).toHaveURL(URLS.contact);
	});

	test("link jaktestowac.pl ma poprawny atrybut href", async () => {
		await homePage.expectExternalLinkHref(
			"jaktestowac.pl",
			"https://jaktestowac.pl",
			true,
		);
	});

	test("link GitHub Rolnopol repository ma poprawny atrybut href", async () => {
		await homePage.expectExternalLinkHref(
			"GitHub Rolnopol repository",
			"https://github.com/jaktestowac/rolnopol",
		);
	});
});
