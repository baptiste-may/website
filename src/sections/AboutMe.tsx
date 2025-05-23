import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {events} from "@/config";
import {Calendar, ChevronLeft, ChevronRight, ClockFading, MapPin, LucideIcon} from "lucide-react";
import Link from "next/link";
import FormatedParagraph from "@/components/FormatedParagraph";
import RevealOnScroll from "@/components/RevealOnScroll";

export type EventType = {
    date: string;
    type: {
        icon: LucideIcon;
        label: string;
    };
    title: string;
    description: string;
    place?: string;
    length?: string;
    img: string;
    imgSrc?: {
        credit: string;
        origin: string;
    };
};

export default function AboutMe() {

    const [event, setEvent] = useState<EventType>(events[events.length - 1]);
    const [index, setIndex] = useState(events.length - 1);
    const [movingCard, setMovingCard] = useState(0);

    return (
        <RevealOnScroll className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 px-8 lg:px-0 overflow-hidden">
            <div className="hidden">
                {events.map(({img}, i) => <img src={img} key={i} alt=""/>)}
            </div>
            <div className="relative w-full h-1/5 lg:hidden">
                <div className="relative top-2/3 block h-1 w-full bg-white"/>
                <AnimatePresence mode="sync">
                    {events.map(({date}) => <div key={date}>
                        {event.date === date && <motion.span
                            key={date}
                            className={`absolute text-4xl text-nowrap text-white bottom-1/3 -translate-y-full -translate-x-1/2 after:content-[" "] after:absolute after:border-4 after:rounded-full after:top-[calc(50%_+_(var(--spacing)_*_16))] after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-12 after:bg-primary-3`}
                            initial={{opacity: 0, left: `${50 - movingCard * 50}%`}}
                            animate={{opacity: 1, left: "50%"}}
                            exit={{opacity: 0, left: `${50 + movingCard * 50}%`}}
                        >{date}</motion.span>}
                    </div>)}
                </AnimatePresence>
            </div>
            <div className="relative w-2/5 h-full hidden lg:flex flex-col justify-evenly">
                <div className="absolute block w-1 h-full bg-white left-5/6 -translate-x-1/2"/>
                {events.map((e, i) => <button
                    className={`relative py-[10%] text-white hover:text-neutral-400 after:text-white text-end pr-12 -left-1/6 after:content-[" "] after:absolute after:border-4 after:rounded-full after:top-1/2 after:-translate-y-1/2 after:right-0 after:translate-x-1/2 transition-all duration-500 after:transition-all after:duration-500 ${event.date === e.date ? "text-4xl font-bold after:w-16 after:h-16 after:bg-primary-3" : "text-2xl after:w-8 after:h-8 after:bg-primary-1"} cursor-pointer`}
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
                    className="relative w-full h-4/5 lg:h-full bg-white rounded-xl lg:rounded-3xl grid grid-rows-[15%_85%] md:grid-rows-[25%_75%] lg:grid-rows-none lg:grid-cols-[60%_40%]"
                >
                    <div style={{backgroundImage: `url(${event.img})`}}
                         className="flex items-end justify-center lg:flex-col lg:justify-end lg:items-center gap-2 lg:gap-0 px-6 pb-2 bg-center bg-no-repeat bg-cover text-neutral-300 text-sm text-center text-balance rounded-t-xl lg:rounded-t-none lg:rounded-r-xl">
                    </div>
                    <article className="flex flex-col overflow-y-auto overflow-x-hidden px-6 md:px-12 lg:px-6 py-6 lg:order-first lg:mx-8 z-10">
                        <div className="flex justify-center gap-2 w-full mt-2 mb-6 py-1 px-2 rounded-lg border">
                            <event.type.icon/>
                            {event.type.label}
                        </div>
                        <h3 className={`text-center font-bold text-2xl lg:text-4xl ${event.title.includes("\n") ? "" : "mb-8"}`}>{event.title.includes("\n") ? event.title.split("\n")[0] : event.title}</h3>
                        {event.title.includes("\n") && <h4 className="text-center text-neutral-700 text-xl mb-8">
                            {event.title.split("\n")[1]}
                        </h4>}
                        <div className="flex flex-col gap-3 mb-8 pl-2 text-xl">
                            <div className="grid grid-cols-[28px_auto] items-center gap-2">
                                <Calendar width={24} height={24}/>
                                {event.date}
                            </div>
                            {event.place && <div className="grid grid-cols-[28px_auto] items-center gap-2">
                                <MapPin width={24} height={24}/>
                                {event.place}
                            </div>}
                            {event.length && <div className="grid grid-cols-[28px_auto] items-center gap-2">
                                <ClockFading width={24} height={24}/>
                                {event.length}
                            </div>}
                        </div>
                        <FormatedParagraph>
                            {event.description}
                        </FormatedParagraph>
                        <div className="h-full"/>
                        {event.imgSrc && <div className="flex flex-col text-center font-light mt-8">
                            <span className="">{event.imgSrc.credit}</span>
                            <Link href={event.imgSrc.origin} target="_blank" className="underline">Source</Link>
                        </div>}
                    </article>
                    <button onClick={() => {
                        setMovingCard(-1);
                        setTimeout(() => {
                            const newIndex = index - 1 < 0 ? events.length - 1 : index - 1;
                            setEvent(events[newIndex]);
                            setIndex(newIndex);
                        }, 1);
                    }} className="absolute w-14 h-14 -left-7 top-1/2 -translate-y-1/2 flex items-center justify-center lg:hidden border-4 border-white bg-primary-2 rounded-full cursor-pointer">
                        <ChevronLeft className="text-white" width={32} height={32} strokeWidth={3}/>
                    </button>
                    <button onClick={() => {
                        setMovingCard(1);
                        setTimeout(() => {
                            const newIndex = index + 1 >= events.length ? 0 : index + 1;
                            setEvent(events[newIndex]);
                            setIndex(newIndex);
                        }, 1);
                    }} className="absolute w-14 h-14 -right-7 top-1/2 -translate-y-1/2 flex items-center justify-center lg:hidden border-4 border-white bg-primary-2 rounded-full cursor-pointer">
                        <ChevronRight className="text-white" width={32} height={32} strokeWidth={3}/>
                    </button>
                </motion.div>
            </AnimatePresence>
        </RevealOnScroll>
    );
}