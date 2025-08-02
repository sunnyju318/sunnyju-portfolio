// data/worksData.js
import preloader from '../assets/video/preloader-preview.mp4';

export const worksData = [
  {
    id: 1,
    // useParams()로 받은 id와 비교해서 해당 프로젝트를 찾을 때 사용함
    title: "PRELOADER",
    links: {
      liveDemo: "https://example.com/demo",
      viewCode: "https://github.com/username/preloader",
      logDetail: "https://example.com/log"
    },
    // 외부 링크들을 모아둔 객체
    preview: {
      type: "video", // 또는 "image"
      src: preloader
    },
    codeSnippets: [
      {
        tab: "HTML",
        language: "html",
        code: `<div class="preloader">
  <div class="moon"></div>
  <div class="stars">
    <svg class="star" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  </div>
</div>`
      },
      {
        tab: "CSS",
        language: "css", 
              // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  z-index: 9999;
}

.moon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd700, #ffed4e);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  animation: moonGlow 2s ease-in-out infinite alternate;
}

@keyframes moonGlow {
  from { transform: translateY(0px); opacity: 0.8; }
  to { transform: translateY(-10px); opacity: 1; }
}`
      },
      {
        tab: "JS",
        language: "javascript",
        code: `// jQuery
$(window).on('load', function() {
  $('.preloader').fadeOut(1000, function() {
    $(this).remove();
  });
});

// Vanilla JS
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity 1s ease';
  
  setTimeout(() => {
    preloader.remove();
  }, 1000);
});`
      }
    ],
// 실제 표시할 코드, 템플릿 리터럴(벡틱)사용으로 여러줄 지원
// 들여쓰기, 줄바꿈 모두 보존됨
    sections: {
      overview: "A CSS-only loading animation with a glowing moon rising meteors and hand-drawn stars. This preloader was designed to set a calm, introspective mood before entering a site.",
      roleAndStack: {
        role: ["Concept, design, and full implementation"],
        stack: ["HTML", "CSS", "JavaScript", "SVG", "Adobe Illustrator"]
      },
      designAndDevelopment: [
        "Used @keyframes for glowing moon + meteor effect",
        "Inline SVGs created from hand-drawn stars",
        "Custom bezier curves for smooth fade-in/out",
        "Dark background and soft motion evoke a peaceful tone"
      ],
      challengesAndLearnings: [
        "Positioning and layering inline SVGs responsively",
        "Timing multiple animations smoothly",
        "Gained cleaner control over CSS-only motion design"
      ]
    },
    // Array인 이유 : 항목이 리스트 형태이며 배열은 반복문 돌리기 좋고 리엑트에서 <ul><li>...</li></ul>로 쉽게 렌더링할수 있기 때문이다.
    nextProject: {
      id: 2,
      title: "INFOGRAPHIC"
    }
  },
  // 더 많은 프로젝트들...
];