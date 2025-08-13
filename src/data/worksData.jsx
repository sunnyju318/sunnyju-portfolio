// data/worksData.js
import preloader from '../assets/video/preloader-preview.mp4';
import infoStory from '../assets/video/infostory-preview.mp4';
import preloaderImg from '../assets/images/home/preloader.jpg';
import infoStoriesImg from '../assets/images/home/info-stories.jpg';
import easyMealImg from '../assets/images/home/easy-meal.jpg';

export const worksData = [

  {
    id: 1,
    // useParams()로 받은 id와 비교해서 해당 프로젝트를 찾을 때 사용함
    title: "PRELOADER",
    isFeatured: true, // featured에 들어갈 목록임을 표시
    category: "Web Development",
    tech: "html / css / svg / Illustrator",
    shortDescription: "An animation-based preloader built solely with HTML and CSS. Custom illustrations were created in Illustrator, converted to SVG, and programmatically controlled to deliver a dynamic loading experience.",
    links: {
      liveDemo: "https://sunnyju318.github.io/lunar-preloader/",
      viewCode: "https://github.com/sunnyju318/lunar-preloader",
      logDetail: "#"
    },
    // 외부 링크들을 모아둔 객체
    preview: {
      type: "video", // 또는 "image"
      src: preloader
    },
    thumbnail: preloaderImg, // 어차피 이미지만 쓸거라 바로 경로넣기
    codeSnippets: [
      {
        tab: "HTML",
        language: "html",
        code: `<!-- Core HTML Structure -->
<div class="moon"></div>
<p>L O A D I N G<br>. . .</p>
<div class="stardust drop1"></div>
<div class="stardust drop2"></div>
<div class="stardust drop3"></div>

<!-- Core SVG Stars (sample) -->
<svg xmlns="http://www.w3.org/2000/svg" id="stars" viewBox="0 0 1241.5 691.4">
  <defs>
    <style>
      .st2 { opacity: .5 }
      .st3 { opacity: .2 }
      .st4 { opacity: .3 }
      .st6 { fill: #b7b574 }
    </style>
  </defs>
  <!-- Small stars -->
  <g class="st4">
    <circle cx="316.9" cy="281.8" r=".8" class="st6" />
  </g>
  <g class="st2">
    <circle cx="456.1" cy="446.2" r=".8" class="st6" />
  </g>
  <!-- Large stars -->
  <circle cx="246.1" cy="150.7" r="2.1" class="st6" />
  <circle cx="708.3" cy="169.4" r="2.1" class="st6" />
  <!-- ... more stars in full code -->
</svg>`
      },
      {
        tab: "CSS",
        language: "css",
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `/* Core layout setup */
body {
  height: 100vh;
  background-image: url(../img/background.jpg);
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Moon with color-changing animation */
.moon {
  width: 100px;
  height: 100px;
  background-image: url(../img/luna.png);
  background-size: cover;
  background-color: rgb(250, 251, 212);
  background-blend-mode: multiply;
  border-radius: 50%;
  animation: moonColor 10s ease infinite;
}

@keyframes moonColor {
  0%, 30% { background-color: rgb(250, 251, 212); }
  60%, 70% { background-color: rgb(243, 84, 60); }
  100% { background-color: rgb(250, 251, 212); }
}

/* Eclipse shadow effect */
.moon::before {
  content: "";
  width: 100px;
  height: 100px;
  background-color: #000400;
  border-radius: 50%;
  position: absolute;
  animation: sun 5s ease infinite;
}

@keyframes sun {
  0% { transform: translate(-80px, -80px); }
  35%, 50% { transform: translate(-7px, -7px); }
  60%, 75% { transform: translate(7px, 7px); }
  100% { transform: translate(80px, 80px); }
}

/* Falling stardust particles */
.stardust {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgb(250, 251, 212);
  animation: stardust 6s ease-out infinite;
}

@keyframes stardust {
  0% { transform: translate(0, 0); opacity: 0.2; }
  30% { transform: translate(0, 0); opacity: 0.7; }
  60% { transform: translate(-300px, 300px); opacity: 0; }
  100% { transform: translate(-300px, 300px); opacity: 0.2; }
}

/* Background stars with subtle animation */
#stars {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: auto;
  z-index: -1;
  animation: stars 1s ease-in-out infinite;
}

@keyframes stars {
  0%, 100% { transform: translate(3px); }
  50% { transform: translate(0); opacity: 0.3; }
}`
      }
    ],
    // 실제 표시할 코드, 템플릿 리터럴(벡틱)사용으로 여러줄 지원
    // 들여쓰기, 줄바꿈 모두 보존됨
    sections: {
      overview: "A CSS-only loading animation with a glowing moon, falling stardust, and hand-drawn stars. This preloader was designed to set a calm, introspective mood before entering a site.",
      roleAndStack: {
        role: ["Concept, design, and full implementation"],
        stack: ["HTML", "CSS", "SVG", "Adobe Illustrator"]
      },
      designAndDevelopment: [
        "Used @keyframes for moon color transitions and eclipse effect.",
        "Inline SVGs created from hand-drawn stars in Illustrator.",
        "Falling stardust particles with diagonal motion paths.",
        "Background blend modes for atmospheric moon glow."
      ],
      challengesAndLearnings: [
        "Creating realistic eclipse shadow using ::before pseudo-element.",
        "Timing multiple staggered animations for natural flow.",
        "Optimizing SVG performance with proper opacity layering."
      ]
    },
    // Array인 이유 : 항목이 리스트 형태이며 배열은 반복문 돌리기 좋고 리엑트에서 <ul><li>...</li></ul>로 쉽게 렌더링할수 있기 때문이다.
    nextProject: {
      id: 2,
      title: "INFO STORIES"
    }
  },

  {
    id: 2,
    title: "INFO STORIES",
    isFeatured: true,
    category: "Web Development",
    tech: "React / SCSS",
    shortDescription: "An animated, interactive infographic series designed for intuitive understanding and educational use.",
    links: {
      liveDemo: "#",
      viewCode: "#",
      logDetail: "#"
    },
    preview: {
      type: "video",
      src: infoStory
    },
    thumbnail: infoStoriesImg,
    codeSnippets: [
      {
        tab: "React",
        language: "javascript",
        code: `import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from '../data/stories.json';
import './StoryPage.scss';

export default function StoryPage(){
const {id} = useParams(); // 주소에서 id 가져오기
const [story, setStory] = useState(null); //현재 보여줄 이미지 정보

useEffect(() =>{
  const found = data.find((item) => item.id === id);
  setStory(found);
}, [id]);

if (!story) return <p>Loading...</p>

  return(
<div className="page-wrapper">
<img src={story.image} alt={'Story ' + story.id} />
</div>
  )
}`
      },
      {
        tab: "Data",
        language: "json",
        code: `[
  {
    "id" : "1",
    "image" : "/assets/polar_bear.jpg"
  },
  {
    "id" : "2",
    "image" : "/assets/turtle.jpg"
  },
  {
    "id" : "3",
    "image" : "/assets/melting.jpg"
  },
  {
    "id" : "4",
    "image" : "/assets/ocean.jpg"
  }
]`
      },
      {
        tab: "SCSS",
        language: "scss",
        code: `@use '../styles/base/variables.scss' as vars;
@use '../styles//base/mixin.scss' as mixins;
@use "sass:map";

.page-wrapper {
  @include mixins.flex-center;
  grid-column: 1/5;

  // tablet
@include mixins.respond-to('md') {
  grid-column: 2/8;
}

// desktop
@include mixins.respond-to('lg') {
  grid-column: 3/11;
}
}

`
      }
    ],
    sections: {
      overview: "An interactive infographic series exploring environmental stories through animated, educational content. Users navigate through climate change narratives with intuitive grid-based layouts and smooth page transitions, designed to make complex environmental data accessible and engaging.",
      roleAndStack: {
        role: ["Concept, design, and full implementation"],
        stack: ["React", "SCSS"]
      },
      designAndDevelopment: [
        "Modular SCSS architecture with variables, mixins, and component-based styling.",
        "Responsive grid system adapting from 4-column mobile to 12-column desktop.",
        "Dynamic routing with useParams for story navigation and state management.",
        "Custom mixin library for consistent breakpoints and layout patterns.",
        "Component-based structure with reusable layout and navigation elements"
      ],
      challengesAndLearnings: [
        "Building scalable SCSS architecture with proper namespacing and modular imports.",
        "Implementing responsive grid systems that work across multiple screen sizes.",
        "Managing state and routing for seamless story navigation experience.",
        "Creating reusable mixins for consistent design system implementation."
      ]
    },
    nextProject: {
      id: 3,
      title: "EASYMEAL"
    }
  },

  {
    id: 3,
    title: "EASYMEAL",
    isFeatured: true,
    category: "UX/UI Design",
    tech: "Figma / Illustrator",
    shortDescription: "A meal planning app designed for busy individuals, offering both free meal plans and premium nutritionist-curated options. Features like budget-based and fridge-ingredient filtering enable a streamlined and intuitive user experience.",
    links: {
      liveDemo: "https://example.com/demo",
      viewCode: "https://github.com/username/preloader",
      logDetail: "https://example.com/log"
    },
    preview: {
      type: "video",
      src: preloader
    },
    thumbnail: easyMealImg,
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
    nextProject: {
      id: 4,
      title: "PINPAL"
    }
  },

  {
    id: 4,
    title: "PINPAL",
    isFeatured: false,
    category: "Web Development",
    tech: "html / css / javascript",
    shortDescription: "A meal planning app designed for busy individuals, offering both free meal plans and premium nutritionist-curated options. Features like budget-based and fridge-ingredient filtering enable a streamlined and intuitive user experience.",
    links: {
      liveDemo: "https://example.com/demo",
      viewCode: "https://github.com/username/preloader",
      logDetail: "https://example.com/log"
    },
    preview: {
      type: "video",
      src: preloader
    },
    thumbnail: easyMealImg,
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
    nextProject: {
      id: 1,
      title: "PRELOADER"
    }
  },
];