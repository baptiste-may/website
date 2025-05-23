import React from "react";

export default function Section({children, dark = false, id, full = false, first = false}: {
    children: React.ReactNode;
    dark?: boolean;
    id?: string;
    full?: boolean;
    first?: boolean;
}) {
    return (
        <section className={`${dark ? "bg-primary-1" : "bg-primary-2"} w-screen ${first ? "h-[calc(100vh_+_var(--spacing)_*_12)] pb-0" : "h-[calc(100vh_+_var(--spacing)_*_48)] py-24"}`}>
            <div id={id} className={`w-screen h-screen flex flex-col items-center ${!full ? "md:container md:mx-auto" : ""}`}>
                {children}
            </div>
        </section>
    );
}