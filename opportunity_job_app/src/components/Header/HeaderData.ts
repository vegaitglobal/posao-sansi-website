type LinkItem = {
    label: string;
    url: string;
    iconPath: string;
    isLogged?: null | object;
};

export const initialLinks: LinkItem[] = [
    { label: 'Pocetna', url: '/', iconPath: '/images/home.svg' },
    { label: 'FAQ', url: '/faq', iconPath: '/images/faq.svg' },
  ];
  
  export const links: LinkItem[] = [
    ...initialLinks,
    { label: 'Prijava', url: '/login', iconPath: '/images/log-in.svg' },
    { label: 'Registracija', url: '/register', iconPath: '/images/sign-in.svg' },
  ];
  
  export const linksLoggedUser: LinkItem[] = [
    ...initialLinks,
    { label: 'Moji poslovi', url: '/register', iconPath: '/images/jobs.svg' },
    { label: 'Odjava', url: '/login', iconPath: '/images/sing-out.svg' },
  ];
  
  export const linksLoggedCompany: LinkItem[] = [
    ...initialLinks,
    { label: 'Ponuda poslova', url: '/register', iconPath: '/images/jobs.svg' },
    { label: 'Odjava', url: '/login', iconPath: '/images/sing-out.svg' },
  ];