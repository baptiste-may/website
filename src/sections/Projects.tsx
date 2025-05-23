import {AnimatePresence, motion} from "framer-motion";
import {Dispatch, SetStateAction, useState} from "react";
import Button from "@/components/Button";
import {
    BriefcaseBusiness,
    CalendarDays,
    ClockFading,
    CodeXml,
    Hammer,
    LucideIcon,
    Presentation,
    UsersRound,
    X
} from "lucide-react";
import {projects} from "@/config";
import FormatedParagraph from "@/components/FormatedParagraph";
import RevealOnScroll from "@/components/RevealOnScroll";
import {useBreakpoint} from "@/utils";

export type Project = {
    title: string;
    subtitle: string;
    Icon: LucideIcon;
    thumbnail: string;
    code?: string;
    url?: string;
    date: string;
    duration: string;
    job: string;
    teamSize: string;
    tools: string[];
    details: string;
}

export function CardProject({id, onProjectSelected, data: {title, subtitle, thumbnail, Icon}}: {
    id: number;
    onProjectSelected: Dispatch<SetStateAction<null | number>>;
    data: Project;
}) {
    return (
        <motion.div
            className="relative w-full h-full bg-white rounded-xl scale-90 hover:scale-100 hover:z-20 bg-cover bg-center transition-all"
            layoutId={`container-${id}`}
            onClick={() => onProjectSelected(id)}
            style={{backgroundImage: `url(${thumbnail})`}}
        >
            <button className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full z-10 drop-shadow-2xl">
                <Icon/>
            </button>
            <button className="flex flex-col items-center justify-center w-full h-full hover:backdrop-blur-lg opacity-0 hover:opacity-100 transition-all cursor-pointer rounded-xl">
                <h1 className="font-bold text-2xl text-white text-shadow-lg/30">{title}</h1>
                <h2 className="font-light text-lg text-neutral-300 text-shadow-lg/20">{subtitle}</h2>
            </button>
        </motion.div>
    );
}

export default function Projects() {

    const [selectedProject, setSelectedProject] = useState<null | number>(null);
    const sm = useBreakpoint("sm");
    const lg = useBreakpoint("lg")

    return (
        <div className="relative w-full h-full px-4">
            <div className="absolute grid grid-rows-8 grid-cols-1 sm:grid-rows-4 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-4 left-[calc(50%_-_(var(--spacing)_*_13))] -translate-x-1/2 w-[calc(100vw_-_(var(--spacing)_*_8))] h-full mx-12">
                {projects.map((data, index) =>
                    <RevealOnScroll key={index} delay={(index % (lg ? 4 : sm ? 2 : 1)) / 4}>
                        <CardProject id={index} onProjectSelected={setSelectedProject} data={data}/>
                    </RevealOnScroll>)}
                <AnimatePresence>
                    {selectedProject !== null && (
                        <motion.div
                            layoutId={`container-${selectedProject}`}
                            className="absolute left-0 top-0 bg-white rounded-xl w-full h-full z-20 bg-cover bg-center overflow-hidden"
                            style={{backgroundImage: `url(${projects[selectedProject].thumbnail})`}}
                        >
                            <div className="flex items-center justify-center w-full h-full backdrop-blur-2xl">
                                <div className="grid grid-rows-[auto_2px_auto] md:grid-rows-1 md:grid-cols-[40%_2px_auto] lg:grid-cols-[auto_2px_auto] border-2 border-white/90 bg-white/75 rounded-lg px-4 md:px-12 py-6 w-9/10 h-9/10 gap-2 md:gap-8 overflow-y-auto overflow-x-hidden">
                                    <div className="relative flex flex-col">
                                        <Button onClick={() => setSelectedProject(null)} className="fixed md:relative !w-8/10 md:!w-full !justify-center">
                                            <X className="h-6"/>
                                            {`Voir d'autres projets`}
                                        </Button>
                                        <h1 className="font-bold text-4xl mt-16 md:mt-8 text-center md:text-start">{projects[selectedProject].title}</h1>
                                        <h2 className="flex gap-2 text-neutral-700 mb-4 text-center md:text-start">
                                            {(() => {
                                                const Icon = projects[selectedProject].Icon;
                                                return <Icon/>;
                                            })()}
                                            {projects[selectedProject].subtitle}
                                        </h2>
                                        <div className="flex flex-row md:flex-col lg:flex-row gap-4 mt-0 mb-4 md:mb-6">
                                            {projects[selectedProject].url && <Button
                                                basic small href={projects[selectedProject].url}
                                                className="!w-full !justify-center"
                                            >
                                                <Presentation className="h-6"/>
                                                Voir le projet
                                            </Button>}
                                            {projects[selectedProject].code && <Button
                                                basic small href={projects[selectedProject].code}
                                                className="!w-full !justify-center"
                                            >
                                                <CodeXml className="h-6"/>
                                                Voir le code
                                            </Button>}
                                        </div>
                                        <ul className="flex flex-col ml-2 gap-1 md:gap-3">
                                            <li className="flex items-center gap-2 text-lg">
                                                <CalendarDays className="h-8"/>
                                                {projects[selectedProject].date}
                                            </li>
                                            <li className="flex items-center gap-2 text-lg">
                                                <ClockFading className="h-8"/>
                                                {projects[selectedProject].duration}
                                            </li>
                                            <li className="flex items-center gap-2 text-lg">
                                                <BriefcaseBusiness className="h-8"/>
                                                {projects[selectedProject].job}
                                            </li>
                                            <li className="flex items-center gap-2 text-lg">
                                                <UsersRound className="h-8"/>
                                                {projects[selectedProject].teamSize}
                                            </li>
                                            <li className="flex items-center gap-2 text-lg">
                                                <Hammer className="h-8"/>
                                                {projects[selectedProject].tools.join(", ")}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="opacity-0 md:opacity-100 bg-black h-full rounded-full"/>
                                    <FormatedParagraph className="md:py-4 md:overflow-y-auto">
                                        {projects[selectedProject].details}
                                    </FormatedParagraph>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}