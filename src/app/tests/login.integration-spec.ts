import {Builder, By, until, WebDriver} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

describe('Login Integration Test', () => {
    let driver:WebDriver;

    beforeAll(async () => {
        const chromeOptions = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should perform a successful login', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 30000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('home');
    }, 30000);
});
