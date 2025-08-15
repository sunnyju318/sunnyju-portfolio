import { useParams } from 'react-router-dom';
import { worksData } from '../../data/worksData';
import './WorkDetail.scss';
import AnimatedArrow from '../../components/common/AnimatedArrow/AnimatedArrow.jsx';
import CodeBlock from '../../components/common/codeBlock/CodeBlock.jsx';
import { Link } from 'react-router-dom';

function WorkDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 받아오기

  // console.log(id);
  // id로 해당 프로젝트 찾기
  const work = worksData.find(w => w.id === parseInt(id));

  // console.log(work);
  // parseInt(id) : id가 "1" 일때 숫자 1로 바꿔줌
  // 즉, 정수를 숫자로 바꿔줌, useParms는 문자열반 반환하기때문에 필요한 과정임

  // 프로젝트를 찾지 못한 경우, guard clause
  if (!work) {
    return (
      <div>
        <h1>Can't find.</h1>
        <p>ID: {id}</p>
      </div>
    );
  }
  // 디자인 프로젝트인지 확인하기
  const isDesignProject = work.category === "UX/UI Design";

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
    'https://jisun-ju.ca/assets/images/projects-og.jpg';

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
      <div className="work-detail-wrapper">
        {/* 공통헤더 부분 */}
        <h1 className="project-title">{work.title}</h1>

        <div className="project-links">
          <div className='project-links-wrapper'>
            <a href={work.links.liveDemo} target="_blank" rel="noopener noreferrer" className='sub-link'>
              {!isDesignProject ? 'Live Demo' : 'Prototype'}
            </a>
            <AnimatedArrow direction='right' className='arrow-sub-link' />
          </div>

          {!isDesignProject && (
            <div className='project-links-wrapper'>
              <a href={work.links.viewCode} target="_blank" rel="noopener noreferrer" className='sub-link'>
                Github
              </a>
              <AnimatedArrow direction='right' className='arrow-sub-link' />
            </div>
          )}
          {/* 만약 이 프로젝트가 디자인 프로젝트가 아니라면 깃허브로 가는 링크를 보여줘라 */}

          <div className='project-links-wrapper'>
            <a href={work.links.logDetail} target="_blank" rel="noopener noreferrer" className='sub-link'>
              Project Log
            </a>
            <AnimatedArrow direction='right' className='arrow-sub-link' />
          </div>
        </div>

        {/* 조건부 레이아웃 부분 - 히어로 이미지나 프리뷰만 */}
        {isDesignProject ? (
          /* UX/UI 디자인 프로젝트 - 히어로 이미지만 */
          <div className="design-project-layout">
            <div className="hero-preview">
              {work.preview.type === "video" ? (
                <video autoPlay muted loop playsInline>
                  <source src={work.preview.src} type="video/mp4" />
                </video>
              ) : (
                <img src={work.preview.src} alt={`${work.title} Preview of completed project interface`} />
              )}
            </div>
          </div>
        ) : (
          /* 개발 프로젝트 레이아웃 */
          <>
            <div className="preview-box">
              {/* 
          {work.preview.type === "video"
          ? (<video>...</video>)
          : (<img />)
          삼항연산자, work.preview의 type가 비디오면 비디오를 보여주고
          아니면 이미지를 보여주라는 뜻  
            */}
              {work.preview.type === "video" ? (
                <video autoPlay muted loop playsInline>
                  {/* playInline: 모바일에서 비디오가 전체화면으로 강제전환되는 것을 막아주는 속성이다. 즉 비디오를 인라인(페이지 안)에서 재생하다록 요청한다는 의미 */}
                  <source src={work.preview.src} type="video/mp4" />
                </video>
              ) : (
                <img src={work.preview.src} alt={`${work.title} Preview of completed project interface`} />
              )}
            </div>
            <CodeBlock codeSnippets={work.codeSnippets} className="code-box-desktop" />
          </>
        )}

        {/* 디스크립션 섹션들 */}
        <div className="description-sections">
          <section className="section overview">
            <h2>Overview</h2>
            <p>{work.sections.overview}</p>
          </section>

          <section className="section stack">
            <h2>{isDesignProject ? 'Tools' : 'Stack'}</h2>
            {/* 개발과 디자인 스택 제목 구분하기 */}
            <ul>
              {work.sections.roleAndStack.stack.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 디자인 프로세스 카드들 */}
          {isDesignProject && work.sections.research && (
            // isDesignProject가 true이고 work.sections.research가 존재할때만 아래 섹션을 렌더링 할것
            <section className="section research">
              <div className="process-image">
                <img src={work.sections.research.image} alt={`${work.sections.research.title} Research phase visual asset`} />
              </div>
              <div>
                <h2>{work.sections.research.title}</h2>
                <p>{work.sections.research.description}</p>
              </div>
            </section>
          )}

          {isDesignProject && work.sections.architecture && (
            <section className="section architecture">
              <div className="process-image">
                <img src={work.sections.architecture.image} alt={`${work.sections.architecture.title} Information architecture diagram`} />
              </div>
              <div>
                <h2>{work.sections.architecture.title}</h2>
                <p>{work.sections.architecture.description}</p>
              </div>
            </section>
          )}

          {isDesignProject && work.sections.wireframes && (
            <section className="section wireframes">
              <div className="process-image">
                <img src={work.sections.wireframes.image} alt={`${work.sections.wireframes.title} Wireframe mockups`} />
              </div>
              <div>
                <h2>{work.sections.wireframes.title}</h2>
                <p>{work.sections.wireframes.description}</p>
              </div>
            </section>
          )}

          {isDesignProject && work.sections.designSystem && (
            <section className="section design-system">
              <div className="process-image">
                <img src={work.sections.designSystem.image} alt={`${work.sections.designSystem.title} UI design system components`} />
              </div>
              <div>
                <h2>{work.sections.designSystem.title}</h2>
                <p>{work.sections.designSystem.description}</p>
              </div>
            </section>
          )}

          <section className="section notes">
            <h2>{isDesignProject ? 'Design Process' : 'Design & Dev Notes'}</h2>
            {/* 개발과 디자인 스택 제목 구분하기 */}
            <ul>
              {work.sections.designAndDevelopment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="section challenges">
            <h2>Challenges & Learnings</h2>
            <ul>
              {work.sections.challengesAndLearnings.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* 넥스트 프로젝트 버튼 */}
        <div className="next-project">
          {/* 초반에 Link대신 a를 사용하였을때 로컬에서는 작동하였으나 퍼블리시후 작동하지 않았다. 
        내부 페이지 이므로 a 대신 Link 를 사용한 후 해결되었다. */}
          <Link to={`/projects/detail/${work.nextProject.id}`}>
            <h2>{work.nextProject.title}</h2>
            <div className='next-project-title-wrapper'>
              <div className='next-project-title'>
                View Next Project
              </div>
              <AnimatedArrow direction='right' className='arrow-next-project' />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default WorkDetail;