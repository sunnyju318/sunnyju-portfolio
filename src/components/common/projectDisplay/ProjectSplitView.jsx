import './ProjectSplitView.scss';
import { useState } from 'react';
import { worksData } from '../../../data/worksData';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedArrow from '../animatedArrow/AnimatedArrow';
import { Link } from 'react-router-dom';

// Projects 페이지에서 제목변경을 위해 title를 props로 가져감
function ProjectSplitView({
  title = "FEATURED PROJECTS",
  isFeatured = true
}) {
  const [expandedItem, setExpandedItem] = useState(null);

  const featuredProjects = isFeatured ?
  worksData.filter(project => project.isFeatured) : worksData;

  return (

    <div className='project-split-view-wrapper'>
      <div className='preview-box-desktop'>
        {expandedItem !== null && (
          <img
            className='preview-img-desktop'
            src={featuredProjects[expandedItem]?.thumbnail}
            alt={featuredProjects[expandedItem]?.title}
          // ?. : 자바스크립트 문법중 하나로 이 값이 존재하면 그 다음 속성을 읽고, 없으면 에러없이 undefined를 반환하라는 의미
          />
        )}
      </div>

      <div className="featured-project-list-wrapper-desktop">
        <div className='list-heading-desktop'>
          <h3>{title}</h3>
        </div>

        {featuredProjects.map((project, index) => (
          <Link
            to={`/projects/detail/${project.id}`}
            key={project.id}
            className="list-box-desktop"
            onMouseEnter={() => setExpandedItem(index)}
            onMouseLeave={() => setExpandedItem(null)}
          >
            <motion.span
              className='featured-project-title-desktop'
              animate={expandedItem === index ?
                {
                  opacity: [1, 1, 1],
                  x: [0, 10, 0]
                } : {}}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.span>

            <AnimatePresence mode='wait' >
              {expandedItem !== index ? (
                <motion.span
                  key="category"
                >
                  {project.category}
                </motion.span>)
                : (
                  <motion.span
                    key="view-full-project"
                    className='view-full-project-desktop'
                    initial={{ opacity: 0, x: 0 }}
                    animate={{
                      opacity: [1, 1, 1],
                      x: [0, -10, 0]
                    }}
                    exit={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatedArrow
                      className='featured-arrow-desktop'
                      direction='right' />
                    View Full Project
                  </motion.span>
                )}
            </AnimatePresence>

          </Link >
        ))
        }
      </div >
    </div>
  )
};

export default ProjectSplitView;