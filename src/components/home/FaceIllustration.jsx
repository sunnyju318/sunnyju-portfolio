import './FaceIllustration.scss';
import FaceSvg from '../../assets/images/face-illustration.svg?react';
import { useEffect, useRef } from 'react';

function FaceIllustration() {
  const svgRef = useRef(null);
  // DOM에 접근하기위해 useRef 사용하기, null로 초기화하고 컴포넌트가 렌더링 된 후에는 해당 DOM 요소가 여기에 저장된다.
  // 여기서는 svg에 접근하기 위해서이다.

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
      const moveX = (e.clientX / window.innerWidth - 0.5) *10;
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

  return (
    <div className='face-wrapper'>
      <FaceSvg ref={svgRef} className='face-svg' />
      {/* ref={svgRef} : DOM 요소에 접근하기, id값 주듯이 주는것 */}
    </div>
  );
}

export default FaceIllustration;