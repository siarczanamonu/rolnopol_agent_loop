import { type Page, type Locator } from '@playwright/test';
import { URLs } from '../config/urls';

export class HomePage {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly navLinks: {
    home: Locator;
    alerts: Locator;
    documentation: Locator;
    apiExplorer: Locator;
    register: Locator;
    login: Locator;
  };
  readonly welcomeHeading: Locator;
  readonly welcomeParagraph: Locator;
  readonly getStartedButton: Locator;
  readonly signInButton: Locator;
  readonly statsCards: {
    activeUsers: Locator;
    managedFarms: Locator;
    totalArea: Locator;
    totalStaff: Locator;
    stockAnimals: Locator;
  };
  readonly footerContact: Locator;
  readonly footerJaktestowac: Locator;
  readonly footerGithubRepo: Locator;
  readonly footerGithubProfile: Locator;
  readonly footerYoutube: Locator;
  readonly footerLinkedIn: Locator;
  readonly footerAiTesters: Locator;
  readonly footerAiTestersYoutube: Locator;
  readonly footerAiTestersLinkedIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.getByRole('link', { name: ' Rolnopol', exact: true });
    this.navLinks = {
      home: page.getByRole('link', { name: 'Home' }),
      alerts: page.getByRole('link', { name: 'Alerts' }),
      documentation: page.getByRole('link', { name: 'Documentation' }),
      apiExplorer: page.getByRole('link', { name: 'API Explorer' }),
      register: page.getByRole('link', { name: 'Register' }),
      login: page.getByRole('link', { name: 'Login' }),
    };
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to Rolnopol', level: 2 });
    this.welcomeParagraph = page.getByText('Manage your farms, resources, and transactions in a secure, modern environment.');
    this.getStartedButton = page.getByRole('link', { name: /Get Started Free/ });
    this.signInButton = page.getByRole('link', { name: /Sign In/ });
    this.statsCards = {
      activeUsers: page.getByText('318', { exact: true }),
      managedFarms: page.getByText('318', { exact: true }).last(),
      totalArea: page.getByText('5,9K ha'),
      totalStaff: page.getByText('15', { exact: true }),
      stockAnimals: page.getByText('2,6K'),
    };
    this.footerContact = page.getByRole('link', { name: 'Contact us' });
    this.footerJaktestowac = page.getByRole('link', { name: 'jaktestowac.pl', exact: true });
    this.footerGithubRepo = page.getByRole('link', { name: /GitHub Rolnopol repository/ });
    this.footerGithubProfile = page.getByRole('link', { name: 'GitHub', exact: true });
    this.footerYoutube = page.getByRole('link', { name: 'YouTube' }).first();
    this.footerLinkedIn = page.getByRole('link', { name: /LinkedIn jaktestowac.pl/ });
    this.footerAiTesters = page.getByRole('link', { name: 'AI_Testers', exact: true });
    this.footerAiTestersYoutube = page.getByRole('link', { name: 'YouTube' }).last();
    this.footerAiTestersLinkedIn = page.getByRole('link', { name: /LinkedIn AI_Testers/ });
  }

  async goto() {
    await this.page.goto(URLs.home);
  }

  async clickRegister() {
    await this.navLinks.register.click();
  }

  async clickLogin() {
    await this.navLinks.login.click();
  }

  async clickAlerts() {
    await this.navLinks.alerts.click();
  }

  async clickDocumentation() {
    await this.navLinks.documentation.click();
  }

  async clickApiExplorer() {
    await this.navLinks.apiExplorer.click();
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }
}
