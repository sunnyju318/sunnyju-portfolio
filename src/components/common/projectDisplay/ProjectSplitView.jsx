import "./ProjectSplitView.scss";
import { useState } from "react";
import { worksData } from "../../../data/worksData.jsx";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow.jsx";
import { Link } from "react-router-dom";

// Projects 페이지에서 제목변경을 위해 title를 props로 가져감
function ProjectSplitView({ title = "FEATURED PROJECTS", isFeatured = true }) {
  const [expandedItem, setExpandedItem] = useState(0);

  const featuredProjects = isFeatured
    ? worksData.filter((project) => project.isFeatured)
    : worksData;

  return (
    <div className="project-split-view">
      <div className="project-split-view__preview">
        {expandedItem !== null && (
          <img
            className="project-split-view__preview-img"
            src={featuredProjects[expandedItem]?.thumbnail}
            alt={`${featuredProjects[expandedItem]?.title} Desktop preview thumbnail of the project`}
            // ?. : 자바스크립트 문법중 하나로 이 값이 존재하면 그 다음 속성을 읽고, 없으면 에러없이 undefined를 반환하라는 의미
            width="800"
            height="600"
            decoding="async"
          />
        )}
      </div>

      <div className="project-split-view__list">
        <div className="project-split-view__list-heading-wrapper">
          <h2 className="project-split-view__list-heading">{title}</h2>
        </div>

        {featuredProjects.map((project, index) => (
          <Link
            to={`/projects/detail/${project.id}`}
            key={project.id}
            className="project-split-view__list-item"
            onMouseEnter={() => setExpandedItem(index)}
            onMouseLeave={() => setExpandedItem(null)}
          >
            <motion.span
              className="project-split-view__project-title"
              animate={
                expandedItem === index
                  ? {
                      opacity: [1, 1, 1],
                      x: [0, 10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.span>

            <AnimatePresence mode="wait">
              {expandedItem !== index ? (
                <motion.span key="category">{project.category}</motion.span>
              ) : (
                <motion.span
                  key="view-full-project"
                  className="project-split-view__view-link"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: [1, 1, 1],
                    x: [0, -10, 0],
                  }}
                  exit={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  View Full Project
                  <AnimatedArrow
                    className="project-split-view__arrow"
                    direction="right"
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectSplitView;
