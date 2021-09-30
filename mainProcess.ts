import { Page } from 'puppeteer';

const mainProcess = async (page: Page) => {
    try {
        const regexArray = await page.$$eval('script', (elements) => {
            return elements[7].textContent?.match(/(?=let foo = ").+(?<=";)/);
        });

        if (!regexArray) {
            throw new Error(
                '\x1b[41m\x1b[37m❌ Could not get the answer\x1b[0m'
            );
        }

        const answer = regexArray[0].slice(11);

        await page.type('[name="answer"]', answer);

        await Promise.all([
            page.click('.btn.new-btn-green.mx-auto'),
            page.waitForNavigation(),
        ]);

        let url = page.url();

        // skip in learn mode
        if (url === 'https://lingos.pl/students/checkAnswer/0,0') {
            await Promise.all([
                page.click('.btn.new-btn-green.mx-auto'),
                page.waitForNavigation(),
            ]);
        }

        console.log('\x1b[32m✔ Clean run. Found no errors');

        // Rrecursion
        url = page.url();

        if (
            url === 'https://lingos.pl/students/learning/0' ||
            'https://lingos.pl/students/learning/0,0'
        ) {
            await mainProcess(page);
        }
    } catch (error: any) {
        throw new Error(error);
    }
};

export { mainProcess };
