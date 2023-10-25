export interface MainMenuLink {
  labelDictKey: string;
  url: string;
  iconPath: string;
}

export const publicLinks: MainMenuLink[] = [
  {
    labelDictKey: "homeLabel",
    url: "/",
    iconPath: "/images/home.svg",
  },
  {
    labelDictKey: "faqLabel",
    url: "/faq",
    iconPath: "/images/faq.svg",
  },
];

export const anonymousUserLinks: MainMenuLink[] = [
  ...publicLinks,
  {
    labelDictKey: "loginLabel",
    url: "/login",
    iconPath: "/images/log-in.svg",
  },
  {
    labelDictKey: "registerLabel",
    url: "/register",
    iconPath: "/images/sign-in.svg",
  },
];

export const employerLinks: MainMenuLink[] = [
  ...publicLinks,
  {
    labelDictKey: "myJobsLabel",
    url: "/my-job-offers",
    iconPath: "/images/jobs.svg",
  },
];

export const applicantLinks: MainMenuLink[] = [
  ...publicLinks,
  {
    labelDictKey: "jobOffersLabel",
    url: "/job-offers",
    iconPath: "/images/jobs.svg",
  },
];

interface LanguageLink {
  labelDictKey: string;
  code: string;
  flagPath: string;
}

export const languageLinks: LanguageLink[] = [
  {
    labelDictKey: "enLabel",
    code: "en",
    flagPath: "/images/en-flag.png"
  },
  {
    labelDictKey: "srLabel",
    code: "sr",
    flagPath: "/images/srb-flag.png"
  },
];
