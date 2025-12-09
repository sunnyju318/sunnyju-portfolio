// components/Projects/ProjectTimeline/ProjectTimeline.jsx

import "./ProjectTimeline.scss";

function ProjectTimeline({ steps }) {
  if (!steps || steps.length === 0) return null;

  // completed: true인 마지막 step의 index 찾기
  const lastCompletedIndex = steps.reduce((lastIndex, step, index) => {
    return step.completed ? index : lastIndex;
  }, -1);

  return (
    <div className="project-timeline">
      {steps.map((step, index) => {
        const isLastCompleted = index === lastCompletedIndex;

        return (
          <div
            key={index}
            className={`project-timeline__step ${
              step.completed ? "completed" : ""
            } ${isLastCompleted ? "in-progress" : ""}`}
          >
            <span className="project-timeline__phase">{step.phase}</span>

            <div className="project-timeline__dot"></div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectTimeline;
