import { type Page, type Locator } from '@playwright/test';
import { URLs } from '../config/urls';

export class LoginPage {
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
  readonly bannerTitle: Locator;
  readonly loginHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerHereLink: Locator;
  readonly backToHomeLink: Locator;
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
      home: page.getByTestId('nav-home'),
      alerts: page.getByRole('link', { name: 'Alerts' }),
      documentation: page.getByRole('link', { name: 'Documentation' }),
      apiExplorer: page.getByRole('link', { name: 'API Explorer' }),
      register: page.getByTestId('nav-register'),
      login: page.getByRole('link', { name: 'Login' }),
    };
    this.bannerTitle = page.getByText('User Login & Account Access');
    this.loginHeading = page.getByRole('heading', { name: 'Login to Your User Account', level: 2 });
    this.emailInput = page.getByPlaceholder('Enter your email');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.registerHereLink = page.getByRole('link', { name: 'Register here' });
    this.backToHomeLink = page.getByRole('link', { name: 'Back to Home' });
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
    await this.page.goto(URLs.login);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickRegisterHere() {
    await this.registerHereLink.click();
  }

  async clickBackToHome() {
    await this.backToHomeLink.click();
  }
}
