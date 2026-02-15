import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import { Button } from './components/ui/button';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const TaskList = ({ tasks, setTasks, currentTask, setCurrentTask }) => {
  const { t } = useLanguage();
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    if (!newTaskName.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: newTaskName,
      pomodoros: 0,
      completed: false
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskName('');
  };

  const toggleComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (currentTask?.id === taskId) {
      setCurrentTask(null);
    }
  };

  const selectTask = (task) => {
    setCurrentTask(task);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-white tracking-tight">{t('tasks')}</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder={t('addTaskPlaceholder')}
          className="flex-1 h-12 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-200"
        />
        <Button
          onClick={addTask}
          size="icon"
          className="h-12 w-12 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              currentTask?.id === task.id 
                ? 'border-white border-2' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
            onClick={() => !task.completed && selectTask(task)}
          >
            <div className="flex items-start gap-3.5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComplete(task.id);
                }}
                className="mt-0.5 flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {task.completed ? (
                    <motion.div
                      key="completed"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="uncompleted"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Circle className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex-1 min-w-0">
                <p className={`text-white font-medium leading-snug transition-all duration-200 ${
                  task.completed ? 'line-through opacity-40' : ''
                }`}>
                  {task.name}
                </p>
                {task.pomodoros > 0 && (
                  <div 
                    className="flex gap-1.5 mt-2.5"
                  >
                    {Array.from({ length: task.pomodoros }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                    ))}
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="text-white/30 hover:text-red-400 transition-colors duration-200 flex-shrink-0 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div
            className="text-white/40 text-center py-12 text-sm"
          >
            {t('noTasksYet')}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;