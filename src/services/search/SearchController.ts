import { getWordMeanings } from "./providers/OxfordDictionaryProvider";

export const getMeaningByWord = async (word: string) => {
  if (word.length < 3) {
    return ['Not Found'];
  }

  return await getWordMeanings(word);
};
