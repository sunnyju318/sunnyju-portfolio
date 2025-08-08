import './FaceIllustration.scss';
import FaceSvg from '../../assets/images/face-illustration.svg?react';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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


  /* == 성능최적화하기 == 메모이제이션, 불필요한 재생성 방지 :
  JSX안에서 [{}, {}, ..] 이런식으로 배열 데이터를 쓰면 
  리렌더링 할때마다 새 배열이 생성된다. 내용이 아무리 같더라도 메모리 주소는 리렌더할때마다 달라진다 className="배열이나 객체는 값이 아닌 reference로 비교되기 때문이다.
  그래서 그 배열을 쓰는 useEffect에 반영되어 useEffect역시 새로 실행된다.
  여기서 useMemo가 처음 한번 생성된 그 메모리 주소를 기억해서 의존값이 바뀌지 않으면 같은 참조값을 반환한다. */
  const groups = useMemo(() => [
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
  ], []);

  // == 성능최적화하기 == 눈동자 애니메이션 :

  // 캐싱하기 : 자주 사용하는 데이터를 미리 저장해두고 다음에는 다시 계산하거나 찾지않고 빠르게 꺼내 쓰는 것.
  const eyeElementsRef = useRef({ left: null, right: null });
  // 렌더링과 무관한 값 저장소
  const cacheEyeElements = useCallback(() => {
    if (!svgRef.current) return;
    // 만약 svg가 아직 렌더링되지 않은 상태에서 함수를 실행할경우 에러가 나니 DOM 요소가 존재하지 않을 경우 함수를 실행하지 말고 종료하라는 뜻.

    /* 만약 왼쪽이나 오른쪽이 아직 null이라면 (한번도 안 찾았다면) 쿼리셀렉터로 DOM요소를 찾고 
    그 한번 찾은걸 eyeElementsRef.current.left/right에 저장해둠(캐싱)
    이후에는 이 함수를 다시 호출하더라도 DOM을 다시 찾지 않음.
    */
    if (!eyeElementsRef.current.left || !eyeElementsRef.current.right) {
      eyeElementsRef.current.left = svgRef.current.querySelector('#left-eye');
      eyeElementsRef.current.right = svgRef.current.querySelector('#right-eye');
    }
    return eyeElementsRef.current.left && eyeElementsRef.current.right;
    // && : 두 눈 모두 캐싱되어 있으면 true, 하나라도 없으면 false
  }, []);

  /* throttle : 마우스를 움직이면 초당 수백번 mousemove가 발생하고 그때마다 handleMouseMove()가 실행된다. 
  너무 자주 실행되는 이벤트를 일정시간 간격으로만 실행되도록 제한하는것이 throttle이다. 성능최적화를 위한것.
  useRef를 사용하는 이유는 값이 리렌더링과 상관없이 유지되야 하기 때문이다. 순수한 저장소로만 사용하려는 것.
  */
  const throttleRef = useRef({ lastTime: 0, animationId: null });
  // lastTime : 마지막으로 실행한 시간, animationId : requestAnimationFrame의 ID (취소할 때 쓰임)
  // animationId는 requestAnimationFrame(callback)으로 예약된 콜백실행 예약 자체를 식별할수 있는 ID이고
  // 나중에 cancelAnimationFrame(animationId)로 그 예약을 취소할수 있게 해주는 값이다.

  const handleMouseMove = useCallback((e) => {
    // useCallback으로 감싸서 불필요한 함수가 재생성 되는것을 방지하기.

    const now = Date.now();
    // Data.now() : 자바스크립트 내장함수, 현재 시각을 밀리초(ms) 단위로 반환
    if (now - throttleRef.current.lastTime < 16) return;
    // now(현재 시각)에서 throttleRef.current.lastTime(마지막으로 실행된 시점)이 16ms보다 작으면 실행하지 말것.
    // 즉, 최근 실행된지 16ms 이상 지나야 다음 실행을 허용하겠다는 뜻이다.
    throttleRef.current.lastTime = now;
    // 16ms가 지나고 실행이 됐을 시 이번 실행 시점을 저장해 둬야 다음 마우스 이벤트에서 또 비교할수 있으므로 저장해두는 것이다.
    if (throttleRef.current.animationId) {
      cancelAnimationFrame(throttleRef.current.animationId);
    }
    /* 이미 예약된 애니메이션 프레임이 있으면 실행되기 전에 취소할것. 
    마우스를 빨리 움직이면 handleMouseMove가 계속 실행이 된다. 
    그때마다 requestAnimationFrame()으로 계속 다음 프레임을 예약하게 된다. 
    하지만 이전 예약이 아직 실행되지 않았다면 예약이 쌓이게되어 중복 실행이 된다. 
    그래서 throttleRef.current.animationId에 이미 예약된 프레임이 있는지 확인하고
    있다면 취소하는것이다. 그런 다음에 새로운 프레임만 예약해서 깔끔하게 실행한다.
    */

    /*requestAnimationFrame() : 브라우저가 준비가 되지 않았는데도 실행되려는걸 방지하기 위함이다.
    즉, 화면그릴 준비가 됐을 때 이함수를 실행해줘, 라는 뜻으로 다음프레임(화면 갱신 타이밍)에 딱 맞춰서 실행시켜준다.
    브라우저가 화면을 그리기 직전에 함수를 실행시켜주는 기능으로 애니메이션, 스크롤, 마우스따라가기 같은데 아주 좋다. 
    반복하려면 자기자신을 계속 예약하면 된다. 
    예시 : 
    function draw() {
    1. 화면 업데이트
    2. 다음 프레임 예약
    requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw); // 시작
    */

    throttleRef.current.animationId = requestAnimationFrame(() => {
      // 다음화면을 그리기 전에 이 콜백을 실행해 달라는것
      if (!cacheEyeElements) return;
      // 왼쪽눈와 오른쪽눈 DOM 요소를 미리 한번만 찾아서 저장한 캐시 블러옴, 못찾으면 실행말고 중단
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

      // GPU 가속을 위해 translate3d 사용
      const transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      /*
      1. GPU와 CPU의 차이
        1) GPU : 그래픽전용, 훨씬빠름, 부드럽게 처리가능
        2) CPU : 일반계산용, 느릴수있음, 복잡한 UI에 부담
      2. 브라우저는 GPU를 적극적극적으로 쓰려면 "나는 3D야"와 같은 힌트를 줘야 한다. 
      3. translate3d(x, y, z)는 3D 이동으로 z에 0을 넣더라도 브라우저는 이 요소를 GPU 처리 대상으로 인식한다.
      */

      // 캐싱된 요소 사용 (매번 검색 X)
      // transform에 "translate3d(x, y, 0)"와 같은 문자열이 들어있으며 DOM 요소에 transform을 직접 부여함
      eyeElementsRef.current.left.style.transform = transform;
      eyeElementsRef.current.right.style.transform = transform;
    });
  }, [cacheEyeElements]);
  // cacheEyeElements : 아까 DOM에서 쿼리셀렉터로 찾아놓은 왼쪽, 오른쪽 눈.
  // 의존성배열로 cacheEyeElements 이게 변했을때만 새로 만들어라는 뜻.
  // handleMouseMove 이 함수 안에서 cacheEyeElements를 쓰기 때문에 cacheEyeElements의 함수가 바뀔때를 대비해서 useCallback의 의존성 배열에 넣은 것이다. 지금당장 필요한것은 아니나 미래의 안정성을 위해 넣은 것이다.
  // 내부에서 쓰는 외부변수, 함수는 무조건 의존성 배열에 명시할것

  // 눈동자 움직임 애니메이션을 초기화 및 클린업하기
  // 목적 : 컴포넌트가 마운트 되었을때 눈 요소를 찾아서 캐싱하고 마우스 이벤트를 등록 후에 컴포넌트가 언마운트 되었을때는 타이머, 이벤트, 애니메이션을 모두 정리해야 한다.
  useEffect(() => {
    const timer = setTimeout(() => {
      cacheEyeElements();
    }, 100);
    // DOM이 완전히 그려지기 전에 쿼리셀럭터로 요소를 찾으면 null이 나올수 있따.
    // 그래서 100ms 후에 cacheEyeElements()를 실행하게 함으로써 안정적으로 캐싱하려는 것이다.

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    // mousemove 마우스를 움직이면 handleMouseMove 함수를 실행시켜라.
    /*
    passive: true 는 이 이벤트 리스너 안에서는 preventDefault()를 쓰지 않겠다고
    브라우저에게 미리 알려주는 설정이다. 
    브라우저는 기본적으로 이 이벤트 안에서 너가 preventDefault()를 쓸지 모르니까
    나는 잠깐 기다렸다가 혹시 스크롤 막을거면 그거 보고 결정할게. 라고 생각한다. 
    그리고 스크롤/렌더링을 잠깐 멈추고 대기한다. 
    이게 반복되면 스크롤 버벅임이나 성능저하가 발생할수 있다.
    preventDefault() : 요소나 브라우저의 기본 행동을 막고 우리가 원하는 동작만 직접 컨트롤하고 싶을때 쓰는 함수이다. 보통 이벤트객체(e)를 통해 호출해야 하므로 function(e)처럼 e를 꼭 받는다
    */

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);

      // 진행 중인 애니메이션 정리
      if (throttleRef.current.animationId) {
        cancelAnimationFrame(throttleRef.current.animationId);
      }
    };
  }, [handleMouseMove, cacheEyeElements]);


  /* 이니셜 접근 : 성능저하 문제 발생함
  1. 매번 DOM을 검색하는 문제 발생
  2. throttling가 없어서 마우스가 움직일때마다 초당 수백번 실행됨
  3. GPU 가속 미사용

useEffect(() => {
  const handleMouseMove = (e) => {
    // console.log('mouse moving', e.clientX, e.clientY);
    // e : 이벤트핸들러의 매개변수, 이벤트 객체이며 사용자가 어떤 행등을 했을때 브라우저가 자동으로 생성해서 넘겨주는 정보 꾸러미.
    // 브라우저가 이벤트 핸들러를 호출할 때 자동으로 넣어주는 인자

    if (!svgRef.current) return;

    const leftEye = svgRef.current.querySelector('#left-eye');
    const rightEye = svgRef.current.querySelector('#right-eye');
    // 각각의 svg 불러오기

    if (!leftEye || !rightEye) return;
    // 왼쪽눈이나 오른쪽눈의 id를 둘중 하나라도 못찾았을경우 함수실행중단, 에러를 방어하기 위해.

    // 움직임 가로세로 거리 계산
    const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 10;

    //양쪽 눈 움직이기(2d계산, cpu 사용하게 됨, 느릴수 있음)
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
*/

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
    }, 2000);
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
        path.style.transition = 'all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
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
              position: 'fixed',
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