import {Builder, By, until, WebDriver} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as path from 'path';

describe('All Users Integration Test', () => {
    let driver:WebDriver;

    beforeAll(async () => {
        const chromeOptions = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should display users', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/admin/users"]')), 10000);

        const listUsersButton = await driver.findElement(By.css('a[href="/home/admin/users"]'));
        await listUsersButton.click();

        await driver.wait(until.urlContains('home/admin/users'), 10000);

        await driver.wait(until.elementLocated(By.css('.content-table tbody tr')), 10000);
        const usersTable = await driver.findElement(By.css('.content-table tbody'));
        const initialUsers = await usersTable.findElements(By.css('tr'));
        expect(initialUsers.length).toBeGreaterThan(0);
    });

    it('should delete users', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/admin/users"]')), 10000);

        const listUsersButton = await driver.findElement(By.css('a[href="/home/admin/users"]'));
        await listUsersButton.click();

        await driver.wait(until.urlContains('home/admin/users'), 10000);

        await driver.wait(until.elementLocated(By.css('.content-table tbody tr')), 10000);
        const usersTable = await driver.findElement(By.css('.content-table tbody'));
        const initialUsers = await usersTable.findElements(By.css('tr'));
        expect(initialUsers.length).toBeGreaterThan(0);

        const deleteUserIcon = await initialUsers[0].findElement(By.css('.fa-trash-alt'));
        await deleteUserIcon.click();

        const popUp = await driver.findElement(By.css('app-pop-up'));
        expect(await popUp.isDisplayed()).toBe(true);

        const confirmButton = await driver.findElement(By.css('.popup-container .actions button:first-child'));
        await confirmButton.click();

        await driver.wait(until.stalenessOf(initialUsers[0]));

        const updatedUsersTable = await driver.findElement(By.css('.content-table tbody'));
        const updatedUsers = await updatedUsersTable.findElements(By.css('tr'));
        expect(updatedUsers.length).toBe(initialUsers.length - 1);
    }, 40000);

    it('should display edit page', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        await driver.wait(until.elementLocated(By.css('a[href="/home/admin/users"]')), 10000);

        const listUsersButton = await driver.findElement(By.css('a[href="/home/admin/users"]'));
        await listUsersButton.click();

        await driver.wait(until.urlContains('home/admin/users'), 10000);

        await driver.wait(until.elementLocated(By.css('.content-table tbody tr')), 10000);
        const usersTable = await driver.findElement(By.css('.content-table tbody'));
        const initialUsers = await usersTable.findElements(By.css('tr'));
        expect(initialUsers.length).toBeGreaterThan(0);

        const editUserIcon = await initialUsers[0].findElement(By.css('.fa-edit'));
        await editUserIcon.click();

        await driver.wait(until.urlContains('admin/edit-user/'), 10000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('admin/edit-user/');
    });
});
