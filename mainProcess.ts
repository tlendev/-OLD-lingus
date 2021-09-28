import { Page } from 'puppeteer';
import { learn } from './instructions/learn';
import { solve } from './instructions/solve';

const mainProcess = async (page: Page) => {
    // Get the URL then check if the element of id '#lottie-new-word' exists, if it does the learning function is called
    let url = page.url();
    const learnMode = await page.$('#lottie-new-word');

    if (learnMode) {
        url = 'https://lingos.pl/students/learning/0';
    } else {
        url = 'https://lingos.pl/students/learning/0,0';
    }

    // Learn then solve
    if (url === 'https://lingos.pl/students/learning/0') {
        await learn(page);
    }

    // Solve
    // if (url === 'https://lingos.pl/students/learning/0,0') {
    //     await solve(page);
    //     // confirm
    //     if (page.url() === 'https://lingos.pl/students/checkAnswer/0,0') {
    //         await page.click('#next');
    //     }
    // }

    // Recurention
    url = page.url();

    if (
        url === 'https://lingos.pl/students/learning/0' ||
        'https://lingos.pl/students/learning/0,0'
    ) {
        mainProcess(page);
    }
};

export { mainProcess };
