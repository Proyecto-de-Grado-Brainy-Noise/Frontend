import {Builder, By, until, WebDriver} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as path from 'path';

describe('Upload Resonance Integration Test', () => {
    let driver:WebDriver;

    beforeAll(async () => {
        const chromeOptions = new chrome.Options();
        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('should not show results', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        const noResultsMessage = await driver.findElement(By.id('noResultsMessage'));

        const text = await noResultsMessage.getText();

        expect(text).toBe('Actualmente no hay resultados a mostrar');

    });

    it('upload files', async () => {
        await driver.get('http://localhost:4200/login');

        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        await emailInput.sendKeys('estefanibearroyo@gmail.com');
        await passwordInput.sendKeys('Javeriana2023');
        await submitButton.click();

        await driver.wait(until.urlContains('home'), 10000);

        const imageFilePath = 'C:\\Users\\estef\\Downloads\\sub-A174_ses-01_acq-highres_T1w.nii.gz';
        const metadataFilePath = 'C:\\Users\\estef\\Downloads\\sub-A174_ses-01_acq-highres_T1w.json';

        const imageFileInput = await driver.findElement(By.id('imageFile'));
        const metadataFileInput = await driver.findElement(By.id('metadataFile'));

        await imageFileInput.sendKeys(imageFilePath);
        await metadataFileInput.sendKeys(metadataFilePath);
        const submitButtonUpload = await driver.findElement(By.css('input[type="submit"]'));

        await submitButtonUpload.click();

        const loader = await driver.findElement(By.css('.loader-text'));
        expect(await loader.isDisplayed()).toBeTruthy();

        await driver.wait(until.elementLocated(By.css('.content')), 70000);

        const errorMessages = await driver.findElements(By.css('.toast-error'));
        expect(errorMessages.length).toBe(0);

        const predictionElementLocator = By.css('input[type="text"][readonly]');
        await driver.wait(until.elementLocated(predictionElementLocator), 70000);
        const predictionElement = await driver.findElement(predictionElementLocator);
        const predictionText = await predictionElement.getAttribute('value');
        expect(predictionText).toMatch(/(No hay presencia de ruido)|(Hay presencia de ruido)/);

    }, 70000);
});
