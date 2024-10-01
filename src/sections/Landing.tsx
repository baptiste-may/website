"use client";

import {useState, useEffect} from 'react';
import Button from '../components/Button';
import {BookOpenIcon} from '@heroicons/react/24/solid';
import Star from '../elements/star.svg';
import Sun from '../elements/sun.svg';
import Mountain1 from '../elements/mountain-1.svg';
import Mountain2 from '../elements/mountain-2.svg';
import Mountain3 from '../elements/mountain-3.svg';
import Floor from '../elements/floor.svg';
import BigFire1 from "../elements/big-fire-1.svg";
import BigFire2 from "../elements/big-fire-2.svg";
import BigFire3 from "../elements/big-fire-3.svg";
import BigFire4 from "../elements/big-fire-4.svg";
import BigFire5 from "../elements/big-fire-5.svg";
import BigFire6 from "../elements/big-fire-6.svg";
import LittleFire1 from "../elements/little-fire-1.svg";
import LittleFire2 from "../elements/little-fire-2.svg";
import LittleFire3 from "../elements/little-fire-3.svg";
import Log1 from "../elements/log-1.svg";
import Log2 from "../elements/log-2.svg";
import {delay, random} from '@/utils';
import {useLocomotiveScroll} from "react-locomotive-scroll";

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

function randomPercentage() {
    return `${Math.floor((Math.random() * 100))}%`;
}

function randomTime() {
    return Math.floor((Math.random() * 3500) + 500);
}

function randomLongTime() {
    return Math.floor((Math.random() * 4000) + 1000);
}

const maxAngle = 5;

function randomDeg() {
    return Math.floor((Math.random() * maxAngle * 2) - maxAngle);
}

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
    SVG: any;
    top: number;
    left: number;
}) {

    const [rotationTime, setRotationTime] = useState(0);
    const [rotation, setRotation] = useState(0);

    function changeRotation() {
        const timing = randomTime();
        setRotationTime(timing);
        setTimeout(() => {
            setRotation(randomDeg());
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
    SVG: any;
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

    const {scroll} = useLocomotiveScroll();

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
                <div className="relative w-full h-1/3">
                    {stars.map(({left, top}, i) => <AnimatedStar
                        key={i}
                        left={left}
                        top={top}
                    />)}
                </div>
                <Sun className="absolute md:top-[15%] top-[5%] md:left-[5%] w-[500px] h-[500px]"/>
                <div className="absolute top-[11%] w-full flex flex-col">
                    <Mountain1 className="w-full"/>
                    <div className="relative -top-1 h-screen bg-primary-1"/>
                </div>
                <Mountain2 className="absolute w-full top-[25%]"/>
                <Mountain3 className="absolute w-full top-[40%]"/>
                <div
                    className="absolute w-full top-[70%] h-[30%] bg-primary-1 shadow-[0_10px_50px_10px_primary-1]"></div>
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
                className="absolute sm:left-[10%] left-1/2 -translate-x-1/2 sm:translate-x-0 top-1/2 -translate-y-1/2 w-min">
                <h1 className="text-white text-7xl sm:text-8xl md:text-9xl font-bold mb-6 whitespace-nowrap lg:mt-40 drop-shadow-[0_0_2px_black]">{welcomeTitle}</h1>
                <p className="text-white font-light text-xl drop-shadow-[0_0_2px_black]">
                    <b>Bienvenue dans mon monde !</b> Je suis <b>Baptiste</b>, un jeune étudiant en informatique. Venez
                    découvrir mes créations numériques captivantes, où <b>l'innovation rencontre l’originalité !</b>
                </p>
                <Button
                    className="relative mt-8 shadow-[orange_0px_0px_15px_1px] left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0"
                    onClick={() => {
                        if (scroll) scroll.scrollTo("#about-me");
                    }}>
                    <BookOpenIcon className="h-5"/>
                    Je veux en savoir plus !
                </Button>
            </article>
        </div>
    );
}