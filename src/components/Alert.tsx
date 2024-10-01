"use client";

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {XMarkIcon} from "@heroicons/react/24/outline";

const alertContext = createContext<undefined | {
    alerts: Alert[],
    setAlerts: Dispatch<SetStateAction<Alert[]>>
}>(undefined);

type AlertType = undefined | "positive" | "negative";

type Alert = {
    content: string;
    subcontent: string;
    type: AlertType;
    Icon: any;
};

export function AlertProvider({children}: {
    children: ReactNode;
}) {

    const [alerts, setAlerts] = useState<Alert[]>([]);

    return (
        <alertContext.Provider value={{alerts, setAlerts}}>
            <ul className="fixed top-0 right-0 flex flex-col z-50 m-6 gap-2">
                <AnimatePresence mode="sync">
                    {alerts.map(({content, subcontent, type, Icon}, i) =>
                        <motion.li
                            key={i}
                            className={`flex items-center p-2 gap-4 h-14 backdrop-blur-lg border ${type ? (type === "negative" ? "bg-[#ff000040] border-[#ff000080]" : "bg-[#2fd15940] border-[#2fd15980]") : "bg-[#00000040]"} rounded-lg`}
                            layout
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{type: "spring"}}
                        >
                            <div
                                className={`w-10 h-10 rounded-xl ${type ? (type === "negative" ? "bg-[#ff0000]" : "bg-[#2fd159]") : "bg-[#000000]"}`}>
                                <Icon className="w-full h-full p-1 text-white"/>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-white font-bold text-lg">{content}</h1>
                                <p className="text-gray-400 font-light text-sm leading-none">{subcontent}</p>
                            </div>
                            <button
                                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all hover:bg-[#aaaaaa40]"
                                onClick={() => {
                                    const newAlert = [...alerts];
                                    newAlert.splice(i, 1);
                                    setAlerts(newAlert);
                                }}>
                                <XMarkIcon
                                    className="w-full h-full p-2 text-gray-500 hover:text-gray-300 transition-all"/>
                            </button>
                        </motion.li>)}
                </AnimatePresence>
            </ul>
            {children}
        </alertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(alertContext);
    if (context === undefined) throw "No provider";
    return context;
}
