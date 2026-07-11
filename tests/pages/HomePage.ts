import { expect, type Page } from "@playwright/test";
import { URLS } from "../config/urls";

export class HomePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(): Promise<void> {
		await this.page.goto(URLS.home);
	}

	async expectPageLoaded(): Promise<void> {
		await expect(this.page).toHaveTitle("Rolnopol");
		await expect(this.page).toHaveURL(URLS.home);
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

	async expectHeroVisible(): Promise<void> {
		await expect(
			this.page.getByRole("heading", { name: "Welcome to Rolnopol" }),
		).toBeVisible();
		await expect(
			this.page.getByText("Futuristic Farm & Resource Management"),
		).toBeVisible();
		await expect(this.page.getByText("Manage your farms")).toBeVisible();
	}

	async expectStatsCardsVisible(): Promise<void> {
		await expect(this.page.getByText("Active Users")).toBeVisible();
		await expect(this.page.getByText("Managed Farms")).toBeVisible();
		await expect(this.page.getByText("Total Area (ha)")).toBeVisible();
		await expect(this.page.getByText("Total Staff")).toBeVisible();
		await expect(this.page.getByText("Stock Animals")).toBeVisible();
	}

	async getActiveUsersCount(): Promise<number> {
		const valueText = await this.page.locator("#stat-users").textContent();
		return valueText ? this.parseCountValue(valueText) : 0;
	}

	async getManagedFarmsCount(): Promise<number> {
		const valueText = await this.page.locator("#stat-farms").textContent();
		return valueText ? this.parseCountValue(valueText) : 0;
	}

	async getTotalStaffCount(): Promise<number> {
		const valueText = await this.page.locator("#stat-staff").textContent();
		return valueText ? this.parseCountValue(valueText) : 0;
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

	async expectCtaButtonsVisible(): Promise<void> {
		await expect(
			this.page.getByRole("link", { name: "Get Started Free" }),
		).toBeVisible();
		await expect(
			this.page.getByRole("link", { name: "Sign In" }),
		).toBeVisible();
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

	async clickAlertsLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Alerts" }).click();
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

	async clickGetStartedButton(): Promise<void> {
		await this.page.getByRole("link", { name: "Get Started Free" }).click();
	}

	async clickSignInButton(): Promise<void> {
		await this.page.getByRole("link", { name: "Sign In" }).click();
	}

	async clickContactLink(): Promise<void> {
		await this.page.getByRole("link", { name: "Contact" }).click();
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
