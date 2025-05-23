import "./globals.css";
import {Inter} from "next/font/google";
import {AlertProvider} from "@/components/Alert";
import {ReactNode} from "react";
import {GoogleAnalytics} from "@next/third-parties/google";
import {InteractiveImageProvider} from "@/components/InteractiveImage";

const inter = Inter({subsets: ["latin"]});

const title = "May Baptiste",
    description = "Bienvenue dans mon monde ! Je suis Baptiste, un jeune étudiant en informatique. Venez découvrir mes créations numériques captivantes, où l'innovation rencontre l’originalité !";

export const metadata = {
    title,
    description,
    icons: {
        icon: "/logo.webp",
    },
    openGraph: {
        title, description
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode
}) {

    const googleAnalyticsGa = process.env.GOOGLE_ANALYTICS_GA;
    if (googleAnalyticsGa === undefined) throw new Error("GOOGLE_ANALYTICS_GA is required.");

    return (
        <html lang="fr">
        <GoogleAnalytics gaId={googleAnalyticsGa}/>
        <body className={inter.className}>
        <main>
            <AlertProvider>
                <InteractiveImageProvider>
                    {children}
                </InteractiveImageProvider>
            </AlertProvider>
        </main>
        </body>
        </html>
    )
}
