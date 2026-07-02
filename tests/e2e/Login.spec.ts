import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';

test.describe('Strona logowania Rolnopol', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('powinna załadować się poprawnie z odpowiednim tytułem i URL', async () => {
    await expect(loginPage.page).toHaveTitle('Login - Rolnopol');
    await expect(loginPage.page).toHaveURL('http://localhost:3000/login.html');
  });

  test('powinna wyświetlać nawigację z poprawnymi linkami', async () => {
    await expect(loginPage.navLinks.home).toBeVisible();
    await expect(loginPage.navLinks.alerts).toBeVisible();
    await expect(loginPage.navLinks.documentation).toBeVisible();
    await expect(loginPage.navLinks.apiExplorer).toBeVisible();
    await expect(loginPage.navLinks.register).toBeVisible();
    await expect(loginPage.navLinks.login).toBeVisible();

    await expect(loginPage.navLinks.home).toHaveAttribute('href', '/');
    await expect(loginPage.navLinks.alerts).toHaveAttribute('href', '/alerts.html');
    await expect(loginPage.navLinks.documentation).toHaveAttribute('href', '/docs.html');
    await expect(loginPage.navLinks.apiExplorer).toHaveAttribute('href', '/swagger.html');
    await expect(loginPage.navLinks.register).toHaveAttribute('href', '/register.html');
    await expect(loginPage.navLinks.login).toHaveAttribute('href', '/login.html');
  });

  test('powinna wyświetlać logo Rolnopol linkujące do strony głównej', async () => {
    await expect(loginPage.logoLink).toBeVisible();
    await expect(loginPage.logoLink).toHaveAttribute('href', '/');
  });

  test('powinna wyświetlać nagłówek i pole formularza logowania', async () => {
    await expect(loginPage.bannerTitle).toBeVisible();
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('powinna przechowywać linki pomocnicze (Register here, Back to Home)', async () => {
    await expect(loginPage.registerHereLink).toBeVisible();
    await expect(loginPage.registerHereLink).toHaveAttribute('href', '/register.html');

    await expect(loginPage.backToHomeLink).toBeVisible();
    await expect(loginPage.backToHomeLink).toHaveAttribute('href', '/');
  });

  test('powinna przekierowywać do rejestracji po kliknięciu Register here', async () => {
    await loginPage.clickRegisterHere();
    await expect(loginPage.page).toHaveURL('/register.html');
  });

  test('powinna przekierowywać do strony głównej po kliknięciu Back to Home', async () => {
    await loginPage.clickBackToHome();
    await expect(loginPage.page).toHaveURL('/');
  });

  test('powinna pozwalać na wysłanie pustego formularza (brak walidacji HTML5)', async () => {
    await loginPage.login('', '');

    await expect(loginPage.page).toHaveURL('http://localhost:3000/login.html');
  });

  test('powinna pozwalać na wysłanie formularza z nieprawidłowym emailem', async () => {
    await loginPage.login('nieprawidlowyemail', 'haslo123');

    await expect(loginPage.page).toHaveURL('http://localhost:3000/login.html');
  });

  test('powinna wymagać wypełnienia pól Email i Password (atrybut required)', async () => {
    await expect(loginPage.emailInput).toHaveAttribute('required', '');
    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
  });

  test('pole Email powinno mieć prawidłowy typ na email', async () => {
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
  });

  test('powinna wyświetlać stopkę z poprawnymi linkami', async () => {
    await expect(loginPage.footerContact).toBeVisible();
    await expect(loginPage.footerContact).toHaveAttribute('href', '/contact.html');

    await expect(loginPage.footerJaktestowac).toBeVisible();
    await expect(loginPage.footerJaktestowac).toHaveAttribute('href', 'https://jaktestowac.pl');

    await expect(loginPage.footerGithubRepo).toBeVisible();
    await expect(loginPage.footerGithubRepo).toHaveAttribute('href', 'https://github.com/jaktestowac/rolnopol');

    await expect(loginPage.footerGithubProfile).toBeVisible();
    await expect(loginPage.footerGithubProfile).toHaveAttribute('href', 'https://github.com/jaktestowac');

    await expect(loginPage.footerYoutube).toBeVisible();
    await expect(loginPage.footerYoutube).toHaveAttribute('href', 'https://www.youtube.com/@jaktestowac?sub_confirmation=1');

    await expect(loginPage.footerLinkedIn).toBeVisible();
    await expect(loginPage.footerLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/company/jaktestowac');

    await expect(loginPage.footerAiTesters).toBeVisible();
    await expect(loginPage.footerAiTesters).toHaveAttribute('href', 'https://aitesters.pl');

    await expect(loginPage.footerAiTestersYoutube).toBeVisible();
    await expect(loginPage.footerAiTestersYoutube).toHaveAttribute('href', 'https://www.youtube.com/@AITesterspl?sub_confirmation=1');

    await expect(loginPage.footerAiTestersLinkedIn).toBeVisible();
    await expect(loginPage.footerAiTestersLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/company/aitesters');
  });

  test('powinna wyświetlać informację o wersji i autorze w stopce', async () => {
    await expect(loginPage.page.getByText(/© 2026 Rolnopol v[\d.]+\. build by/)).toBeVisible();
  });

  test('powinna responsywnie przechodzić na mobilny widok po zmianie rozmiaru okna', async () => {
    await loginPage.page.setViewportSize({ width: 375, height: 812 });

    await expect(loginPage.page).toHaveTitle('Login - Rolnopol');
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
  });
});
