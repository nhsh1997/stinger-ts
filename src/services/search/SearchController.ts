import { getWordMeaningsFromOxford } from "./providers/OxfordDictionaryProvider";
import {getOxfordWordMeaningsFromCache, setOxfordWordMeaningsCache} from "./cache/redis-dictionary-cache";

export const getMeaningByWord = async (word: string) => {
  if (word.length < 2) {
    return ['Not Found'];
  }

  let meanings = await getOxfordWordMeaningsFromCache(word);
  if (meanings.length < 1){
    meanings = await getWordMeaningsFromOxford(word);
    await setOxfordWordMeaningsCache(word, meanings);
  }

  return meanings;
};
