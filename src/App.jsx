import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import ProgressRing from './components/ProgressRing';
import PrimaryButton from './components/PrimaryButton';
import PresetChips from './components/PresetChips';
import TaskList from './components/TaskList';
import StatsCard from './components/StatsCard';
import SettingsModal from './components/SettingsModal';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext.jsx";

const MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short-break',
  LONG_BREAK: 'long-break'
};

const DEFAULT_DURATIONS = {
  [MODES.FOCUS]: 25 * 60,
  [MODES.SHORT_BREAK]: 5 * 60,
  [MODES.LONG_BREAK]: 15 * 60
};

function AppContent() {
  const { t } = useLanguage();
  const [mode, setMode] = useState(MODES.FOCUS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS[MODES.FOCUS]);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [focusSessionCount, setFocusSessionCount] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const [autoStart, setAutoStart] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('focusflow-tasks');
    const savedStats = localStorage.getItem('focusflow-stats');
    const savedSettings = localStorage.getItem('focusflow-settings');
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      const loadedDurations = settings.durations || DEFAULT_DURATIONS;
      setDurations(loadedDurations);
      setAutoStart(settings.autoStart !== undefined ? settings.autoStart : true);
      setTimeLeft(loadedDurations[mode]);
    } else {
      setTimeLeft(durations[mode]);
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setCompletedSessions(stats.completedSessions || 0);
      setFocusSessionCount(stats.focusSessionCount || 0);
    }

    document.body.classList.add('focus-mode');
  }, []);

  useEffect(() => {
    localStorage.setItem('focusflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('focusflow-stats', JSON.stringify({
      completedSessions,
      focusSessionCount
    }));
  }, [completedSessions, focusSessionCount]);

  useEffect(() => {
    localStorage.setItem('focusflow-settings', JSON.stringify({
      durations,
      autoStart
    }));
  }, [durations, autoStart]);

  useEffect(() => {
    document.body.classList.remove('focus-mode', 'short-break-mode', 'long-break-mode');
    document.body.classList.add(`${mode}-mode`);
  }, [mode]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const [previousSettingsOpen, setPreviousSettingsOpen] = useState(settingsOpen);
  useEffect(() => {
    if (previousSettingsOpen && !settingsOpen && !isRunning) {
      setTimeLeft(durations[mode]);
    }
    setPreviousSettingsOpen(settingsOpen);
  }, [settingsOpen, durations, mode, isRunning, previousSettingsOpen]);

  const handleSessionComplete = () => {
    setIsRunning(false);

    if (mode === MODES.FOCUS) {
      const newCount = focusSessionCount + 1;
      setFocusSessionCount(newCount);
      setCompletedSessions(prev => prev + 1);

      if (currentTask) {
        setTasks(prev => prev.map(task => 
          task.id === currentTask.id 
            ? { ...task, pomodoros: task.pomodoros + 1 }
            : task
        ));
      }

      const nextMode = newCount % 4 === 0 ? MODES.LONG_BREAK : MODES.SHORT_BREAK;
      setMode(nextMode);
      setTimeLeft(durations[nextMode]);
      
    } else {
      setMode(MODES.FOCUS);
      setTimeLeft(durations[MODES.FOCUS]);
    }

    if (autoStart) {
      setTimeout(() => setIsRunning(true), 1000);
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

  return (
    <>
      <Helmet>
        <title>FocusFlow - Pomodoro Timer for Focused Work</title>
        <meta name="description" content="Stay focused and productive with FocusFlow, a beautiful Pomodoro timer designed for distraction-free work sessions." />
      </Helmet>

      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative min-h-[700px] lg:h-auto">
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <LanguageToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettingsOpen(true)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          <div className="max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <ProgressRing 
                progress={progress}
                timeText={formatTime(timeLeft)}
                mode={mode}
              />

              <div className="mt-8 w-full max-w-xs">
                <PrimaryButton
                  isRunning={isRunning}
                  onStart={handleStart}
                  onPause={handlePause}
                />
              </div>

              <div className="mt-6">
                <PresetChips
                  currentMode={mode}
                  onModeChange={handleModeChange}
                  disabled={isRunning}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center space-y-2"
              >
                {currentTask && (
                  <p className="text-white/90 font-medium">
                    {currentTask.name}
                  </p>
                )}
                <p className="text-white/60 text-sm">
                  {mode === MODES.FOCUS 
                    ? t('focusMessage')
                    : t('breakMessage')}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="lg:w-96 bg-black/20 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 p-6 overflow-y-auto">
          <div className="space-y-6">
            <StatsCard 
              completedSessions={completedSessions}
              focusSessionCount={focusSessionCount}
            />

            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
            />
          </div>
        </div>

        <SettingsModal
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          durations={durations}
          setDurations={setDurations}
          autoStart={autoStart}
          setAutoStart={setAutoStart}
        />
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;