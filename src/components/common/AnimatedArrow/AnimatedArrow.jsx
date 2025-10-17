import "./AnimatedArrow.scss";
import { motion } from "framer-motion";
// arrow에 bounce 모션 넣기
import ArrowIcon from "../../../assets/icons/animated-arrow.svg?react";
// SVG를 React 컴포넌트로 불러오기 (vite-plugin-svgr 사용)
// ?react 쿼리로 SVG를 inline React 요소로 변환하여 스타일/애니메이션 제어 가능

function AnimatedArrow({
  direction = "down",
  animated = false,
  className = "",
}) {
  // 기본 props 넣기 : 방향 기본값은 'down', 애니메이션 동작 기본값은 false(움직임 없음)

  // 애니메이션 정의 함수 : getAnimation()
  const getAnimation = () => {
    if (!animated) return {};
    // 애니메이션이 꺼져있으면 움직임이 없단는 뜻
    // 이걸 쓰는이유:
    // 1. animated === false면 애니메이션 계산 자체가 쓸데 없으므로 불필요한 실행을 막기 위함이다.
    // 2. Framer Motion은 animate={undefined} 또는  animate={null}을 반환하면 콘솔에러가 뜰수 있기 때문에 animate={} 즉, 변화없음을 명시적으로 넘기는게 안전하고 확실한 방법이다.
    /*
    if (A) return {}; 
    1. A가 true이면 {} 빈 객체를 반환해라.
    if (!animated) return {}; 
    1. !animated가 true이면 {} 빈 객체를 반환해라.
    2. animated가 !(false)인게 true이면 {} 빈 객체를 반환해라.
    */

    switch (direction) {
      // 좌우로 움직임
      case "left":
      case "right":
        return { x: [0, direction === "left" ? -10 : 10, 0] };
      // 좌우 이동은 같으며 다만 시작이 left 인지 아니면 right인지에 따라 첫 움직임의 방향만 전해주는것

      // 위아래로 움직임
      case "up":
      case "down":
        return { y: [0, direction === "up" ? 10 : -10, 0] };
      default:
        return {};
      // 기본값은 처음 디폴트값인 down
    }
  };

  // 화살표 회전 함수 : getRotation()
  const getRotation = () => {
    switch (direction) {
      case "left":
        return 90;
      case "right":
        return -90;
      case "up":
        return 180;
      case "down":
        return 0;
    }
  };
  // 현재 SVG 화살표는 기본적으로 아래를 향함으로 down을 0에서 시작한다

  // 렌더링파트
  return (
    <motion.div
      className={`animated-arrow ${className}`}
      // 기존 arrow-wrapper이라는 클레스네임이 있고 추가로 이 컴포넌트를 사용하는 곳에서 컴포넌트에 클레스네임을 붙이면 더하라는 뜻(props로 넘기기)
      animate={getAnimation()}
      // 아래와 같았던 단방향 움직임에서 방향에 따라 애니메이션이 설정되도록 getAnimation이라는 함수를 만듬.
      // animate={{y: [0, -10, 0]}}
      transition={
        animated
          ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {}
      }
    >
      {/* animated가 true일 때만 transition을 주고,
아니라면 {}로 아무것도 하지 않도록 만든 조건식이다. */}

      <ArrowIcon
        className="animated-arrow__icon"
        style={{ transform: `rotate(${getRotation()}deg)` }}
        role="img" // 이 svg가 단순 장식이 아니라 의미있는 이미지임을 명시
        aria-label="Animated arrow icon" // alt 대신 스크린리더가 읽을수 있는 설명 제공
        focusable="false" // 키보드 탭 이동시 불필요하게 포커스되지 않게 함
      />
    </motion.div>
  );
}
// getAnimation()은 arrow-wrapper에 주고 getRotation()은 SVG파일인 arrow-icon에 줘서 두개를 분리한 이유 :
// 1. 회전은 정적 변환이기 때문에 css가 더 빠르며 css는 개발자 도구에서 바로 확인이 가능하여 디버깅에도 유용함
// 2. css의 transform은 브라우저가 GPU에서 한번만 처리 하면 되는데 Framer Motion rotate는 자바스크립트 애니메이션 엔진이 매 프레임마다 계산해야 하므로 굳이 그렇게 만들 필요가 없음.
// 3. 두개 각각 분리된 관심사로 두는게 좋음

// 사용법
/*
<AnimatedArrow />                                    
// 정지된 아래쪽 화살표
<AnimatedArrow direction="left" />                   
// 정지된 왼쪽 화살표
<AnimatedArrow direction="up" />                     
// 정지된 위쪽 화살표
<AnimatedArrow direction="right" />                  
// 정지된 오른쪽 화살표

<AnimatedArrow direction="left" animated={true} />   
// 왼쪽 향하고 좌우로 통통
<AnimatedArrow direction="down" animated={true} />  
 // 아래 향하고 위아래로 통통
*/

export default AnimatedArrow;
