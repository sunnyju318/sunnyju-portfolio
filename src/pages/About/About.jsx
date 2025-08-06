import './About.scss';
import profileMobile from '../../assets/images/profile-mobile.jpg';
import profileDesktop from '../../assets/images/profile-desktop.jpg';
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import newYorkImg from '../../assets/images/new-york.jpeg';
import brisbaneImg from '../../assets/images/brisbane.jpeg';
import sydneyImg from '../../assets/images/sydney.jpg';
import koreaImg from '../../assets/images/korea.jpeg';
import vancouverImg from '../../assets/images/vancouver.jpeg';


function About() {
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
            <AnimatedArrow />
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

      <div className='section-body-about-me'>
        <p>I'm a <span className='highlight'>front-end developer </span> who enjoys creating digital experiences that feel thoughtful and meaningful to the people who use them.</p>
        <p>With a background in fashion design and experience running a handmade jewelry brand, I learned how to plan creatively and work with intention. Now, I bring that mindset into front-end development—focusing on results that <span className='highlight'>balance usability, visual clarity, and beauty.</span></p>
        <p>I believe great collaboration starts with listening. I value steady, long-term growth over quick wins and stay curious through self-learning, exploration, and continuous improvement.</p>
        <p>Having lived and worked in Korea, Australia, the U.S., and now Canada, I bring a global perspective and <span className='highlight'>flexible mindset</span> to everything I create. </p>
        <p>My goal is to connect people and ideas through thoughtful design and code.</p>
      </div>

      <div className="hero-arrow-wrapper-bottom">
        <AnimatedArrow />
        <AnimatedArrow />
        <AnimatedArrow />
      </div>

      <div className='section-title new-york'>
        <h2>NEW YORK</h2>
      </div>

      <div className='section-image'>
        <img src={newYorkImg} alt="New York Image" loading="lazy" />
        {/* loading="lazy" : 이미지나 iframe을 필요할때만 로드하게 해주는 속성이다. 사용자가 화면을 아래로 스크롤해서 해당 이미지가 뷰포트에 가까워질때 브라우저가 그때 이미지를 로딩하는 방식이다. 페이지 속도를 향상시킬수 있다. */}
      </div>

      <div className='section-title brisbane'>
        <h2>BRISBANE</h2>
      </div>

      <div className='section-image'>
        <img src={brisbaneImg} alt="Brisbane Image" loading="lazy" />
      </div>

      <div className='section-title sydney'>
        <h2>SYDNEY</h2>
      </div>

      <div className='section-image'>
        <img src={sydneyImg} alt="Sydney Image" loading="lazy" />
      </div>

      <div className='section-title korea'>
        <h2>KOREA</h2>
      </div>

      <div className='section-image'>
        <img src={koreaImg} alt="Korea Image" loading="lazy" />
      </div>

      <div className='section-title vancouver'>
        <h2>VANCOUVER</h2>
      </div>

      <div className='section-image'>
        <img src={vancouverImg} alt="Vancouver Image" loading="lazy" />
      </div>

      <div className='ending-quote'>
        <p>Still Surviving {":)"}</p>
      </div>

    </div>
  )
}

export default About;