import { Browser, Page } from 'puppeteer';
import { login } from './instructions/login';
import { mainProcess } from './mainProcess';

import puppeteer from 'puppeteer';

const bootstrap = async () => {
    try {
        if (!process.env.USRNAME || !process.env.PASS) {
            throw new Error(
                "\x1b[31m\n❌ You must provide your login and password. Create a new file in the root directory called '.env' and add the following text to it:\nUSRNAME=YOUR USERNAME\nPASS=YOUR PASSWORD"
            );
        }

        const browser: Browser = await puppeteer.launch({ headless: false });
        const page: Page = await browser.newPage();

        // Login
        await login(page);

        // Navigate to lessons
        await Promise.all([
            page.waitForNavigation(),
            page.goto('https://lingos.pl/students/learning/0'),
            page.waitForNavigation(),
        ]);

        await mainProcess(page);

        console.log(
            '\n\x1b[33m 🏆 Section finished succesfully. Exiting the process with code 0.'
        );

        await browser.close();
    } catch (error: any) {
        throw new Error(error);
    }
};

bootstrap();
