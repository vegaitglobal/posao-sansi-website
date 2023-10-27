import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const ENV = {
  BASE_URL: publicRuntimeConfig.baseURL,
  BASE_API_URL: publicRuntimeConfig.baseApiURL,
  STATIC_DIR: publicRuntimeConfig.staticFolder,
  BASE_SEO: publicRuntimeConfig.baseSEO,
  NAME: publicRuntimeConfig.name,
  TITLE: publicRuntimeConfig.title,
  SLOGAN: publicRuntimeConfig.slogan,
  DESCRIPTION: publicRuntimeConfig.description,
  AUTHOR: publicRuntimeConfig.author,
  LOGO: publicRuntimeConfig.logo,
  IMAGE_SHARE: publicRuntimeConfig.imageShare,
  FACEBOOK_URL: publicRuntimeConfig.facebookURL,
  INSTAGRAM_URL: publicRuntimeConfig.instagramURL,
  LINKEDIN_URL: publicRuntimeConfig.linkedinURL,
  TWITTER_URL: publicRuntimeConfig.twitterURL,
  PHONE: publicRuntimeConfig.phone,
  ADDRESS: publicRuntimeConfig.address,
  COUNTRY: publicRuntimeConfig.country,
  REGION: publicRuntimeConfig.region,
  LOCALE: publicRuntimeConfig.locale,
};
