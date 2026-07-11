import { expect, type Page } from "@playwright/test";
import { URLS } from "../config/urls";

export class DocsPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto(): Promise<void> {
		await this.page.goto(URLS.documentation);
		await this.page.waitForLoadState("domcontentloaded");
	}

	async expectPageLoaded(): Promise<void> {
		await expect(this.page).toHaveTitle("Documentation - Rolnopol");
		await expect(this.page).toHaveURL(URLS.documentation);
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
		const banner = this.page.getByTestId("docs-header");
		await expect(banner).toBeVisible();
		await expect(banner.locator(".main-title")).toHaveText("Documentation");
		await expect(banner.locator(".docs-header-subtitle")).toHaveText(
			"Rolnopol System Guide & API Reference",
		);
	}

	async expectSidebarVisible(): Promise<void> {
		await expect(
			this.page.getByRole("heading", { name: "Contents" }),
		).toBeVisible();
		const navLinks = this.page.locator(".docs-nav a");
		await expect(navLinks).toHaveCount(10);
		const expectedHrefs = [
			"#overview",
			"#entities",
			"#user-roles",
			"#features",
			"#user-flows",
			"#api-basics",
			"#testing-tips",
			"#demo-accounts",
			"#asset-finance-marketplace-flow",
			"#e2e-scenarios",
		];
		for (let i = 0; i < expectedHrefs.length; i++) {
			await expect(navLinks.nth(i)).toHaveAttribute("href", expectedHrefs[i]);
		}
	}

	async expectAllSectionsVisible(): Promise<void> {
		const sections: Array<{ id: string; heading: string }> = [
			{ id: "overview", heading: "System Overview" },
			{ id: "entities", heading: "Main Data Entities" },
			{ id: "user-roles", heading: "User Types & Permissions" },
			{ id: "features", heading: "Main Features" },
			{ id: "user-flows", heading: "Key User Flows" },
			{ id: "api-basics", heading: "API Basics" },
			{ id: "testing-tips", heading: "Testing Tips" },
			{ id: "demo-accounts", heading: "Demo Accounts" },
			{
				id: "asset-finance-marketplace-flow",
				heading: "Asset–Finance–Marketplace Flow",
			},
			{ id: "e2e-scenarios", heading: "End-to-End Scenarios" },
		];
		for (const section of sections) {
			await expect(this.page.locator(`#${section.id}`)).toBeVisible();
			await expect(this.page.locator(`#${section.id} h2`)).toContainText(
				section.heading,
			);
		}
	}

	async expectEntityCards(expectedEntities: string[]): Promise<void> {
		const cards = this.page.locator(
			"#entities .entity-card, #entities .entity-card-custom",
		);
		await expect(cards).toHaveCount(expectedEntities.length);
		const titles = await cards.locator("h4").allTextContents();
		for (let i = 0; i < expectedEntities.length; i++) {
			expect(titles[i].trim()).toBe(expectedEntities[i]);
		}
	}

	async expectRoleCardVisible(roleName: string): Promise<void> {
		const roleCard = this.page.locator("#user-roles").getByRole("heading", {
			name: roleName,
			level: 4,
		});
		await expect(roleCard).toBeVisible();
		const permissionsList = this.page
			.locator("#user-roles")
			.locator("ul")
			.first();
		await expect(permissionsList.locator("li")).toHaveCount(6);
	}

	async expectFeaturesListCount(expected: number): Promise<void> {
		const items = this.page.locator("#features ul li");
		await expect(items).toHaveCount(expected);
	}

	async expectUserFlowsCards(expectedFlows: string[]): Promise<void> {
		for (const flow of expectedFlows) {
			await expect(
				this.page.locator("#user-flows").getByRole("heading", {
					name: flow,
					level: 4,
				}),
			).toBeVisible();
		}
	}

	async expectApiBasicsListCount(expected: number): Promise<void> {
		const items = this.page.locator("#api-basics ul li");
		await expect(items).toHaveCount(expected);
	}

	async expectTestingTipsListCount(expected: number): Promise<void> {
		const items = this.page.locator("#testing-tips ul li");
		await expect(items).toHaveCount(expected);
	}

	async expectDemoAccountsCount(expected: number): Promise<void> {
		const cards = this.page.locator(
			"#demo-accounts .demo-account, #demo-accounts .demo-account-custom",
		);
		await expect(cards).toHaveCount(expected);
		const firstCard = cards.first();
		await expect(firstCard.locator("h4")).toBeVisible();
		await expect(firstCard.locator("p")).toBeVisible();
	}

	async expectMarketplaceFlowStructure(): Promise<void> {
		const h3s = ["Overview", "Entities", "Summary Table"];
		for (const h3 of h3s) {
			await expect(
				this.page
					.locator("#asset-finance-marketplace-flow")
					.getByRole("heading", { name: h3, level: 3 }),
			).toBeVisible();
		}
		const table = this.page
			.locator("#asset-finance-marketplace-flow")
			.locator("table");
		await expect(table).toBeVisible();
		await expect(table.locator("tbody tr")).toHaveCount(3);
		await expect(table.locator("thead th")).toHaveCount(6);
	}

	async expectE2eScenarioCards(expectedScenarios: string[]): Promise<void> {
		for (const scenario of expectedScenarios) {
			await expect(
				this.page.locator("#e2e-scenarios").getByRole("heading", {
					name: scenario,
					level: 4,
				}),
			).toBeVisible();
		}
	}

	async clickSidebarLink(testid: string): Promise<void> {
		await this.page.getByTestId(testid).click();
	}

	async expectHashInUrl(expectedHash: string): Promise<void> {
		await expect(this.page).toHaveURL(new RegExp(`${expectedHash}$`));
	}

	async expectSectionInViewport(sectionId: string): Promise<void> {
		await expect(this.page.locator(`#${sectionId}`)).toBeInViewport();
	}

	async expectActiveSidebarLink(linkText: string): Promise<void> {
		const activeLink = this.page.locator(".docs-nav a.active");
		await expect(activeLink).toContainText(linkText);
	}

	async expectEachSidebarLinkNavigates(): Promise<void> {
		const links = [
			{ testid: "nav-overview", hash: "#overview" },
			{ testid: "nav-entities", hash: "#entities" },
			{ testid: "nav-user-roles", hash: "#user-roles" },
			{ testid: "nav-features", hash: "#features" },
			{ testid: "nav-user-flows", hash: "#user-flows" },
			{ testid: "nav-api-basics", hash: "#api-basics" },
			{ testid: "nav-testing-tips", hash: "#testing-tips" },
			{ testid: "nav-demo-accounts", hash: "#demo-accounts" },
			{
				testid: "nav-asset-finance-marketplace-flow",
				hash: "#asset-finance-marketplace-flow",
			},
			{ testid: "nav-e2e-scenarios", hash: "#e2e-scenarios" },
		];
		for (const link of links) {
			await this.clickSidebarLink(link.testid);
			await expect(this.page).toHaveURL(new RegExp(`${link.hash}$`));
			await this.expectSectionInViewport(link.hash.replace("#", ""));
		}
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
