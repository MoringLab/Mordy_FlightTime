'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FocusType } from '@/types';
import { Laptop, BookOpen, Coffee, Moon, LucideIcon } from 'lucide-react';

interface FocusTypePopoverProps {
  isOpen: boolean;
  origin: { x: number; y: number };
  onSelect: (type: FocusType) => void;
  onClose: () => void;
}

const FOCUS_TYPES: { type: FocusType; icon: LucideIcon; label: string; color: string }[] = [
  { type: 'work', icon: Laptop, label: 'Work', color: 'bg-work' },
  { type: 'study', icon: BookOpen, label: 'Study', color: 'bg-study' },
  { type: 'relax', icon: Coffee, label: 'Relax', color: 'bg-relax' },
  { type: 'sleep', icon: Moon, label: 'Sleep', color: 'bg-sleep' },
];

export default function FocusTypePopover({ isOpen, origin, onSelect, onClose }: FocusTypePopoverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ios-black/60 backdrop-blur-sm z-50"
          />

          {/* Popover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: origin.x, y: origin.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              x: origin.x,
              y: origin.y,
              transition: { duration: 0.15 },
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-ios-zinc-900/90 backdrop-blur-xl rounded-3xl p-6 z-50"
            style={{
              transformOrigin: `${origin.x}px ${origin.y}px`,
            }}
          >
            <h3 className="text-xl font-bold text-ios-white mb-4 text-center">Choose Focus Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {FOCUS_TYPES.map(({ type, icon: Icon, label, color }) => (
                <motion.button
                  key={type}
                  onClick={() => onSelect(type)}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-ios-zinc-800 hover:bg-ios-zinc-700 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-ios-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-ios-white">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
