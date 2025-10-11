import "./Projects.scss";
import ProjectSplitView from "../../components/common/projectDisplay/ProjectSplitView.jsx";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import ProjectAccodian from "../../components/common/projectDisplay/ProjectAccordion.jsx";
import Metadata from "../../components/global/Metadata.jsx";

function Projects() {
  return (
    <>
      <Metadata
        title="Project"
        description="Projects showcasing my development and design work."
        path="/projects"
        ogImage="/assets/images/metadata/og_project.jpg"
      />

      {/* 콘텐츠 */}
      <div className="projects-wrapper">
        <div className="projects-wrapper__title">
          <AnimatedArrow direction="right" animated={true} />
          <h1>
            ALL{" "}
            <span className="projects-wrapper__title-highlight">PROJECTS</span>
          </h1>
        </div>
        <div className="projects-wrapper__list projects-wrapper__list--desktop">
          <ProjectSplitView title="PROJECTS" isFeatured={false} />
        </div>
        <div className="projects-wrapper__list projects-wrapper__list--mobile">
          <ProjectAccodian title="PROJECTS" isFeatured={false} />
        </div>
      </div>
    </>
  );
}

export default Projects;
