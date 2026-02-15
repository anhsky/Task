import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { Slider } from './components/ui/slider';
import { Checkbox } from './components/ui/checkbox';
import { useLanguage } from "../contexts/LanguageContext.jsx";

const SettingsModal = ({ open, onOpenChange, durations, setDurations, autoStart, setAutoStart }) => {
  const { t } = useLanguage();

  const updateDuration = (mode, minutes) => {
    setDurations(prev => ({
      ...prev,
      [mode]: minutes * 60
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t('settings')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">{t('focusDuration')}: {durations.focus / 60} {t('min')}</Label>
              <Slider
                value={[durations.focus / 60]}
                onValueChange={([value]) => updateDuration('focus', value)}
                min={1}
                max={60}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-white/80">{t('shortBreakDuration')}: {durations['short-break'] / 60} {t('min')}</Label>
              <Slider
                value={[durations['short-break'] / 60]}
                onValueChange={([value]) => updateDuration('short-break', value)}
                min={1}
                max={30}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-white/80">{t('longBreakDuration')}: {durations['long-break'] / 60} {t('min')}</Label>
              <Slider
                value={[durations['long-break'] / 60]}
                onValueChange={([value]) => updateDuration('long-break', value)}
                min={1}
                max={60}
                step={1}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="autostart"
              checked={autoStart}
              onCheckedChange={setAutoStart}
            />
            <Label htmlFor="autostart" className="text-white/80 cursor-pointer">
              {t('autoStartNext')}
            </Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;