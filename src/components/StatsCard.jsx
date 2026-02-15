import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flame } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const StatsCard = ({ completedSessions, focusSessionCount }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <h2 className="text-xl font-semibold text-white mb-4">{t('todaysStats')}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/60">
            <Target className="w-4 h-4" />
            <span className="text-sm">{t('sessions')}</span>
          </div>
          <p className="text-3xl font-bold text-white">{completedSessions}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/60">
            <Flame className="w-4 h-4" />
            <span className="text-sm">{t('focusTime')}</span>
          </div>
          <p className="text-3xl font-bold text-white">{Math.floor(completedSessions * 25)}m</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;