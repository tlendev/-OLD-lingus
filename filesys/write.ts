const fs = require('fs/promises');

import WordsObject from '../interfaces/read.interface';

// Change wordsObject type to WordsObject interface
const write = (path: string, newWordsObjectArr: any): void => {
    try {
        fs.writeFile(path, newWordsObjectArr);
    } catch (error: any) {
        throw new Error(error);
    }
};

export { write };
