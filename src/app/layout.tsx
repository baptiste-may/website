import "./globals.css";
import { Inter } from "next/font/google";
import UmamiProvider from "next-umami";
import type { ReactNode } from "react";
import { AlertProvider } from "@/components/Alert";
import { InteractiveImageProvider } from "@/components/InteractiveImage";

const inter = Inter({ subsets: ["latin"] });

const title = "May Baptiste",
  description =
    "Bienvenue dans mon monde ! Je suis Baptiste, un jeune étudiant en informatique. Venez découvrir mes créations numériques captivantes, où l'innovation rencontre l’originalité !";

export const metadata = {
  title,
  description,
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID;
  const umamiScriptUrl = process.env.UMAMI_SCRIPT_URL;
  if (umamiWebsiteId === undefined)
    throw new Error("UMAMI_WEBSITE_ID is required.");
  if (umamiScriptUrl === undefined)
    throw new Error("UMAMI_SCRIPT_URL is required.");

  return (
    <html lang="fr">
      <head>
        <UmamiProvider
          websiteId={umamiWebsiteId}
          src={umamiScriptUrl}
          domains={["may-baptiste.fr"]}
          performance
        />
      </head>
      <body className={inter.className}>
        <main>
          <AlertProvider>
            <InteractiveImageProvider>{children}</InteractiveImageProvider>
          </AlertProvider>
        </main>
      </body>
    </html>
  );
}
