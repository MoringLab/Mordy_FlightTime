'use client';

import { motion } from 'framer-motion';
import { Plane, Calendar, Clock, User } from 'lucide-react';
import { FlightDestination, FocusType } from '@/types';

interface BoardingPassProps {
  flight: FlightDestination;
  seat: string;
  focus: FocusType;
  onStartFocus?: () => void;
}

export default function BoardingPass({ flight, seat, focus, onStartFocus }: BoardingPassProps) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    // 이 motion.div가 보딩패스와 버튼 전체를 감싸고 화면 하단에 고정됩니다.
    <motion.div
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md"
    >
      {/* 기존 보딩패스 UI 부분 */}
      <div className="bg-ios-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-ios-black text-ios-white p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Boarding Pass</p>
              <h2 className="text-2xl font-bold">Focus Flight</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-ios-white/10 backdrop-blur-sm flex items-center justify-center">
              <Plane className="w-6 h-6" strokeWidth={1.5} />
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-3xl font-bold">SPX</p>
              <p className="text-xs text-ios-gray-400 mt-1">Singapore</p>
            </div>
            <div className="flex-1 mx-4 relative">
              <div className="h-px bg-ios-gray-400/30 w-full" />
              <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rotate-90" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{flight.code}</p>
              <p className="text-xs text-ios-gray-400 mt-1">{flight.name}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4 bg-ios-white text-ios-black">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ios-zinc-700" strokeWidth={1.5} />
                <p className="text-sm font-semibold">{formattedDate}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Time</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ios-zinc-700" strokeWidth={1.5} />
                <p className="text-sm font-semibold">{formattedTime}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-sm font-semibold">{flight.durationMinutes}m</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Seat</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-ios-zinc-700" strokeWidth={1.5} />
                <p className="text-sm font-semibold">{seat}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-ios-gray-400 uppercase tracking-wider mb-1">Focus</p>
              <p className="text-sm font-semibold capitalize">{focus}</p>
            </div>
          </div>

          {/* Barcode */}
          <div className="pt-4 border-t border-ios-zinc-800/10">
            <svg width="100%" height="60" viewBox="0 0 300 60">
              {[...Array(50)].map((_, i) => (
                <rect
                  key={i}
                  x={i * 6}
                  y="0"
                  width={Math.random() > 0.5 ? 3 : 2}
                  height="60"
                  fill="#000000"
                />
              ))}
            </svg>
            <p className="text-center text-xs text-ios-gray-400 mt-2 tracking-widest">
              FF{flight.code}{seat.replace(/\D/g, '')}
            </p>
          </div>
        </div>
      </div>

      {/* Start Focus 버튼을 여기에 추가합니다. */}
      <button
        onClick={onStartFocus}
        className="mt-4 w-full py-4 bg-ios-white text-ios-black rounded-2xl font-semibold text-base active:scale-[0.98] transition-transform shadow-lg"
      >
        Start Focus
      </button>
    </motion.div>
  );
}