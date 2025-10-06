import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import "./CodeBlock.scss";
import { useEffect, useState, useRef } from "react";

function CodeBlock({ codeSnippets }) {
  const [activeTab, setActiveTab] = useState(0);
  // 초기값이 0이므로 첫번째 탭이 active 가 된다
  const tabsRef = useRef(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  /* 초기에 setTimeOut()을 사용하였으며 FOUC 현상이 발생하였다. 
  requestAnimationFrame()을 대신 사용함으로써 해결함. 

  ** FOUC(Flash of Unstyled Content) 현상이란 웹페이지가 처음 렌더링될 때
  스타일이 적용되기 전에 잠깐 기본 스타일 또는 스타일 없음으로 보였따가 나중에 스타일이 적용되어 다시 바뀌는 현상으로 리렌더링시 하이라이트 안된 원본 코드가 표시되어 번쩍임 현상이 나타나는 것이다.

    requestAnimationFrame() : 브라우저에서 애니메이션이나 UI 업데이트를 부드럽게 처리하기 위해 제공하는 고성능 API이다. 브라우저는 화면을 1초에 60번 그리는데 이 함수는 그 프레임을 그리기 직전에 코드를 실행하도록 예약함으로써 렌더링 직전에 자연스럽게 적용할수 있게 해준다.

    setTimeOut()은 타이머에 따라 무조건 시간 후 실행되며 렌더링과 무관
    requestAnimationFrame()는 브라우저가 렌더링 준비되면 딱 맞게 실행
  */

  // 유즈이펙트의 클린업과 비슷한 개념으로 한번 실행된 하이라이트의 흔적을 지우지 않으면 이미 하이라이트가 됐다고 생각해서 탭을 바꿀때 다시 실행하지 않으므로 기존 하이라이트를 제거 후 다시 적용하도록 하는것이다. 탭이동시 하이라이팅이 다시 적용되지 않음을 해결함.

  useEffect(() => {
    setIsHighlighting(true);
    const frame = requestAnimationFrame(() => {
      // 기존 하이라이트 제거 후 다시 적용
      const codeElement = document.querySelector(".code-content code");
      if (codeElement) {
        // 기존 하이라이트 속성 제거
        codeElement.removeAttribute("data-highlighted");
        codeElement.className = `language-${codeSnippets[activeTab].language}`;

        // 텍스트로만 설정 (HTML 이스케이프됨)
        // 프로젝트 디테일 페이지에서 다음프로젝트로 넘길때 경고가 뜸
        // highlight.js가 HTML을 이스케이프하지 않고 렌더링해서 발생
        // 이미 JSX에서 {codeSnippets[activeTab].code}로 렌더링하고 있으니, useEffect에서 다시 textContent로 명시적으로 설정하면 안전하게 이스케이프 됨
        codeElement.textContent = codeSnippets[activeTab].code;

        // 새로 하이라이트 적용
        hljs.highlightElement(codeElement);
        setIsHighlighting(false);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [activeTab, codeSnippets]);

  if (!codeSnippets || codeSnippets.length === 0) {
    return <div>There are no data.</div>;
  }

  const handleTabClick = (index) => {
    // 이전 탭보다 오른쪽으로 가면 +, 왼쪽으로 가면 -
    const direction = index > activeTab ? 1 : -1;

    setActiveTab(index);

    if (
      index !== activeTab &&
      tabsRef.current &&
      tabsRef.current.scrollWidth > tabsRef.current.clientWidth
    ) {
      // 스크롤이 실제로 필요할 때만
      tabsRef.current.scrollLeft = tabsRef.current.scrollLeft + 80 * direction;
    }
  };

  return (
    <div className="code-box">
      <div className="code-tabs" ref={tabsRef}>
        {codeSnippets.map((snippet, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {snippet.tab}
          </button>
        ))}
      </div>

      <div className={`code-content ${isHighlighting ? "highlighting" : ""}`}>
        <pre>
          <code className={`language-${codeSnippets[activeTab].language}`}>
            {codeSnippets[activeTab].code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
