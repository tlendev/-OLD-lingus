import { Page } from 'puppeteer';
import { read } from '../filesys/read';

const solve = async (page: Page) => {
    // Get the required word (PL)
    const refVal = await page.$eval('#learning-container h5', (element) => {
        return element.textContent;
    });

    // Load all data from database
    const data = await read('../database/wordlist.json');

    // Filter data to find a matching entry
    let matchingEntry = data.find((DbEntry) => DbEntry.word_pl === refVal);

    // If no matches were found, throw an error
    if (!matchingEntry) {
        throw new Error(`Missing database entry for the word\t${refVal}`);
    }

    const answer = matchingEntry.word_en;

    // Solve the exc
    await page.type('#answer', answer);
    await page.click('.btn');
};

export { solve };
