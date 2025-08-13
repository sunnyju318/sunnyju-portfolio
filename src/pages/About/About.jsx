import './About.scss';
import profileMobile from '../../assets/images/profile-mobile.jpg';
import profileDesktop from '../../assets/images/profile-desktop.jpg';
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import newYorkImg from '../../assets/images/about/new-york.jpg';
import brisbaneImg from '../../assets/images/about/brisbane.jpeg';
import sydneyImg from '../../assets/images/about/sydney.jpg';
import koreaImg from '../../assets/images/about/korea.jpg';
import vancouverImg from '../../assets/images/about/vancouver.jpg';
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiSass, SiFigma, SiAdobeillustrator,
  SiAdobephotoshop
} from "react-icons/si";
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


function About() {
  const [hoveredGlobalImg, setHoveredGlobalImg] = useState(null);

  const globalImg = useMemo(() => [
    {
      id: 'new-york',
      description: 'Spent three months wandering through Manhattan — from sunsets at Battery Park, to crossing the Brooklyn Bridge at dusk, and walking back beneath the glowing city skyline. It was here I vowed to one day work.'
    },
    {
      id: 'brisbane',
      description: 'Spent five years in the city where my handmade brand, BirdyJ, began — running stalls at local markets and even driving a forklift. During the pandemic shutdown, I saw the limitations of offline markets, which sparked my journey into building online platforms and, eventually, development.'
    },
    {
      id: 'sydney',
      description: 'A city where I really let go and played for the first time — wandering with my soul friend, strolling the beach, and rooting for each other as we walked into our future together. A shiny memory.'
    },
    {
      id: 'korea',
      description: 'I grew up in a small rural town in Korea, with a mother who never once said no to my dreams. Her unwavering belief in me gave me the confidence and adaptability I carry wherever I go.'
    },
    {
      id: 'vancouver',
      description: 'So, here I am.'
    },
  ], []);

  // 그룹별로 호버이벤트 등록
  useEffect(() => {
    const cleanupFunctions = [];

    globalImg.forEach(city => {
      let elementId = city.id;
      const element = document.querySelector(`#${elementId}`);
      if (!element) return; // Guard clause.

      const handleMouseEnter = () => {
        setHoveredGlobalImg(city); // 마우스를 올린 group의 정보를 저장, 초기값은 null 이었음
      };

      const handleMouseLeave = () => {
        setHoveredGlobalImg(null);
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
  }, [globalImg]);

  return (
    <div className='about-wrapper'>
      {/* desktop 버전 */}
      <div className='hero-desktop-content'>
        <h1 className='hero-desktop-heading'>
          <span>Hi,</span>
          <span>I'm</span>
          <span className='highlight'>Sunny {":)"}</span>
        </h1>
      </div>

      <div className='hero-wrapper'>
        {/* <picture/> : 여러 해상도/ 조건에 따라 이미지를 다르게 보여주는 HTML 태그,
        <source>와 <img> 태그를 묶어주는 wrapper */}
        <picture className='hero-picture'>
          <source
            media='(min-width: 768px)'
            // 뷰포트 너비가 768px 이상이면 이 이미지 사용
            srcSet={profileDesktop}
          //  조건만족시 desktop 이미지를 로딩
          />
          {/* 위 media 조건을 만족하지 못할경우 사용되는 기본이미지 */}
          <img
            src={profileMobile}
            alt="Profile Image"
            className='hero-mobile-image' />
        </picture>
        {/* <source>는 여러개 사용할수 있으며 css media query 기반의 if-else-if 조건문처럼 작동한다.
          브라우저는 <source> 안의 조건들을 평가만 하지 렌더링하지는 않는다.
          그래서 실제 DOM에 들어가는건 <img> 하나뿐이라 퍼포먼스도 좋고 접근성도 좋다. */}

        {/* mobile 버전 */}
        <div className='hero-mobile-content'>
          <p className='hero-mobile-heading'>
            <span>Hi,</span>
            <span>I'm</span>
            <span className='highlight'>Sunny {":)"}</span>
          </p>
          <div className="hero-arrow-wrapper-top">
            <AnimatedArrow animated={true} />
          </div>
        </div>
      </div>

      <div className='section-title-about-me'>
        <h2>
          <span>I</span>
          <span className='highlight'>code.</span>
          <span>I</span>
          <span className='highlight'>design.</span>
        </h2>
      </div>

      <div className='stack-wrapper'>
        <SiHtml5 size={32} color="#d6653d" title="HTML5" />
        <SiCss3 size={32} color="#3b8dbd" title="CSS3" />
        <SiJavascript size={32} color="#d4c74e" title="JavaScript" />
        <SiReact size={32} color="#53b6c5" title="React" />
        <SiSass size={32} color="#b76387" title="SCSS" />
        <SiFigma size={32} color="#d95b40" title="Figma" />
        <SiAdobeillustrator size={32} color="#d2821b" title="Illustrator" />
        <SiAdobephotoshop size={32} color="#2a8dbd" title="Photoshop" />
      </div>

      <div className='section-body-about-me'>
        <div>
          <p>I'm a <span className='highlight'>front-end developer</span> with a passion for creating thoughtful, human-centered digital experiences.</p>
          <p>With a background in handmade jewelry and fashion, I focus on <span className='highlight'>usability, clarity, and beauty</span> in everything I create—it's not just about how it looks, but how it works.</p>
        </div>
        <div>
          <p>Having lived and worked in Korea, Australia, the U.S., and now Canada, I bring a <span className='highlight'>flexible and global perspective</span> to every project.</p>
          <p>When I'm not building things, I enjoy sipping cappuccino while watching dogs, giving head pats to friendly neighborhood cats, and indulging in pistachio ice cream.</p>
        </div>
      </div>

      <div className="hero-arrow-wrapper-bottom">
        <p className='journey-title'>See My Journey</p>
        <p className='tap-guide-mobile'> Tap the Photo</p>
        <AnimatedArrow animated={true} className='about-arrow-bottom' />
      </div>

      <div className='section-title new-york'>
        <h2>NEW YORK</h2>
      </div>

      <div className='section-image'>
        <img src={newYorkImg} id='new-york' alt="New York Image" loading="lazy" />
        {/* loading="lazy" : 이미지나 iframe을 필요할때만 로드하게 해주는 속성이다. 사용자가 화면을 아래로 스크롤해서 해당 이미지가 뷰포트에 가까워질때 브라우저가 그때 이미지를 로딩하는 방식이다. 페이지 속도를 향상시킬수 있다. */}
      </div>

      <div className='section-title brisbane'>
        <h2>BRISBANE</h2>
      </div>

      <div className='section-image'>
        <img src={brisbaneImg} id='brisbane' alt="Brisbane Image" loading="lazy" />
      </div>

      <div className='section-title sydney'>
        <h2>SYDNEY</h2>
      </div>

      <div className='section-image'>
        <img src={sydneyImg} id='sydney' alt="Sydney Image" loading="lazy" />
      </div>

      <div className='section-title korea'>
        <h2>KOREA</h2>
      </div>

      <div className='section-image'>
        <img src={koreaImg} id='korea' alt="Korea Image" loading="lazy" />
      </div>

      <div className='section-title vancouver'>
        <h2>VANCOUVER</h2>
      </div>

      <div className='section-image'>
        <img src={vancouverImg} id='vancouver' alt="Vancouver Image" loading="lazy" />
      </div>

      <div className='ending-quote'>
        <p>Still Surviving {":)"}</p>
      </div>
      {
        hoveredGlobalImg && (
          <div className="city-tooltip"
            style={{
              position: 'fixed',
              top: '50%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              pointerEvents: 'none',

              background: 'rgba(4, 4, 4, 0.7)',
              backdropFilter: 'blur(10px)',
              color: '#e1dad2',
              padding: '20px 30px',
              borderRadius: '16px',
              border: '1px solid rgba(225, 218, 210, 0.15)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)',
              maxWidth: '400px',
              lineHeight: '32px',
            }}>
            <h4 style={{
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#e1dad2'
            }}>
              {hoveredGlobalImg.id.replace('-', ' ')}
            </h4>
            <p style={{
              margin: 0,
              fontSize: '20px',
              lineHeight: '1.5',
              color: '#e1dad2'
            }}>
              {hoveredGlobalImg.description}
            </p>
          </div>
        )
      }
    </div>
  );
}

export default About;