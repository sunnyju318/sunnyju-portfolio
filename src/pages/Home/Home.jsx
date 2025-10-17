import "./Home.scss";
import { Link } from "react-router-dom";

import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import FaceIllustration from "../../components/home/FaceIllustration.jsx";
import ProjectAccordion from "../../components/common/projectDisplay/ProjectAccordion.jsx";
import ProjectSplitView from "../../components/common/projectDisplay/ProjectSplitView.jsx";
import VancouverClock from "../../components/home/VancouverClock.jsx";
import Metadata from "../../components/global/Metadata.jsx";

function Home({ isMenuOpen, isContactOpen }) {
  return (
    <>
      <Metadata
        title="Home"
        description="Vancouver-based front-end developer blending code and UI/UX design to create thoughtful, engaging web experiences."
        path="/"
        ogImage="/assets/images/metadata/og_home.jpg"
      />

      <div className="home-wrapper">
        {/* =============== Hero Section =============== */}

        <div className="home-wrapper__hero">
          <h1>
            Sunny <span className="home-wrapper__hero-lastname">Ju</span>
          </h1>
          <h2>
            Developer X <br />
            Product Designer
          </h2>
          <p>Code X Design</p>
          <VancouverClock className="home-wrapper__hero-clock" />
        </div>

        <div className="home-wrapper__arrow home-wrapper__arrow--top-mobile">
          <AnimatedArrow direction="down" animated={true} />
        </div>

        {/* =============== Face Illustration =============== */}

        {/* 그리드 컬럼 시스템에서 가로 사이즈를 100% 이하로 주었더니 
        margin: 0 auto;나 플렉스로 가운데 정렬시 이미지 사이즈가 변하는 현상 발생,
        대안으로 내부 컨테이너를 추가하고 이미지 사이즈와 가운데정렬 코드를 분리함 */}
        <div className="home-wrapper__face">
          <div className="home-wrapper__face-container">
            <FaceIllustration
              isMenuOpen={isMenuOpen}
              isContactOpen={isContactOpen}
            />
          </div>
        </div>

        <div className="home-wrapper__arrow home-wrapper__arrow--top-desktop">
          <AnimatedArrow direction="left" animated={true} />
        </div>

        <div className="home-wrapper__arrow home-wrapper__arrow--bottom-mobile">
          <AnimatedArrow direction="down" animated={true} />
        </div>

        {/* =============== Navigation Links =============== */}

        <div className="home-wrapper__sublinks">
          <div className="home-wrapper__sublinks-item">
            <Link className="home-wrapper__sublinks-link" to="/about">
              More about me
            </Link>
            <AnimatedArrow
              className="home-wrapper__sublinks-arrow"
              direction="right"
            />
          </div>
          <div className="home-wrapper__sublinks-item">
            <Link className="home-wrapper__sublinks-link" to="/projects">
              See all projects
            </Link>
            <AnimatedArrow
              className="home-wrapper__sublinks-arrow"
              direction="right"
            />
          </div>
        </div>

        <div className="home-wrapper__arrow home-wrapper__arrow--bottom-desktop">
          <AnimatedArrow direction="down" animated={true} />
        </div>

        {/* =============== Project Preview =============== */}

        <div className="home-wrapper__projects home-wrapper__projects--mobile">
          <ProjectAccordion />
        </div>

        <div className="home-wrapper__projects home-wrapper__projects--desktop">
          <ProjectSplitView />
        </div>
      </div>
    </>
  );
}

export default Home;
