
import './Projects.scss';
import ProjectSplitView from '../../components/common/projectDisplay/ProjectSplitView.jsx';
import AnimatedArrow from '../../components/common/AnimatedArrow/AnimatedArrow.jsx';
import ProjectAccodian from '../../components/common/projectDisplay/ProjectAccordion.jsx';

function Projects() {
  return (
    <>
      {/* React 19 네이티브 메타데이터 */}
      <title>Sunny Ju | Projects</title>
      <meta
        name="description"
        content="Explore Sunny Ju's featured projects, showcasing thoughtful UI, animation, and creative code implementations."
      />
      <link rel="canonical" href="https://jisun-ju.ca/projects" />

      {/* Open Graph */}
      <meta property="og:title" content="Projects — Sunny Ju" />
      <meta property="og:description" content="Explore Sunny Ju's featured projects, showcasing thoughtful UI, animation, and creative code implementations." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jisun-ju.ca/projects" />
      <meta property="og:image" content="https://jisun-ju.ca/assets/images/projects-og.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects — Sunny Ju" />
      <meta name="twitter:description" content="Explore Sunny Ju's featured projects, showcasing thoughtful UI, animation, and creative code implementations." />
      <meta name="twitter:image" content="https://jisun-ju.ca/assets/images/projects-og.jpg" />


      {/* 콘텐츠 */}
      <div className="projects-wrapper">
        <div className='projects-title'>
          <AnimatedArrow direction='right' animated={true} />
          <h1>MY <span className='projects-title-highlight'>PROJECTS</span></h1>
        </div>
        <div className='my-projects-desktop-only'>
          <ProjectSplitView
            title='PROJECTS'
            isFeatured={false}
          />
        </div>
        <div className='my-projects-mobile-only'>
          <ProjectAccodian
            title='PROJECTS'
            isFeatured={false}
          />
        </div>
      </div>
    </>
  )
}

export default Projects;