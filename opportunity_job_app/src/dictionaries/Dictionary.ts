import { LinksDictionary } from "@/dictionaries/components/LinksDictionary";
import { HomeBannerDictionary } from "@/dictionaries/components/HomeBannerDictionary";
import { HomeCardLinksDictionary } from "@/dictionaries/components/HomeCardLinksDictionary";
import { AboutDictionary } from "@/dictionaries/components/AboutDictionary";
import { StatisticsDictionary } from "@/dictionaries/components/StatisticsDictionary";
import { FooterDictionary } from "@/dictionaries/components/FooterDictionary";
import { FAQItemsDictionary } from "@/dictionaries/components/FAQItemsDictionary";
import { LoginFormDictionary } from "@/dictionaries/components/LoginFormDictionary";
import { PasswordForgottenFormDictionary } from "@/dictionaries/components/PasswordForgottenFormDictionary";
import { PasswordResetFormDictionary } from "@/dictionaries/components/PasswordResetFormDictionary";
import { JobOfferListDictionary } from "@/dictionaries/components/JobOfferListDictionary";
import { JobOfferDetailsDictionary } from "@/dictionaries/components/JobOfferDetailsDictionary";
import { ActiveJobOfferDetailsDictionary } from "@/dictionaries/components/ActiveJobOfferDetailsDictionary";
import { MyJobOfferDetailsDictionary } from "@/dictionaries/components/MyJobOfferDetailsDictionary";
import { FormErrorsDictionary } from "@/dictionaries/common/FormErrorsDictionary";
import { RegistrationFormDictionary } from "@/dictionaries/components/RegistrationFormDictionary";
import { ApplicantRegistrationFormDictionary } from "@/dictionaries/components/ApplicantRegistrationFormDictionary";

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
  passwordSetFormErrors: FormErrorsDictionary;
  passwordResetForm: PasswordResetFormDictionary;
  registrationForm: RegistrationFormDictionary;
  applicantRegistrationForm: ApplicantRegistrationFormDictionary;
  activeJobOfferList: JobOfferListDictionary;
  myJobOfferList: JobOfferListDictionary;
  jobOfferDetails: JobOfferDetailsDictionary;
  activeJobOfferDetails: ActiveJobOfferDetailsDictionary;
  myJobOfferDetails: MyJobOfferDetailsDictionary;
  commonFormErrors: FormErrorsDictionary;
}
