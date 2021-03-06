import client from "../../../db/redis-client";


export const setOxfordWordMeaningsCache = async (word: string, meaings: string[]) => {
    const key = `oxford:${word}`;
    await client.rpush(key, ...meaings);
};
export const getOxfordWordMeaningsFromCache = async (word: string) => {
    const key = `oxford:${word}`;
    const meanings = await client.lrange(key, 0, -1);
    return meanings;
};

export const setOzdicWordMeaningsCache = async (word: string, meaings: string[]) => {
    const key = `ozdic:${word}`;
    await client.rpush(key, ...meaings);
};
export const getOzdicWordMeaningsFromCache = async (word: string) => {
    const key = `ozdic:${word}`;
    const meanings = await client.lrange(key, 0, -1);
    return meanings;
};
