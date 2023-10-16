type SocialIcon = {
    url: string,
    iconPath: string,
    alt: string,
};

type ContactLinks = {
    href: string,
    iconPath: string,
    alt: string,
    label: string
}

export const socialMediaLinks: SocialIcon[] = [
    {
        url: "https://www.facebook.com/NGOAtina",
        iconPath: "/images/facebook.svg",
        alt: "Facebook icon"
    },
    {
        url: "https://rs.linkedin.com/in/ngo-atina-129948216",
        iconPath: "/images/linkedin.svg",
        alt: "Linkedin icon"
    },
    {
        url: "https://twitter.com/atinango",
        iconPath: "/images/twitter.svg",
        alt: "Twitter icon"
    },
    {
        url: "http://atina.org.rs/",
        iconPath: "/images/web.svg",
        alt: "Web icon"
    },
];

export const contact: ContactLinks[] = [
    {
        href: "atina@atina.org.rs",
        iconPath: "/images/mail.svg",
        alt: "Mail icon",
        label: "atina@atina.org.rs"
    },
    {
        href: "+381 61 63 84 071",
        iconPath: "/images/phone.svg",
        alt: "Phone icon",
        label: "+381 61 63 84 071"
    },
];
