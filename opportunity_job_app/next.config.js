/** @type {import("next").NextConfig} */

const nextConfig = {
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
		description: "Posao Šansi opis", // TODO
		author: "ATINA", // TODO
		logo: "images/logo.png",
		imageShare: "", // TODO
		facebookURL: "https://www.facebook.com/NGOAtina",
		atinaWebsiteURL: "http://atina.org.rs/",
		linkedinURL: "https://rs.linkedin.com/in/ngo-atina-129948216",
		twitterURL: "https://twitter.com/atinango",
		email: "posaosansi@gmail.com",
		phone: "+381616384071",
		address: "Bul. Kralja Aleksandra 23",
		city: "Beograd",
		postalCode: "11000",
		country: "RS",
		locale: "sr",
	},
};

module.exports = nextConfig;
