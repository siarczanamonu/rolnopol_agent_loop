import { expect, type Page } from "@playwright/test";
import { URLS } from "../config/urls";

export class AlertsPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(): Promise<void> {
		await this.page.goto(URLS.alerts);
		await this.page.waitForLoadState("domcontentloaded");
		await expect(this.page.locator("#todayCount")).toBeVisible();
	}

	async expectPageLoaded(): Promise<void> {
		await expect(this.page).toHaveTitle("Alerts - Rolnopol");
		await expect(this.page).toHaveURL(URLS.alerts);
	}

	async expectNavbarVisible(): Promise<void> {
		await expect(this.page.locator(".navbar-brand")).toBeVisible();
		await expect(this.page.getByRole("link", { name: "Home" })).toBeVisible();
		await expect(this.page.getByRole("link", { name: "Alerts" })).toBeVisible();
		await expect(
			this.page.getByRole("link", { name: "Documentation" }),
		).toBeVisible();
		await expect(
			this.page.getByRole("link", { name: "API Explorer" }),
		).toBeVisible();
		await expect(
			this.page.getByRole("link", { name: "Register" }),
		).toBeVisible();
		await expect(this.page.getByRole("link", { name: "Login" })).toBeVisible();
	}

	async expectBannerVisible(): Promise<void> {
		await expect(this.page.getByRole("banner")).toBeVisible();
		await expect(this.page.getByText("Alerts and Notifications")).toBeVisible();
	}

	async expectSectionHeaderVisible(): Promise<void> {
		await expect(
			this.page.getByRole("heading", { name: "Alerts" }),
		).toBeVisible();
		await expect(
			this.page.getByText("Upcoming and recent events"),
		).toBeVisible();
	}

	async expectFiltersVisible(): Promise<void> {
		await expect(this.page.locator("#searchInput")).toBeVisible();
		await expect(this.page.locator("#severityFilter")).toBeVisible();
		await expect(this.page.locator("#regionSelect")).toBeVisible();
		await expect(this.page.locator("#refreshBtn")).toBeVisible();
	}

	async expectSeverityFilterOptions(): Promise<void> {
		const severityFilter = this.page.locator("#severityFilter");
		const options = severityFilter.locator("option");
		await expect(options).toHaveCount(5);
		const texts = ["All severities", "Low", "Medium", "High", "Critical"];
		for (let i = 0; i < texts.length; i++) {
			await expect(options.nth(i)).toHaveText(texts[i]);
		}
	}

	async expectRegionFilterCount(expectedCount: number): Promise<void> {
		const regionOptions = this.page.locator("#regionSelect option");
		await expect(regionOptions).toHaveCount(expectedCount);
	}

	async expectSectionsVisible(): Promise<void> {
		await expect(this.page.locator("#upcomingSection")).toBeVisible();
		await expect(this.page.locator("#todaySection")).toBeVisible();
		await expect(this.page.locator("#historySection")).toBeVisible();
		await expect(this.page.locator("#upcomingCount")).toBeVisible();
		await expect(this.page.locator("#todayCount")).toBeVisible();
		await expect(this.page.locator("#historyCount")).toBeVisible();
	}

	async expectAlertCardStructure(): Promise<void> {
		const firstCard = this.page.locator(".alert-card").first();
		await expect(firstCard.locator(".alert-title")).toBeVisible();
		await expect(firstCard.locator(".alert-category")).toBeVisible();
		await expect(firstCard.locator(".alert-head .date")).toBeVisible();
		await expect(firstCard.locator(".badge")).toBeVisible();
		await expect(firstCard.locator(".alert-message")).toBeVisible();
	}

	async getVisibleAlertCardsCount(): Promise<number> {
		return await this.page.locator(".alert-card").count();
	}

	async getVisibleAlertSeverities(): Promise<string[]> {
		const cards = this.page.locator(".alert-card");
		const count = await cards.count();
		const severities: string[] = [];
		for (let i = 0; i < count; i++) {
			const sev = await cards.nth(i).getAttribute("data-sev");
			if (sev) severities.push(sev);
		}
		return severities;
	}

	async getVisibleAlertTitles(): Promise<string[]> {
		return await this.page
			.locator(".alert-card .alert-title")
			.allTextContents();
	}

	async getUpcomingCount(): Promise<number> {
		await this.page.locator("#upcomingCount").waitFor();
		const text = await this.page.locator("#upcomingCount").textContent();
		return text ? this.parseCountValue(text) : 0;
	}

	async getTodayCount(): Promise<number> {
		await this.page.locator("#todayCount").waitFor();
		const text = await this.page.locator("#todayCount").textContent();
		return text ? this.parseCountValue(text) : 0;
	}

	async getHistoryCount(): Promise<number> {
		await this.page.locator("#historyCount").waitFor();
		const text = await this.page.locator("#historyCount").textContent();
		return text ? this.parseCountValue(text) : 0;
	}

	private parseCountValue(raw: string): number {
		const match = raw.match(/(\d[\d\s.,]*)/);
		if (!match) {
			return 0;
		}
		const normalized = match[1]
			.replace(/\s/g, "")
			.replace(/[.,]/g, "")
			.replace(/^0+/, "");
		const parsed = Number.parseInt(normalized, 10);
		return Number.isNaN(parsed) ? 0 : parsed;
	}

	async searchAlerts(query: string): Promise<void> {
		await this.page.locator("#searchInput").fill(query);
		await this.waitForCountsStable();
	}

	async clearSearch(): Promise<void> {
		await this.page.locator("#searchInput").fill("");
		await this.waitForCountsStable();
	}

	async selectSeverity(severity: string): Promise<void> {
		await this.page.locator("#severityFilter").selectOption(severity);
		await this.waitForCountsStable();
	}

	async resetSeverityFilter(): Promise<void> {
		await this.page.locator("#severityFilter").selectOption("");
		await this.waitForCountsStable();
	}

	async selectRegion(region: string): Promise<void> {
		await this.page.locator("#regionSelect").selectOption({ label: region });
		await this.waitForCountsStable();
	}

	async resetRegionFilter(): Promise<void> {
		await this.page
			.locator("#regionSelect")
			.selectOption({ label: "mazowieckie" });
		await this.waitForCountsStable();
	}

	async clickRefreshButton(): Promise<void> {
		await this.page.locator("#refreshBtn").click();
		await this.waitForCountsStable();
	}

	private async waitForCountsStable(): Promise<void> {
		await this.page.waitForLoadState("networkidle");
		await expect(this.page.locator("#todayCount")).toBeVisible();
	}

	async expectFooterVisible(): Promise<void> {
		await expect(this.page.getByRole("contentinfo")).toBeVisible();
		await expect(
			this.page.getByRole("link", { name: "Contact" }),
		).toBeVisible();
		await expect(this.page.getByText(/©\s*\d{4}\s*Rolnopol/)).toBeVisible();
	}

	async clickHomeLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Home" }).click();
	}

	async clickDocumentationLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Documentation" }).click();
	}

	async clickApiExplorerLink(): Promise<void> {
		await this.page.getByRole("link", { name: "API Explorer" }).click();
	}

	async clickRegisterLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Register" }).click();
	}

	async clickLoginLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Login" }).click();
	}

	async clickContactLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Contact us" }).click();
	}

	async expectExternalLinkHref(
		linkName: string,
		expectedHref: string,
		exact = false,
	): Promise<void> {
		const link = this.page.getByRole("link", { name: linkName, exact });
		await expect(link).toHaveAttribute("href", expectedHref);
	}
}
