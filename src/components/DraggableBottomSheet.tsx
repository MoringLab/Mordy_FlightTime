'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
// types 파일이 없다면 아래 인터페이스를 직접 사용하거나 경로를 맞춰주세요.
// import { SnapPoint } from '@/types';

export type SnapPoint = 'PEEK' | 'FULL';

interface DraggableBottomSheetProps {
  children: React.ReactNode;
  peekContent?: React.ReactNode;
  initialSnap?: SnapPoint;
  onClose?: () => void;
}

export default function DraggableBottomSheet({
  children,
  peekContent,
  initialSnap = 'PEEK',
  onClose,
}: DraggableBottomSheetProps) {
  const [snapPoint, setSnapPoint] = useState<SnapPoint>(initialSnap);
  const [windowHeight, setWindowHeight] = useState<number>(0); // 초기값 0으로 설정하여 클라이언트 마운트 후 계산

  const y = useMotionValue(0);

  // 윈도우 크기 변경 감지 및 높이 업데이트
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    // 초기 실행
    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // 동적 Snap Point 계산
  const SNAP_POINTS = {
    PEEK: 140,
    FULL: windowHeight > 0 
      ? Math.min(windowHeight - 60, Math.max(windowHeight * 0.5, Math.min(windowHeight * 0.85, 550)))
      : 400, // SSR 대비 기본값
  };

  const height = snapPoint === 'PEEK' ? SNAP_POINTS.PEEK : SNAP_POINTS.FULL;

  // 높이가 커질수록 상단 모서리 둥글기를 줄임 (선택 사항, 디자인에 따라 제거 가능)
  const borderRadius = useTransform(y, [0, -100], [24, 24]); 

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (snapPoint === 'PEEK') {
      // 위로 강하게 드래그하거나 일정 이상 올렸을 때
      if (offset < -50 || velocity < -500) {
        setSnapPoint('FULL');
      }
    } else {
      // 아래로 강하게 드래그하거나 일정 이상 내렸을 때
      if (offset > 50 || velocity > 500) {
        setSnapPoint('PEEK');
      }
    }
  };

  const safeAreaPaddingBottom = 'env(safe-area-inset-bottom, 10px)';

  if (windowHeight === 0) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {snapPoint === 'FULL' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSnapPoint('PEEK')}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{
          y,
          height,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          paddingBottom: snapPoint === 'FULL' ? safeAreaPaddingBottom : 0,
        }}
        animate={{
          height,
          paddingBottom: snapPoint === 'FULL' ? 20 : 0
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 40 }}
        className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl z-50 overflow-hidden flex flex-col shadow-[-4px_0px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="w-full flex justify-center pt-4 pb-4 flex-shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-zinc-400/40 rounded-full" />
        </div>

        <div 
          className="px-6 flex-1 overflow-y-auto"
           onPointerDown={(e) => e.stopPropagation()}
        >
          {snapPoint === 'PEEK' ? (
            <div className="py-2">{peekContent}</div>
          ) : (
            <div className="pb-6 h-full">{children}</div>
          )}
        </div>
      </motion.div>
    </>
  );
}