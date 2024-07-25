import React, { createContext, useContext, useState, useEffect } from "react";
import en from "./english.json";
import fr from "./kannada.json";
const translations = { en, fr };
const LanguageContext = createContext();

export const useLanguageData = () => useContext(LanguageContext);

const LanguageProvider = ({ children }) => {
  const storedLanguage = localStorage.getItem("language");
  const [language, setLanguage] = useState(storedLanguage || "en");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translate = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translate, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
