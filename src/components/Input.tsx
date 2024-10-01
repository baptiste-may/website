export default function Input({type, placeholder, name, disabled = false}: {
    type: string;
    name: string;
    placeholder: string;
    disabled: boolean;
}) {

    const className = "w-full bg-[#00000040] border-2 border-white px-4 py-2 rounded-xl text-lg text-white resize-none outline-primary-3 disabled:opacity-50 disabled:cursor-not-allowed";

    if (type === "textarea") {
        return (
            <textarea className={`${className} resize-none h-full`} placeholder={placeholder} name={name} required
                      disabled={disabled}/>
        );
    }

    return (
        <input type={type} name={name} id={name} placeholder={placeholder} required className={className}
               disabled={disabled}/>
    );
}