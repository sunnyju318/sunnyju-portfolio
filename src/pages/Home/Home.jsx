import "./Home.scss";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import FaceIllustration from "../../components/home/FaceIllustration.jsx";
import { Link } from "react-router-dom";
import ProjectAccordion from "../../components/common/projectDisplay/ProjectAccordion.jsx";
import ProjectSplitView from "../../components/common/projectDisplay/ProjectSplitView.jsx";

function Home({ isMenuOpen, isContactOpen }) {
  return (
    <>
      {/* React 19 네이티브 메타데이터 */}
      <title>Sunny Ju</title>
      <meta
        name="description"
        content="Vancouver-based front-end developer blending code x design. Explore featured work, thoughtful UI, and delightful interactions."
      />
      <link rel="canonical" href="https://jisun-ju.ca/" />

      {/* Open Graph (카톡/LinkedIn/페북 등) */}
      <meta
        property="og:title"
        content="Sunny Ju — Front-end Developer | Portfolio"
      />
      <meta
        property="og:description"
        content="Explore featured work, thoughtful UI, and delightful interactions."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jisun-ju.ca/" />
      <meta
        property="og:image"
        content="https://jisun-ju.ca/assets/images/og-image.jpg"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Sunny Ju — Front-end Developer | Portfolio"
      />
      <meta
        name="twitter:description"
        content="Explore featured work, thoughtful UI, and delightful interactions."
      />
      <meta
        name="twitter:image"
        content="https://jisun-ju.ca/assets/images/og-image.jpg"
      />

      {/* 콘텐츠 */}
      <div className="home-wrapper">
        <div className="hero-text">
          <h1>
            Sunny <span className="last-name">Ju</span>
          </h1>
          <h2>
            Developer X <br />
            Product Designer
          </h2>
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
            <FaceIllustration
              isMenuOpen={isMenuOpen}
              isContactOpen={isContactOpen}
            />
          </div>
        </div>

        <div className="arrow-wrapper-top-desktop-only">
          <AnimatedArrow direction="left" animated={true} />
        </div>

        <div className="arrow-wrapper-bottom-mobile-only">
          <AnimatedArrow direction="down" animated={true} />
        </div>

        <div className="sub-link-container">
          <div className="sub-link-wrapper">
            <Link className="sub-link" to="/about">
              More about me
            </Link>
            <AnimatedArrow className="arrow-sub-link" direction="right" />
          </div>
          <div className="sub-link-wrapper">
            <Link className="sub-link" to="/projects">
              See all projects
            </Link>
            <AnimatedArrow className="arrow-sub-link" direction="right" />
          </div>
        </div>

        <div className="arrow-wrapper-bottom-desktop-only">
          <AnimatedArrow direction="down" animated={true} />
        </div>

        <div className="project-list-wrapper-mobile-only">
          <ProjectAccordion />
        </div>

        <div className="project-list-wrapper-desktopn-only">
          <ProjectSplitView />
        </div>
      </div>
    </>
  );
}

export default Home;
