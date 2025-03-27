import Link from "next/link";

export default function Footer({dark}: {
    dark?: boolean;
}) {
    return (
        <footer className={`${dark ? "bg-primary-1" : "bg-primary-2"} flex flex-col gap-2 items-center justify-center h-20 text-white text-sm font-sans font-light `}>
            <address className="not-italic">© 2024 May Baptiste - <Link
                className="underline" href="mailto:pro@may-baptiste.fr">pro@may-baptiste.fr</Link>
            </address>
            <Link href="/legal" target="_blank" className="underline">Politique de Confidentialité et Mentions Légales</Link>
        </footer>
    );
}