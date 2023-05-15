import {Builder, By, until, WebDriver} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as path from 'path';

describe('Search User Integration Test', () => {
    let driver:WebDriver;

    beforeAll(async () => {
        const chromeOptions = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should show user search by document', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Cumbres114');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/admin/search-user"]')), 10000);

        const searchButton = await driver.findElement(By.css('a[href="/home/admin/search-user"]'));
        await searchButton.click();

        await driver.wait(until.urlContains('home/admin/search-user'), 10000);

        const doctypeInput = await driver.findElement(By.id('doctype'));
        const documentInput = await driver.findElement(By.id('document'));
        const submitSearchDocButton = await driver.findElement(By.id('doc_summit'));

        await doctypeInput.sendKeys("Cédula de ciudadania");
        await documentInput.sendKeys("1193093868");
        await submitSearchDocButton.click();

        await driver.wait(until.urlContains('home/admin/found-user/'), 10000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('home/admin/found-user/');
    }, 40000);

    it('should show user search by id of employer', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Cumbres114');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/admin/search-user"]')), 10000);

        const searchButton = await driver.findElement(By.css('a[href="/home/admin/search-user"]'));
        await searchButton.click();

        await driver.wait(until.urlContains('home/admin/search-user'), 10000);

        const idEmployeeInput = await driver.findElement(By.id('idEmployee'));
        const submitSearchDocButton = await driver.findElement(By.id('id_summit'));

        await idEmployeeInput.sendKeys("12345656");
        await submitSearchDocButton.click();

        await driver.wait(until.urlContains('home/admin/found-user/'), 10000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('home/admin/found-user/');
    }, 40000);
});
