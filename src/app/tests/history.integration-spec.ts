import {Builder, By, until, WebDriver} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as path from 'path';
import * as fs from 'fs';

describe('History Integration Test', () => {
    let driver:WebDriver;

    beforeAll(async () => {
        const chromeOptions = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should display images', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/history"]')), 10000);

        const listUsersButton = await driver.findElement(By.css('a[href="/home/history"]'));
        await listUsersButton.click();

        await driver.wait(until.urlContains('home/history'), 10000);

        await driver.wait(until.elementLocated(By.css('.content-table tbody tr')), 10000);
        const imagesTable = await driver.findElement(By.css('.content-table tbody'));
        const initialImages = await imagesTable.findElements(By.css('tr'));
        expect(initialImages.length).toBeGreaterThan(0);
    });

    it('should download csv images', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/history"]')), 10000);

        const listUsersButton = await driver.findElement(By.css('a[href="/home/history"]'));
        await listUsersButton.click();

        await driver.wait(until.urlContains('home/history'), 10000);

        await driver.wait(until.elementLocated(By.css('.content-table tbody tr')), 10000);
        const imagesTable = await driver.findElement(By.css('.content-table tbody'));
        const initialImages = await imagesTable.findElements(By.css('tr'));
        expect(initialImages.length).toBeGreaterThan(0);

        const downloadButton = await driver.findElement(By.id('csvDownload'));

        await downloadButton.click();

        const downloadsFolder = 'C:\\Users\\estef\\Downloads';
        const filePath = path.join(downloadsFolder, 'resonances_history.csv');

        await driver.wait(async () => await fs.existsSync(filePath), 40000);

        await fs.unlinkSync(filePath);
    }, 40000);
});
