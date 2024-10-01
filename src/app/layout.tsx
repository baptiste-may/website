import "locomotive-scroll/dist/locomotive-scroll.css";
import "./globals.css";
import {Inter} from "next/font/google";
import {AlertProvider} from "@/components/Alert";
import {ReactNode} from "react";
import ScrollProvider from "@/components/ScrollProvider";

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
    return (
        <html lang="fr" style={{scrollBehavior: "smooth"}}>
        <body className={inter.className}>
        <main>
            <ScrollProvider>
                <AlertProvider>
                    {children}
                </AlertProvider>
            </ScrollProvider>
        </main>
        </body>
        </html>
    )
}
