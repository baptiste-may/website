import {useState} from "react";
import Button from "@/components/Button";
import {motion, AnimatePresence} from "framer-motion";
import Input from "@/components/Input";
import DiscordLogo from "@/elements/discord-logo.svg";
import {useAlert} from "@/components/Alert";
import {Check, Mail, Network, Send, TriangleAlert} from "lucide-react";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";

function SNButton({url, img, alt}: {
    url: string;
    img: string;
    alt: string;
}) {
    return (
        <Link href={url} target="_blank"
           className="bg-white rounded-xl hover:opacity-75 transition-all">
            <img src={img} alt={alt}
                 className="w-full h-28 p-4"/>
        </Link>
    );
}

function SocialNetworks() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-4 md:gap-8">
                <div className="flex items-center bg-[#7289DA] p-4 rounded-xl gap-4 md:gap-8">
                    <DiscordLogo/>
                    <span className="text-white text-xl font-bold">baptiste.may</span>
                </div>
                <div className="flex justify-around gap-4 md:gap-4">
                    <SNButton url="https://www.linkedin.com/in/baptiste-may-8706602a3"
                              img="/linkedin-logo.webp" alt="Linkedin"/>
                    <SNButton url="https://github.com/baptiste-may"
                              img="/github-logo.webp"
                              alt="Github"/>
                    <SNButton url="https://bsky.app/profile/baptistemay.bsky.social"
                              img="/bluesky-logo.svg"
                              alt="Blue Sky"/>
                </div>
            </div>
            <span className="text-slate-500 text-center font-sm font-light mx-4 mt-4 text-balance w-2/3">N’oubliez pas un petit message pour vous départager des arnaqueurs !</span>
        </div>
    );
}

function MailForm() {

    const [lockInput, setLockInput] = useState(false);
    const {alerts, setAlerts} = useAlert();

    return (
        <form className="flex flex-col items-center mx-4 h-full" onSubmit={e => {
            e.preventDefault();
            setLockInput(true);
            const data: Record<string, string> = {};
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const elements: HTMLInputElement[] = Object.values(e.target.elements);
            for (const element of elements) {
                data[element.name] = element.value;
            }
            fetch("/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    setAlerts(alerts.concat({
                        content: "Votre message a bien été envoyé !",
                        subcontent: "Je vous répondrai dès que possible !",
                        type: "positive",
                        Icon: Check
                    }));
                } else {
                    setAlerts(alerts.concat({
                        content: "Une erreur est survenue.",
                        subcontent: "Votre message n'a pas pu être envoyé !",
                        type: "negative",
                        Icon: TriangleAlert
                    }));
                }
                setLockInput(false);
            });
        }}>
            <label className="block text-slate-500 text-sm mb-2">Comment devrais-je vous appeler ?</label>
            <div className="flex gap-4">
                <Input type="text" placeholder="Nom" name="name" disabled={lockInput}/>
                <Input type="text" placeholder="Prénom" name="forename" disabled={lockInput}/>
            </div>
            <label className="block text-slate-500 text-sm mb-2 mt-4">Comment devrais-je vous recontacter ?</label>
            <Input type="email" placeholder="Email" name="email" disabled={lockInput}/>
            <label className="block text-slate-500 text-sm mb-2 mt-4">De quoi voulez vous parler ?</label>
            <Input type="text" placeholder="Sujet" name="subject" disabled={lockInput}/>
            <label className="block text-slate-500 text-sm mb-2 mt-4">Dîtes moi en plus !</label>
            <Input type="textarea" name="body" disabled={lockInput}/>
            <Button className="mt-4" disabled={lockInput}>
                <Send fill="white"/>
                {`J'envoie mon message`}
            </Button>
        </form>
    );
}

export default function Contact() {

    const [usingMail, setUsingMail] = useState(false);

    return (
        <>
            <RevealOnScroll className="block lg:hidden h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={usingMail ? "mail" : "network"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="flex flex-col items-center mx-4 h-full"
                    >
                        <h3 className="text-white text-center text-2xl font-bold my-0">{usingMail ? "Par mail" : "Via les réseaux"}</h3>
                        <Button className="mb-6 md:mb-10" onClick={() => setUsingMail(!usingMail)} basic>
                            {usingMail ? (
                                <>
                                    <Network/>
                                    Je préfère via les réseaux
                                </>
                            ) : (
                                <>
                                    <Mail/>
                                    Je préfère par mail
                                </>
                            )}
                        </Button>
                        {usingMail ? <MailForm/> : <SocialNetworks/>}
                    </motion.div>
                </AnimatePresence>
            </RevealOnScroll>
            <RevealOnScroll className="hidden lg:flex h-full gap-12">
                <div className="flex flex-col h-full gap-8">
                    <h3 className="text-white text-center text-5xl font-bold">Via les réseaux</h3>
                    <SocialNetworks/>
                </div>
                <div className="relative w-0.5 h-[95%] bg-white top-1/2 -translate-y-1/2">
                    <div
                        className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 -translate-x-1/2 text-white font-black text-4xl bg-primary-1 rounded-full border-4 border-white w-20 h-20">OU
                    </div>
                </div>
                <div className="flex flex-col h-full gap-4">
                    <h3 className="text-white text-center text-5xl font-bold">Par mail</h3>
                    <MailForm/>
                </div>
            </RevealOnScroll>
        </>
    );
}