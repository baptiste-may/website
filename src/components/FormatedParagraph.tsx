"use client";

import Link from "next/link";
import {ReactNode} from "react";
import {useInteractiveImage} from "@/components/InteractiveImage";

const urlRegex = /\[([^\]]+)]\(([^)]+)\)/g;
const boldRegex = /\*\*([^*]+)\*\*/g;

function InteractiveImage({src, title}: {
    src: string;
    title: string;
}) {

    const setImage = useInteractiveImage();

    return (
        <div className="flex flex-col w-fit mx-auto">
            <img
                src={src} alt="L'image n'a pas pu être chargée."
                title={title} className="rounded-lg cursor-pointer"
                onClick={() => setImage({
                    src, title
                })}
            />
            <span className="text-center underline">{title}</span>
        </div>
    );
}

function FormatedText({children}: {
    children: string;
}) {

    const res: ReactNode[] = [];
    let currentIndex = 0;
    let match;

    while ((match = boldRegex.exec(children)) !== null) {
        const index = match.index;
        const finalIndex = index + match[0].length;
        res.push(children.slice(currentIndex, index));
        res.push(<b key={res.length}>{match[1]}</b>);
        currentIndex = finalIndex;
    }

    res.push(children.slice(currentIndex));

    return <>{res}</>;
}

export default function FormatedParagraph({className, children}: {
    className?: string;
    children: string;
}) {
    return (
        <div className={`flex flex-col gap-3 text-lg font-light ${className}`}>
            {children.replaceAll("\\n", "\n").split("\n").map((line, i) => {

                const res: ReactNode[] = [];
                let currentIndex = 0;
                let match;

                while ((match = urlRegex.exec(line)) !== null) {
                    const index = match.index;
                    const finalIndex = index + match[0].length;
                    const isAnImage = index - 1 >= 0 && line[index - 1] === "!"

                    res.push(<FormatedText key={res.length}>{line.slice(currentIndex, index - (isAnImage ? 1 : 0))}</FormatedText>);
                    if (isAnImage) res.push(<InteractiveImage key={res.length} src={match[2]} title={match[1]}/>);
                    else res.push(<Link key={res.length} href={match[2]} target="_blank" className="underline">{match[1]}</Link>);

                    currentIndex = finalIndex;
                }

                res.push(<FormatedText key={res.length}>{line.slice(currentIndex)}</FormatedText>);

                return <span key={i}>{res}</span>;
            })}
        </div>
    );
}