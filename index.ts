import { Browser, Page } from 'puppeteer';
import { login } from './instructions/login';
import { mainProcess } from './mainProcess';

import puppeteer from 'puppeteer';

const bootstrap = async () => {
    try {
        const startingDate = Date.now();

        if (!process.env.USRNAME || !process.env.PASS) {
            throw new Error(
                "\x1b[31m\n❌ You must provide your login and password. Create a new file in the root directory called '.env' and add the following text to it:\nUSRNAME=YOUR USERNAME\nPASS=YOUR PASSWORD"
            );
        }

        const browser: Browser = await puppeteer.launch({ headless: false });
        const page: Page = await browser.newPage();

        // Login
        await login(page);

        await Promise.all([
            page.waitForNavigation(),
            page.goto('https://lingos.pl/students/start'),
            page.waitForNavigation(),
        ]);

        let progressToday = await page.evaluate(() => {
            const text = document.querySelectorAll('h3.my-auto.fw-bold');
            if (text) {
                return text[1].textContent?.trim();
            }
        });

        if (!progressToday) {
            throw new Error('Could not get execution context');
        }

        for (let i = parseInt(progressToday); i < 5; i++) {
            console.log(`🤞 Round ${i + 1}`);
            await Promise.all([
                page.waitForNavigation(),
                await mainProcess(page),
            ]);
        }

        console.log(
            `\n\x1b[33m 🏆 Section finished succesfully in ${new Date(
                Date.now() - startingDate
            ).getSeconds()}s. Exiting the process with code 0.`
        );

        await browser.close();
    } catch (error: any) {
        throw new Error(error);
    }
};

bootstrap();
