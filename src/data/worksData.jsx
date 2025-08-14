// data/worksData.js
import preloader from '../assets/video/preloader-preview.mp4';
import infoStory from '../assets/video/infostory-preview.mp4';
import preloaderImg from '../assets/images/work/preloader/preloader.jpg';
import infoStoriesImg from '../assets/images/work/infostory/info-stories.jpg';
import easyMealImg from '../assets/images/work/easymeal/easy-meal.jpg';
import easymeal from '../assets/video/easymeal-preview.mp4';
import pinpal from '../assets/video/pinpal-preview.mp4';
import pinpalImg from '../assets/images/work/pinpal/pinpal.jpg';

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
        role: ["placeholder"],
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
        role: ["placeholder"],
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
      liveDemo: "https://www.figma.com/proto/XycfcXoMgJYg0F8oo1FGV0/High-Fidelity-Prototype?node-id=1-522&t=fKmRUdyywFnGES0N-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A568",
      viewCode: "#",
      logDetail: "#"
    },
    preview: {
      type: "video",
      src: easymeal
    },
    thumbnail: easyMealImg,

    codeSnippets: [], // 빈 배열로 남겨두기

    sections: {
      overview: "A meal planning app designed for busy modern lifestyles, offering free meal plans as well as premium options curated by professional nutritionists. Featuring budget-based filtering and a “use-what's-in-your-fridge” function, it delivers a practical and intuitive user experience.",
      roleAndStack: {
        role: ["placeholder"],
        stack: ["Figma", "Adobe Illustrator"]
      },

    // 디자인 프로젝트용 추가 데이터
 
      research: {
        title: "User Research & Journey Mapping",
        image: "/public/assets/images/work/easymeal/journey-map.jpg",
        description: "Conducted in-depth user interviews and created journey maps to uncover key pain points, such as time constraints and meal planning challenges faced by busy professionals."
      },
      architecture: {
        title: "Information Architecture", 
        image: "/public/assets/images/work/easymeal/sitemap.jpg",  
        description: "Designed user flows and information architecture to enable intuitive navigation, seamlessly guiding users through filtering options and meal discovery."
      },
      wireframes: {
        title: "Wireframes & Prototyping",
        image: "/public/assets/images/work/easymeal/wireframe.jpg",  
        description: "Developed low-fidelity wireframes and interactive prototypes to validate core features, including budget-based filtering and refrigerator ingredient matching."
      },
      designSystem: {
        title: "Visual Design System",
        image: "/public/assets/images/work/easymeal/design-system.jpg",
        description: "Built a cohesive design system with fresh, health-focused color palettes and consistent UI components, ensuring a unified user experience across all touchpoints."
      },

      designAndDevelopment: [
        "Conducted user research to define personas and map user journeys.",
        "Developed information architecture and created interactive wireframe prototypes.",
        "Established a cohesive design system, including color palette, typography, and iconography.",
        "Designed an intuitive smart filtering experience based on budget and available ingredients.",
        "Performed prototype-based usability testing to refine and optimize the interface."
      ],
      challengesAndLearnings: [
        "Designed intuitive interfaces to simplify complex filtering options.",
        "Structured information hierarchy to serve both free and premium user groups effectively.",
        "Optimized navigation patterns for mobile environments to enhance usability.",
        "Explored effective visual representation techniques for nutritional information and meal plan data."
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
    shortDescription: "A responsive landing page for a travel meetup platform, featuring animated text, scroll-based map interactions, and smooth plane animations to enhance storytelling and brand engagement.",
    links: {
      liveDemo: "https://sunnyju318.github.io/pinpal-landing-dev/",
      viewCode: "https://github.com/sunnyju318/pinpal-landing-dev",
      logDetail: "#"
    },
    preview: {
      type: "video",
      src: pinpal
    },
    thumbnail: pinpalImg,
    codeSnippets: [
      {
        tab: "HTML",
        language: "html",
        code: `<!-- Header Section -->
<header>
  <div class="logo-group">
    <a href="#" class="logo-icon">
      <img class="logo-icon-img" src="img/icons/logo.png" alt="logo of icon">
    </a>
    <a href="#" class="logo-text">
      <img src="img/icons/text-logo.png" alt="logo of text">
    </a>
  </div>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  <button class="header-btn" type="button">Sign Up</button>
</header>

<!-- Hero Section -->
<section class="hero">
  <h1>
    <span class="block">Where Every Journey </span>
    <span class="block">Meets <span class="hero-text">a Friend</span></span>
  </h1>
  <p class="b1">
    <span class="block">Mobile app designed to connect</span>
    <span class="block">travelers with local events and</span>
    <span class="block">like-minded adventurers.</span>
  </p>

  <div class="download-icons-container">
    <a href="https://www.apple.com/app-store/" target="_blank" class="download-icons">
      <img src="img/icons/app-store.svg" alt="App store download icon">
    </a>
    <a href="https://play.google.com/store" target="_blank" class="download-icons">
      <img src="img/icons/google-store.svg" alt="Google play download icon">
    </a>
  </div>

  <div class="social-media-container">
    <a href="#" class="social-media-icons">
      <img src="img/icons/youtube.png" alt="youtube icon">
    </a>
    <a href="#" class="social-media-icons">
      <img src="img/icons/instagram.png" alt="instagram icon">
    </a>
    <a href="#" class="social-media-icons facebook-icon">
      <img src="img/icons/facebook.png" alt="facebook icon">
    </a>
    <a href="#" class="social-media-icons">
      <img src="img/icons/tiktok.png" alt="tiktok icon">
    </a>
  </div>
</section>

<!-- Features Overview Section -->
<section class="features-overview">
  <h2>What You Can Do with PinPal</h2>
  <p>
    <span class="block">Save memories, discover places, and make meaningful connections.</span>
    <span class="block">PinPal makes every journey easier.</span>
  </p>

  <div class="features-card-container">
    <div class="features-card profile-screen">
      <img src="img/features/page1.png" alt="">
    </div>
    <div class="features-card message-screen">
      <img src="img/features/page2.png" alt="">
    </div>
    <div class="features-card explore-screen">
      <img src="img/features/page3.png" alt="">
    </div>
    <div class="features-card event-detail-screen">
      <img src="img/features/page4.png" alt="">
    </div>
  </div>
</section>

<!-- Promo Video Section -->
<div class="promo-video">
  <video autoplay muted loop playsinline class="hero-bg">
    <source src="img/travel-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<!-- Travel Categories Section -->
<section class="travel-categories">
  <h2>Find Your Perfect Travel Style</h2>
  <p>
    <span class="block">Whether you're an explorer, a culture lover, or a thrill-seeker.</span>
    <span class="block">PinPal helps you discover events and people that match your travel personality.</span>
  </p>
  
  <div class="travel-categories-container">
    <div class="travel-card">
      <h3>Explore Together</h3>
      <div class="travel-card-img">
        <img src="img/travel-categories/explore.jpg" alt="">
      </div>
      <button type="button">Find Friends</button>
    </div>

    <div class="travel-card">
      <h3>Real Experiences</h3>
      <div class="travel-card-img">
        <img src="img/travel-categories/experience.jpg" alt="">
      </div>
      <button type="button">Find Events</button>
    </div>

    <div class="travel-card">
      <h3>Adventure Awaits</h3>
      <div class="travel-card-img">
        <img src="img/travel-categories/adventure.jpg" alt="">
      </div>
      <button type="button">Find Adventures</button>
    </div>
  </div>
</section>

<!-- Footer Section -->
<footer>
  <div class="footer-contents">
    <a href="#" class="footer-logo">
      <img src="img/icons/logo.png" alt="logo image" class="footer-logo">
    </a>
    <p class="rights-top">© 2025 PinPal. All rights reserved.</p>
    
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    
    <ul class="footer-links">
      <li><a href="terms.html">Terms & Conditions</a></li>
      <li><a href="privacy.html">Privacy Policy</a></li>
      <li><a href="legal.html">Legal</a></li>
    </ul>

    <div class="social_media_icons">
      <a href="#" class="social-media-icons">
        <img src="img/icons/youtube.png" alt="youtube icon">
      </a>
      <a href="#" class="social-media-icons">
        <img src="img/icons/instagram.png" alt="instagram icon">
      </a>
      <a href="#" class="social-media-icons facebook-icon">
        <img src="img/icons/facebook.png" alt="facebook icon">
      </a>
      <a href="#" class="social-media-icons">
        <img src="img/icons/tiktok.png" alt="tiktok icon">
      </a>
    </div>
    <p class="rights-bottom">© 2025 PinPal. All rights reserved.</p>
  </div>
</footer>`
      },
      {
        tab: "CSS",
        language: "css",
        code: `/* Global Layout */
body {
  width: 100%;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
}

/* Header */
header {
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FAFAFA;
  padding: 1rem 2rem;
  z-index: 2;
  position: fixed;
  transition: all ease 0.3s;
}

.logo-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.logo-icon {
  width: 2rem;
}

.logo-text {
  width: 5rem;
}

header nav ul {
  display: flex;
  gap: 5rem;
}

header nav ul li a:hover {
  color: #D72638;
}

/* Buttons */
button {
  background-color: #D72638;
  color: #ffffff;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
}

.header-btn:hover {
  background-color: #b22130;
}

/* Common */
.block {
  display: block;
}

/* Hero Section */
.hero {
  margin-top: 150px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.hero h1,
.hero p {
  text-align: center;
}

.hero-text {
  color: #b22130;
}

.download-icons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0 1rem;
}

.download-icons {
  width: 250px;
  border-radius: 1em;
  overflow: hidden;
}

.download-icons-container a:hover {
  transform: scale(1.1);
}

.social-media-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.social-media-icons {
  width: 60px;
}

.social-media-container a:hover {
  transform: scale(1.1);
}

/* Features Overview */
.features-overview {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.features-overview p,
.features-overview h2 {
  text-align: center;
}

.features-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.features-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Promo Video */
.promo-video {
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.promo-video video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

/* Travel Categories */
.travel-categories {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.travel-categories p,
.travel-categories h2 {
  text-align: center;
}

.travel-categories-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.travel-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.travel-card-img {
  width: 400px;
  height: 400px;
  border-radius: 2rem;
  overflow: hidden;
}

.travel-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.travel-card button {
  background: rgba(34, 49, 39, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 200px;
  border-radius: 2rem 2rem 0 0;
  position: absolute;
  bottom: 0;
}

.travel-card button:hover {
  background-color: #223127;
}

/* Footer */
footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2rem;
  background-color: #FAFAFA;
  margin-top: 6rem;
  z-index: 1;
  position: relative;
}

.footer-contents {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  flex-wrap: wrap;
}

footer ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

footer ul li a:hover {
  color: #D72638;
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .logo-group .logo-text {
    transform: translate(0, -60px);
  }

  .logo-group .logo-icon {
    max-width: 2rem;
    min-width: 2rem;
  }

  header {
    padding: 1rem 1rem;
  }

  nav {
    display: none;
  }

  footer ul,
  footer nav,
  footer .footer-logo,
  footer .rights-top {
    display: none;
  }

  footer .rights-bottom {
    display: block;
  }

  .footer-contents {
    gap: 1rem;
  }
}`
      },
      {
        tab: "JS",
        language: "javascript",
        code: `// main.js - 모듈 통합
import { handleScrollHeader } from './modules/scrollHeader.js';
import { textAnimationHero } from './modules/textAnimation.js';
import { planeAnimationFeatures } from './modules/planeAnimation.js';

handleScrollHeader();
textAnimationHero();
planeAnimationFeatures();

// scrollHeader.js - 스크롤 이벤트 처리
export function handleScrollHeader() {
  const header = document.querySelector("header");
  const headerBtn = document.querySelector(".header-btn");
  const headerLogoIcon = document.querySelector(".logo-icon-img");
  const mapRight = document.querySelector(".map_right");
  const mapLeft = document.querySelector(".map_left");
  const stPin = document.querySelector(".st-pin");
  const ndPin = document.querySelector(".nd-pin");
  const rdPin = document.querySelector(".rd-pin");

  window.addEventListener("scroll", () => {
    const isScrolled = window.scrollY > 50;
    const isScrolledLater = window.scrollY > 150;

    // 헤더 스타일 변경
    header.classList.toggle("scrolled-header-bg", isScrolled);
    headerBtn.classList.toggle("scrolled-header-btn", isScrolled);
    headerLogoIcon.classList.toggle("scrolled-header-logoicon", isScrolled);
    
    // 맵 애니메이션
    mapRight.classList.toggle("map_right_scrolled", isScrolledLater);
    mapLeft.classList.toggle("map_left_scrolled", isScrolledLater);
    
    // 핀 숨김/표시
    if (isScrolledLater) {
      stPin.classList.add("st-pin-hide");
      ndPin.classList.add("nd-pin-hide");
      rdPin.classList.add("rd-pin-hide");
    } else {
      stPin.classList.remove("st-pin-hide");
      ndPin.classList.remove("nd-pin-hide");
      rdPin.classList.remove("rd-pin-hide");
    }
  });
}

// textAnimation.js - 텍스트 타이핑 애니메이션
export function textAnimationHero() {
  gsap.registerPlugin(TextPlugin); 
  const words = ["a Local", "a Memory", "a Laugh", "a Moment", "a Friend"];
  let current = 0;

  const changeText = () => {
    gsap.to(".hero-text", {
      text: words[current],
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        current = (current + 1) % words.length;
        setTimeout(changeText, 1000);
      }
    });
  };

  changeText();
}

// planeAnimation.js - 비행기 애니메이션
export function planeAnimationFeatures() {
  const flight = gsap.timeline({
    repeat: -1,
  });

  // 첫 번째 비행기 애니메이션
  flight.to(".flight", {
    x: -300,
    y: -550,
    duration: 7,
  })
  .to(".flight", {
    rotation: -30,
    duration: 0.5,
  })
  .to(".flight", {
    x: -1900,
    y: -50,
    duration: 15,
  }, "+=0.2");

  // 두 번째 비행기 애니메이션 (동시 실행)
  flight.fromTo(".flight-travel-categories",
    { x: -100, y: 0 },
    { x: 1850, y: 500, duration: 20 },
    0 // 타임라인 시작점에서 실행
  );
}`
      }
    ],
    sections: {
      overview: "A collaborative project where I served as the developer, responsible for building a landing page with interactive animations, scroll-triggered map transitions, and dynamic hero text to engage users.",
      roleAndStack: {
        role: ["Front-End Development"],
        stack: ["HTML", "CSS", "JavaScript"]
      },
      designAndDevelopment: [
        "Implemented GSAP-powered hero text animations with looping word transitions",
        "Built scroll-triggered map and pin animations for storytelling",
        "Developed plane animation path for visual engagement"
      ],
      challengesAndLearnings: [
        "Coordinating multiple animations while maintaining performance",
        "Timing GSAP animations to feel natural and fluid",
        "Using scroll position effectively for interactive storytelling"
      ]
    },
    nextProject: {
      id: 1,
      title: "PRELOADER"
    }
  },
];