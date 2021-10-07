import { Page } from 'puppeteer';

const mainProcess = async (page: Page) => {
    try {
        if (page.url() === 'https://lingos.pl/students/start/finished,true') {
            return;
        }
        // On the lingos page there is always a script tag with index of 7 that holds a variable with the answer to the current question. The code below extracts this answer through a regex
        const answer: string | undefined = await page.evaluate(() => {
            const scriptTags: NodeListOf<HTMLScriptElement> =
                document.querySelectorAll('script');
            if (scriptTags[7]) {
                return scriptTags[7].textContent
                    ?.match(/(?=let foo = ").+(?<=";)/)![0]
                    .slice(11);
            }
        });

        if (answer) {
            await page.type('[name="answer"]', answer);
            await Promise.all([
                page.click('.btn.new-btn-green.mx-auto'),
                page.waitForNavigation(),
            ]);
            // This block should only run in answer mode as in that mode there is an extra button that has to be clicked
            if (page.url() === 'https://lingos.pl/students/checkAnswer/0,0') {
                await Promise.all([
                    page.click('.btn.new-btn-green.mx-auto'),
                    page.waitForNavigation(),
                ]);
            }
            console.log('\x1b[32m✔ Clean run. Found no errors');
        } else {
            console.error('\x1b[31m❌ Failed to get the answer, retrying');
        }

        // Call the main process again if there are still questions to solve. When all questions are solved the url will change to a starting one thus ending the loop and a set of questions
        if (
            page.url() === 'https://lingos.pl/students/learning/0' ||
            'https://lingos.pl/students/learning/0,0'
        ) {
            await mainProcess(page);
        }
        return;
    } catch (error: any) {
        throw new Error(error);
    }
};

export { mainProcess };
