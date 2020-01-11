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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const app_id = "fcee0c15"; // insert your APP Id
const app_key = "dc320802eff7c3e8ef9cfd26ece6583a"; // insert your APP Key
const fields = "definitions%2Cexamples%2Cpronunciations";
const strictMatch = "false";
const options = {
    method: "GET",
    headers: {
        'app_id': app_id,
        'app_key': app_key
    }
};
const addMeaning = (word, results, lexicalCategory, pronunciations, definitions, examples) => {
    const meaning = {
        word, lexicalCategory, pronunciations, definitions, examples
    };
    results.push(meaning);
};
const exploreWordNode = (node, results = [], func, word = null, lexicalCategory = null, pronunciations = null) => {
    if (node.results && node.results.length) {
        node.results.forEach((result) => exploreWordNode(result, results, func, word = node.word, lexicalCategory, pronunciations));
    }
    if (node.lexicalEntries && node.lexicalEntries.length) {
        node.lexicalEntries.forEach((lexicalEntry) => exploreWordNode(lexicalEntry, results, func, word, lexicalCategory = lexicalEntry.lexicalCategory, pronunciations = lexicalEntry.pronunciations));
    }
    if (node.entries && node.entries.length) {
        node.entries.forEach((entry) => exploreWordNode(entry, results, func, word, lexicalCategory, pronunciations));
    }
    if (node.senses && node.senses.length) {
        node.senses.forEach((sense) => exploreWordNode(sense, results, func, word, lexicalCategory, pronunciations));
    }
    if (node.definitions) {
        func(word, results, lexicalCategory, pronunciations, node.definitions, node.examples);
    }
};
exports.getWordMeanings = (word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" + word + "?fields=definitions%2Cexamples%2Cpronunciations&strictMatch=false";
        const response = yield node_fetch_1.default(url, options);
        const json = yield response.json();
        //exploring node and mapping data
        const meaningsArr = [];
        exploreWordNode(json, meaningsArr, addMeaning, null, null, null);
        //converting object to be string
        const meaningStrings = meaningsArr.length > 0 && meaningsArr != null ? meaningsArr.map((meaning) => {
            console.log(meaning);
            const pronunciation = meaning.pronunciations[0] || '';
            const examplesString = meaning.examples ? meaning.examples.reduce(((examples, item) => examples + '\n' + item.text), 'examples: ') : '';
            const message = `${meaning.word} /${pronunciation.phoneticSpelling}/ ${meaning.lexicalCategory.text}: ${meaning.definitions}\n` + examplesString;
            return message;
        }) : ['Not Found'];
        return meaningStrings;
    }
    catch (error) {
        console.log(error);
        return ['Not Found'];
    }
});
//# sourceMappingURL=OxfordDictionaryProvider.js.map