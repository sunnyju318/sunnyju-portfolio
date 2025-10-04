import { useParams } from "react-router-dom";
import { worksData } from "../../data/worksData";
import "./WorkDetail.scss";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import CodeBlock from "../../components/common/codeBlock/CodeBlock.jsx";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function WorkDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 받아오기

  // console.log(id);
  // id로 해당 프로젝트 찾기
  const work = worksData.find((w) => w.id === parseInt(id));

  // console.log(work);
  // parseInt(id) : id가 "1" 일때 숫자 1로 바꿔줌
  // 즉, 정수를 숫자로 바꿔줌, useParms는 문자열반 반환하기때문에 필요한 과정임

  const designImagesRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = designImagesRef.current;
    if (!slider) return;

    slider.isDown = true;
    slider.classList.add("active");
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    const slider = designImagesRef.current;
    if (!slider) return;
    slider.isDown = false;
    slider.classList.remove("active");
  };

  const handleMouseUp = () => {
    const slider = designImagesRef.current;
    if (!slider) return;
    slider.isDown = false;
    slider.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    const slider = designImagesRef.current;
    if (!slider || !slider.isDown) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 2; // 스크롤 속도 (숫자 조절 가능)
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  // 프로젝트를 찾지 못한 경우, guard clause
  if (!work) {
    return (
      <div>
        <h1>Can't find.</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  // SEO를 위한 메타데이터 준비
  const descRaw =
    (work.shortDescription && String(work.shortDescription)) ||
    (work.sections?.overview && String(work.sections.overview)) ||
    (work.tech && `Built with ${String(work.tech)}.`) ||
    `${work.title} case study by Sunny Ju.`;

  const description = descRaw.slice(0, 160);
  const ogDescription = descRaw.slice(0, 200);

  // SNS 미리보기 이미지는 이미지 파일이어야 하므로 thumbnail을 우선 사용
  const ogImage =
    (work.thumbnail && String(work.thumbnail)) ||
    "https://jisun-ju.ca/assets/images/projects-og.jpg";

  // Canonical URL 생성
  const canonicalUrl = `https://jisun-ju.ca/projects/detail/${work.id}`;

  // 비디오 로딩상태 표시
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      {/* React 19 Native Metadata (SEO + Open Graph + Twitter) */}
      <title>{`Sunny Ju | ${work.title}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={`${work.title} — Sunny Ju`} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${work.title} — Sunny Ju`} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* 컨텐츠 */}
      <div className="work-detail-wrapper">
        {/* 헤더 */}
        <h1 className="project-title">{work.title}</h1>

        <div className="project-links">
          <div className="project-links-wrapper">
            <a
              href={work.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="sub-link"
            >
              Live Demo
            </a>
            <AnimatedArrow direction="right" className="arrow-sub-link" />
          </div>

          <div className="project-links-wrapper">
            <a
              href={work.links.viewCode}
              target="_blank"
              rel="noopener noreferrer"
              className="sub-link"
            >
              GitHub
            </a>
            <AnimatedArrow direction="right" className="arrow-sub-link" />
          </div>

          <div className="project-links-wrapper">
            <a
              href={work.links.logDetail}
              target="_blank"
              rel="noopener noreferrer"
              className="sub-link"
            >
              Project Log
            </a>
            <AnimatedArrow direction="right" className="arrow-sub-link" />
          </div>
        </div>

        <div className="preview-box">
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
              fetchpriority="high"
              width="1200"
              height="800"
              decoding="async"
            />
          )}
        </div>

        <div className="code-box">
          {work.codeSnippets && work.codeSnippets.length > 0 && (
            <CodeBlock codeSnippets={work.codeSnippets} />
          )}
        </div>

        {/* 디스크립션 섹션들 */}
        <div className="description-sections">
          <section className="section overview">
            <h2 className="sections-heading">Overview</h2>
            <p>{work.sections.overview}</p>
          </section>

          <section className="section stack">
            <h2 className="sections-heading">Stack</h2>
            <ul>
              {work.sections.stack.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {work.sections.designProcess && (
            <section className="section design">
              <div className="design-contents">
                <h2 className="sections-heading">Design Process</h2>
                <p>{work.sections.designProcess.description}</p>

                <div className="project-links">
                  <div className="project-links-wrapper">
                    {work.sections.designProcess.figmaLink && (
                      <a
                        href={work.sections.designProcess.figmaLink}
                        className="sub-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="prototype"
                      >
                        Prototype
                      </a>
                    )}
                    <AnimatedArrow
                      direction="right"
                      className="arrow-sub-link"
                    />
                  </div>
                  <div className="project-links-wrapper">
                    <a
                      className="sub-link"
                      href="/jisunju_brand-guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Brand Guide"
                    >
                      Brand Guide
                    </a>
                    <AnimatedArrow
                      direction="right"
                      className="arrow-sub-link"
                    />
                  </div>
                </div>
              </div>

              {work.sections.designProcess.images?.length > 0 && (
                <div
                  className="design-images"
                  ref={designImagesRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {work.sections.designProcess.images.map((img, index) => (
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

          <section className="section dev">
            <h2 className="sections-heading">Development Highlights</h2>
            <ul>
              {work.sections.developmentHighlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section challenges">
            <h2 className="sections-heading">Challenges & Learnings</h2>
            <ul>
              {work.sections.challengesAndLearnings.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="project-links more-link">
          <div className="project-links-wrapper ">
            <a
              href={work.links.logDetail}
              target="_blank"
              rel="noopener noreferrer"
              className="sub-link"
            >
              More About This Project
            </a>
            <AnimatedArrow
              direction="right"
              className="arrow-sub-link more-arrow"
            />
          </div>
        </div>

        {/* 넥스트 프로젝트 버튼 */}
        <div className="next-project">
          {/* 초반에 Link대신 a를 사용하였을때 로컬에서는 작동하였으나 퍼블리시후 작동하지 않았다. 
        내부 페이지 이므로 a 대신 Link 를 사용한 후 해결되었다. */}
          <Link to={`/projects/detail/${work.nextProject.id}`}>
            <h2>{work.nextProject.title}</h2>
            <div className="next-project-title-wrapper">
              <div className="next-project-title">View Next Project</div>
              <AnimatedArrow direction="right" className="arrow-next-project" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default WorkDetail;
