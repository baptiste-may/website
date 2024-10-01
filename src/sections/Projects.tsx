import {AnimatePresence, motion} from "framer-motion";
import {WindowIcon, CodeBracketSquareIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {getLang, Language, LanguagesKey} from "@/utils";

function ProjectsLanguage({percentage, lang, selected, vertical}: {
    percentage: number;
    lang: Language;
    selected: boolean;
    vertical: boolean;
}) {

    const {name, color} = lang;
    const [langVisisble, setLangVisible] = useState(false);

    return (
        <div
            className={`relative flex justify-center border-primary-3 h-[${percentage}%] ${langVisisble ? "border-2" : "border-0"}`}
            style={{backgroundColor: color}}
            onMouseEnter={() => setLangVisible(selected)}
            onMouseLeave={() => setLangVisible(false)}
        >
            <AnimatePresence>
                {langVisisble && (
                    <motion.div
                        className={`absolute ${vertical ? "top-1/2 -translate-y-1/2 translate-x-[70%]" : "top-0 -translate-y-[130%]"} bg-primary-3 text-white text-center px-3 py-1.5 rounded-xl z-50`}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {vertical ? (
                            <div
                                className="bg-primary-3 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-2 h-4"
                                style={{clipPath: "polygon(100% 0, 100% 100%, 0 50%)"}}
                            />
                        ) : (
                            <div
                                className="bg-primary-3 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-4 h-2"
                                style={{clipPath: "polygon(100% 0, 0 0, 50% 100%)"}}
                            />
                        )}
                        {`${name} (${percentage}%)`}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Project({title, subtitle, description, backgroundImage, url, codeUrl, languages, selected, onClick}: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    url?: string;
    codeUrl?: string;
    languages: {
        percentage: number;
        lang: LanguagesKey;
    }[];
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            className={`relative grid ${!selected ? "content-end" : ""} md:justify-end grid-cols-[15px_auto] md:grid-cols-none md:grid-rows-[auto_20px] bg-white overflow-hidden w-full ${selected ? "h-full md:w-full" : "h-min md:w-min"} md:h-full ${selected ? "cursor-default" : "cursor-pointer"}`}
            onClick={onClick}
            style={{
                borderRadius: "12px",
            }}
            layout
            transition={{layout: {duration: 0.5, ease: "easeInOut"}}}
        >
            {[false, true].map(b => {
                const languagesString = languages.map(e => `${e.percentage}%`).join(" ");
                return (
                    <div
                        className={`${b ? "grid md:hidden" : "md:grid hidden"} md:order-last ${selected && "cursor-help"}`}
                        style={{
                            gridTemplateRows: b ? languagesString : undefined,
                            gridTemplateColumns: b ? undefined : languagesString
                        }}
                        key={b ? "vertical" : "horizontal"}
                    >
                        {languages.map(({percentage, lang}, i) =>
                            <ProjectsLanguage
                                percentage={percentage}
                                lang={getLang(lang)}
                                key={i}
                                selected={selected}
                                vertical={b}
                            />)}
                    </div>
                );
            })}
            {!selected && (
                <motion.aside
                    className="relative flex text-lg md:text-xl whitespace-nowrap md:text-vertical md:rotate-180 pl-6 py-3 md:px-8 md:pb-4 items-center overflow-hidden"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: 0.5}}}
                    exit={{opacity: 0}}
                >
                    {`${title} - ${subtitle}`}
                </motion.aside>
            )}
            <div
                className="absolute w-12 md:w-full md:h-12 h-full top-0 right-0 bg-gradient-to-r md:bg-gradient-to-t from-transparent to-white"/>
            {selected && (
                <motion.article
                    className="relative flex flex-col py-4 px-6 md:px-16 overflow-y-auto"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: 0.5}}}
                    exit={{opacity: 0}}
                >
                    <div className="absolute left-0 top-0 w-full h-24 bg-cover bg-center"
                         style={{backgroundImage: `url(${backgroundImage})`}}/>
                    <h1 className="text-3xl md:text-5xl font-bold text-center mt-24 md:mt-32">{title}</h1>
                    <h2 className="text-xl md:text-3xl font-medium text-center mb-4 md:mb-8">{subtitle}</h2>
                    <p className="mb-4 font-light first-letter:ml-4 md:text-lg">{description}</p>
                    {url && (
                        <a className="flex gap-2 text-secondary-1 mb-2 w-min whitespace-nowrap" href={url}
                           target="_blank">
                            <WindowIcon className="h-5"/>
                            Voir le projet
                        </a>
                    )}
                    {codeUrl && (
                        <a className="flex gap-2 text-secondary-1 w-min whitespace-nowrap" href={codeUrl}
                           target="_blank">
                            <CodeBracketSquareIcon className="h-5"/>
                            Voir le code
                        </a>
                    )}
                </motion.article>
            )}
        </motion.div>
    );
}

export default function Projects() {

    const projects = [
        {
            title: "GRHB",
            subtitle: "Refonte de site web",
            description: "J'ai proposé mes services au Groupe de Recherches Historiques de Busnes. Le principe était de refaire le site internet en le rendant plus moderne et plus dynamique tout en gardant la même charte graphique et les mêmes fonctionnalités. Encore maintenant, je reste en contact avec l'équipe pour tout autre problème ou nouveautés à ajouter.",
            backgroundImage: "https://busnes-histoire.fr/imgs/bg.jpg",
            url: "https://busnes-histoire.fr",
            codeUrl: "https://github.com/DjRedstone/GRHB",
            languages: [
                {
                    percentage: 55.4,
                    lang: "js"
                },
                {
                    percentage: 33,
                    lang: "html"
                },
                {
                    percentage: 11.6,
                    lang: "css"
                }
            ]
        },
        {
            title: "Nosto",
            subtitle: "Plugin Java pour Minecraft",
            description: "Durant mon année de seconde qui se croisait avec la pandémie de COVID-19, je me suis lancé dans un gros projet : réaliser un serveur Minecraft original avec des idées innovantes. Je me suis entouré d'un petite équipe comprenant notamment un autre développeur Java. Le projet fut arrêté en juillet 2022 faute de temps.",
            backgroundImage: "https://i3.ytimg.com/vi/1MzmkukDqWc/maxresdefault.jpg",
            codeUrl: "https://github.com/nostoMC/plugins",
            languages: [
                {
                    percentage: 100,
                    lang: "java"
                },
            ]
        },
        {
            title: "ESC Voting Animation",
            subtitle: "Animation de vote via Web 3.0",
            description: "Dans le cadre de l'Eurovision Smoot Contest 2022, en plus de m'occuper des animations 3D, j'ai réalisé l'animation des votes du public. Le fait de créer cette animation en HTML/CSS/JS m'a permis de designer facilement ces votes en plus de pouvoir connecter les résultats à un Google Sheet.",
            backgroundImage: "https://i.ytimg.com/vi/V5gGPs3wSS4/maxresdefault.jpg",
            codeUrl: "https://github.com/Eurovision-Smoot-Contest/2022-voting-animation",
            languages: [
                {
                    percentage: 66.7,
                    lang: "js"
                },
                {
                    percentage: 23.8,
                    lang: "css"
                },
                {
                    percentage: 9.5,
                    lang: "html"
                }
            ]
        },
        {
            title: "Python Battleship",
            subtitle: "Bataile Navale en Python",
            description: "Ce projet a été réalisé en un mois. Il s'agit d'une simple bataile navale en Python permettant de contrôler facilement les joueurs et de pouvoir créer des robots.",
            backgroundImage: "https://images.alphacoders.com/101/thumb-1920-1012203.jpg",
            url: "https://github.com/DjRedstone/python-battleship",
            codeUrl: "https://github.com/DjRedstone/python-battleship",
            languages: [
                {
                    percentage: 100,
                    lang: "py"
                }
            ]
        },
        {
            title: "Schtroumpfdle",
            subtitle: "Mastermind des schtroumpfs",
            description: "Le principe du jeu est inspiré des sites comme LOLdle ou encore Pokedle. Le but est de retrouver un schtroumpf par jour en fesant des propositions successives dans le style Mastermind.",
            backgroundImage: "https://gtv.digimondo.net/var/gtv/storage/gtvimages/1/5/2/5/3/3/152533245/14846570800800.jpg",
            url: "https://schtroumpfdle.may-baptiste.fr",
            codeUrl: "https://github.com/DjRedstone/schtroumpfdle",
            languages: [
                {
                    percentage: 71.7,
                    lang: "js"
                },
                {
                    percentage: 28.3,
                    lang: "html"
                }
            ]
        },
    ];

    const [selectedProject, setSelectedProject] = useState(0);

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full h-full px-4 overflow-hidden">
            <div className="hidden">
                {projects.map(({backgroundImage}, i) => <img src={backgroundImage} key={i} alt=""/>)}
            </div>
            <AnimatePresence>
                {projects.map((project, i) => <Project
                    title={project.title}
                    subtitle={project.subtitle}
                    description={project.description}
                    backgroundImage={project.backgroundImage}
                    url={project.url}
                    codeUrl={project.codeUrl}
                    languages={project.languages}
                    selected={selectedProject === i}
                    key={i}
                    onClick={() => setSelectedProject(i)}
                />)}
            </AnimatePresence>
        </div>
    );
}