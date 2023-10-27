/** @type {import("next").NextConfig} */

const nextConfig = {
	// Will be available on both server and client:
	publicRuntimeConfig: {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL,
		baseApiURL: process.env.NEXT_PUBLIC_API_URL,
		staticFolder: process.env.NEXT_PUBLIC_STATIC_DIR,
		baseSEO: {
			robotsProps: {
				maxSnippet: -1,
				maxImagePreview: "none",
				maxVideoPreview: -1,
			},
		},
		name: "Posao Šansi",
		title: "Posao Šansi",
		slogan: "Slogan za Posao Šansi", // TODO
		description: "Opis sajta Posao Šansi", // TODO
		author: "ATINA", // TODO
		logo: "images/logo.png",
		imageShare: "", // TODO
		facebookURL: "https://www.facebook.com/NGOAtina",
		instagramURL: "http://atina.org.rs/",
		linkedinURL: "https://rs.linkedin.com/in/ngo-atina-129948216",
		twitterURL: "https://twitter.com/atinango",
		phone: "+381616384071", // TODO
		address: "Novi Sad",
		region: "Vojvodina",
		country: "RS",
		postalCode: "21000",
		locale: "sr",
	},
};

module.exports = nextConfig;
