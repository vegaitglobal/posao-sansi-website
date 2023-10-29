import en from "./en.json";
import sr from "./sr.json";
import { SERBIAN_LOCALE } from "@/appData/locales";
import { Dictionary } from "@/dictionaries/Dictionary";


const dictionaries: any = {
  en: en as Dictionary,
  sr: sr as Dictionary,
};

export const getDictionary = (locale: string): Dictionary => {
  return { ...dictionaries[SERBIAN_LOCALE], ...dictionaries[locale] };
};
