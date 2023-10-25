import { LinksDictionary } from "@/app/[lang]/dictionaries/components/LinksDictionary";
import { HomeBannerDictionary } from "@/app/[lang]/dictionaries/components/HomeBannerDictionary";
import { HomeCardLinksDictionary } from "@/app/[lang]/dictionaries/components/HomeCardLinksDictionary";
import { AboutDictionary } from "@/app/[lang]/dictionaries/components/AboutDictionary";
import { StatisticsDictionary } from "@/app/[lang]/dictionaries/components/StatisticsDictionary";

export interface Dictionary {
  header: LinksDictionary;
  homeBanner: HomeBannerDictionary;
  homeCardLinks: HomeCardLinksDictionary;
  about: AboutDictionary;
  statistics: StatisticsDictionary;
}
