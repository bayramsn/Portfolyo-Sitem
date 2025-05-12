import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-light btn-sm dropdown-toggle" 
        type="button" 
        id="languageDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {language === 'tr' ? 'TR' : 'EN'}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        <li>
          <button 
            className={`dropdown-item ${language === 'tr' ? 'active' : ''}`} 
            onClick={() => setLanguage('tr')}
          >
            Türkçe
          </button>
        </li>
        <li>
          <button 
            className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageToggle;