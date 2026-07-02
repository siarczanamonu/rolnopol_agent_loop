import { test, expect } from '@playwright/test';
import { HomePage } from '../page/HomePage';

test.describe('Strona główna Rolnopol', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('powinna załadować się poprawnie z odpowiednim tytułem', async ({ page }) => {
    // Arrange & Act
    await homePage.goto();

    // Assert
    await expect(page).toHaveTitle('Rolnopol');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('powinna wyświetlać nawigację z poprawnymi linkami', async ({ page }) => {
    // Assert
    await expect(homePage.navLinks.home).toBeVisible();
    await expect(homePage.navLinks.alerts).toBeVisible();
    await expect(homePage.navLinks.documentation).toBeVisible();
    await expect(homePage.navLinks.apiExplorer).toBeVisible();
    await expect(homePage.navLinks.register).toBeVisible();
    await expect(homePage.navLinks.login).toBeVisible();

    await expect(homePage.navLinks.home).toHaveAttribute('href', '/');
    await expect(homePage.navLinks.alerts).toHaveAttribute('href', '/alerts.html');
    await expect(homePage.navLinks.documentation).toHaveAttribute('href', '/docs.html');
    await expect(homePage.navLinks.apiExplorer).toHaveAttribute('href', '/swagger.html');
    await expect(homePage.navLinks.register).toHaveAttribute('href', '/register.html');
    await expect(homePage.navLinks.login).toHaveAttribute('href', '/login.html');
  });

  test('powinna wyświetlać logo Rolnopol linkujące do strony głównej', async ({ page }) => {
    // Assert
    await expect(homePage.logoLink).toBeVisible();
    await expect(homePage.logoLink).toHaveAttribute('href', '/');
  });

  test('powinna zawierać nagłówek powitalny i opis', async ({ page }) => {
    // Assert
    await expect(homePage.welcomeHeading).toBeVisible();
    await expect(homePage.welcomeParagraph).toBeVisible();
  });

  test('powinna wyświetlać statystyki platformy', async ({ page }) => {
    // Assert
    await expect(page.getByText('Active Users')).toBeVisible();
    await expect(page.getByText('Managed Farms')).toBeVisible();
    await expect(page.getByText('Total Area (ha)')).toBeVisible();
    await expect(page.getByText('Total Staff')).toBeVisible();
    await expect(page.getByText('Stock Animals')).toBeVisible();
  });

  test('powinna mieć działające przyciski Get Started i Sign In', async ({ page }) => {
    // Act
    await homePage.clickGetStarted();

    // Assert
    await expect(page).toHaveURL('/register.html');

    // Act
    await homePage.goto();
    await homePage.clickSignIn();

    // Assert
    await expect(page).toHaveURL('/login.html');
  });

  test('powinna przekierowywać do strony rejestracji po kliknięciu linku Register w nawigacji', async ({ page }) => {
    // Act
    await homePage.clickRegister();

    // Assert
    await expect(page).toHaveURL('/register.html');
  });

  test('powinna przekierowywać do strony logowania po kliknięciu linku Login w nawigacji', async ({ page }) => {
    // Act
    await homePage.clickLogin();

    // Assert
    await expect(page).toHaveURL('/login.html');
  });

  test('powinna przekierowywać do sekcji Alerts po kliknięciu odpowiedniego linku', async ({ page }) => {
    // Act
    await homePage.clickAlerts();

    // Assert
    await expect(page).toHaveURL('/alerts.html');
  });

  test('powinna przekierowywać do dokumentacji po kliknięciu odpowiedniego linku', async ({ page }) => {
    // Act
    await homePage.clickDocumentation();

    // Assert
    await expect(page).toHaveURL('/docs.html');
  });

  test('powinna przekierowywać do API Explorer po kliknięciu odpowiedniego linku', async ({ page }) => {
    // Act
    await homePage.clickApiExplorer();

    // Assert
    await expect(page).toHaveURL('/swagger.html');
  });

  test('powinna wyświetlać stopkę z poprawnymi linkami', async ({ page }) => {
    // Assert
    await expect(homePage.footerContact).toBeVisible();
    await expect(homePage.footerContact).toHaveAttribute('href', '/contact.html');

    await expect(homePage.footerJaktestowac).toBeVisible();
    await expect(homePage.footerJaktestowac).toHaveAttribute('href', 'https://jaktestowac.pl');

    await expect(homePage.footerGithubRepo).toBeVisible();
    await expect(homePage.footerGithubRepo).toHaveAttribute('href', 'https://github.com/jaktestowac/rolnopol');

    await expect(homePage.footerGithubProfile).toBeVisible();
    await expect(homePage.footerGithubProfile).toHaveAttribute('href', 'https://github.com/jaktestowac');

    await expect(homePage.footerYoutube).toBeVisible();
    await expect(homePage.footerYoutube).toHaveAttribute('href', 'https://www.youtube.com/@jaktestowac?sub_confirmation=1');

    await expect(homePage.footerLinkedIn).toBeVisible();
    await expect(homePage.footerLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/company/jaktestowac');

    await expect(homePage.footerAiTesters).toBeVisible();
    await expect(homePage.footerAiTesters).toHaveAttribute('href', 'https://aitesters.pl');

    await expect(homePage.footerAiTestersYoutube).toBeVisible();
    await expect(homePage.footerAiTestersYoutube).toHaveAttribute('href', 'https://www.youtube.com/@AITesterspl?sub_confirmation=1');

    await expect(homePage.footerAiTestersLinkedIn).toBeVisible();
    await expect(homePage.footerAiTestersLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/company/aitesters');
  });

  test('powinna wyświetlać informację o wersji i autorze w stopce', async ({ page }) => {
    // Assert
    await expect(page.getByText(/© 2026 Rolnopol v[\d.]+\. build by/)).toBeVisible();
  });

  test('powinna responsywnie przechodzić na mobilny widok po zmianie rozmiaru okna', async ({ page }) => {
    // Arrange & Act
    await page.setViewportSize({ width: 375, height: 812 });

    // Assert
    await expect(page).toHaveTitle('Rolnopol');
    await expect(homePage.welcomeHeading).toBeVisible();
    await expect(homePage.navLinks.register).toBeVisible();
  });
});
