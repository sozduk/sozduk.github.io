// Kyrgyz Phonology Data
const PHONOLOGY_DATA = {
    "alphabet": ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "ң", "о", "ө", "п", "р", "с", "т", "у", "ү", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"],
    
    // Native Kyrgyz letters (unique to Kyrgyz/Turkic)
    "nativeLetters": ["ң", "ө", "ү"],
    
    // Letters without minimal pairs
    "noPairs": ["ъ"],
    
    // Minimal pairs for each letter
    "letterPairs": {
        "а": [
            {"word1": "бар", "word2": "бор", "position": 2, "highlight1": "а", "highlight2": "о"},
            {"word1": "тал", "word2": "тол", "position": 2, "highlight1": "а", "highlight2": "о"},
            {"word1": "кар", "word2": "кор", "position": 2, "highlight1": "а", "highlight2": "о"},
            {"word1": "сан", "word2": "сон", "position": 2, "highlight1": "а", "highlight2": "о"},
            {"word1": "ат", "word2": "от", "position": 1, "highlight1": "а", "highlight2": "о"}
        ],
        "б": [
            {"word1": "бар", "word2": "пар", "position": 1, "highlight1": "б", "highlight2": "п"},
            {"word1": "бас", "word2": "пас", "position": 1, "highlight1": "б", "highlight2": "п"},
            {"word1": "бак", "word2": "так", "position": 1, "highlight1": "б", "highlight2": "т"},
            {"word1": "бор", "word2": "тор", "position": 1, "highlight1": "б", "highlight2": "т"},
            {"word1": "бала", "word2": "дала", "position": 1, "highlight1": "б", "highlight2": "д"}
        ],
        "в": [
            {"word1": "аба", "word2": "ава", "position": 2, "highlight1": "б", "highlight2": "в"},
            {"word1": "абал", "word2": "авал", "position": 2, "highlight1": "б", "highlight2": "в"},
            {"word1": "обон", "word2": "овон", "position": 2, "highlight1": "б", "highlight2": "в"},
            {"word1": "кабар", "word2": "кавар", "position": 3, "highlight1": "б", "highlight2": "в"}
        ],
        "г": [
            {"word1": "ага", "word2": "аба", "position": 2, "highlight1": "г", "highlight2": "б"},
            {"word1": "тага", "word2": "така", "position": 3, "highlight1": "г", "highlight2": "к"},
            {"word1": "сага", "word2": "сака", "position": 3, "highlight1": "г", "highlight2": "к"},
            {"word1": "бага", "word2": "бака", "position": 3, "highlight1": "г", "highlight2": "к"}
        ],
        "д": [
            {"word1": "дал", "word2": "тал", "position": 1, "highlight1": "д", "highlight2": "т"},
            {"word1": "дар", "word2": "тар", "position": 1, "highlight1": "д", "highlight2": "т"},
            {"word1": "дос", "word2": "тос", "position": 1, "highlight1": "д", "highlight2": "т"},
            {"word1": "ада", "word2": "ата", "position": 2, "highlight1": "д", "highlight2": "т"},
            {"word1": "кадам", "word2": "катам", "position": 3, "highlight1": "д", "highlight2": "т"}
        ],
        "е": [
            {"word1": "бел", "word2": "бал", "position": 2, "highlight1": "е", "highlight2": "а"},
            {"word1": "келе", "word2": "кала", "position": 2, "highlight1": "е", "highlight2": "а"},
            {"word1": "тен", "word2": "тан", "position": 2, "highlight1": "е", "highlight2": "а"},
            {"word1": "берме", "word2": "барма", "position": 2, "highlight1": "е", "highlight2": "а"}
        ],
        "ё": [
            {"word1": "боёо", "word2": "бозо", "position": 3, "highlight1": "ё", "highlight2": "з"},
            {"word1": "ёлка", "word2": "алка", "position": 1, "highlight1": "ё", "highlight2": "а"}
        ],
        "ж": [
            {"word1": "жар", "word2": "чар", "position": 1, "highlight1": "ж", "highlight2": "ч"},
            {"word1": "жан", "word2": "чан", "position": 1, "highlight1": "ж", "highlight2": "ч"},
            {"word1": "жаш", "word2": "чаш", "position": 1, "highlight1": "ж", "highlight2": "ч"},
            {"word1": "жалам", "word2": "талам", "position": 1, "highlight1": "ж", "highlight2": "т"},
            {"word1": "жол", "word2": "тол", "position": 1, "highlight1": "ж", "highlight2": "т"}
        ],
        "з": [
            {"word1": "зар", "word2": "сар", "position": 1, "highlight1": "з", "highlight2": "с"},
            {"word1": "зат", "word2": "сат", "position": 1, "highlight1": "з", "highlight2": "с"},
            {"word1": "азар", "word2": "асар", "position": 2, "highlight1": "з", "highlight2": "с"},
            {"word1": "залым", "word2": "салым", "position": 1, "highlight1": "з", "highlight2": "с"}
        ],
        "и": [
            {"word1": "ит", "word2": "ат", "position": 1, "highlight1": "и", "highlight2": "а"},
            {"word1": "тил", "word2": "тал", "position": 2, "highlight1": "и", "highlight2": "а"},
            {"word1": "бил", "word2": "бал", "position": 2, "highlight1": "и", "highlight2": "а"},
            {"word1": "кир", "word2": "кар", "position": 2, "highlight1": "и", "highlight2": "а"}
        ],
        "й": [
            {"word1": "ай", "word2": "ат", "position": 2, "highlight1": "й", "highlight2": "т"},
            {"word1": "той", "word2": "тор", "position": 3, "highlight1": "й", "highlight2": "р"},
            {"word1": "айры", "word2": "аары", "position": 2, "highlight1": "й", "highlight2": "а"},
            {"word1": "сай", "word2": "сан", "position": 3, "highlight1": "й", "highlight2": "н"}
        ],
        "к": [
            {"word1": "кал", "word2": "тал", "position": 1, "highlight1": "к", "highlight2": "т"},
            {"word1": "кар", "word2": "тар", "position": 1, "highlight1": "к", "highlight2": "т"},
            {"word1": "кат", "word2": "тат", "position": 1, "highlight1": "к", "highlight2": "т"},
            {"word1": "ак", "word2": "ат", "position": 2, "highlight1": "к", "highlight2": "т"},
            {"word1": "көл", "word2": "төл", "position": 1, "highlight1": "к", "highlight2": "т"}
        ],
        "л": [
            {"word1": "тал", "word2": "тар", "position": 3, "highlight1": "л", "highlight2": "р"},
            {"word1": "кал", "word2": "кар", "position": 3, "highlight1": "л", "highlight2": "р"},
            {"word1": "бал", "word2": "бар", "position": 3, "highlight1": "л", "highlight2": "р"},
            {"word1": "көл", "word2": "көр", "position": 3, "highlight1": "л", "highlight2": "р"}
        ],
        "м": [
            {"word1": "мал", "word2": "бал", "position": 1, "highlight1": "м", "highlight2": "б"},
            {"word1": "мар", "word2": "бар", "position": 1, "highlight1": "м", "highlight2": "б"},
            {"word1": "там", "word2": "тал", "position": 3, "highlight1": "м", "highlight2": "л"},
            {"word1": "ам", "word2": "ал", "position": 2, "highlight1": "м", "highlight2": "л"}
        ],
        "н": [
            {"word1": "нар", "word2": "бар", "position": 1, "highlight1": "н", "highlight2": "б"},
            {"word1": "тан", "word2": "там", "position": 3, "highlight1": "н", "highlight2": "м"},
            {"word1": "сан", "word2": "сам", "position": 3, "highlight1": "н", "highlight2": "м"},
            {"word1": "ан", "word2": "ам", "position": 2, "highlight1": "н", "highlight2": "м"}
        ],
        "ң": [
            {"word1": "аң", "word2": "ан", "position": 2, "highlight1": "ң", "highlight2": "н"},
            {"word1": "саң", "word2": "сан", "position": 3, "highlight1": "ң", "highlight2": "н"},
            {"word1": "таң", "word2": "тан", "position": 3, "highlight1": "ң", "highlight2": "н"},
            {"word1": "аңчы", "word2": "аачы", "position": 2, "highlight1": "ң", "highlight2": "а"},
            {"word1": "көңүл", "word2": "көнүл", "position": 3, "highlight1": "ң", "highlight2": "н"}
        ],
        "о": [
            {"word1": "от", "word2": "ат", "position": 1, "highlight1": "о", "highlight2": "а"},
            {"word1": "бор", "word2": "бар", "position": 2, "highlight1": "о", "highlight2": "а"},
            {"word1": "тор", "word2": "тар", "position": 2, "highlight1": "о", "highlight2": "а"},
            {"word1": "кол", "word2": "кал", "position": 2, "highlight1": "о", "highlight2": "а"}
        ],
        "ө": [
            {"word1": "өз", "word2": "аз", "position": 1, "highlight1": "ө", "highlight2": "а"},
            {"word1": "көл", "word2": "кол", "position": 2, "highlight1": "ө", "highlight2": "о"},
            {"word1": "төл", "word2": "тол", "position": 2, "highlight1": "ө", "highlight2": "о"},
            {"word1": "көр", "word2": "кор", "position": 2, "highlight1": "ө", "highlight2": "о"},
            {"word1": "бөк", "word2": "бок", "position": 2, "highlight1": "ө", "highlight2": "о"}
        ],
        "п": [
            {"word1": "пар", "word2": "бар", "position": 1, "highlight1": "п", "highlight2": "б"},
            {"word1": "пас", "word2": "бас", "position": 1, "highlight1": "п", "highlight2": "б"},
            {"word1": "ап", "word2": "аб", "position": 2, "highlight1": "п", "highlight2": "б"},
            {"word1": "топ", "word2": "тоб", "position": 3, "highlight1": "п", "highlight2": "б"}
        ],
        "р": [
            {"word1": "тар", "word2": "тал", "position": 3, "highlight1": "р", "highlight2": "л"},
            {"word1": "кар", "word2": "кал", "position": 3, "highlight1": "р", "highlight2": "л"},
            {"word1": "бар", "word2": "бал", "position": 3, "highlight1": "р", "highlight2": "л"},
            {"word1": "ар", "word2": "ал", "position": 2, "highlight1": "р", "highlight2": "л"}
        ],
        "с": [
            {"word1": "сар", "word2": "зар", "position": 1, "highlight1": "с", "highlight2": "з"},
            {"word1": "сат", "word2": "зат", "position": 1, "highlight1": "с", "highlight2": "з"},
            {"word1": "сан", "word2": "тан", "position": 1, "highlight1": "с", "highlight2": "т"},
            {"word1": "бас", "word2": "бат", "position": 3, "highlight1": "с", "highlight2": "т"}
        ],
        "т": [
            {"word1": "тал", "word2": "кал", "position": 1, "highlight1": "т", "highlight2": "к"},
            {"word1": "тар", "word2": "кар", "position": 1, "highlight1": "т", "highlight2": "к"},
            {"word1": "ат", "word2": "ак", "position": 2, "highlight1": "т", "highlight2": "к"},
            {"word1": "от", "word2": "ок", "position": 2, "highlight1": "т", "highlight2": "к"}
        ],
        "у": [
            {"word1": "ук", "word2": "ак", "position": 1, "highlight1": "у", "highlight2": "а"},
            {"word1": "тур", "word2": "тар", "position": 2, "highlight1": "у", "highlight2": "а"},
            {"word1": "кул", "word2": "кал", "position": 2, "highlight1": "у", "highlight2": "а"},
            {"word1": "бул", "word2": "бал", "position": 2, "highlight1": "у", "highlight2": "а"}
        ],
        "ү": [
            {"word1": "үй", "word2": "ай", "position": 1, "highlight1": "ү", "highlight2": "а"},
            {"word1": "түн", "word2": "тын", "position": 2, "highlight1": "ү", "highlight2": "ы"},
            {"word1": "күн", "word2": "кын", "position": 2, "highlight1": "ү", "highlight2": "ы"},
            {"word1": "бүт", "word2": "быт", "position": 2, "highlight1": "ү", "highlight2": "ы"},
            {"word1": "үке", "word2": "аке", "position": 1, "highlight1": "ү", "highlight2": "а"}
        ],
        "ф": [
            {"word1": "факты", "word2": "бакты", "position": 1, "highlight1": "ф", "highlight2": "б"},
            {"word1": "фарыз", "word2": "барыз", "position": 1, "highlight1": "ф", "highlight2": "б"},
            {"word1": "форт", "word2": "борт", "position": 1, "highlight1": "ф", "highlight2": "б"}
        ],
        "х": [
            {"word1": "халат", "word2": "калат", "position": 1, "highlight1": "х", "highlight2": "к"},
            {"word1": "хан", "word2": "кан", "position": 1, "highlight1": "х", "highlight2": "к"},
            {"word1": "ах", "word2": "ак", "position": 2, "highlight1": "х", "highlight2": "к"}
        ],
        "ц": [
            {"word1": "цирк", "word2": "зирк", "position": 1, "highlight1": "ц", "highlight2": "з"},
            {"word1": "концерт", "word2": "конверт", "position": 4, "highlight1": "ц", "highlight2": "в"},
            {"word1": "абзац", "word2": "абзал", "position": 5, "highlight1": "ц", "highlight2": "л"}
        ],
        "ч": [
            {"word1": "чар", "word2": "жар", "position": 1, "highlight1": "ч", "highlight2": "ж"},
            {"word1": "чан", "word2": "жан", "position": 1, "highlight1": "ч", "highlight2": "ж"},
            {"word1": "ач", "word2": "аж", "position": 2, "highlight1": "ч", "highlight2": "ж"},
            {"word1": "чал", "word2": "шал", "position": 1, "highlight1": "ч", "highlight2": "ш"}
        ],
        "ш": [
            {"word1": "шар", "word2": "чар", "position": 1, "highlight1": "ш", "highlight2": "ч"},
            {"word1": "шал", "word2": "чал", "position": 1, "highlight1": "ш", "highlight2": "ч"},
            {"word1": "аш", "word2": "ач", "position": 2, "highlight1": "ш", "highlight2": "ч"},
            {"word1": "таш", "word2": "тач", "position": 3, "highlight1": "ш", "highlight2": "ч"}
        ],
        "щ": [
            {"word1": "щит", "word2": "бит", "position": 1, "highlight1": "щ", "highlight2": "б"},
            {"word1": "щи", "word2": "би", "position": 1, "highlight1": "щ", "highlight2": "б"}
        ],
        "ъ": [],
        "ы": [
            {"word1": "тын", "word2": "тин", "position": 2, "highlight1": "ы", "highlight2": "и"},
            {"word1": "кыр", "word2": "кир", "position": 2, "highlight1": "ы", "highlight2": "и"},
            {"word1": "бык", "word2": "бик", "position": 2, "highlight1": "ы", "highlight2": "и"},
            {"word1": "ыр", "word2": "ир", "position": 1, "highlight1": "ы", "highlight2": "и"}
        ],
        "ь": [
            {"word1": "статья", "word2": "статуя", "position": 5, "highlight1": "ь", "highlight2": "у"}
        ],
        "э": [
            {"word1": "эр", "word2": "ар", "position": 1, "highlight1": "э", "highlight2": "а"},
            {"word1": "эл", "word2": "ал", "position": 1, "highlight1": "э", "highlight2": "а"},
            {"word1": "эт", "word2": "ат", "position": 1, "highlight1": "э", "highlight2": "а"},
            {"word1": "эбак", "word2": "абак", "position": 1, "highlight1": "э", "highlight2": "а"}
        ],
        "ю": [
            {"word1": "аюу", "word2": "апу", "position": 2, "highlight1": "ю", "highlight2": "п"},
            {"word1": "бюст", "word2": "баст", "position": 2, "highlight1": "ю", "highlight2": "а"}
        ],
        "я": [
            {"word1": "аяр", "word2": "аар", "position": 2, "highlight1": "я", "highlight2": "а"},
            {"word1": "аярчы", "word2": "аарчы", "position": 2, "highlight1": "я", "highlight2": "а"},
            {"word1": "баяу", "word2": "баюу", "position": 3, "highlight1": "я", "highlight2": "ю"}
        ]
    },
    
    "stats": {
        "totalWords": 23486,
        "lettersWithPairs": 35,
        "lettersWithoutPairs": ["ъ"]
    }
};
