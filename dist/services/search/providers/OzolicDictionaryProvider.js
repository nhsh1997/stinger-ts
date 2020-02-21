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
const cheerio = require("cheerio");
/*
const meaning = {
    word: 'comment',
    lexicalCategory: 'Noun',
    classes: [
        {
            name: "ADJ",
            meaningAndExamples: [
                'brief | fair, favourable',
                'What she said was (a) fair comment.'
            ]
        },

    ]

};*/
exports.getWordMeaningsFromOzdic = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://www.ozdic.com/collocation-dictionary/' + word;
    const response = yield node_fetch_1.default(url);
    const text = yield response.text();
    const meaningsArr = parseMeaningFromHTML(text);
    //converting object to be string
    const meaningStrings = mappingMeaningToString(meaningsArr);
    return meaningStrings;
});
const mappingMeaningToString = (meanings) => {
    const meaningStrings = meanings.length > 0 && meanings != null ? meanings.map((meaning) => {
        const classesString = meaning.classes ? meaning.classes.reduce(((classes, wordClass) => {
            const wordsAndExamples = wordClass.wordsAndExamples.reduce((wordsAndExamples, item) => wordsAndExamples + '\n' + item, '');
            return classes + '\n' + wordClass.name + wordsAndExamples;
        }), '') : '';
        const message = `${meaning.word} - ${meaning.lexicalCategory}:\n` + classesString;
        return message;
    }) : ['Not Found'];
    return meaningStrings;
};
const parseMeaningFromHTML = (text) => {
    try {
        let $ = cheerio.load(text);
        const items = $('.item');
        if (items.length < 1) {
            return [];
        }
        let meanings = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemChildrens = item.children;
            let word;
            let lexicalCategory;
            let classes = [];
            let current = itemChildrens[0];
            word = current.children[0].children[0].data;
            lexicalCategory = current.children[1].children[0].data;
            for (let childrenIndex = 1; childrenIndex < itemChildrens.length; childrenIndex++) {
                const wordClass = getWordClassess(itemChildrens[childrenIndex]);
                if (wordClass.length !== 0) {
                    classes = classes.concat(wordClass);
                }
            }
            const result = {
                word,
                lexicalCategory,
                classes
            };
            meanings.push(result);
        }
        return meanings;
    }
    catch (e) {
        return [];
    }
};
const getWordClassess = (wordClassBranch) => {
    try {
        let classes = [];
        if (wordClassBranch.children) {
            let wordClassBranchChildrens = wordClassBranch.children;
            wordClassBranchChildrens = wordClassBranchChildrens.filter((children) => {
                return children.data !== ' ';
            });
            const wordClassName = wordClassBranchChildrens[0].children[0].data;
            const wordsAndExamples = [];
            for (let i = 1; i < wordClassBranchChildrens.length; i++) {
                wordsAndExamples.push(wordClassBranchChildrens[i].children[0].data);
            }
            classes.push({
                name: wordClassName,
                wordsAndExamples
            });
        }
        return classes;
    }
    catch (e) {
        return [];
    }
};
//# sourceMappingURL=OzolicDictionaryProvider.js.map