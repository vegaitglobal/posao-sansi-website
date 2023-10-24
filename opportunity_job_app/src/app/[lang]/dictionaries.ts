import en from "./dictionaries/en.json";
import sr from "./dictionaries/sr.json";
import { SERBIAN_LOCALE } from "@/appData/locales";


export interface Dictionary {
  homeBanner: {
    title: string
    text: string
  },
  homeCardLinks: {
    anonymousApplicantCardLink: {
      title: string
      label: string
    },
    anonymousEmployerCardLink: {
      title: string
      label: string
    },
    applicantCardLink: {
      title: string
      label: string
    },
    employerCardLink: {
      title: string
      label: string
    }
  }
}

const dictionaries: any = {
  en: en as Dictionary,
  sr: sr as Dictionary,
};

export const getDictionary = (locale: string): Dictionary => {
  return { ...dictionaries[SERBIAN_LOCALE], ...dictionaries[locale] };
};
