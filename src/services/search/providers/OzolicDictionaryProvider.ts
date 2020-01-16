import fetch from "node-fetch";

import cheerio = require('cheerio');
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


export const getWordMeaningsFromOzdic = async (word: string) => {
    const url = 'http://www.ozdic.com/collocation-dictionary/' + word;
    const response = await fetch(url);
    const text = await response.text();
    const meaningsArr : any = parseMeaningFromHTML(text);
    //converting object to be string
    const meaningStrings = mappingMeaningToString(meaningsArr);
    return meaningStrings;
};

const mappingMeaningToString = (meanings: any) => {
    const meaningStrings = meanings.length > 0 && meanings != null ? meanings.map((meaning: any) => {
        const classesString = meaning.classes ? meaning.classes.reduce(((classes: any, wordClass: any) => {
            const wordsAndExamples = wordClass.wordsAndExamples.reduce((wordsAndExamples: any, item: any) => wordsAndExamples + '\n' + item, '');
            return classes + '\n' + wordClass.name + wordsAndExamples;
        }), '') : '';
        const message = `${meaning.word} - ${meaning.lexicalCategory}:\n` + classesString;
        return message;
    }) : ['Not Found'];
    return meaningStrings;
};

const parseMeaningFromHTML = (text: string) => {
    let $ = cheerio.load(text);
    const items = $('.item');
    if(items.length < 1){
        return [];
    }
    let meanings = [];
    for( let i = 0; i < items.length; i++){
        const item = items[i];
        const itemChildrens = item.children;

        let word;
        let lexicalCategory;
        let classes: string[] = [];
        let current = itemChildrens[0];
        word = current.children[0].children[0].data;
        lexicalCategory = current.children[1].children[0].data;
        for(let childrenIndex = 1; childrenIndex < itemChildrens.length; childrenIndex++){
            const wordClass: any = getWordClassess(itemChildrens[childrenIndex]);
            if (wordClass.length !== 0){
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
};


const getWordClassess = (wordClassBranch: any) => {
    let classes = [];
    if(wordClassBranch.children){
        let wordClassBranchChildrens = wordClassBranch.children;
        wordClassBranchChildrens = wordClassBranchChildrens.filter((children: any) => {
            return children.data !== ' ';
        });
        const wordClassName = wordClassBranchChildrens[0].children[0].data;
        const wordsAndExamples = [];
        for ( let i = 1; i < wordClassBranchChildrens.length; i++){
            wordsAndExamples.push(wordClassBranchChildrens[i].children[0].data)
        }
        classes.push({
            name: wordClassName,
            wordsAndExamples
        });
    }
    return classes;
}