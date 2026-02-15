import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const PrimaryButton = ({ isRunning, onStart, onPause }) => {
  const { t } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isRunning ? onPause : onStart}
      className="w-full py-4 px-8 rounded-2xl bg-white text-gray-900 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
    >
      {isRunning ? (
        <>
          <Pause className="w-5 h-5" />
          {t('pause')}
        </>
      ) : (
        <>
          <Play className="w-5 h-5" />
          {t('start')}
        </>
      )}
    </motion.button>
  );
};

export default PrimaryButton;