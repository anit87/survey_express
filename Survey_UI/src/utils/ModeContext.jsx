import React, { createContext, useContext, useState, useEffect } from "react";

const ModeContext = createContext();

export const useModeData = () => useContext(ModeContext);
export const modes = { residential: 'residential', commercial: 'commercial' };

const ModeProvider = ({ children }) => {
    const storedMode = localStorage.getItem("mode");
    const [mode, setMode] = useState(storedMode || "residential");

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    const changeMode = (newMode) => {
        setMode(newMode);
    };

    return (
        <ModeContext.Provider value={{ mode, changeMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export { ModeContext, ModeProvider };