export default function SectionTitle({title, subtitle}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="mx-2">
            <h2 className="text-white text-center text-5xl md:text-7xl font-extrabold mt-8">{title}</h2>
            <h3 className="text-slate-500 text-center font-light mb-8 md:mb-12 md:text-lg">{subtitle}</h3>
        </div>
    );
}