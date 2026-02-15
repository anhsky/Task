import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressRing = ({ progress, timeText, mode }) => {
  const radius = 120;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const [minutes, seconds] = timeText.split(':');

  const getColor = () => {
    return '#FFFFFF'; // Always white as requested
  };

  const numberVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="relative">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-5xl font-semibold text-white flex items-center tabular-nums">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`m1-${minutes[0]}`}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {minutes[0]}
            </motion.span>
            <motion.span
              key={`m2-${minutes[1]}`}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {minutes[1]}
            </motion.span>
          </AnimatePresence>
          <span className="mx-1">:</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`s1-${seconds[0]}`}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {seconds[0]}
            </motion.span>
            <motion.span
              key={`s2-${seconds[1]}`}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {seconds[1]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProgressRing;