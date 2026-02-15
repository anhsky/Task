import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
    >
      <span className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-white' : 'text-white/40'}`}>
        EN
      </span>
      <span className="text-white/40">|</span>
      <span className={`text-sm font-medium transition-colors ${language === 'vi' ? 'text-white' : 'text-white/40'}`}>
        VN
      </span>
    </motion.button>
  );
};

export default LanguageToggle;