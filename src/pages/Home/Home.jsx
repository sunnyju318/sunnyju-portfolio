import "./Home.scss";
import AnimatedArrow from "../../components/common/animatedArrow/AnimatedArrow";
import FaceIllustration from "../../components/home/FaceIllustration";
import introVideo from '../../assets/video/intro-bumper.mp4';
import Carousel from "../../components/common/carousel/Carousel";

function Home() {
  return (
    // React Fragment ( <.> </>) : DOM에 실제 요소를 추가하지 않고 여러 요소를 그룹핑할수 있게 해주는 React의 기능이다.
    // 깨끗한 DOM : 불필요한 wrapper 요소 없음
    // CSS/Grid 구조유지 : 부모의 레이아웃이 방해받지 않음
    // 성능 : 더 적은 DOM 노드로 더 빠름
    <div className="home-wrapper">
      <div className="hero-text">
        <h1>Sunny <span className="last-name">Ju</span></h1>
        <h2>Front-end Developer</h2>
        <p>Code X Design</p>
      </div>

      <div className="arrow-wrapper-top-mobile-only">
        <AnimatedArrow />
      </div>

      {/* 그리드 컬럼 시스템에서 가로 사이즈를 100% 이하로 주었더니 
      margin: 0 auto;나 플렉스로 가운데 정렬시 이미지 사이즈가 변하는 현상 발생,
      대안으로 내부 컨테이너를 추가하고 이미지 사이즈와 가운데정렬 코드를 분리함 */}
      <div className="faceillustration-wrapper">
        <div className="faceillustration-container">
          <FaceIllustration />
        </div>
      </div>

      <div className="arrow-wrapper-top-desktop-only">
        <AnimatedArrow />
      </div>

      <div className="arrow-wrapper-bottom">
        <AnimatedArrow />
      </div>

      <div className="section-title-who">
        {/* span은 시멘틱 의미가 없는 인라인 요소라서 적절히 쓰면
        시멘틱 구조를 크게 해치지 않는다. */}
        <h2>
          <span>WHO</span>
          <span>IS</span>
          <span>SHE</span>
          <span>?</span>
        </h2>
      </div>

      <div className="section-video">
        <video
          src={introVideo}
          autoPlay
          muted
          playsInline
          loop
          className="intro-video"
        />
      </div>

      <div className="section-title-what">
        <h2>
          <span>WHAT</span>
          <span>DOES</span>
          <span>SHE</span>
          <span>DO</span>
          <span>?</span>
        </h2>
        <p>
          <span>I code.</span>
          <span>I design.</span>
        </p>
      </div>

      <div className="recent-work-title">
        <h3>
          <span>SEE MY</span>
          <span>RECENT WORK</span>
        </h3>
      </div>

      <div className="arrow-wrapper-last">
        <AnimatedArrow />
      </div>

      <div className="placeholder">
          {/* <Carousel direction="horizontal"/> */}
      </div>

    </div>
  )
}

export default Home;
