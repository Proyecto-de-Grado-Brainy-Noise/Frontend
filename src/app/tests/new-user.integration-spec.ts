import {Builder, By, until, WebDriver} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as path from 'path';

describe('New User Integration Test', () => {
    let driver:WebDriver;

    beforeAll(async () => {
        const chromeOptions = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should add a user', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/admin/new-user"]')), 10000);

        const listUsersButton = await driver.findElement(By.css('a[href="/home/admin/new-user"]'));
        await listUsersButton.click();

        await driver.wait(until.urlContains('home/admin/new-user'), 10000);

        const nameInput = await driver.findElement(By.id('name'));
        const name2Input = await driver.findElement(By.id('name2'));
        const lastnameInput = await driver.findElement(By.id('lastname'));
        const birthdateInput = await driver.findElement(By.id('birthdate'));
        const doctypeInput = await driver.findElement(By.id('doctype'));
        const documentInput = await driver.findElement(By.id('document'));
        const emailNewInput = await driver.findElement(By.id('email'));
        const idEmployeeInput = await driver.findElement(By.id('idEmployee'));
        const jobtitleInput = await driver.findElement(By.id('jobtitle'));
        const areaInput = await driver.findElement(By.id('area'));
        const roleInput = await driver.findElement(By.id('role'));
        const observationsInput = await driver.findElement(By.id('observations'));
        const submitNewButton = await driver.findElement(By.css('input[type="submit"]'));

        await nameInput.sendKeys("Luis");
        await name2Input.sendKeys("Rogelio");
        await lastnameInput.sendKeys("Armenio");
        await birthdateInput.sendKeys("2001-01-01");
        await doctypeInput.sendKeys("Cédula de ciudadania");
        await documentInput.sendKeys("1193093871");
        await emailNewInput.sendKeys("luisrarmenio12@mailinator.com");
        await idEmployeeInput.sendKeys("12345691");
        await jobtitleInput.sendKeys("Médico interno");
        await areaInput.sendKeys("Medicina interna");
        await roleInput.sendKeys("U");
        await observationsInput.sendKeys("Bien");
        await submitNewButton.click();

        await driver.wait(until.urlContains('home/admin/users'), 10000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('home/admin/users');

        let usersTable = await driver.findElement(By.css('.content-table tbody'));
        const rows = await usersTable.findElements(By.css('tr'));

        const userName = "Luis Rogelio Armenio";

        let userFound = false;
        for (let row of rows) {
            const cell = await row.findElement(By.css('td:nth-child(2)'));
            const cellText = await cell.getText();

            if (cellText === userName) {
                userFound = true;
                break;
            }
        }

        expect(userFound).toBe(true);
    }, 40000);
});
