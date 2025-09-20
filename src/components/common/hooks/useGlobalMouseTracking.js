// 코드안에서 React 컴포넌트의 JSX 문법을 사용하지않고(HTML 태그를 리턴하지 않고) 순수 자바스크립트 또는 리액트 로직만 있는경우 .js를 쓴다.

import { useState, useEffect, useRef, useCallback } from 'react';

const useGlobalMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // 최적화된 throttle 로직 (기존 FaceIllustration에서 가져옴)
  const throttleRef = useRef({ lastTime: 0, animationId: null });

  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - throttleRef.current.lastTime < 16) return;
    throttleRef.current.lastTime = now;
    
    if (throttleRef.current.animationId) {
      cancelAnimationFrame(throttleRef.current.animationId);
    }

    throttleRef.current.animationId = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleRef.current.animationId) {
        cancelAnimationFrame(throttleRef.current.animationId);
      }
    };
  }, [handleMouseMove]);

  return mousePosition;
};

export default useGlobalMouseTracking;