'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { SnapPoint } from '@/types';

interface DraggableBottomSheetProps {
  children: React.ReactNode;
  peekContent?: React.ReactNode;
  initialSnap?: SnapPoint;
}

const SNAP_POINTS = {
  PEEK: 140,
  FULL: typeof window !== 'undefined' ? window.innerHeight * 0.6 : 400,
};

export default function DraggableBottomSheet({
  children,
  peekContent,
  initialSnap = 'PEEK',
}: DraggableBottomSheetProps) {
  const [snapPoint, setSnapPoint] = useState<SnapPoint>(initialSnap);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const height = snapPoint === 'PEEK' ? SNAP_POINTS.PEEK : SNAP_POINTS.FULL;

  const borderRadius = useTransform(y, [0, -100], [24, 0]);

  useEffect(() => {
    const handleResize = () => {
      SNAP_POINTS.FULL = window.innerHeight * 0.6;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (snapPoint === 'PEEK') {
      if (offset < -50 || velocity < -500) {
        setSnapPoint('FULL');
      }
    } else {
      if (offset > 50 || velocity > 500) {
        setSnapPoint('PEEK');
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      style={{
        y,
        height,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }}
      animate={{ height }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-ios-zinc-900/90 backdrop-blur-xl z-50 overflow-hidden"
    >
      {/* Drag Handle */}
      <div className="w-full flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 bg-ios-gray-400/50 rounded-full" />
      </div>

      <div className="px-6 h-full overflow-y-auto">
        {snapPoint === 'PEEK' ? (
          <div className="py-4">{peekContent}</div>
        ) : (
          <div className="pb-6">{children}</div>
        )}
      </div>
    </motion.div>
  );
}
