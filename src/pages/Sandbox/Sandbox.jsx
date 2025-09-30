import "./Sandbox.scss";
import { sandboxData } from "../../data/sandboxData";
import SandboxCard from "../../components/sandbox/SandboxCard.jsx";
import Masonry from "react-masonry-css";
import SandboxModal from "../../components/sandbox/SandboxModal.jsx";
import { useState } from "react";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiSass,
  SiFigma,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobeaftereffects,
} from "react-icons/si";

function Sandbox() {
  const breakpointColumns = {
    default: 4,
    1400: 3, // xxl
    1280: 3, // xl
    1025: 3, // lg
    768: 2, // md
    640: 2, // sm
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleCardClick = (cardData) => {
    setModalData(cardData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const getIcon = (tech) => {
    switch (tech) {
      case "HTML":
        return <SiHtml5 size={25} color="#d6653d" title="HTML5" />;
      case "CSS":
        return <SiCss3 size={25} color="#3b8dbd" title="CSS3" />;
      case "JavaScript":
        return <SiJavascript size={25} color="#d4c74e" title="JavaScript" />;
      case "React":
        return <SiReact size={25} color="#53b6c5" title="React" />;
      case "SCSS":
        return <SiSass size={25} color="#b76387" title="SCSS" />;
      case "Figma":
        return <SiFigma size={25} color="#d95b40" title="Figma" />;
      case "Illustrator":
        return (
          <SiAdobeillustrator size={25} color="#d2821b" title="Illustrator" />
        );
      case "Photoshop":
        return <SiAdobephotoshop size={25} color="#2a8dbd" title="Photoshop" />;
      case "AfterEffects":
        return (
          <SiAdobeaftereffects size={25} color="#9999FF" title="AfterEffects" />
        );
      case "SVG":
        return <span className="tech-text">SVG</span>;
      default:
        return <span className="tech-text">{tech}</span>;
    }
  };

  return (
    <>
      {/* React 19 Native Metadata */}
      <title>Sunny Ju | Sandbox</title>
      <meta
        name="description"
        content="A playground of UI experiments, micro-interactions, and performance tests by Sunny Ju."
      />
      <link rel="canonical" href="https://jisun-ju.ca/sandbox" />

      {/* Open Graph */}
      <meta property="og:title" content="Sandbox — Sunny Ju" />
      <meta
        property="og:description"
        content="A playground of UI experiments, micro-interactions, and performance tests by Sunny Ju."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jisun-ju.ca/sandbox" />
      <meta
        property="og:image"
        content="https://jisun-ju.ca/assets/images/sandbox-og.jpg"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sandbox — Sunny Ju" />
      <meta
        name="twitter:description"
        content="A playground of UI experiments, micro-interactions, and performance tests by Sunny Ju."
      />
      <meta
        name="twitter:image"
        content="https://jisun-ju.ca/assets/images/sandbox-og.jpg"
      />

      {/* 콘텐츠 */}
      <div className="sandbox-wrapper">
        <div className="projects-title">
          <AnimatedArrow direction="right" animated={true} />
          <h1>
            SAND <span className="projects-title-highlight">BOX</span>
          </h1>
        </div>
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {sandboxData.map((item) => (
            <SandboxCard
              key={item.id}
              title={item.title}
              image={item.thumbnail}
              stack={item.stack}
              getIcon={getIcon}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </Masonry>
        <SandboxModal
          isOpen={isModalOpen}
          data={modalData}
          onClose={handleCloseModal}
          getIcon={getIcon}
        />
      </div>
    </>
  );
}

export default Sandbox;
