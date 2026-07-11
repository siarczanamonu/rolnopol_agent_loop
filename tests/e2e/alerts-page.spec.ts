import { expect, test } from "@playwright/test";
import { URLS } from "../config/urls";
import { AlertsPage } from "../pages/AlertsPage";

let alertsPage: AlertsPage;

test.beforeEach(async ({ page }) => {
	alertsPage = new AlertsPage(page);
	await alertsPage.goto();
});

test.describe("Strona Alertów Rolnopol – wczytanie i treść", () => {
	test("wczytuje stronę z poprawnym tytułem", async () => {
		await alertsPage.expectPageLoaded();
	});

	test("wyświetla pełną nawigację górną", async () => {
		await alertsPage.expectNavbarVisible();
	});

	test("wyświetla baner z nazwą aplikacji i podtytułem", async () => {
		await alertsPage.expectBannerVisible();
	});

	test("wyświetla nagłówek sekcji Alerts z opisem", async () => {
		await alertsPage.expectSectionHeaderVisible();
	});

	test("wyświetla wszystkie filtry i przycisk odświeżania", async () => {
		await alertsPage.expectFiltersVisible();
	});

	test("zawiera pięć opcji w filtrze nasilenia", async () => {
		await alertsPage.expectSeverityFilterOptions();
	});

	test("zawiera 16 województw w filtrze regionu", async () => {
		await alertsPage.expectRegionFilterCount(16);
	});

	test("wyświetla trzy sekcje alertów z licznikami", async () => {
		await alertsPage.expectSectionsVisible();
	});

	test("wyświetla co najmniej jedną kartę alertu w sekcjach", async () => {
		const totalCards = await alertsPage.getVisibleAlertCardsCount();
		expect(totalCards).toBeGreaterThan(0);
	});

	test("karty alertów mają pełną strukturę (tytuł, kategoria, data, badge, komunikat)", async () => {
		await alertsPage.expectAlertCardStructure();
	});
});

test.describe("Strona Alertów Rolnopol – wyszukiwarka", () => {
	test("filtruje alerty po wpisaniu istniejącego tytułu i aktualizuje liczniki", async () => {
		// Arrange
		const titles = await alertsPage.getVisibleAlertTitles();
		expect(titles.length).toBeGreaterThan(0);
		const firstTitle = titles[0];
		const beforeVisible = await alertsPage.getVisibleAlertCardsCount();

		// Act
		await alertsPage.searchAlerts(firstTitle);

		// Assert
		const afterVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(afterVisible).toBeLessThanOrEqual(beforeVisible);
		expect(afterVisible).toBeGreaterThanOrEqual(1);
		const todayCount = await alertsPage.getTodayCount();
		const historyCount = await alertsPage.getHistoryCount();
		const upcomingCount = await alertsPage.getUpcomingCount();
		expect(todayCount + historyCount + upcomingCount).toBe(afterVisible);
	});

	test("czyszczenie wyszukiwarki przywraca wszystkie alerty", async () => {
		// Arrange
		const titles = await alertsPage.getVisibleAlertTitles();
		expect(titles.length).toBeGreaterThan(0);
		await alertsPage.searchAlerts(titles[0]);

		// Act
		await alertsPage.clearSearch();

		// Assert
		const afterVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(afterVisible).toBeGreaterThanOrEqual(1);
	});

	test("nieistniejąca fraza powoduje stan pusty z zerowymi licznikami", async () => {
		// Act
		await alertsPage.searchAlerts("zzzznonexistentphrase");

		// Assert
		const visibleCount = await alertsPage.getVisibleAlertCardsCount();
		expect(visibleCount).toBe(0);
		expect(await alertsPage.getTodayCount()).toBe(0);
		expect(await alertsPage.getHistoryCount()).toBe(0);
		expect(await alertsPage.getUpcomingCount()).toBe(0);
	});
});

test.describe("Strona Alertów Rolnopol – filtr nasilenia", () => {
	test("filtr wg nasilenia pierwszej karty pokazuje tylko alerty o tym nasileniu", async () => {
		// Arrange
		const severities = await alertsPage.getVisibleAlertSeverities();
		expect(severities.length).toBeGreaterThan(0);
		const firstSeverity = severities[0];

		// Act
		await alertsPage.selectSeverity(firstSeverity);

		// Assert
		const visibleSeverities = await alertsPage.getVisibleAlertSeverities();
		expect(visibleSeverities.length).toBeGreaterThan(0);
		for (const sev of visibleSeverities) {
			expect(sev).toBe(firstSeverity);
		}
	});

	test("filtr High pokazuje tylko alerty o nasileniu high (jeśli istnieją)", async () => {
		// Arrange
		const allSeverities = await alertsPage.getVisibleAlertSeverities();
		test.skip(
			!allSeverities.includes("high"),
			"brak alertów high w bieżącym zestawie danych",
		);

		// Act
		await alertsPage.selectSeverity("high");

		// Assert
		const visibleSeverities = await alertsPage.getVisibleAlertSeverities();
		expect(visibleSeverities.length).toBeGreaterThan(0);
		for (const sev of visibleSeverities) {
			expect(sev).toBe("high");
		}
	});

	test("reset filtru do All severities przywraca wszystkie alerty", async () => {
		// Arrange
		const beforeVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(beforeVisible).toBeGreaterThan(0);
		const severities = await alertsPage.getVisibleAlertSeverities();
		expect(severities.length).toBeGreaterThan(0);
		await alertsPage.selectSeverity(severities[0]);

		// Act
		await alertsPage.resetSeverityFilter();

		// Assert
		const afterVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(afterVisible).toBe(beforeVisible);
	});
});

test.describe("Strona Alertów Rolnopol – filtr regionu", () => {
	test("zmiana regionu aktualizuje liczniki alertów", async () => {
		// Act
		await alertsPage.selectRegion("dolnośląskie");

		// Assert
		const afterToday = await alertsPage.getTodayCount();
		const afterHistory = await alertsPage.getHistoryCount();
		const afterUpcoming = await alertsPage.getUpcomingCount();
		const afterTotal = afterToday + afterHistory + afterUpcoming;
		const afterVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(afterTotal).toBe(afterVisible);
	});

	test("reset regionu do mazowieckiego przywraca stan początkowy", async () => {
		// Arrange
		const initialToday = await alertsPage.getTodayCount();
		const initialHistory = await alertsPage.getHistoryCount();
		const initialUpcoming = await alertsPage.getUpcomingCount();
		await alertsPage.selectRegion("dolnośląskie");

		// Act
		await alertsPage.resetRegionFilter();

		// Assert
		expect(await alertsPage.getTodayCount()).toBe(initialToday);
		expect(await alertsPage.getHistoryCount()).toBe(initialHistory);
		expect(await alertsPage.getUpcomingCount()).toBe(initialUpcoming);
	});
});

test.describe("Strona Alertów Rolnopol – kombinacje filtrów i odświeżanie", () => {
	test("kombinacja wyszukiwarki i nasilenia filtruje karty spójnie", async () => {
		// Arrange
		const severities = await alertsPage.getVisibleAlertSeverities();
		expect(severities.length).toBeGreaterThan(0);
		const firstSeverity = severities[0];
		const titles = await alertsPage.getVisibleAlertTitles();
		expect(titles.length).toBeGreaterThan(0);
		const firstTitle = titles[0];

		// Act
		await alertsPage.selectSeverity(firstSeverity);
		await alertsPage.searchAlerts(firstTitle);

		// Assert
		const visibleSeverities = await alertsPage.getVisibleAlertSeverities();
		const visibleCount = await alertsPage.getVisibleAlertCardsCount();
		expect(visibleCount).toBeGreaterThanOrEqual(1);
		for (const sev of visibleSeverities) {
			expect(sev).toBe(firstSeverity);
		}
	});

	test("przycisk odświeżania przeładowuje listy alertów", async () => {
		// Arrange
		const beforeVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(beforeVisible).toBeGreaterThan(0);

		// Act
		await alertsPage.clickRefreshButton();

		// Assert
		await expect(alertsPage.page.locator("#todayCount")).toBeVisible();
		await expect(alertsPage.page.locator(".alert-card").first()).toBeVisible({
			timeout: 10000,
		});
		const afterVisible = await alertsPage.getVisibleAlertCardsCount();
		expect(afterVisible).toBeGreaterThan(0);
	});
});

test.describe("Strona Alertów Rolnopol – nawigacja z poziomu menu górnego", () => {
	test("link Home prowadzi na stronę główną", async () => {
		await alertsPage.clickHomeLink();
		await expect(alertsPage.page).toHaveURL(URLS.home);
	});

	test("link Documentation prowadzi na stronę dokumentacji", async () => {
		await alertsPage.clickDocumentationLink();
		await expect(alertsPage.page).toHaveURL(URLS.documentation);
	});

	test("link API Explorer prowadzi na stronę swagger", async () => {
		await alertsPage.clickApiExplorerLink();
		await expect(alertsPage.page).toHaveURL(URLS.apiExplorer);
	});

	test("link Register prowadzi na stronę rejestracji", async () => {
		await alertsPage.clickRegisterLink();
		await expect(alertsPage.page).toHaveURL(URLS.register);
	});

	test("link Login prowadzi na stronę logowania", async () => {
		await alertsPage.clickLoginLink();
		await expect(alertsPage.page).toHaveURL(URLS.login);
	});
});

test.describe("Strona Alertów Rolnopol – stopka i linki zewnętrzne", () => {
	test("wyświetla stopkę z linkiem Contact i tekstem copyright", async () => {
		await alertsPage.expectFooterVisible();
	});

	test("link Contact w stopce prowadzi na stronę kontaktu", async () => {
		await alertsPage.clickContactLink();
		await expect(alertsPage.page).toHaveURL(URLS.contact);
	});

	test("link jaktestowac.pl ma poprawny atrybut href", async () => {
		await alertsPage.expectExternalLinkHref(
			"jaktestowac.pl",
			"https://jaktestowac.pl",
			true,
		);
	});

	test("link GitHub Rolnopol repository ma poprawny atrybut href", async () => {
		await alertsPage.expectExternalLinkHref(
			"GitHub Rolnopol repository",
			"https://github.com/jaktestowac/rolnopol",
		);
	});
});
