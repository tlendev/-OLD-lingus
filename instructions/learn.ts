import { Page } from 'puppeteer';
import { v4 as uuid } from 'uuid';
import { regenerateWordList } from '../filesys/regenarateWordList';

import WordsObject from '../interfaces/read.interface';

const learn = async (page: Page) => {
    // Get the new word (EN)
    let newWordEN = await page.$eval('#learning-container h5', (element) => {
        return element.textContent;
    });

    // Get the new word (PL)
    let newWordPL = await page.$eval('#learning-container p', (element) => {
        return element.textContent;
    });

    // Change default value if it is not found
    if (!newWordEN) {
        newWordEN = '';
    }
    if (!newWordPL) {
        newWordPL = '';
    }

    // Create new JSON entry
    const newWord: WordsObject = {
        uid: uuid(),
        word_en: newWordEN,
        word_pl: newWordPL,
    };

    // Write to and regenerate database
    await regenerateWordList(newWord);

    // Solve the exc
    await page.type('#learningFormAnswer', newWordEN);
    await page.click('.btn');
};

export { learn };
