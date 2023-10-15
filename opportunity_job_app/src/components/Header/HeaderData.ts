type LinkItem = {
    label: string;
    url: string;
    iconPath: string;
    isLogged?: null | object;
};

export const publicLinks: LinkItem[] = [
    { label: "Početna", url: "/", iconPath: "/images/home.svg" },
    { label: "FAQ", url: "/faq", iconPath: "/images/faq.svg" },
];

export const anonymousUserLinks: LinkItem[] = [
    ...publicLinks,
    { label: "Prijava", url: "/login", iconPath: "/images/log-in.svg" },
    { label: "Registracija", url: "/register", iconPath: "/images/sign-in.svg" },
];

export const employerLinks: LinkItem[] = [
    ...publicLinks,
    { label: "Moji poslovi", url: "/my-job-offers", iconPath: "/images/jobs.svg" },
    { label: "Odjava", url: "/logout", iconPath: "/images/sing-out.svg" },
];

export const applicantLinks: LinkItem[] = [
    ...publicLinks,
    { label: "Ponuda poslova", url: "/job-offers", iconPath: "/images/jobs.svg" },
    { label: "Odjava", url: "/logout", iconPath: "/images/sing-out.svg" },
];