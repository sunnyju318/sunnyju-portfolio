import "./ProjectAccordion.scss";
import { useState } from "react";
import { worksData } from "../../../data/worksData";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow.jsx";
import { Link } from "react-router-dom";

function ProjectAccordion({ title = "FEATURED PROJECTS", isFeatured = true }) {
  const [expandedItem, setExpandedItem] = useState(0);
  // 초기값이 null인 이유는 클릭되었냐 안되었냐라는 단순 구분이 아니라 여러개의 아이템중 어떤 아이템이 열렸는지를 구체적으로 확인하기 위해서다. 현재는 null이므로 아무것도 열리지 않은 상태이다. false의 상태와 같은것.

  const handleToggle = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };
  // 지금 클릭한 아이템(expandedItem)이 현재 열려있는 아이템(index)와 같다면 null(아무것도 없는상태 즉, 다시 닫아라)을 반환하고 그게 아니라면(다른 index를 클릭했다면) 그거만 열리게 해라.

  // isFeatured가 true인 프로젝트만 가져오기
  // const featuredProjects = worksData.filter(project => project.isFeatured);

  const featuredProjects = isFeatured
    ? worksData.filter((project) => project.isFeatured)
    : worksData;

  return (
    <div className="featured-project-list-wrapper">
      <div className="list-heading">
        <h3>{title}</h3>
        {/* 직접 텍스트를 넣은 Featured Projects로 하드코딩 되어있어서 프롭스를 넘겨줘도 제목이 변하지 않았다. 하드코딩을 props로 받은 title를 사용하도록 수정하였다. */}
      </div>

      {featuredProjects.map((project, index) => (
        <div
          key={project.id}
          className={`list-box ${expandedItem === index ? "list-item" : ""}`}
          onClick={() => handleToggle(index)}
        >
          <AnimatePresence>
            <motion.span
              className="featured-project-title"
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
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {expandedItem !== index ? (
              <motion.span key="category">{project.category}</motion.span>
            ) : (
              <motion.span
                key="view-full-project"
                className="view-full-project"
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: [1, 1, 1],
                  x: [0, -10, 0],
                }}
                exit={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={`/projects/detail/${project.id}`}>View Project</Link>
                <AnimatedArrow className="featured-arrow" direction="right" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* 조건부 렌더링은 div가 생성, 삭제되기 때문에 nth-child가 예상대로 작동하지 않을수 있다. 클래스명으로 직접 타겟팅하는게 나은 선택이다. */}
          {expandedItem === index && (
            <motion.div
              className="project-preview"
              initial={{ height: 0, opacity: 0 }}
              // 시작할때: 높이 0, 투명
              animate={{ height: "auto", opacity: 1 }}
              // 애니메이션 중일때: 자동 높이, 불투명
              exit={{ height: 0, opacity: 0 }}
              // 컴포넌트가 사라질 시점: 높이 0, 투명
              transition={{
                duration: 0.3,
                // 0.3초 동안
                ease: "easeOut",
                // 부드러운 easing
              }}
            >
              <div className="list-img-wrapper">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} Preview thumbnail of the project`}
                  loading="lazy"
                  // 브라우저가 해당 이미지를 보일때까지 기다렸다가 로드함, 초기 로딩속도가 빨라지고 트래픽도 줄일수 있음
                />
                {/* 이미지에 반드시 alt 포함할것 */}
              </div>
              <div className="list-text-wrapper">
                <p>{project.tech}</p>
                <p>{project.shortDescription}</p>
              </div>
            </motion.div>
          )}
          {/* && : 앞이 참이면 뒤를 실행한다. 즉, 선택한 아이템이 index 0이 맞다면 아래 내용을 실행한다.(추가한다) */}
        </div>
      ))}
    </div>
  );
}

export default ProjectAccordion;
