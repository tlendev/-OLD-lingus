import { read } from './read';
import { write } from './write';
import { getUniqueListBy } from '../util/filterDupes';

import WordsObject from '../interfaces/read.interface';

const regenerateWordList = async (
    newWordsObject: WordsObject
): Promise<void> => {
    const data = await read('database/wordlist.json');

    data.push(newWordsObject);

    const newData: WordsObject[] = getUniqueListBy(data, 'word_en');

    write('database/wordlist.json', JSON.stringify(newData));
};

export { regenerateWordList };
