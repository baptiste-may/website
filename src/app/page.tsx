"use client";

import UpButton from "@/components/UpButton";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import Landing from "@/sections/Landing";
import AboutMe from "@/sections/AboutMe";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import ScrollProvider from "@/components/ScrollProvider";

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return (
        <ScrollProvider>
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
            <UpButton/>
            <div className="overflow-hidden">
                <Section dark full id="landing" first>
                    <Landing/>
                </Section>
                <Section dark id="about-me">
                    <SectionTitle title="Qui suis-je ?" subtitle="Cliquez sur un événement pour en savoir plus"/>
                    <AboutMe/>
                </Section>
                <Section id="projects">
                    <SectionTitle title="Mes projets" subtitle="Sélectionnez un projet pour avoir plus d'informations"/>
                    <Projects/>
                </Section>
                <Section dark id="contact">
                    <SectionTitle title="Me contacter" subtitle="On a sûrement des choses à se dire !"/>
                    <Contact/>
                    <div/>
                </Section>
                <Footer/>
            </div>
        </ScrollProvider>
    );
}
