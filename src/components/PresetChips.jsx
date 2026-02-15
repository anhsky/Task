import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const PresetChips = ({ currentMode, onModeChange, disabled }) => {
  const { t } = useLanguage();

  const presets = [
    { mode: 'focus', labelKey: 'focus' },
    { mode: 'short-break', labelKey: 'shortBreak' },
    { mode: 'long-break', labelKey: 'longBreak' }
  ];

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {presets.map((preset) => (
        <motion.button
          key={preset.mode}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          onClick={() => !disabled && onModeChange(preset.mode)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentMode === preset.mode
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {t(preset.labelKey)}
        </motion.button>
      ))}
    </div>
  );
};

export default PresetChips;