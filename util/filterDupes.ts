import WordsObject from '../interfaces/read.interface';

function getUniqueListBy(arr: WordsObject[], key: string) {
    return [...new Map(arr.map((item: any) => [item[key], item])).values()];
}

export { getUniqueListBy };
