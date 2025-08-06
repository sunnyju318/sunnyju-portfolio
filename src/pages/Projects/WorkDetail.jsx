
import { useParams } from 'react-router-dom';
import { worksData } from '../../data/worksData';
import './WorkDetail.scss';
import AnimatedArrow from '../../components/common/animatedArrow/AnimatedArrow.jsx';
import CodeBlock from '../../components/common/codeBlock/CodeBlock';

function WorkDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 받아오기

  console.log(id);

  // id로 해당 프로젝트 찾기
  const work = worksData.find(w => w.id === parseInt(id));
  // parseInt(id) : id가 "1" 일때 숫자 1로 바꿔줌
  // 즉, 정수를 숫자로 바꿔줌, useParms는 문자열반 반환하기때문에 필요한 과정임

  // 프로젝트를 찾지 못한 경우
  if (!work) {
    return (
      <div>
        <h1>Can't find.</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="work-detail-wrapper">

      <h1 className="project-title">{work.title}</h1>

      <div className="project-links">
        <a href={work.links.liveDemo} target="_blank" rel="noopener noreferrer">
          Live Demo
          <AnimatedArrow direction='right' className='arrow-sub-link' />

        </a>
        <a href={work.links.viewCode} target="_blank" rel="noopener noreferrer">
          Github
          <AnimatedArrow direction='right' className='arrow-sub-link' />

        </a>
        <a href={work.links.logDetail} target="_blank" rel="noopener noreferrer">
          Project Log
          <AnimatedArrow direction='right' className='arrow-sub-link' />

        </a>
      </div>

      <div className="preview-box">
        {/* 
          {work.preview.type === "video"
          ? (<video>...</video>)
          : (<img />)
          삼항연산자, work.preview의 type가 비디오면 비디오를 보여주고
          아니면 이미지를 보여주라는 뜻  
            */}
        {work.preview.type === "video" ? (
          <video
            autoPlay
            muted
            loop
            playsInline>
            {/* playInline: 모바일에서 비디오가 전체화면으로 강제전환되는 것을 막아주는 속성이다. 즉 비디오를 인라인(페이지 안)에서 재생하다록 요청한다는 의미 */}
            <source src={work.preview.src}
              type="video/mp4" />
          </video>
          // 보여줄 비디오 정보
        ) : (
          <img src={work.preview.src} alt={`${work.title} preview`} />
          // 보여줄 이미지 정보
        )}
      </div>

      {/* 오른쪽: 코드 스니펫 */}
      <CodeBlock codeSnippets={work.codeSnippets} className="code-box-desktop"/>


      {/* 4. 디스크립션 파트 (4개 섹션) */}
      <div className="description-sections" >

        <section className="section">
          <h2>Overview</h2>
          <p>{work.sections.overview}</p>
        </section>

        <section className="section stack">
          <h2>Stack</h2>
          <ul>
            {work.sections.roleAndStack.stack.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>Design & Development Notes</h2>
          <ul>
            {work.sections.designAndDevelopment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>Challenges & Learnings</h2>
          <ul>
            {work.sections.challengesAndLearnings.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* 5. 넥스트 프로젝트 버튼 */}
      <div className="next-project">
        <a href={`/projects/detail/${work.nextProject.id}`}>
          <h2>{work.nextProject.title}</h2>
          <div className='next-project-title-wrapper'>
            View Next Project
            <AnimatedArrow direction='right' animated={true} className='arrow-next-project' />
          </div>

        </a>
      </div>
    </div>
  );
}

export default WorkDetail;