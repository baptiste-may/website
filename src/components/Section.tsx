import React from "react";

export default function Section({children, dark = false, id, full = false}: {
    children: React.ReactNode;
    dark?: boolean;
    id?: string;
    full?: boolean;
}) {
    return (
        <section id={id} className={`${dark ? "bg-primary-1" : "bg-primary-2"} w-screen h-screen`}>
            <div className={`w-screen h-screen flex flex-col items-center ${!full ? "md:container md:mx-auto" : ""}`}>
                {children}
            </div>
        </section>
    );
}