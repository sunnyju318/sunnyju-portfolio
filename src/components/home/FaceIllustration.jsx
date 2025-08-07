import './FaceIllustration.scss';
import FaceSvg from '../../assets/images/face-illustration.svg?react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FaceIllustration() {
  const svgRef = useRef(null);
  // DOM에 접근하기위해 useRef 사용하기, null로 초기화하고 컴포넌트가 렌더링 된 후에는 해당 DOM 요소가 여기에 저장된다.
  // 여기서는 svg에 접근하기 위해서이다.

  const [currentActiveGroup, setCurrentActiveGroup] = useState(0);
  // 자동순환 애니메이션 : 자동 애니메이션 제어용, 초기값은 0으로 첫번째 그룹을 의미.
  const [hoveredGroup, setHoveredGroup] = useState(null);
  // 마우스를 호버했을 시 그 상태를 추적하기 위함, 초기값은 null로 아무것도 호버되지 않은 상태임
  const [isPaused, setIsPaused] = useState(false);
  // 마우스 호버시 자동순환 애니메이션을 멈출지 계속할지 제어하는 용도, 초기값은 false로 기본적으로 움직이는 상태임

  const groups = [
    {
      id: 'neck',
      color: '#e1dad2',
      description: 'I used to drive a forklift in Australia.'
    },
    {
      id: 'hair',
      color: '#e1dad2',
      description: 'I worked as a social worker in Korea.'
    },
    {
      id: 'hat-right',
      color: '#e1dad2',
      description: 'I worked as a fashion designer in Korea.'
    },
    {
      id: 'hat-left',
      color: '#e1dad2',
      description: 'I run a handmade jewelry brand.'
    },
    {
      id: 'right-face',
      color: '#e1dad2',
      description: 'I started coding thanks to a flea market.'
    },
    {
      id: 'left-face',
      color: '#e1dad2',
      description: 'I shifted from helping people to building technology for people.'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      // console.log('mouse moving', e.clientX, e.clientY);
      // e : 이벤트핸들러의 매개변수, 이벤트 객체이며 사용자가 어떤 행등을 했을때 브라우저가 자동으로 생성해서 넘겨주는 정보 꾸러미.
      // 브라우저가 이벤트 핸들러를 호출할 때 자동으로 넣어주는 인자

      if (!svgRef.current) return;
      // 만약 svg가 아직 렌더링되지 않은 상태에서 함수를 실행할경우 에러가 나니 DOM 요소가 존재하지 않을 경우 함수를 실행하지 말고 종료하라는 뜻.

      const leftEye = svgRef.current.querySelector('#left-eye');
      const rightEye = svgRef.current.querySelector('#right-eye');
      // 각각의 svg 불러오기

      if (!leftEye || !rightEye) return;
      // 왼쪽눈이나 오른쪽눈의 id를 둘중 하나라도 못찾았을경우 함수실행중단, 에러를 방어하기 위해.

      // 움직임 가로세로 거리 계산
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      // e.clientX : 현재 커서의 가로위치이다.
      // e.clientX / window.innerWidth : 현재 커서의 가로위치를 전체 화면 너비로 나눠서 0~1사이의 비율로 만든다.
      // 예를들어 전체 화면너비가 1000px이고 마우스가 250px 위치에 있다면 0.25값으로 나올수 있다.
      // 왼쪽 끝 : 0, 가운데 : 0.5, 오른쪽 끝 : 1
      // 기준점을 중앙으로 옮기기 위해서 0.5를 뺀다.
      // 이제 왼쪽 끝 : -0.5, 가운데 : 0, 오른쪽 끝 : 0.5, 기준점 가운데가 이제 0이 되었다.
      // 여기서 *10 은 눈동자의 움직임 범위를 -5 ~+5 사이로 정해주려는 것이다.
      // 정리 : 화면의 중앙을 기준으로 좌우 상하로 얼마나 벗어났는지 -5에서 +5사이의 값으로 만들어주는공식

      //양쪽 눈 움직이기
      leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
      rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    // mousemove 마우스를 움직이면 handleMouseMove 함수를 실행시켜라.

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // 컴포넌트가 언마운트 될때 깨끗이 정리하기 위한것
    };
  }, []);

  // 자동루핑 (호버시 정지)
  useEffect(() => {
    if (isPaused) return;
    // 만약에 isPasued가 true이면 애니메이션을 일시정지한 상태이니 아래 코드를 실행하지 말고 여기서 끝내라는 뜻.
    const interval = setInterval(() => {
      setCurrentActiveGroup(prev => (prev + 1) % groups.length);
      // 현재 인덱스를 하나씩 증가시키면서 다시 0으로 순환시키는 공식.
      // prev : 이전값, (이전값+1)을 groups.length인 6으로 나눈 값이 결과값이다.
      // (0 + 1) % 6 (1을 6으로 나눈 나머지) = 1
      // (1 + 1) % 6 (2를 6으로 나눈 나머지) = 2
      // ......
      // (5 + 1) % 6 (6을 6으로 나눈 나머지) = 0
    }, 3000);
    // 즉, 3초에 한번씩 prev를 0부터 5까지 총 6개의 배열을 순환하는것

    return () => clearInterval(interval);
    // 컴포넌트가 사라지거나 isPaused 값이 바뀌면 clearInterval로 이전 타이머 정리하기
  }, [isPaused, groups.length]);
  // dependency array : isPaused 이거나 groups.length중 하나라도 값이 바뀌면 유즈이펙트가 다시 실행됨

  // 그룹별로 호버이벤트 등록
  useEffect(() => {
    if (!svgRef.current) return; //  Guard clause.

    const cleanupFunctions = [];

    groups.forEach(group => {
      const element = svgRef.current.querySelector(`#${group.id}`);
      if (!element) return; // Guard clause.

      element.style.cursor = 'pointer';

      const handleMouseEnter = () => {
        setIsPaused(true); // 마우스를 올리면 멈춤
        setHoveredGroup(group); // 마우스를 올린 group의 정보를 저장, 초기값은 null 이었음
      };

      const handleMouseLeave = () => {
        setIsPaused(false);
        setHoveredGroup(null);
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      // 여러 요소에 이벤트를 추가했기때문에 단일 이벤트처럼 간단히 removeEventListener()를 할수 없다.
      // 어떤 요소에 어떤 리스너가 붙었는지 기억해야 하므로 각각을 cleanup 함수에 저장해뒀다가 배열에 저장한 모든 함수를 forEach로 호출함
      cleanupFunctions.push(() => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  // 색상 애니메이션 적용
  useEffect(() => {
    if (!svgRef.current) return;
    // 에러방지를 위한 Guard clause.
    // 컴포넌트가 처음 렌더링될때 아직 DOM에 해당 SVG 요소가 없어서 svgRef.current가 null일수 있음, 그럴때 이 svgRef를 불러 뭔가를 실행하는 코드가 있다면 null이므로 에러가 발생할수 있기 때문에 없으면 그냥 넘어가자 하는것임.

    const activeGroup = hoveredGroup || groups[currentActiveGroup];
    // 마우스로 호버중이면 그 그룹, 아니면 자동으로 바뀌는 그룹을 사용하라.

    groups.forEach((group, index) => {
      const element = svgRef.current.querySelector(`#${group.id}`);
      // svg의 그룹의 각 id 불러오기
      if (!element) return; // Guard clause.

      // #hair이 적용되지 않아 확인해보니 콘솔에서는 찍힘, 즉 id값은 확실하며 알고보니 hair만이 그룹이 아닌 단순 path여서 벌어진 일이므로 아래와 같이 수정함
      const isActive = group.id === activeGroup.id;
      // 해당 요소가 path든 g든 상관없이 모든 path 찾기
      const paths = element.tagName === 'path' 
      ? [element]  // path 요소면 자기 자신을 배열로
      : element.querySelectorAll('path, circle, ellipse'); 
      // g 요소면 하위 요소들

      paths.forEach(path => {
        if (isActive) {
          path.style.filter = 'blur(0.5px) drop-shadow(0 0 20px rgba(26, 32, 30, 0.9))';
          path.style.opacity = '0.5';
        } else {
          path.style.fill = '';
          path.style.filter = '';
          path.style.transform = '';
          path.style.opacity = '';
        }
        path.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }, [currentActiveGroup, hoveredGroup]);

  return (
    <div className='face-wrapper'>
      <FaceSvg ref={svgRef} className='face-svg' />
      {/* ref={svgRef} : DOM 요소에 접근하기, id값 주듯이 주는것 */}

      <AnimatePresence>
        {hoveredGroup && (
          <motion.div
            className="hover-modal"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
            style={{
              position:'fixed',
              top: '30%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              pointerEvents: 'none',

              background: 'rgba(15, 15, 15, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#e1dad2',
              padding: '20px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(225, 218, 210, 0.15)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)',
              maxWidth: '400px',
            }}
          >
            <p>{hoveredGroup.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import { form } from 'framer-motion/client';

export default FaceIllustration;