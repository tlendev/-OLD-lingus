import { Browser, Page } from 'puppeteer';
import { login } from './instructions/login';
import { mainProcess } from './mainProcess';

import puppeteer from 'puppeteer';

const bootstrap = async () => {
    const browser: Browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();

    // Login
    await login(page);

    // Navigate to lessons
    await page.goto('https://lingos.pl/students/learning');

    await mainProcess(page);

    // await browser.close();
};

bootstrap();
