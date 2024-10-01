export default function Footer({dark}: {
    dark?: boolean;
}) {
    return (
        <footer className={`${dark ? "bg-primary-1" : "bg-primary-2"} flex items-center justify-center h-12`}>
            <address className="text-white text-sm font-sans font-light non-italic">© 2024 May Baptiste - <a
                className="underline" href="mailto:pro@may-baptiste.fr">pro@may-baptiste.fr</a> - All Rights Reserved
            </address>
        </footer>
    );
}