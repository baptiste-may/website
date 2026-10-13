import Link from "next/link";
import { useUmami } from "next-umami";

export default function Footer({ dark }: { dark?: boolean }) {
  const { event } = useUmami();

  return (
    <footer
      className={`${dark ? "bg-primary-1" : "bg-primary-2"} flex flex-col gap-2 items-center justify-center h-20 text-white text-sm font-sans font-light `}
    >
      <address className="not-italic">
        © 2024 May Baptiste -{" "}
        <Link
          className="underline"
          href="mailto:pro@may-baptiste.fr"
          onClick={() => event("footer-link", { link: "email" })}
        >
          pro@may-baptiste.fr
        </Link>
      </address>
      <Link
        href="/legal"
        target="_blank"
        className="underline"
        onClick={() => event("footer-link", { link: "legal" })}
      >
        Politique de Confidentialité et Mentions Légales
      </Link>
    </footer>
  );
}
