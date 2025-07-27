import './AnimatedArrow.scss';
import ArrowIcon from '../../../assets/icons/animated-arrow.svg?react';
// SVG를 React 컴포넌트로 불러오기 (vite-plugin-svgr 사용)
// ?react 쿼리로 SVG를 inline React 요소로 변환하여 스타일/애니메이션 제어 가능
import {motion} from 'framer-motion';
// arrow에 bounce 모션 넣기


function AnimatedArrow() {
  return (
    <motion.div className='arrow-wrapper'
    animate={{y: [0, -10, 0]}}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }}>
      <ArrowIcon className='arrow-icon' />
    </motion.div>
  );
}

export default AnimatedArrow;