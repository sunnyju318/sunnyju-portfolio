
import './Projects.scss';
import ProjectSplitView from '../../components/common/projectDisplay/ProjectSplitView';
import AnimatedArrow from '../../components/common/animatedArrow/AnimatedArrow';
import ProjectAccodian from '../../components/common/projectDisplay/ProjectAccordion';

function Projects() {
  return (
    <div className="projects-wrapper">
      <div className='projects-title'>
        <AnimatedArrow direction='right'animated={true}/>
        <h1>MY PROJECTS</h1>
      </div>
      <div className='my-projects-desktop-only'>
        <ProjectSplitView 
        title='PROJECTS' 
        isFeatured= {false}
        />
      </div>
      <div className='my-projects-mobile-only'>
        <ProjectAccodian
        />
      </div>
    </div>
  )
}

export default Projects;