import { getWordMeaningsFromOxford } from "./providers/OxfordDictionaryProvider";
import {
  getOxfordWordMeaningsFromCache,
  getOzdicWordMeaningsFromCache,
  setOxfordWordMeaningsCache, setOzdicWordMeaningsCache
} from "./cache/redis-dictionary-cache";
import {getWordMeaningsFromOzdic} from "./providers/OzolicDictionaryProvider";

export const getMeaningByWord = async (word: string) => {
  if (word.length < 2) {
    return ['Not Found'];
  }

  let meanings: string[] = [];

  let oxfordMeanings = await getOxfordWordMeaningsFromCache(word);
  if (oxfordMeanings.length < 1){
    oxfordMeanings = await getWordMeaningsFromOxford(word);
    await setOxfordWordMeaningsCache(word, oxfordMeanings);
  }

  if (oxfordMeanings[0] !== 'Not Found'){
    meanings = meanings.concat(oxfordMeanings);
  }

  let ozdicMeanings = await getOzdicWordMeaningsFromCache(word);

  if (ozdicMeanings.length < 1){
    ozdicMeanings = await getWordMeaningsFromOzdic(word);
    await setOzdicWordMeaningsCache(word, ozdicMeanings);
  }

  if (ozdicMeanings[0] !== 'Not Found'){
    meanings = meanings.concat(ozdicMeanings);
  }

  if (meanings.length == 0){
    meanings = ['Not Found'];
  }

  return meanings;
};
