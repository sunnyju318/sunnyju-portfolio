import './About.scss';
import profileMobile from '../../assets/images/profile-mobile.jpg';
import AnimatedArrow from "../../components/common/animatedArrow/AnimatedArrow";
import newYorkImg from '../../assets/images/new-york.jpeg';
import brisbaneImg from '../../assets/images/brisbane.jpeg';
import sydneyImg from '../../assets/images/sydney.jpg';
import koreaImg from '../../assets/images/korea.jpeg';
import vancouverImg from '../../assets/images/vancouver.jpeg';


function About() {
  return (
    <div className='about-wrapper'>

      <div className='hero-mobile-wrapper'>
        <img
          src={profileMobile}
          alt="Profile Image"
          className='mobile-hero-image' />
        <div className='hero-mobile-content'>
          <h1 className='hero-mobile-heading'>
            <span>Hi,</span>
            <span>I'm</span>
            <span className='hero-name'>Sunny {":)"}</span>
          </h1>
          <div className="hero-arrow-wrapper-top">
            <AnimatedArrow />
          </div>
        </div>
      </div>

      <div className='section-title-about-me'>
        <h2>
          <span>I</span>
          <span>code.</span>
          <span>I</span>
          <span>design.</span>
        </h2>
      </div>

      <div className='section-body-about-me'>
        <p>I'm a <span>front-end developer </span> who enjoys creating digital experiences that feel thoughtful and meaningful to the people who use them.</p>
        <p>With a background in fashion design and experience running a handmade jewelry brand, I learned how to plan creatively and work with intention. Now, I bring that mindset into front-end development—focusing on results that <span>balance usability, visual clarity, and beauty.</span></p>
        <p>I believe great collaboration starts with listening. I value steady, long-term growth over quick wins and stay curious through self-learning, exploration, and continuous improvement.</p>
        <p>Having lived and worked in Korea, Australia, the U.S., and now Canada, I bring a global perspective and <span>flexible mindset</span> to everything I create. </p>
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