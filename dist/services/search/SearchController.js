"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OxfordDictionaryProvider_1 = require("./providers/OxfordDictionaryProvider");
const redis_dictionary_cache_1 = require("./cache/redis-dictionary-cache");
const OzolicDictionaryProvider_1 = require("./providers/OzolicDictionaryProvider");
exports.getMeaningByWord = (word) => __awaiter(void 0, void 0, void 0, function* () {
    if (word.length < 2) {
        return ['Not Found'];
    }
    let meanings = [];
    let oxfordMeanings = yield redis_dictionary_cache_1.getOxfordWordMeaningsFromCache(word);
    if (oxfordMeanings.length < 1) {
        oxfordMeanings = yield OxfordDictionaryProvider_1.getWordMeaningsFromOxford(word);
        yield redis_dictionary_cache_1.setOxfordWordMeaningsCache(word, oxfordMeanings);
    }
    if (oxfordMeanings[0] !== 'Not Found') {
        meanings = meanings.concat(oxfordMeanings);
    }
    let ozdicMeanings = yield redis_dictionary_cache_1.getOzdicWordMeaningsFromCache(word);
    if (ozdicMeanings.length < 1) {
        ozdicMeanings = yield OzolicDictionaryProvider_1.getWordMeaningsFromOzdic(word);
        yield redis_dictionary_cache_1.setOzdicWordMeaningsCache(word, ozdicMeanings);
    }
    if (ozdicMeanings[0] !== 'Not Found') {
        meanings = meanings.concat(ozdicMeanings);
    }
    if (meanings.length == 0) {
        meanings = ['Not Found'];
    }
    return meanings;
});
//# sourceMappingURL=SearchController.js.map