import { useParams, Link } from "react-router-dom";
import { worksData } from "../../data/worksData";
import "./WorkDetail.scss";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import CodeBlock from "../../components/common/codeBlock/CodeBlock.jsx";
import { useRef, useState } from "react";

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

  const designImagesRef = useRef(null);
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

  // 이미지 드레그 스크롤 이벤트
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
      <div className="work-detail">
        {/* 헤더 */}

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

        <h1 className="work-detail__title">{work.title}</h1>

        <div className="work-detail__links">
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

          <div className="work-detail__links-wrapper">
            <a
              href={work.links.viewCode}
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

          <div className="work-detail__links-wrapper">
            <a
              href={work.links.logDetail}
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
        </div>

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
                fetchpriority="high"
                width="1200"
                height="800"
                decoding="async"
              />
            )}
          </a>
        </div>

        <div className="work-detail__code">
          {work.codeSnippets && work.codeSnippets.length > 0 && (
            <CodeBlock codeSnippets={work.codeSnippets} />
          )}
        </div>

        {/* 디스크립션 섹션들 */}
        <div className="work-detail__sections">
          <section className="work-detail__section work-detail__section--overview">
            <h2 className="work-detail__section-heading">Overview</h2>
            <p>{work.sections.overview}</p>
          </section>

          <section className="work-detail__section work-detail__section--stack">
            <h2 className="work-detail__section-heading">Stack</h2>
            <ul>
              {work.sections.stack.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {work.sections.designProcess && (
            <section className="work-detail__section work-detail__section--design">
              <div className="work-detail__design-contents">
                <h2 className="work-detail__section-heading">Design Process</h2>
                <p>{work.sections.designProcess.description}</p>

                <div className="work-detail__links">
                  <div className="work-detail__links-wrapper">
                    {work.sections.designProcess.figmaLink && (
                      <a
                        href={work.sections.designProcess.figmaLink}
                        className="work-detail__link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="prototype"
                      >
                        Prototype
                      </a>
                    )}
                    <AnimatedArrow
                      direction="right"
                      className="work-detail__link-arrow"
                    />
                  </div>
                  <div className="work-detail__links-wrapper">
                    <a
                      className="work-detail__link"
                      href="/jisunju_brand-guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Brand Guide"
                    >
                      Brand Guide
                    </a>
                    <AnimatedArrow
                      direction="right"
                      className="work-detail__link-arrow"
                    />
                  </div>
                </div>
              </div>

              {work.sections.designProcess.images?.length > 0 && (
                <div
                  className="work-detail__design-images"
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

          <section className="work-detail__section work-detail__section--dev">
            <h2 className="work-detail__section-heading">
              Development Highlights
            </h2>
            <ul>
              {work.sections.developmentHighlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="work-detail__section work-detail__section--challenges">
            <h2 className="work-detail__section-heading">
              Challenges & Learnings
            </h2>
            <ul>
              {work.sections.challengesAndLearnings.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

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

        {/* 프로젝트 네비게이션 */}
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
