"use client";

import {useState, useEffect, SVGProps, FC} from "react";
import Button from "@/components/Button";
import Star from "@/elements/star.svg";
import Sun from "@/elements/sun.svg";
import ViolinPlanet from "@/elements/violin-planet.svg";
import Violin from "@/elements/violin.svg";
import HTMLPlanet from "@/elements/html-planet.svg";
import NifNafPlanet from "@/elements/nifnaf-planet.svg";
import ReactPlanet from "@/elements/react-planet.svg";
import NextPlanet from "@/elements/next-planet.svg";
import Mountain1 from "@/elements/mountain-1.svg";
import Mountain2 from "@/elements/mountain-2.svg";
import Mountain3 from "@/elements/mountain-3.svg";
import Floor from "@/elements/floor.svg";
import BigFire1 from "@/elements/big-fire-1.svg";
import BigFire2 from "@/elements/big-fire-2.svg";
import BigFire3 from "@/elements/big-fire-3.svg";
import BigFire4 from "@/elements/big-fire-4.svg";
import BigFire5 from "@/elements/big-fire-5.svg";
import BigFire6 from "@/elements/big-fire-6.svg";
import LittleFire1 from "@/elements/little-fire-1.svg";
import LittleFire2 from "@/elements/little-fire-2.svg";
import LittleFire3 from "@/elements/little-fire-3.svg";
import Log1 from "@/elements/log-1.svg";
import Log2 from "@/elements/log-2.svg";
import {delay, random, randomDeg, randomLongTime, randomPercentage, randomTime} from "@/utils";
import {ChevronsDown} from "lucide-react";
import {useLenis} from "lenis/react";
import ToolTip from "@/components/ToolTip";

const bigFires = [
    {
        svg: BigFire1,
        left: 25,
        top: 100
    },
    {
        svg: BigFire2,
        left: 50,
        top: 0
    },
    {
        svg: BigFire3,
        left: 125,
        top: 100
    },
    {
        svg: BigFire4,
        left: 200,
        top: 200
    },
    {
        svg: BigFire5,
        left: 200,
        top: 225
    },
    {
        svg: BigFire6,
        left: 65,
        top: 200
    }
];
const littleFires = [
    LittleFire1, LittleFire2, LittleFire3
];

function AnimatedStar({left, top}: {
    left: string;
    top: string;
}) {

    const [visible, setVisible] = useState(false);

    function show() {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            setTimeout(show, randomLongTime());
        }, randomLongTime());
    }

    useEffect(() => {
        setTimeout(show, randomTime());
    }, []);

    return (
        <div
            className="absolute transition-opacity duration-1000"
            style={{
                left,
                top,
                opacity: visible ? 1 : 0
            }}
        >
            <Star/>
        </div>
    );
}

function BigFire({SVG, top, left}: {
    SVG: FC<SVGProps<SVGElement>>;
    top: number;
    left: number;
}) {

    const [rotationTime, setRotationTime] = useState(0);
    const [rotation, setRotation] = useState(0);

    function changeRotation() {
        const timing = randomTime();
        setRotationTime(timing);
        setTimeout(() => {
            setRotation(randomDeg(5));
            setTimeout(changeRotation, timing);
        }, 1);
    }

    useEffect(changeRotation, []);

    return (
        <SVG className="absolute origin-bottom drop-shadow-[0_0_10px_#F90]" style={{
            top: `${top}px`,
            left: `${left}px`,
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${rotationTime}ms ease-in-out`
        }}/>
    );
}

function LittleFire({SVG}: {
    SVG: FC<SVGProps<SVGElement>>;
}) {

    const [top, setTop] = useState(400);
    const [left, setLeft] = useState(0);
    const [opacity, setOpacity] = useState(0);

    async function animate() {
        setLeft(random(25, 275));
        setTop(400);
        await delay(randomLongTime());
        setOpacity(1);
        await delay(1);
        setTop(random(100, 200));
        await delay(750);
        setOpacity(0);
        setTimeout(animate, 250);
    }

    useEffect(() => {
        setTimeout(animate, randomLongTime());
    }, []);

    return (
        <SVG className="absolute drop-shadow-[0_0_10px_#F90]" style={{
            top: `${top}px`,
            left: `${left}px`,
            opacity,
            transition: "opacity .25s ease-in-out, top 1s linear"
        }}/>
    );
}

export default function Landing() {

    const lenis = useLenis();

    const [stars] = useState<{ left: string; top: string; }[]>([]);
    const [, setStarsReady] = useState(false);

    const [welcomeTitle, setWelcomeTitle] = useState("Bonjour !");

    useEffect(() => {
        if (new Date().getHours() >= 19) setWelcomeTitle("Bonsoir !");

        for (let i = 0; i < 25; i++) {
            stars.push({
                left: randomPercentage(),
                top: randomPercentage()
            });
        }
        setStarsReady(true);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* BACKGROUND */}
            <div className="relative w-full h-full">
                {/* STARS */}
                <div className="relative w-full h-2/5">
                    {stars.map(({left, top}, i) => <AnimatedStar
                        key={i}
                        left={left}
                        top={top}
                    />)}
                </div>
                <Sun className="absolute top-[35%] md:top-[20%] md:left-[5%] w-[500px] h-[500px]"/>
                <ToolTip
                    className="absolute left-1/6 top-[10%] -translate-1/2 lg:z-30"
                    title="Violon" content="Depuis Septembre 2023, en plus de reprendre le solfège, j'apprends à **jouer du violon**.\nJ'avais déjà eu quelques années de solfège par le passé mais j'ai décidé de reprendre récemment.\n**La musique est un pilier dans ma vie.** En plus d'apprendre à jouer d'un instrument, j'ai la possiblité de jouer avec un ensemble."
                >
                    <div className="relative scale-50 md:scale-75 lg:scale-100">
                        <ViolinPlanet/>
                        <Violin className="absolute left-1/2 top-1/2 -translate-1/2"/>
                    </div>
                </ToolTip>
                <ToolTip
                    className="absolute left-2/6 top-[27%] md:top-[15%] -translate-1/2 lg:z-30"
                    title="HTML" content="C'est grâce à l'HTML que je suis **tombé dans le monde du web**.\nJ'ai appris les bases en commençant par **ce language de balisage** pour réaliser un petit projet, celui de **faire un site pour le club robotique de mon collège**."
                >
                    <div className="relative scale-50 md:scale-75 lg:scale-100">
                        <HTMLPlanet/>
                    </div>
                </ToolTip>
                <ToolTip
                    className="absolute left-3/6 top-[16%] md:top-[12%] -translate-1/2 lg:z-30" offset
                    title="Compagnie Ni Fées Ni Affaires" content="Étant un fan de stage lighting, j'ai rejoins en 2023 la [compagnie Ni Fées Ni Affaires](https://www.cienifnaf.com), une **troupe de théâtre amateur** dont je participe en tant que **technicien**.\nEn plus d'avoir des **convictions proches**, j'y ai appris et j'apprend toujours beaucoup de choses."
                >
                    <div className="relative scale-50 md:scale-75 lg:scale-100">
                        <NifNafPlanet/>
                        <img src="/nifnaf.webp" alt="" className="absolute left-1/2 top-1/2 -translate-1/2"/>
                    </div>
                </ToolTip>
                <ToolTip
                    className="absolute left-4/6 top-[30%] md:top-[20%] -translate-1/2 lg:z-30"
                    title="ReactJS" content="Premier framework web **appris en autodidacte**, ReactJS fut la base de mes **vrais premiers projets importants**.\nC'est notamment avec [NextJS](https://nextjs.org) que je réalise actuellement la plupart de mes projets."
                >
                    <div className="relative scale-50 md:scale-75 lg:scale-100">
                        <ReactPlanet />
                    </div>
                </ToolTip>
                <ToolTip
                    className="absolute left-5/6 top-[10%] -translate-1/2 lg:z-30"
                    title="NextJS" content="À ce jour, c'est le framework web full-stack que **j'utilise le plus**.\nIl propose à la fois une **simplicité de mise en place** et à la fois une **flexibilité des fonctionnalités**. Cela permet de **créer des applications de différentes tailles**, peu importe la complexité."
                >
                    <div className="relative scale-50 md:scale-75 lg:scale-100">
                        <NextPlanet/>
                    </div>
                </ToolTip>
                <div className="absolute top-[40%] md:top-[20%] lg:top-[16%] w-full flex flex-col">
                    <Mountain1 className="w-full"/>
                    <div className="relative -top-1 h-screen bg-primary-1"/>
                </div>
                <Mountain2 className="absolute w-full top-[48%] md:top-[35%] lg:top-[30%]"/>
                <Mountain3 className="absolute w-full top-[55%] md:top-[45%]"/>
                <div
                    className="absolute w-full top-[75%] h-[25%] bg-primary-1 shadow-[0_10px_50px_10px_primary-1]"></div>
                <Floor className="absolute w-full top-3/4"/>
                <div
                    className="absolute flex 2xl:hidden w-full h-full bg-primary-2 top-[calc(75%+50px)] md:top-[calc(75%+100px)] lg:top-[calc(75%+150px)]"></div>
            </div>
            {/* FIRE */}
            <div
                className="absolute right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-[2%] xl:right-[12%] bottom-[3%] xl:bottom-[7%] w-[400px] h-[625px]">
                {bigFires.map((fire, i) => <BigFire key={i} SVG={fire.svg} left={fire.left} top={fire.top}/>)}
                {littleFires.map((fire, i) => <LittleFire key={i} SVG={fire}/>)}
                <Log1 className="absolute top-[475px] left-[25px]"/>
                <Log2 className="absolute top-[425px] left-[50px]"/>
            </div>
            {/* TEXTS */}
            <article
                className="absolute sm:left-[10%] left-1/2 -translate-x-1/2 sm:translate-x-0 top-1/2 -translate-y-1/2 w-min text-white font-light text-xl z-40 md:z-auto">
                <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold mb-6 lg:mt-40 text-shadow-lg/30 text-nowrap">{welcomeTitle}</h1>
                <p className="text-balance text-shadow-lg/30 mb-2">
                    <b>Bienvenue dans mon monde !</b> Je suis <b>Baptiste</b>, un jeune étudiant en informatique.
                </p>
                <p className="text-balance text-shadow-lg/30">
                    Venez découvrir mes créations numériques captivantes, où <b>{`l'innovation rencontre l’originalité !`}</b>
                </p>
                <Button
                    className="relative mt-8 shadow-[orange_0px_0px_15px_1px] left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 font-medium"
                    onClick={() => {
                        lenis?.scrollTo("#about-me");
                    }}>
                    <ChevronsDown/>
                    Je veux en savoir plus !
                </Button>
            </article>
        </div>
    );
}