import {useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {motion, AnimatePresence} from "framer-motion";

interface Event {
    date: number;
    title: string;
    description: string;
    img: string;
}

export default function AboutMe() {

    const events: Event[] = [
        {
            date: 2023,
            title: "Baccalauréat et licence informatique",
            description: "2023 fut ma dernière année au lycée. J'ai obtenu mon Baccalauréat Général avec mention Très Bien et Européenne. Depuis, j'étudie à la faculté des sciences de Lens en licence Informatique. Sur mon temps libre, je participe à des entrainements de programmation compétitive dans l'enceinte de l'université. J'ai notamment participé à ARC (Artois pRogrammation Contest) en octobre où notre équipe a fini deuxième. Grâce à cela, nous sommes inscrits pour le SWERC (Southwestern Europe Regional Contest).",
            img: "https://www.le-flux.fr/voy_content/uploads/2017/10/universite-dartois-faculte-des-sciences-bibliotheque-universitaire-a-lens-batiment-prestige-facade-flickr-768x576.jpg",
        },
        {
            date: 2021,
            title: "Projets et organisations majeures",
            description: "Pendant cette période, j'ai eu le temps de réaliser une multitude de projets divers avec des équipes de différentes tailles. Par exemple, j'ai lancé mon serveur Minecraft en équipe de 4 où j'ai beaucoup travailé avec un autre développeur. J'ai également eu l'opportunité de participer à un événement sur un projet anglophone (The Unofficial Uncensored Library).",
            img: "https://static.dezeen.com/uploads/2021/08/uncensored-library-reporters-without-borders-minecraft-technology-_dezeen_2364_col_4.jpg",
        },
        {
            date: 2019,
            title: "Stage d'observation en entreprise (web design)",
            description: "En 2019, en classe de troisième, j'ai effectué un stage d'observation dans une entreprise nommé \"Level Up\" dans le domaine du web design. J'ai pu observer une équipe de web designers et de graphistes, apprendre le processus de création de sites web, et renforcer mon intérêt dans ce domaine, m'incitant à envisager des études supérieures dans celui-ci.",
            img: "https://sujata.ch/wp2013/wp-content/uploads/Slide5.jpg",
        }
    ];

    let [event, setEvent] = useState(events[0]);
    let [index, setIndex] = useState(0);
    const [movingCard, setMovingCard] = useState(0);

    return (
        <div className="w-full h-full flex items-center justify-center gap-12 overflow-hidden">
            <div className="hidden">
                {events.map(({img}, i) => <img src={img} key={i} alt=""/>)}
            </div>
            <div className="w-1/3 h-full hidden md:flex flex-col justify-evenly relative">
                <div className="absolute block w-1 h-full bg-white left-3/4 -translate-x-1/2"></div>
                {events.map((e, i) => <button
                    className={`relative py-[10%] text-white -left-1/4 after:content-[" "] after:absolute after:border-4 after:rounded-full after:top-1/2 after:-translate-y-1/2 after:right-0 after:translate-x-1/2 transition-all duration-500 after:transition-all after:duration-500 ${event.date === e.date ? "text-4xl font-bold after:w-16 after:h-16 after:bg-primary-3" : "text-2xl after:w-8 after:h-8 after:bg-primary-1"}`}
                    key={e.date} onClick={() => {
                    setMovingCard(0);
                    setTimeout(() => {
                        setEvent(events[i]);
                        setIndex(i);
                    }, 1);
                }}>{e.date}</button>)}
            </div>
            {/* CARD */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={event.date}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1, transition: {duration: 0.25, ease: "easeInOut"}}}
                    exit={{
                        opacity: 0,
                        scale: movingCard === 0 ? 0.8 : 1,
                        translateX: `${100 * movingCard}%`,
                        transition: {duration: 0.25, ease: "easeIn"}
                    }}
                    className="w-full h-full bg-white rounded-3xl grid grid-rows-[25%_75%] md:grid-rows-none md:grid-cols-[60%_40%] overflow-hidden relative mx-8 md:mx-0"
                >
                    <div style={{backgroundImage: `url(${event.img})`}}
                         className="bg-center bg-no-repeat bg-cover"></div>
                    <article className="overflow-y-auto overflow-x-hidden px-12 md:px-8 py-6 md:order-first md:mx-8">
                        <h3 className="text-center font-bold text-2xl md:text-4xl mb-4">{event.title}</h3>
                        <p className="font-light first-letter:ml-4 text-base md:text-lg">{event.description}</p>
                    </article>
                    <button onClick={() => {
                        setMovingCard(-1);
                        setTimeout(() => {
                            const newIndex = index - 1 < 0 ? events.length - 1 : index - 1;
                            setEvent(events[newIndex]);
                            setIndex(newIndex);
                        }, 1);
                    }} className="absolute left-1 top-1/2 -translate-y-1/2 flex md:hidden">
                        <ChevronLeftIcon className="w-8"/>
                    </button>
                    <button onClick={() => {
                        setMovingCard(1);
                        setTimeout(() => {
                            const newIndex = index + 1 >= events.length ? 0 : index + 1;
                            setEvent(events[newIndex]);
                            setIndex(newIndex);
                        }, 1);
                    }} className="absolute right-1 top-1/2 -translate-y-1/2 flex md:hidden">
                        <ChevronRightIcon className="w-8"/>
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}