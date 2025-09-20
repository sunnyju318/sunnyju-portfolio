// components/LumosEasterEgg.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LumosEasterEgg.scss';

const LumosEasterEgg = () => {
  const [lumosVisible, setLumosVisible] = useState(false);
  const [lumosPosition, setLumosPosition] = useState({ x: 0, y: 0 });
  const [lightEffect, setLightEffect] = useState(false);
  
  // 불빛 DOM 요소 참조
  const lightRef = useRef(null);
  const throttleRef = useRef({ lastTime: 0, animationId: null });

  // Lumos 텍스트 랜덤 위치 생성
  const generateRandomPosition = () => {
    const margin = 100;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    
    return {
      x: Math.random() * (maxX - margin) + margin,
      y: Math.random() * (maxY - margin) + margin
    };
  };

  // Lumos 텍스트 주기적으로 나타났다 사라지기
  useEffect(() => {
    let timeoutId;

    const showLumos = () => {
      if (lightEffect) {
        scheduleNext();
        return;
      }

      setLumosPosition(generateRandomPosition());
      setLumosVisible(true);
      
      setTimeout(() => {
        setLumosVisible(false);
      }, 5000);
    };

    const scheduleNext = () => {
      const randomDelay = Math.random() * 5000 + 5000;
      timeoutId = setTimeout(() => {
        showLumos();
        scheduleNext();
      }, randomDelay);
    };

    if (!lightEffect) {
      scheduleNext();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lightEffect]);

  // Lumos 클릭 핸들러
  const handleLumosClick = () => {
    console.log('Lumos 클릭됨!'); // 디버깅용
    setLightEffect(true);
    setLumosVisible(false);
    
    setTimeout(() => {
      console.log('불빛 꺼짐'); // 디버깅용
      setLightEffect(false);
    }, 10000);
  };

  // 최적화된 마우스 추적 (직접 DOM 조작)
  const handleMouseMove = useCallback((e) => {
    if (!lightEffect || !lightRef.current) return;

    const now = Date.now();
    if (now - throttleRef.current.lastTime < 16) return;
    throttleRef.current.lastTime = now;
    
    if (throttleRef.current.animationId) {
      cancelAnimationFrame(throttleRef.current.animationId);
    }

    throttleRef.current.animationId = requestAnimationFrame(() => {
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${e.clientX - 50}px, ${e.clientY - 50}px, 0)`;
      }
    });
  }, [lightEffect]);

  // 마우스 이벤트 등록
  useEffect(() => {
    if (lightEffect) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleRef.current.animationId) {
        cancelAnimationFrame(throttleRef.current.animationId);
      }
    };
  }, [lightEffect, handleMouseMove]);

  return (
    <>
      {/* Lumos 텍스트 */}
      {lumosVisible && (
        <span
          onClick={handleLumosClick}
          className="lumos-text"
          style={{
            left: `${lumosPosition.x}px`,
            top: `${lumosPosition.y}px`,
          }}
        >
          Lumos
        </span>
      )}

      {/* 마우스 불빛 효과 */}
      {lightEffect && (
        <div
          ref={lightRef}
          className="lumos-light"
          style={{
            left: '0px',
            top: '0px',
          }}
        />
      )}
    </>
  );
};

export default LumosEasterEgg;