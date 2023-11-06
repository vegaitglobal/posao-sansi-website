import { LanguageLink, MainMenuLink } from "@/types";
import { createAppLink, createMenuLink } from "@/utils";


export const HOME_LINK = createMenuLink("/", "homeLabel", "/images/home.svg");
export const FAQ_LINK = createMenuLink("/faq", "faqLabel", "/images/faq.svg");
export const LOGIN_LINK = createMenuLink("/login", "loginLabel", "/images/log-in.svg");
export const REGISTER_LINK = createMenuLink("/register", "registerLabel", "/images/sign-in.svg");
export const MY_JOB_OFFERS_LINK = createMenuLink("/my-job-offers", "myJobsLabel", "/images/jobs.svg");
export const ACTIVE_JOB_OFFERS_LINK = createMenuLink("/job-offers", "jobOffersLabel", "/images/jobs.svg");
export const PASSWORD_FORGOTTEN_LINK = createAppLink("/password-forgotten");
export const CREATE_JOB_OFFER_LINK = createAppLink(`${ MY_JOB_OFFERS_LINK.rawPathname }/create`);
export const EDIT_JOB_OFFER_LINK = createAppLink(`${ MY_JOB_OFFERS_LINK.rawPathname }/{id}/edit`);

export const publicLinks: MainMenuLink[] = [
  HOME_LINK,
  FAQ_LINK,
];

export const anonymousUserLinks: MainMenuLink[] = [
  ...publicLinks,
  LOGIN_LINK,
  REGISTER_LINK,
];

export const employerLinks: MainMenuLink[] = [
  ...publicLinks,
  MY_JOB_OFFERS_LINK,
];

export const applicantLinks: MainMenuLink[] = [
  ...publicLinks,
  ACTIVE_JOB_OFFERS_LINK,
];

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
