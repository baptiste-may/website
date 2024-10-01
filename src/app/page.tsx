"use client";

import UpButton from "../components/UpButton";
import Section from "../components/Section";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import {ComputerDesktopIcon, ChatBubbleLeftRightIcon} from "@heroicons/react/24/solid";
import Landing from "../sections/Landing";
import AboutMe from "../sections/AboutMe";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useLocomotiveScroll} from "react-locomotive-scroll";

export default function Home() {

    const {scroll} = useLocomotiveScroll();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => setIsLoading(false), []);

    return (
        <>
            <AnimatePresence>
                {isLoading ? (
                    <motion.div
                        initial={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1}}
                        className="fixed top-0 left-0 w-screen h-screen bg-primary-1 flex items-center justify-center text-white text-4xl font-bold z-50">
                        Chargement...
                    </motion.div>
                ) : undefined}
            </AnimatePresence>
            <UpButton onClick={() => {
                if (scroll) scroll.scrollTo("#landing");
            }}/>
            <div data-scroll-container={true}>
                <Section dark full id="landing">
                    <Landing/>
                </Section>
                <Section dark id="about-me">
                    <SectionTitle title="Qui suis-je ?" subtitle="Cliquez sur un événement pour en savoir plus"/>
                    <AboutMe/>
                    <Button onClick={() => {
                        if (scroll) scroll.scrollTo("#projects");
                    }}>
                        <ComputerDesktopIcon className="w-5"/>
                        Voir des exemples
                    </Button>
                </Section>
                <Section id="projects">
                    <SectionTitle title="Mes projets" subtitle="Sélectionnez un projet pour avoir plus d'informations"/>
                    <Projects/>
                    <Button onClick={() => {
                        if (scroll) scroll.scrollTo("#contact");
                    }}>
                        <ChatBubbleLeftRightIcon className="w-5"/>
                        Parlons ensemble
                    </Button>
                </Section>
                <Section dark id="contact">
                    <SectionTitle title="Me contacter" subtitle="On a sûrement des choses à se dire !"/>
                    <Contact/>
                    <div/>
                </Section>
                <Footer/>
            </div>
        </>
    );
}
