import { LinksDictionary } from "@/app/[lang]/dictionaries/components/LinksDictionary";
import { HomeBannerDictionary } from "@/app/[lang]/dictionaries/components/HomeBannerDictionary";
import { HomeCardLinksDictionary } from "@/app/[lang]/dictionaries/components/HomeCardLinksDictionary";
import { AboutDictionary } from "@/app/[lang]/dictionaries/components/AboutDictionary";
import { StatisticsDictionary } from "@/app/[lang]/dictionaries/components/StatisticsDictionary";
import { FooterDictionary } from "@/app/[lang]/dictionaries/components/FooterDictionary";
import { FAQItemsDictionary } from "@/app/[lang]/dictionaries/components/FAQItemsDictionary";
import { LoginFormDictionary } from "@/app/[lang]/dictionaries/components/LoginFormDictionary";
import { JobOffersPageDictionary } from "@/app/[lang]/dictionaries/components/JobOffersPageDictionary";
import { JobOffersDictionary } from "@/app/[lang]/dictionaries/components/JobOffersDictionary";

export interface Dictionary {
  header: LinksDictionary;
  homeBanner: HomeBannerDictionary;
  homeCardLinks: HomeCardLinksDictionary;
  about: AboutDictionary;
  statistics: StatisticsDictionary;
  footer: FooterDictionary;
  faqItems: FAQItemsDictionary;
  loginForm: LoginFormDictionary;
  jobOffersPage: JobOffersPageDictionary;
  myJobOffersPage: JobOffersPageDictionary;
  jobOffers: JobOffersDictionary;
}
