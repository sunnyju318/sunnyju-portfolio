
import './Projects.scss';
import ProjectSplitView from '../../components/common/projectDisplay/ProjectSplitView.jsx';
import AnimatedArrow from '../../components/common/AnimatedArrow/AnimatedArrow.jsx';
import ProjectAccodian from '../../components/common/projectDisplay/ProjectAccordion.jsx';

function Projects() {
  return (
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
  )
}

export default Projects;