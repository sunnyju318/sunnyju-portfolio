import "./Home.scss";
import AnimatedArrow from "../../components/common/animatedArrow/AnimatedArrow";
import FaceIllustration from "../../components/home/FaceIllustration";
import { Link } from "react-router-dom";
import ProjectAccordion from "../../components/common/projectDisplay/ProjectAccordion";


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
        <AnimatedArrow direction="down" animated={true} />
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
        <AnimatedArrow direction="left" animated={true} />
      </div>

      <div className="arrow-wrapper-bottom">
        <AnimatedArrow direction="down" animated={true} />
      </div>

      <div className="sub-link-wrapper">
        <Link className="sub-link" to="/work">         <AnimatedArrow className="arrow-sub-link" direction="right" />
          See my projects
        </Link>
        <Link className="sub-link" to="/about">
          <AnimatedArrow className="arrow-sub-link" direction="right" />
          More about me
        </Link>
      </div>

      <div className="project-list-wrapper">
        <ProjectAccordion />
      </div>

    </div>
  )
}

export default Home;
