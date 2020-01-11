import fetch from "node-fetch";

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

const addMeaning = (word: any, results: any, lexicalCategory: any, pronunciations: any, definitions: any, examples: any) => {
  const meaning: object = {
    word, lexicalCategory, pronunciations, definitions, examples
  };
  results.push(meaning);
};


const exploreWordNode = (node: any, results = [], func: any, word = null, lexicalCategory = null, pronunciations = null) => {
  if( node.results && node.results.length) {
    node.results.forEach((result: any) => exploreWordNode(result, results, func, word = node.word, lexicalCategory, pronunciations)) ;
  }
  if(node.lexicalEntries && node.lexicalEntries.length) {
    node.lexicalEntries.forEach((lexicalEntry: any) => exploreWordNode(lexicalEntry, results, func, word, lexicalCategory = lexicalEntry.lexicalCategory, pronunciations = lexicalEntry.pronunciations))
  }
  if(node.entries && node.entries.length){
    node.entries.forEach((entry: any) => exploreWordNode(entry, results, func, word, lexicalCategory, pronunciations));
  }
  if(node.senses && node.senses.length){
    node.senses.forEach((sense: any) => exploreWordNode(sense, results, func, word, lexicalCategory, pronunciations));
  }
  if(node.definitions){
    func(word, results, lexicalCategory, pronunciations, node.definitions, node.examples);
  }
};


export const getWordMeanings = async (word: string) => {
  try {
    const url = "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" + word + "?fields=definitions%2Cexamples%2Cpronunciations&strictMatch=false";
    const response = await fetch(url, options);
    const json = await response.json();

    //exploring node and mapping data
    const meaningsArr: any = [];
    exploreWordNode(json, meaningsArr, addMeaning, null, null, null);

    //converting object to be string
    const meaningStrings = meaningsArr.length > 0 && meaningsArr != null ? meaningsArr.map((meaning: any) => {
      console.log(meaning);
      const pronunciation = meaning.pronunciations[0] || '';
      const examplesString = meaning.examples ? meaning.examples.reduce(((examples: any, item: any) => examples + '\n' + item.text), 'examples: ') : '';
      const message = `${meaning.word} /${pronunciation.phoneticSpelling}/ ${meaning.lexicalCategory.text}: ${meaning.definitions}\n` + examplesString;
      return message;
    }) : ['Not Found'];
    return meaningStrings;
  } catch (error) {
    console.log(error);
  }
};
