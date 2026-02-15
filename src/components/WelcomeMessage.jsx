import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const WelcomeMessage = () => {
  const { t } = useLanguage();

  return (
    <motion.p
      className='text-xl md:text-2xl text-white max-w-2xl mx-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {t('welcomeMessage')} <span className='font-semibold text-purple-300'>{t('horizons')}</span>{t('welcomeSubtext')}
    </motion.p>
  );
};

export default WelcomeMessage;