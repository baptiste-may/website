export const legal = {
  siteName: "May Baptiste",
  publisher: {
    fullName: "Baptiste May",
    status: "Personne physique, éditeur non professionnel",
    email: "pro@may-baptiste.fr",
    phoneDisplay: "07 68 12 05 91",
    phoneHref: "+33768120591",
  },
  publicationDirector: "Baptiste May",
  host: {
    name: "Cloudflare, Inc.",
    address: "101 Townsend Street, San Francisco, CA 94107, États-Unis",
    phoneDisplay: "+1 650 319 8930",
    phoneHref: "+16503198930",
    website: "https://www.cloudflare.com",
    websiteLabel: "www.cloudflare.com",
    euEntity: "Cloudflare France SAS, 6 place de la Madeleine, 75008 Paris, France",
  },
  emailProcessor: {
    name: "Resend (Plus Five Five, Inc.)",
    address: "2261 Market Street #5039, San Francisco, CA 94114, États-Unis",
    website: "https://resend.com",
    websiteLabel: "resend.com",
    privacyEmail: "privacy@resend.com",
  },
  mailboxHost: {
    name: "IONOS SE",
    address: "Elgendorfer Straße 57, 56410 Montabaur, Allemagne",
    website: "https://www.ionos.fr",
    websiteLabel: "www.ionos.fr",
  },
  retention: {
    contact: "12 mois à compter du dernier échange",
    resend: "30 jours",
    cloudflareLogs: "3 à 7 jours selon l'offre Cloudflare",
  },
} as const;
