import { useState, useEffect, useRef } from 'react';

interface UseTimerResult {
  remainingSeconds: number;
  progress: number;
  isCompleted: boolean;
  formattedTime: string;
}

export function useTimer(
  startTime: number | null,
  durationMinutes: number,
  isPaused: boolean = false
): UseTimerResult {
  const [now, setNow] = useState(Date.now());
  const pausedTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      // Freeze time at the moment of pause
      if (pausedTimeRef.current === null) {
        pausedTimeRef.current = Date.now();
        setNow(pausedTimeRef.current);
      }
      return;
    }

    // Clear paused time when resuming
    pausedTimeRef.current = null;

    // Immediately update when unpaused
    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 100); // Update every 100ms for smoother animation

    return () => clearInterval(interval);
  }, [isPaused]);

  if (!startTime) {
    return {
      remainingSeconds: durationMinutes * 60,
      progress: 0,
      isCompleted: false,
      formattedTime: formatTime(durationMinutes * 60),
    };
  }

  const elapsedMs = now - startTime;
  const totalMs = durationMinutes * 60 * 1000;
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const totalSeconds = durationMinutes * 60;
  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
  const progress = Math.min(1, elapsedMs / totalMs);
  const isCompleted = remainingSeconds === 0;

  return {
    remainingSeconds,
    progress,
    isCompleted,
    formattedTime: formatTime(remainingSeconds),
  };
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}
