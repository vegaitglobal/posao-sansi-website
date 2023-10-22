import en from "./dictionaries/en.json";
import sr from "./dictionaries/sr.json";

const dictionaries = {
    en: en,
    sr: sr,
};

export const getDictionary = (locale) => dictionaries[locale];
