import './BackgroundAnimation.scss';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
// gsap의 확장기능 플러그인
import { useEffect } from 'react';

// GSAP 플러그인 등록하기
gsap.registerPlugin(MotionPathPlugin);

const BackgroundAnimation = () => {

useEffect(() => {
  const createFallingAnimation = (blurElement, pathId, delay = 0) => {

    // gsap.set() 메서드, 애니메이션 시작되기전 초기상태 세팅
    // 지정한 blur 요소를 화면에 보이지 않게 만들고, 나중에 따라갈 path경로도 미리 설정해 두기.
gsap.set(blurElement, {
  motionPath : {
    path: pathId, 
    autoRotate: false,
    },
  opacity: 0,
});
// blurElement : 대상요소(DOM 셀렉터)
// motionPath : path - 따라갈 SVG path, 
// autoRotate - 요소가 경로에 맞춰 회전하기 않게 설정(기본값은 false) 요소가 경로의 방향에 따라 고개를 돌려가며 따라가는지를 설정하는것(수업시간 거북이 예제 기억하기)
// opacity : 0 시작할때 완전 투명상태로 준비

gsap.to(blurElement, {
  motionPath : {
    path: pathId,
    autoRotate: false,
  },
  opacity: 1,
  duration: 1,
  delay: delay,
  ease: "none",
  repeat: -1,
  repeatDelay: Math.random() * 10 + 5, // 5-15초 랜덤 딜레이
});
};

// ======== createFallingAnimation() 끝 =========

// 애니메이션을 요소에 적용하기
// createFallingAnimation = (blurElement, pathId, delay = 0) : 전체 함수 호출구조

// 왼쪽 세트 애니메이션
createFallingAnimation('.left-set .blur-1', '#left-curve1', 5);
createFallingAnimation('.left-set .blur-2', '#left-curve2', 0);
createFallingAnimation('.left-set .blur-3', '#left-curve3', 10);

// 오른쪽 세트 애니메이션
  createFallingAnimation('.right-set .blur-1', '#right-curve1', 2);
  createFallingAnimation('.right-set .blur-2', '#right-curve2', 10);
  createFallingAnimation('.right-set .blur-3', '#right-curve3', 5);


}, []);

// 블러들이 정확하게 패쓰를 따라 이동하지않고 고정된상태를 보여서 블러들을 전부 svg 안으로 이동시켜 해결함
return (
  <div className="background-animation">
    <div className="line-set left-set">
      <svg viewBox="0 0 237.21 841.89">
        
        <path id="left-curve1" d="M10.5 0v173.32a13.6 13.6 0 0 1-2.98 8.5l-4.05 5.07a13.62 13.62 0 0 0-2.98 8.5v107.36c0 2.9.93 5.73 2.64 8.07l4.71 6.42c1.72 2.34 2.64 5.17 2.64 8.07v516.57" />
        <path id="left-curve2" d="M123.61 0v603.32a13.6 13.6 0 0 1-2.98 8.5l-4.05 5.07a13.62 13.62 0 0 0-2.98 8.5v107.36c0 2.9.93 5.73 2.64 8.07l4.71 6.42c1.72 2.34 2.64 5.17 2.64 8.07v86.57" />
        <path id="left-curve3" d="M236.71 0v353.32a13.6 13.6 0 0 1-2.98 8.5l-4.05 5.07a13.62 13.62 0 0 0-2.98 8.5v107.36c0 2.9.93 5.73 2.64 8.07l4.71 6.42c1.72 2.34 2.64 5.17 2.64 8.07v336.57" />
        
        <rect className="falling-blur blur-1" />
        <rect className="falling-blur blur-2" />
        <rect className="falling-blur blur-3" />
      </svg>
    </div>

    <div className="line-set right-set">
      <svg viewBox="0 0 237.21 841.89">
        
        <path id="right-curve1" d="M10.5 0v173.32a13.6 13.6 0 0 1-2.98 8.5l-4.05 5.07a13.62 13.62 0 0 0-2.98 8.5v107.36c0 2.9.93 5.73 2.64 8.07l4.71 6.42c1.72 2.34 2.64 5.17 2.64 8.07v516.57" />
        <path id="right-curve2" d="M123.61 0v603.32a13.6 13.6 0 0 1-2.98 8.5l-4.05 5.07a13.62 13.62 0 0 0-2.98 8.5v107.36c0 2.9.93 5.73 2.64 8.07l4.71 6.42c1.72 2.34 2.64 5.17 2.64 8.07v86.57" />
        <path id="right-curve3" d="M236.71 0v353.32a13.6 13.6 0 0 1-2.98 8.5l-4.05 5.07a13.62 13.62 0 0 0-2.98 8.5v107.36c0 2.9.93 5.73 2.64 8.07l4.71 6.42c1.72 2.34 2.64 5.17 2.64 8.07v336.57" />
        
        {/* rect는 svg 안의 div 같은것 */}
        <rect className="falling-blur blur-1" />
        <rect className="falling-blur blur-2" />
        <rect className="falling-blur blur-3" />
      </svg>
    </div>
  </div>
);
};

export default BackgroundAnimation;