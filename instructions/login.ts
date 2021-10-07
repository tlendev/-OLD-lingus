require('dotenv').config({ path: __dirname + '/../.env' });
import { Page } from 'puppeteer';

const login = async (page: Page) => {
    try {
        console.log('ℹ Logging in...');
        await Promise.all([
            page.goto('https://lingos.pl/home/login'),
            page.waitForNavigation(),
        ]);

        await page.type('#login', process.env.USRNAME!);
        await page.type('#password', process.env.PASS!);
        await page.click('.btn');

        console.log('\x1b[32m✔ Login succes');
    } catch (error: any) {
        throw new Error('\x1b[31m❌ Could not log in. Exiting');
    }
};

export { login };
