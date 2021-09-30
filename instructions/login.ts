require('dotenv').config({ path: __dirname + '/../.env' });
import { Page } from 'puppeteer';

const login = async (page: Page) => {
    try {
        await Promise.all([
            page.goto('https://lingos.pl/home/login'),
            page.waitForNavigation(),
        ]);

        await page.type('#login', process.env.USRNAME!),
            await page.type('#password', process.env.PASS!),
            await page.click('.btn');
    } catch (error: any) {
        throw new Error(error);
    }
};

export { login };
