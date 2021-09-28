const fs = require('fs/promises');

import WordsObject from '../interfaces/read.interface';

const read = async (path: string): Promise<WordsObject[]> => {
    try {
        const buffer: Buffer = await fs.readFile(path);
        const data = buffer.toString();
        return await JSON.parse(data);
    } catch (error: any) {
        throw new Error(error);
    }
};

export { read };
