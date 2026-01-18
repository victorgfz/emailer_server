
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmerPt;

const stopwords = [
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob',
    'e', 'ou', 'mas', 'que', 'se', 'como', 'quando', 'onde', 'qual',
    'este', 'esse', 'aquele', 'isto', 'isso', 'aquilo', 'eu', 'tu',
    'ele', 'ela', 'nós', 'vós', 'eles', 'elas', 'meu', 'teu', 'seu'
];

export function processPrompt(text: string): string {

    const tokens = tokenizer.tokenize(text.toLowerCase());

    if (!tokens) return text;

    const withoutStopwords = tokens.filter(
        token => !stopwords.includes(token)
    );

    const stemmed = withoutStopwords.map(token => stemmer.stem(token));

    return stemmed.join(' ');
}