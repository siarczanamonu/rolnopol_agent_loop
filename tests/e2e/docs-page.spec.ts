import { expect, test } from "@playwright/test";
import { URLS } from "../config/urls";
import { DocsPage } from "../pages/DocsPage";

let docsPage: DocsPage;

test.beforeEach(async ({ page }) => {
	docsPage = new DocsPage(page);
	await docsPage.goto();
});

test.describe("Strona Dokumentacji Rolnopol – wczytanie i treść", () => {
	test("wczytuje stronę z poprawnym tytułem", async () => {
		await docsPage.expectPageLoaded();
	});

	test("wyświetla pełną nawigację górną", async () => {
		await docsPage.expectNavbarVisible();
	});

	test("wyświetla baner z tytułem i podtytułem", async () => {
		await docsPage.expectBannerVisible();
	});

	test("wyświetla spis treści (sidebar) z 10 linkami kotwicowymi", async () => {
		await docsPage.expectSidebarVisible();
	});

	test("wyświetla wszystkie 10 sekcji dokumentacji", async () => {
		await docsPage.expectAllSectionsVisible();
	});

	test("wyświetla 7 kart encji w sekcji Main Data Entities", async () => {
		// Act & Assert
		await docsPage.expectEntityCards([
			"User",
			"Field",
			"Animal",
			"Staff",
			"Assignment",
			"FinancialAccount",
			"MarketplaceOffer",
		]);
	});

	test("wyświetla kartę roli User z listą uprawnień", async () => {
		// Act & Assert
		await docsPage.expectRoleCardVisible("User");
	});

	test("wyświetla 6 funkcji w sekcji Main Features", async () => {
		// Act & Assert
		await docsPage.expectFeaturesListCount(6);
	});

	test("wyświetla 5 kart przepływów w sekcji Key User Flows", async () => {
		// Act & Assert
		await docsPage.expectUserFlowsCards([
			"Registration & Login",
			"Marketplace Trading",
			"Resource & Farm Management",
			"Financial Operations",
			"System Health Check",
		]);
	});

	test("wyświetla 4 punkty w sekcji API Basics", async () => {
		// Act & Assert
		await docsPage.expectApiBasicsListCount(4);
	});

	test("wyświetla 7 wskazówek w sekcji Testing Tips", async () => {
		// Act & Assert
		await docsPage.expectTestingTipsListCount(7);
	});

	test("wyświetla 3 karty kont demo w sekcji Demo Accounts", async () => {
		// Act & Assert
		await docsPage.expectDemoAccountsCount(3);
	});

	test("wyświetla strukturę tabeli w sekcji Asset–Finance–Marketplace Flow", async () => {
		// Act & Assert
		await docsPage.expectMarketplaceFlowStructure();
	});

	test("wyświetla 3 karty scenariuszy w sekcji End-to-End Scenarios", async () => {
		// Act & Assert
		await docsPage.expectE2eScenarioCards([
			"Register and Set Up Farm",
			"Sell a Field on the Marketplace",
			"Attempt to Buy with Insufficient Funds",
		]);
	});
});

test.describe("Strona Dokumentacji Rolnopol – nawigacja kotwicza (sidebar)", () => {
	test("klik w link Main Data Entities przewija do sekcji i aktualizuje hash", async () => {
		// Act
		await docsPage.clickSidebarLink("nav-entities");

		// Assert
		await docsPage.expectHashInUrl("#entities");
		await docsPage.expectSectionInViewport("entities");
	});

	test("klik w link sidebar aktualizuje aktywny link", async () => {
		// Act
		await docsPage.clickSidebarLink("nav-features");

		// Assert
		await docsPage.expectActiveSidebarLink("Main Features");
	});

	test("każdy link sidebar prowadzi do właściwej sekcji", async () => {
		// Act & Assert
		await docsPage.expectEachSidebarLinkNavigates();
	});
});

test.describe("Strona Dokumentacji Rolnopol – nawigacja z poziomu menu górnego", () => {
	test("link Home prowadzi na stronę główną", async () => {
		await docsPage.clickHomeLink();
		await expect(docsPage.page).toHaveURL(URLS.home);
	});

	test("link Alerts prowadzi na stronę alertów", async () => {
		await docsPage.clickAlertsLink();
		await expect(docsPage.page).toHaveURL(URLS.alerts);
	});

	test("link API Explorer prowadzi na stronę swagger", async () => {
		await docsPage.clickApiExplorerLink();
		await expect(docsPage.page).toHaveURL(URLS.apiExplorer);
	});

	test("link Register prowadzi na stronę rejestracji", async () => {
		await docsPage.clickRegisterLink();
		await expect(docsPage.page).toHaveURL(URLS.register);
	});

	test("link Login prowadzi na stronę logowania", async () => {
		await docsPage.clickLoginLink();
		await expect(docsPage.page).toHaveURL(URLS.login);
	});
});

test.describe("Strona Dokumentacji Rolnopol – stopka i linki zewnętrzne", () => {
	test("wyświetla stopkę z linkiem Contact i tekstem copyright", async () => {
		await docsPage.expectFooterVisible();
	});

	test("link Contact w stopce prowadzi na stronę kontaktu", async () => {
		await docsPage.clickContactLink();
		await expect(docsPage.page).toHaveURL(URLS.contact);
	});

	test("link jaktestowac.pl ma poprawny atrybut href", async () => {
		await docsPage.expectExternalLinkHref(
			"jaktestowac.pl",
			"https://jaktestowac.pl",
			true,
		);
	});

	test("link GitHub Rolnopol repository ma poprawny atrybut href", async () => {
		await docsPage.expectExternalLinkHref(
			"GitHub Rolnopol repository",
			"https://github.com/jaktestowac/rolnopol",
		);
	});
});
