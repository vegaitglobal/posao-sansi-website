import { LinksDictionary } from "@/app/[lang]/dictionaries/components/LinksDictionary";
import { HomeBannerDictionary } from "@/app/[lang]/dictionaries/components/HomeBannerDictionary";
import { HomeCardLinksDictionary } from "@/app/[lang]/dictionaries/components/HomeCardLinksDictionary";
import { AboutDictionary } from "@/app/[lang]/dictionaries/components/AboutDictionary";
import { StatisticsDictionary } from "@/app/[lang]/dictionaries/components/StatisticsDictionary";
import { FooterDictionary } from "@/app/[lang]/dictionaries/components/FooterDictionary";
import { FAQItemsDictionary } from "@/app/[lang]/dictionaries/components/FAQItemsDictionary";
import { LoginFormDictionary } from "@/app/[lang]/dictionaries/components/LoginFormDictionary";
import { PasswordForgottenFormDictionary } from "@/app/[lang]/dictionaries/components/PasswordForgottenFormDictionary";
import { PasswordResetFormDictionary } from "@/app/[lang]/dictionaries/components/PasswordResetFormDictionary";
import { JobOfferListDictionary } from "@/app/[lang]/dictionaries/components/JobOfferListDictionary";
import { JobOfferDetailsDictionary } from "@/app/[lang]/dictionaries/components/JobOfferDetailsDictionary";
import { ActiveJobOfferDetailsDictionary } from "@/app/[lang]/dictionaries/components/ActiveJobOfferDetailsDictionary";
import { MyJobOfferDetailsDictionary } from "@/app/[lang]/dictionaries/components/MyJobOfferDetailsDictionary";

export interface Dictionary {
  header: LinksDictionary;
  homeBanner: HomeBannerDictionary;
  homeCardLinks: HomeCardLinksDictionary;
  about: AboutDictionary;
  statistics: StatisticsDictionary;
  footer: FooterDictionary;
  faqItems: FAQItemsDictionary;
  loginForm: LoginFormDictionary;
  passwordForgottenForm: PasswordForgottenFormDictionary;
  passwordResetForm: PasswordResetFormDictionary;
  activeJobOfferList: JobOfferListDictionary;
  myJobOfferList: JobOfferListDictionary;
  jobOfferDetails: JobOfferDetailsDictionary;
  activeJobOfferDetails: ActiveJobOfferDetailsDictionary;
  myJobOfferDetails: MyJobOfferDetailsDictionary;
}
