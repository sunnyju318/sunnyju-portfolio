export const worksData = [
  {
    id: 1,
    // useParams()로 받은 id와 비교해서 해당 프로젝트를 찾을 때 사용함
    title: "PORTFOLIO",
    isFeatured: true, // featured에 들어갈 목록임을 표시
    category: "Web Development",
    tech: "React / SCSS / Framer Motion",
    shortDescription:
      "A portfolio website built with React and SCSS, featuring smooth animations and interactive storytelling.",
    links: {
      liveDemo: "https://jisun-ju.ca/",
      viewCode: "https://github.com/sunnyju318/sunnyju-portfolio",
      logDetail:
        "https://www.notion.so/5-My-Portfolio-25db6c4486108060ba46d90f8154ba68?source=copy_link",
    },
    // 외부 링크들을 모아둔 객체
    preview: {
      type: "video", // 또는 "image"
      src: "/assets/images/work/portfolio/portfolio_large.mp4",
    },
    thumbnail: "/assets/images/work/portfolio/portfolio_thumb.webp",
    codeSnippets: [
      {
        tab: "Components",
        language: "javascript",
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Mobile: Click to expand with smooth animation
function ProjectAccordion({ title = "FEATURED PROJECTS", isFeatured = true }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const featuredProjects = isFeatured
    ? worksData.filter((project) => project.isFeatured)
    : worksData;

  return (
    <div className="featured-project-list-wrapper">
      {featuredProjects.map((project, index) => (
        <div
          key={project.id}
          className={list-box {expandedItem === index ? "list-item" : ""}}
          onClick={() => handleToggle(index)}
        >
          <motion.span className="featured-project-title">
            {project.title}
          </motion.span>

          {expandedItem === index && (
            <motion.div
              className="project-preview"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <img src={project.thumbnail} alt={project.title} loading="lazy" />
              <p>{project.shortDescription}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

// Desktop: Hover to preview with split layout
function ProjectSplitView({ title = "FEATURED PROJECTS", isFeatured = true }) {
  const [expandedItem, setExpandedItem] = useState(0);

  const featuredProjects = isFeatured
    ? worksData.filter((project) => project.isFeatured)
    : worksData;

  return (
    <div className="project-split-view-wrapper">
      <div className="preview-box-desktop">
        {expandedItem !== null && (
          <img
            src={featuredProjects[expandedItem]?.thumbnail}
            alt={featuredProjects[expandedItem]?.title}
          />
        )}
      </div>

      <div className="featured-project-list-wrapper-desktop">
        {featuredProjects.map((project, index) => (
          <Link
            to={/projects/detail/{project.id}}
            key={project.id}
            onMouseEnter={() => setExpandedItem(index)}
            onMouseLeave={() => setExpandedItem(null)}
          >
            <motion.span
              animate={expandedItem === index ? { x: [0, 10, 0] } : {}}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.span>
          </Link>
        ))}
      </div>
    </div>
  );
}`,
      },
      {
        tab: "Styling",
        language: "scss",
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Design Tokens - Color System
$near-black: #040404;
$dusty-rose: #b58971;
$scarlet-red: #d13221;
$muted-beige: #e1dad2;

// Semantic Color Usage
$bg-gradient-start: $near-black;
$text-heading-dark-alt: $dusty-rose;
$bg-button: $scarlet-red;

// Breakpoint System
$breakpoints: (
  "sm": 640px,
  "md": 768px,
  "lg": 1025px,
  "xl": 1280px
);

// Responsive Mixin
@mixin respond-to($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (min-width: map.get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// Reusable Layout Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin container($max-width: 1400px) {
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 map.get($container-padding, 'sm');
  
  @include respond-to('md') {
    padding: 0 map.get($container-padding, 'md');
  }
  
  @include respond-to('lg') {
    padding: 0 map.get($container-padding, 'lg');
  }
}

// Usage Example
.featured-project-list-wrapper {
  @include container;
  padding-top: 2rem;
  
  @include respond-to('lg') {
    padding-top: 4rem;
  }
}`,
      },
      {
        tab: "Animation",
        language: "javascript",
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// GSAP-based background animation with MotionPath

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useEffect } from 'react';

gsap.registerPlugin(MotionPathPlugin);

const BackgroundAnimation = () => {
  useEffect(() => {
    const createFallingAnimation = (blurElement, pathId, delay = 0) => {
      // Set initial state
      gsap.set(blurElement, {
        motionPath: {
          path: pathId,
          autoRotate: false,
        },
        opacity: 0,
      });

      // Animate along SVG path
      gsap.to(blurElement, {
        motionPath: {
          path: pathId,
          autoRotate: false,
        },
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: "none",
        repeat: -1,
        repeatDelay: Math.random() * 10 + 5,
      });
    };

    // Apply animations
    createFallingAnimation('.left-set .blur-1', '#left-curve1', 5);
    createFallingAnimation('.left-set .blur-2', '#left-curve2', 0);
    createFallingAnimation('.left-set .blur-3', '#left-curve3', 10);

    createFallingAnimation('.right-set .blur-1', '#right-curve1', 2);
    createFallingAnimation('.right-set .blur-2', '#right-curve2', 10);
    createFallingAnimation('.right-set .blur-3', '#right-curve3', 5);
  }, []);

  return (
    <div className="background-animation">
      <svg viewBox="0 0 237.21 841.89">
        <path id="left-curve1" d="M10.5 0v173.32..." />
        <rect className="falling-blur blur-1" />
      </svg>
    </div>
  );
};`,
      },
      {
        tab: "Data",
        language: "javascript",
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Centralized project data structure

export const worksData = [
  {
    id: 1,
    title: "PORTFOLIO",
    isFeatured: true,
    category: "Web Development",
    tech: "React / SCSS / Framer Motion",
    
    links: {
      liveDemo: "https://jisun-ju.ca/",
      viewCode: "https://github.com/...",
      logDetail: "https://www.notion.so/..."
    },
    
    preview: {
      type: "video",
      src: portfolioLarge
    },
    
    codeSnippets: [
      {
        tab: "Components",
        language: "javascript",
        code: ...
      }
    ],
    
    sections: {
      overview: "...",
      roleAndStack: {
        stack: [
          "React",
          "SCSS",
          "Framer Motion",
          "GSAP",
          "Figma",
          "Illustrator",
          "GitHub"
        ]
      },
      designAndDevelopment: ["...", "..."],
      challengesAndLearnings: ["...", "..."]
    },
    
    nextProject: {
      id: 2,
      title: "INFO STORIES"
    }
  }
];

// Usage: Dynamic filtering and routing
const featuredProjects = worksData.filter(p => p.isFeatured);
const project = worksData.find(p => p.id === parseInt(id));`,
      },
      {
        tab: "Performance",
        language: "javascript",
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Mouse-following eye animation with performance optimization

const FaceIllustration = () => {
  const svgRef = useRef(null);
  const eyeElementsRef = useRef({ left: null, right: null });
  const throttleRef = useRef({ lastTime: 0, animationId: null });

  // Cache eye elements once to avoid repeated DOM queries
  const cacheEyeElements = useCallback(() => {
    if (!svgRef.current) return;
    
    if (!eyeElementsRef.current.left || !eyeElementsRef.current.right) {
      eyeElementsRef.current.left = svgRef.current.querySelector("#left-eye");
      eyeElementsRef.current.right = svgRef.current.querySelector("#right-eye");
    }
    return eyeElementsRef.current.left && eyeElementsRef.current.right;
  }, []);

  // Throttled mouse tracking with requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    
    // Throttle to ~60fps (16ms)
    if (now - throttleRef.current.lastTime < 16) return;
    throttleRef.current.lastTime = now;

    // Cancel previous frame if not yet executed
    if (throttleRef.current.animationId) {
      cancelAnimationFrame(throttleRef.current.animationId);
    }

    throttleRef.current.animationId = requestAnimationFrame(() => {
      if (!cacheEyeElements()) return;

      // Calculate movement based on cursor position
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      
      // Use translate3d for GPU acceleration
      const transform = translate3d({moveX}px, {moveY}px, 0);

      eyeElementsRef.current.left.style.transform = transform;
      eyeElementsRef.current.right.style.transform = transform;
    });
  }, [cacheEyeElements]);

  useEffect(() => {
    // Delay DOM query to ensure SVG is fully rendered
    const timer = setTimeout(() => cacheEyeElements(), 100);
    
    // Passive event listener for better scroll performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      
      if (throttleRef.current.animationId) {
        cancelAnimationFrame(throttleRef.current.animationId);
      }
    };
  }, [handleMouseMove, cacheEyeElements]);

  return <FaceSvg ref={svgRef} />;
};`,
      },
    ],
    // 실제 표시할 코드, 템플릿 리터럴(벡틱)사용으로 여러줄 지원
    // 들여쓰기, 줄바꿈 모두 보존됨
    sections: {
      overview:
        "A portfolio website built with React and SCSS, designed and developed solo from branding to deployment, featuring responsive component architecture and performance-optimized animations.",

      stack: [
        "React 19",
        "SCSS",
        "Framer Motion",
        "GSAP",
        "Figma",
        "Illustrator",
        "Photoshop",
      ],

      designProcess: {
        description:
          "Brand identity and design system created in Figma, then implemented in code using SCSS with matching design tokens.",
        images: [
          "/assets/images/work/portfolio/design_colours.webp",
          "/assets/images/work/portfolio/design_typo.webp",
        ],
        figmaLink:
          "https://www.figma.com/design/RVReNRQ6sWjbhlBpsgQ5FS/Untitled?node-id=0-1&t=6v0JBA9WRJncYoJk-1",
      },

      developmentHighlights: [
        "Built adaptive component system where ProjectAccordion (mobile) and ProjectSplitView (desktop) share identical data structures while delivering device-optimized interactions",
        "Structured SCSS architecture using design tokens, namespaced modules, and reusable mixins for consistent responsive behavior",
        "Optimized animations with DOM caching, throttling, and GPU acceleration. Disabled resource-intensive effects on mobile",
        "Converted About page to IntersectionObserver-based scroll animations for mobile accessibility with threshold hysteresis to prevent flickering",
        "Reduced media file sizes through WebP conversion and ffmpeg compression to improve loading speed",
      ],

      challengesAndLearnings: [
        "Face Illustration eye-tracking caused scroll jank. Fixed with DOM caching, throttling, requestAnimationFrame, and GPU acceleration. Disabled on mobile to balance performance and UX",
        "About page hover animations failed on mobile and assistive devices. Switched to IntersectionObserver with prefers-reduced-motion support",
        "Images and videos caused loading delays. Converted to WebP, optimized GIFs, and compressed MP4s with ffmpeg, reducing file sizes and load times",
        "Layout shifted when menu opened due to scrollbar width. Tested multiple approaches and settled on overflow: hidden as the most reliable solution",
      ],
    },
    // Array인 이유 : 항목이 리스트 형태이며 배열은 반복문 돌리기 좋고 리엑트에서 <ul><li>...</li></ul>로 쉽게 렌더링할수 있기 때문이다.
    nextProject: {
      id: 2,
      title: "SkyFrame",
    },
  },
];
