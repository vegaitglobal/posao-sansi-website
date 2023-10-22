/** @type {import("next").NextConfig} */

const nextConfig = {
    // Will be available on both server and client:
    publicRuntimeConfig: {
        baseUrl: process.env.BASE_URL,
        baseApiUrl: process.env.API_URL,
        staticFolder: process.env.STATIC_DIR, // Will be used per SEO page default:
        baseSeo: {
            robotsProps: {
                maxSnippet: -1, maxImagePreview: "none", maxVideoPreview: -1,
            },
        },
        name: "Posao Šansi",
        title: "Posao Šansi",
        slogan: "", // TODO
        description: "", // TODO
        author: "", // TODO
        logo: "images/logo.png",
        imageShare: "", // TODO
        facebookUrl: "https://www.facebook.com/NGOAtina",
        instagramUrl: "http://atina.org.rs/",
        linkedinUrl: "https://rs.linkedin.com/in/ngo-atina-129948216",
        twitterUrl: "https://twitter.com/atinango",
        phone: "+381616384071", // TODO
        address: "Novi Sad",
        region: "Vojvodina",
        country: "RS",
        postalCode: "21000",
        locale: "sr",
    },
};

module.exports = nextConfig;
