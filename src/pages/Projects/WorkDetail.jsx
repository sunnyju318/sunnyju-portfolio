import "./WorkDetail.scss";
import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { worksData } from "../../data/worksData";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import CodeBlock from "../../components/common/codeBlock/CodeBlock.jsx";
import Metadata from "../../components/global/Metadata.jsx";
import ProjectTimeline from "../../components/projects/ProjectTimeline.jsx";

function WorkDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 받아오기
  const currentId = parseInt(id);

  // console.log(work);
  // parseInt(id) : id가 "1" 일때 숫자 1로 바꿔줌
  // 즉, 정수를 숫자로 바꿔줌, useParms는 문자열반 반환하기때문에 필요한 과정임

  // 현재 프로젝트 찾기
  const currentIndex = worksData.findIndex((w) => w.id === currentId);
  const work = worksData[currentIndex];

  // 자동 이전/다음 프로젝트 계산
  const prevProject = worksData[currentIndex - 1];
  const nextProject = worksData[currentIndex + 1];

  const designSystemRef = useRef(null);
  const browseVisitRef = useRef(null);
  const searchSaveRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Guard clause — 존재하지 않을 때
  if (!work) {
    return (
      <div>
        <h1>Can't find.</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  // 개발 또는 디자인 카테고리 구분하기
  // ?: 옵널 체이닝,
  const isDesignProject = work?.category === "UXUI Design";

  // =============== Drag Scroll Event Handlers ===============

  const handleMouseDown = (ref) => (e) => {
    const slider = ref.current;
    if (!slider) return;
    slider.isDown = true;
    slider.classList.add("active");
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeave = (ref) => () => {
    const slider = ref.current;
    if (!slider) return;
    slider.isDown = false;
    slider.classList.remove("active");
  };

  const handleMouseUp = (ref) => () => {
    const slider = ref.current;
    if (!slider) return;
    slider.isDown = false;
    slider.classList.remove("active");
  };

  const handleMouseMove = (ref) => (e) => {
    const slider = ref.current;
    if (!slider || !slider.isDown) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 2;
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  // =============== SEO Metadata Preparation ===============

  const description =
    work.shortDescription ||
    work.sections?.overview ||
    (work.tech && `Built with ${work.tech}.`) ||
    `${work.title} case study by Sunny Ju.`;

  const ogImage = work.ogImage || work.thumbnail;

  return (
    <>
      <Metadata
        title={work.title}
        description={description}
        path={`/projects/detail/${work.id}`}
        ogImage={ogImage}
      />
      {/* 디자인 프로젝트가 존재할경우 "work-detail--uxui" 라는 클레스네임 붙이기 */}
      <div
        className={`work-detail ${isDesignProject ? "work-detail--uxui" : ""}`}
      >
        {/* =============== Top Navigation =============== */}
        <div className="work-detail__nav-top">
          {prevProject ? (
            <Link
              to={`/projects/detail/${prevProject.id}`}
              className="work-detail__nav-link"
            >
              <AnimatedArrow
                direction="left"
                className="work-detail__nav-arrow work-detail__nav-arrow--top"
              />
            </Link>
          ) : (
            <div className="work-detail__nav-link work-detail__nav-link--disabled">
              <AnimatedArrow
                direction="left"
                className="work-detail__nav-arrow work-detail__nav-arrow--top"
              />
            </div>
          )}

          <Link to="/projects" className="work-detail__projects-list">
            PROJECTS LIST
          </Link>

          {nextProject ? (
            <Link
              to={`/projects/detail/${nextProject.id}`}
              className="work-detail__nav-link"
            >
              <AnimatedArrow
                direction="right"
                className="work-detail__nav-arrow work-detail__nav-arrow--top"
              />
            </Link>
          ) : (
            <div className="work-detail__nav-link work-detail__nav-link--disabled">
              <AnimatedArrow
                direction="right"
                className="work-detail__nav-arrow work-detail__nav-arrow--top"
              />
            </div>
          )}
        </div>

        {/* =============== Header =============== */}

        <h1 className="work-detail__title">{work.title}</h1>
        <h2 className="work-detail__sub-title">{work.category}</h2>

        {/* =============== Project Links =============== */}

        <div className="work-detail__links">
          {/* Design Project : Prototype */}
          {isDesignProject && work.links.prototype && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.prototype}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                Prototype
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}

          {/* Design Project : Case Study */}
          {isDesignProject && work.links.caseStudy && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                Case Study
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}

          {/* Development Project : Live Demo */}
          {!isDesignProject && work.links.liveDemo && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                Live Demo
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}

          {/* Development Project : GitHub */}
          {!isDesignProject && work.links.github && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                GitHub
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}

          {/* 개발: Tech Docs */}
          {!isDesignProject && work.links.techDocs && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.techDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                Tech Docs
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}

          {/* Common : Product Brief */}
          {work.links.productBrief && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.productBrief}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                Product Brief
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}

          {/* Common : Project Log */}
          {work.links.projectLog && (
            <div className="work-detail__links-wrapper">
              <a
                href={work.links.projectLog}
                target="_blank"
                rel="noopener noreferrer"
                className="work-detail__link"
              >
                Project Log
              </a>
              <AnimatedArrow
                direction="right"
                className="work-detail__link-arrow"
              />
            </div>
          )}
        </div>

        {/* =============== Preview =============== */}

        <div className="work-detail__preview">
          <a
            href={work.links.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {work.preview.type === "video" ? (
              <>
                {!videoLoaded && (
                  <div className="loading-overlay">
                    <div className="spinner" />
                  </div>
                )}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  // 비디오를 얼마나 미리 로드할지 결정하는 것으로
                  // none 아무것도 미리 안받음, metadata 길이나 크기 첫 프레임만 받음, auto 전체 다 받음으로 무거움
                  onLoadedData={() => {
                    console.log("Loading..");
                    setVideoLoaded(true);
                  }}
                  // 비디오 로드가 완료되면 재생
                >
                  <source src={work.preview.src} type="video/mp4" />
                </video>
              </>
            ) : (
              <img
                src={work.preview.src}
                alt={`${work.title} Preview`}
                fetchPriority="high"
                width="1200"
                height="800"
                decoding="async"
              />
            )}
          </a>
        </div>

        {/* =============== Code Snippets =============== */}

        <div className="work-detail__code">
          {work.codeSnippets && work.codeSnippets.length > 0 && (
            <CodeBlock codeSnippets={work.codeSnippets} />
          )}
        </div>

        {/* =============== Description Sections =============== */}

        <div className="work-detail__sections ">
          <h2 className="work-detail__section-heading">Project Overview</h2>
          {/* =============== Details =============== */}
          <section className="work-detail__section work-detail__section--meta">
            <h3 className="work-detail__subsection-heading">Details</h3>
            <div className="work-detail__meta-item">
              <span className="work-detail__meta-label">Role</span>
              <span className="work-detail__meta-value">
                {work.sections.meta.role}
              </span>
            </div>

            <div className="work-detail__meta-item">
              <span className="work-detail__meta-label">Platform</span>
              <span className="work-detail__meta-value">
                {work.sections.meta.platform}
              </span>
            </div>

            {isDesignProject && work.sections.meta.tools && (
              <div className="work-detail__meta-item work-detail__meta-item--tech">
                <span className="work-detail__meta-label">Tools</span>
                <ul className="work-detail__meta-value">
                  {work.sections.meta.tools.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {!isDesignProject && work.sections.meta.stack && (
              <div className="work-detail__meta-item work-detail__meta-item--tech">
                <span className="work-detail__meta-label">Stack</span>
                <ul className="work-detail__meta-value">
                  {work.sections.meta.stack.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="work-detail__meta-item work-detail__meta-item--timeline">
              <span className="work-detail__meta-label">Timeline</span>
              <span className="work-detail__meta-value">
                {work.sections.meta.timeline}
              </span>
            </div>
            {work.sections.meta.timelineSteps && (
              <ProjectTimeline steps={work.sections.meta.timelineSteps} />
            )}
          </section>
          {/* =============== Summary =============== */}
          <section className="work-detail__section work-detail__section--summary">
            <h3 className="work-detail__subsection-heading">Summary</h3>

            <div className="work-detail__summary-item">
              <span className="work-detail__meta-label">Project Type</span>
              <p className="work-detail__meta-value">
                {work.sections.summary.projectType}
              </p>
            </div>

            <div className="work-detail__summary-item">
              <span className="work-detail__meta-label">Approach</span>
              <p className="work-detail__meta-value">
                {work.sections.summary.approach}
              </p>
            </div>

            <div className="work-detail__summary-item">
              <span className="work-detail__meta-label">Key Focus</span>
              <p className="work-detail__meta-value">
                {work.sections.summary.keyFocus}
              </p>
            </div>
          </section>

          {/* =============== Background =============== */}
          {isDesignProject && (
            <section className="work-detail__section work-detail__section--background">
              <h3 className="work-detail__subsection-heading">Background</h3>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">Platform</span>
                <p className="work-detail__meta-value">
                  {work.sections.background.platform}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">Current Issue</span>
                <p className="work-detail__meta-value">
                  {work.sections.background.currentIssue}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">Motivation</span>
                <p className="work-detail__meta-value">
                  {work.sections.background.motivation}
                </p>
              </div>
            </section>
          )}

          {/* =============== Problem =============== */}
          {isDesignProject && (
            <section className="work-detail__section work-detail__section--problem">
              <h3 className="work-detail__subsection-heading">Problem</h3>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">
                  Creator Challenge
                </span>
                <p className="work-detail__meta-value">
                  {work.sections.problem.creatorChallenge}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">
                  Viewer Challenge
                </span>
                <p className="work-detail__meta-value">
                  {work.sections.problem.viewerChallenge}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">Impact</span>
                <p className="work-detail__meta-value">
                  {work.sections.problem.impact}
                </p>
              </div>
            </section>
          )}

          {/* =============== Goal =============== */}
          {isDesignProject && (
            <section className="work-detail__section work-detail__section--goal">
              <h3 className="work-detail__subsection-heading">Goal</h3>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">
                  Primary Objective
                </span>
                <p className="work-detail__meta-value">
                  {work.sections.goal.primaryObjective}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">User Experience</span>
                <p className="work-detail__meta-value">
                  {work.sections.goal.userExperience}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">
                  Design Principle
                </span>
                <p className="work-detail__meta-value">
                  {work.sections.goal.designPrinciple}
                </p>
              </div>
            </section>
          )}

          {/* =============== Solution =============== */}
          {isDesignProject && (
            <section className="work-detail__section work-detail__section--solution">
              <h3 className="work-detail__subsection-heading">Solution</h3>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">
                  Content Filtering
                </span>
                <p className="work-detail__meta-value">
                  {work.sections.solution.contentFiltering}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">Layout Design</span>
                <p className="work-detail__meta-value">
                  {work.sections.solution.layoutDesign}
                </p>
              </div>

              <div className="work-detail__summary-item">
                <span className="work-detail__meta-label">Interaction</span>
                <p className="work-detail__meta-value">
                  {work.sections.solution.interaction}
                </p>
              </div>
            </section>
          )}

          {/* =============== Tech Overview =============== */}
          {!isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">Tech Overview</h2>

              {/* Tech Stack */}
              <section className="work-detail__section work-detail__section--tech-stack">
                <h3 className="work-detail__subsection-heading">Tech Stack</h3>

                <div className="work-detail__tech-list">
                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">Frontend</span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.frontend}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">Styling</span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.styling}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">Animation</span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.animation}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">Components</span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.components}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">
                      Data Management
                    </span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.dataManagement}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">Utilities</span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.utilities}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">Deployment</span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.deployment}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">
                      Optimization
                    </span>
                    <p className="work-detail__meta-value">
                      {work.sections.techStack.optimization}
                    </p>
                  </div>
                </div>
              </section>

              {/* Architectural Choices */}
              <section className="work-detail__section work-detail__section--architectural">
                <h3 className="work-detail__subsection-heading">
                  Architectural Choices
                </h3>

                <div className="work-detail__tech-list">
                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">
                      Component Strategy
                    </span>
                    <p className="work-detail__meta-value">
                      {work.sections.architecturalChoices.componentStrategy}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">
                      Data Architecture
                    </span>
                    <p className="work-detail__meta-value">
                      {work.sections.architecturalChoices.dataArchitecture}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">
                      Styling Approach
                    </span>
                    <p className="work-detail__meta-value">
                      {work.sections.architecturalChoices.stylingApproach}
                    </p>
                  </div>

                  <div className="work-detail__tech-item">
                    <span className="work-detail__meta-label">
                      State Management
                    </span>
                    <p className="work-detail__meta-value">
                      {work.sections.architecturalChoices.stateManagement}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =============== User Flows =============== */}
          {isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">User Flows</h2>
              {work.sections.userFlows?.map((flow, index) => (
                <section
                  key={index}
                  className={`work-detail__section work-detail__section--userflow`}
                >
                  <h3 className="work-detail__subsection-heading">
                    {flow.label}
                  </h3>
                  <img
                    src={flow.image}
                    alt={`User Flow: ${flow.label}`}
                    loading="lazy"
                    fetchPriority="low"
                    width="1200"
                    height="800"
                    decoding="async"
                  />
                </section>
              ))}
            </>
          )}
          {/* =============== Critical Design Decisions =============== */}
          {isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">
                Critical Design Decisions
              </h2>
              {work.sections.designDecisions?.map((decision, index) => (
                <div key={index} className="work-detail__decision-wrapper">
                  {/* 텍스트 섹션 */}
                  <section className="work-detail__section work-detail__section--decision-text">
                    <h3 className="work-detail__subsection-heading">
                      {decision.label}
                    </h3>

                    {decision.rationale &&
                      Object.entries(decision.rationale).map(
                        ([key, value], idx) => (
                          <div key={idx} className="work-detail__summary-item">
                            <span className="work-detail__meta-label">
                              {key.charAt(0).toUpperCase() +
                                key.slice(1).replace(/([A-Z])/g, " $1")}
                            </span>
                            <p className="work-detail__meta-value">{value}</p>
                          </div>
                        )
                      )}
                  </section>

                  {/* 이미지 섹션 */}
                  <section className="work-detail__section work-detail__section--decision-image">
                    <img
                      src={decision.image}
                      alt={`Design Decision: ${decision.label}`}
                      loading="lazy"
                      fetchPriority="low"
                      width="1200"
                      height="800"
                      decoding="async"
                    />
                  </section>
                </div>
              ))}
            </>
          )}
          {/* =============== Design System =============== */}
          {isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">Design System</h2>

              {work.sections.designSystem && (
                <section className="work-detail__section work-detail__section--design">
                  <div className="work-detail__design-contents">
                    <h3 className="work-detail__subsection-heading">
                      {work.sections.designSystem.label}
                    </h3>
                    <p>{work.sections.designSystem.description}</p>

                    <div className="work-detail__links">
                      <div className="work-detail__links-wrapper">
                        {work.sections.designSystem.figmaLink && (
                          <a
                            href={work.sections.designSystem.figmaLink}
                            className="work-detail__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="prototype"
                          >
                            Design System
                          </a>
                        )}
                        <AnimatedArrow
                          direction="right"
                          className="work-detail__link-arrow"
                        />
                      </div>
                    </div>
                  </div>

                  {work.sections.designSystem.images?.length > 0 && (
                    <div
                      className="work-detail__design-images"
                      ref={designSystemRef}
                      onMouseDown={handleMouseDown(designSystemRef)}
                      onMouseLeave={handleMouseLeave(designSystemRef)}
                      onMouseUp={handleMouseUp(designSystemRef)}
                      onMouseMove={handleMouseMove(designSystemRef)}
                    >
                      {work.sections.designSystem.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Design process ${index + 1}`}
                          draggable="false"
                          loading="lazy"
                          width="800"
                          height="600"
                          decoding="async"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}
            </>
          )}

          {/* =============== Final Product =============== */}
          {isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">Final Product</h2>

              {work.sections.browseVisitFlow && (
                <section className="work-detail__section work-detail__section--design">
                  <div className="work-detail__design-contents">
                    <h3 className="work-detail__subsection-heading">
                      Browse & Visit Flow
                    </h3>
                    <p>{work.sections.browseVisitFlow.description}</p>

                    {work.sections.browseVisitFlow.figmaLink && (
                      <div className="work-detail__links">
                        <div className="work-detail__links-wrapper">
                          <a
                            href={work.sections.browseVisitFlow.figmaLink}
                            className="work-detail__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Browse & Visit Flow Prototype"
                          >
                            Prototype
                          </a>
                          <AnimatedArrow
                            direction="right"
                            className="work-detail__link-arrow"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {work.sections.browseVisitFlow.images?.length > 0 && (
                    <div
                      className="work-detail__design-images work-detail__design-images--flow"
                      ref={browseVisitRef}
                      onMouseDown={handleMouseDown(browseVisitRef)}
                      onMouseLeave={handleMouseLeave(browseVisitRef)}
                      onMouseUp={handleMouseUp(browseVisitRef)}
                      onMouseMove={handleMouseMove(browseVisitRef)}
                    >
                      {work.sections.browseVisitFlow.images.map(
                        (img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Browse & Visit Flow ${index + 1}`}
                            draggable="false"
                            loading="lazy"
                            width="800"
                            height="600"
                            decoding="async"
                          />
                        )
                      )}
                    </div>
                  )}
                </section>
              )}

              {work.sections.searchSaveFlow && (
                <section className="work-detail__section work-detail__section--design">
                  <div className="work-detail__design-contents">
                    <h3 className="work-detail__subsection-heading">
                      Search & Save Flow
                    </h3>
                    <p>{work.sections.searchSaveFlow.description}</p>

                    {work.sections.searchSaveFlow.figmaLink && (
                      <div className="work-detail__links">
                        <div className="work-detail__links-wrapper">
                          <a
                            href={work.sections.searchSaveFlow.figmaLink}
                            className="work-detail__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Search & Save Flow Prototype"
                          >
                            Prototype
                          </a>
                          <AnimatedArrow
                            direction="right"
                            className="work-detail__link-arrow"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {work.sections.searchSaveFlow.images?.length > 0 && (
                    <div
                      className="work-detail__design-images work-detail__design-images--flow"
                      ref={searchSaveRef}
                      onMouseDown={handleMouseDown(searchSaveRef)}
                      onMouseLeave={handleMouseLeave(searchSaveRef)}
                      onMouseUp={handleMouseUp(searchSaveRef)}
                      onMouseMove={handleMouseMove(searchSaveRef)}
                    >
                      {work.sections.searchSaveFlow.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Search & Save Flow ${index + 1}`}
                          draggable="false"
                          loading="lazy"
                          width="800"
                          height="600"
                          decoding="async"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}
            </>
          )}

          {/* =============== Implementation =============== */}
          {!isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">Implementation</h2>

              {/* Development Highlights */}
              {work.sections.developmentHighlights && (
                <section className="work-detail__section work-detail__section--dev">
                  <h3 className="work-detail__subsection-heading">
                    Development Highlights
                  </h3>

                  <div className="work-detail__tech-list">
                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Component Architecture
                      </span>
                      <p className="work-detail__meta-value">
                        {
                          work.sections.developmentHighlights
                            .componentArchitecture
                        }
                      </p>
                    </div>

                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Styling System
                      </span>
                      <p className="work-detail__meta-value">
                        {work.sections.developmentHighlights.stylingSystem}
                      </p>
                    </div>

                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Performance Optimization
                      </span>
                      <p className="work-detail__meta-value">
                        {
                          work.sections.developmentHighlights
                            .performanceOptimization
                        }
                      </p>
                    </div>

                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Media Optimization
                      </span>
                      <p className="work-detail__meta-value">
                        {work.sections.developmentHighlights.mediaOptimization}
                      </p>
                    </div>

                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Accessibility Enhancements
                      </span>
                      <p className="work-detail__meta-value">
                        {
                          work.sections.developmentHighlights
                            .accessibilityEnhancements
                        }
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Challenges & Learnings */}
              {work.sections.challengesAndLearnings && (
                <section className="work-detail__section work-detail__section--challenges">
                  <h3 className="work-detail__subsection-heading">
                    Challenges & Learnings
                  </h3>

                  <div className="work-detail__tech-list">
                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Animation Performance
                      </span>
                      <p className="work-detail__meta-value">
                        {
                          work.sections.challengesAndLearnings
                            .animationPerformance
                        }
                      </p>
                    </div>

                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Mobile Accessibility
                      </span>
                      <p className="work-detail__meta-value">
                        {
                          work.sections.challengesAndLearnings
                            .mobileAccessibility
                        }
                      </p>
                    </div>

                    <div className="work-detail__tech-item">
                      <span className="work-detail__meta-label">
                        Layout Stability
                      </span>
                      <p className="work-detail__meta-value">
                        {work.sections.challengesAndLearnings.layoutStability}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          {/* =============== Project Architecture =============== */}
          {!isDesignProject && (
            <>
              <h2 className="work-detail__section-heading">
                Project Architecture
              </h2>

              <section className="work-detail__section work-detail__section--architecture">
                {work.sections.projectArchitecture ? (
                  <img
                    src={work.sections.projectArchitecture}
                    alt="Project Architecture Diagram"
                    loading="lazy"
                    width="1400"
                    height="700"
                    decoding="async"
                    className="work-detail__architecture-image"
                  />
                ) : (
                  <p>Architecture diagram coming soon...</p>
                )}
              </section>
            </>
          )}
        </div>

        {/* =============== Performance & Future =============== */}
        {!isDesignProject && (
          <>
            <h2 className="work-detail__section-heading">
              Performance & Future
            </h2>

            {/* Performance Optimization */}
            <section className="work-detail__section work-detail__section--performance">
              <h3 className="work-detail__subsection-heading">
                Performance Optimization
              </h3>

              <div className="work-detail__tech-list">
                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Lighthouse Scores
                  </span>
                  <p className="work-detail__meta-value">
                    {work.sections.performanceOptimization.lighthouseScores}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Image Optimization
                  </span>
                  <p className="work-detail__meta-value">
                    {work.sections.performanceOptimization.imageOptimization}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Code Splitting
                  </span>
                  <p className="work-detail__meta-value">
                    {work.sections.performanceOptimization.codeSplitting}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Animation Optimization
                  </span>
                  <p className="work-detail__meta-value">
                    {
                      work.sections.performanceOptimization
                        .animationOptimization
                    }
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Media Compression
                  </span>
                  <p className="work-detail__meta-value">
                    {work.sections.performanceOptimization.mediaCompression}
                  </p>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="work-detail__section work-detail__section--next-steps">
              <h3 className="work-detail__subsection-heading">Next Steps</h3>

              <div className="work-detail__tech-list">
                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">Dark Mode</span>
                  <p className="work-detail__meta-value">
                    {work.sections.nextSteps.darkMode}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">Blog Section</span>
                  <p className="work-detail__meta-value">
                    {work.sections.nextSteps.blogSection}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">Analytics</span>
                  <p className="work-detail__meta-value">
                    {work.sections.nextSteps.analytics}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Interactive Playground
                  </span>
                  <p className="work-detail__meta-value">
                    {work.sections.nextSteps.interactivePlayground}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">Accessibility</span>
                  <p className="work-detail__meta-value">
                    {work.sections.nextSteps.accessibility}
                  </p>
                </div>

                <div className="work-detail__tech-item">
                  <span className="work-detail__meta-label">
                    Internationalization
                  </span>
                  <p className="work-detail__meta-value">
                    {work.sections.nextSteps.internationalization}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* =============== More Link =============== */}

        <div className="work-detail__links work-detail__links--more">
          <div className="work-detail__links-wrapper">
            <a
              href={work.links.logDetail}
              target="_blank"
              rel="noopener noreferrer"
              className="work-detail__link"
            >
              More About This Project
            </a>
            <AnimatedArrow
              direction="right"
              className="work-detail__link-arrow work-detail__link-arrow--more"
            />
          </div>
        </div>

        {/* =============== Bottom Navigation =============== */}

        <div className="work-detail__nav-bottom">
          {prevProject ? (
            <Link
              to={`/projects/detail/${prevProject.id}`}
              className="work-detail__nav-item work-detail__nav-item--prev"
            >
              <h2 className="work-detail__nav-title">{prevProject.title}</h2>
              <div className="work-detail__nav-text-wrapper">
                <AnimatedArrow
                  direction="left"
                  className="work-detail__nav-arrow"
                />
                <div className="work-detail__nav-text">Previous Project</div>
              </div>
            </Link>
          ) : (
            <div className="work-detail__nav-item work-detail__nav-item--prev work-detail__nav-item--disabled">
              <h2 className="work-detail__nav-title">No Previous</h2>
              <div className="work-detail__nav-text-wrapper">
                <AnimatedArrow
                  direction="left"
                  className="work-detail__nav-arrow"
                />
                <div className="work-detail__nav-text">Previous Project</div>
              </div>
            </div>
          )}

          {nextProject ? (
            <Link
              to={`/projects/detail/${nextProject.id}`}
              className="work-detail__nav-item work-detail__nav-item--next"
            >
              <h2 className="work-detail__nav-title">{nextProject.title}</h2>
              <div className="work-detail__nav-text-wrapper">
                <div className="work-detail__nav-text">Next Project</div>
                <AnimatedArrow
                  direction="right"
                  className="work-detail__nav-arrow"
                />
              </div>
            </Link>
          ) : (
            <div className="work-detail__nav-item work-detail__nav-item--next work-detail__nav-item--disabled">
              <h2 className="work-detail__nav-title">COMING SOON</h2>
              <div className="work-detail__nav-text-wrapper">
                <div className="work-detail__nav-text">Next Project</div>
                <AnimatedArrow
                  direction="right"
                  className="work-detail__nav-arrow"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default WorkDetail;
