import "./About.scss";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow.jsx";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiSass,
  SiFigma,
  SiAdobeillustrator,
  SiAdobephotoshop,
} from "react-icons/si";
import { useEffect, useState } from "react";
import TimeInVancouver from "../../components/about/TimeInVancouver.jsx";
import Metadata from "../../components/global/Metadata.jsx";

function About() {
  const [isVancouverVisible, setIsVancouverVisible] = useState(false);

  // 스크롤 진입 시 슬라이드 인, 벗어나면 슬라이드 아웃
  useEffect(() => {
    // 상수 정의, 가시성 임계값 모듈화
    const THRESHOLDS = {
      SHOW: 0.65, // 보이는 상태로 전환(슬라이드인) 기준, 카드(이미지)가 화면에 65% 이상 노출됐다는 뜻이다
      HIDE: 0.45, // 숨김 상태로 전환(슬라이드아웃) 기준
      // 이렇게 상한, 하한을 다르게 두면 경계에서 깜박임(flicker) 방지 = Hysteresis
      // Hysteresis의 예: 온도 조절기에서 에어컨 설정온도가 25도라면 켜질때와 꺼질때의 사이를 정확히 25도가 아닌 23~27도 사이로 해야 25.1도와 24.9도 사이에서 켜지고 꺼지는 무한반복을 막을수 있다.
      OBSERVER: [0, 0.25, 0.45, 0.65, 0.7, 0.8, 1],
      // observer의 숫자들을 넘나드는 순간 콜백 실행
      // 0.45과 0.65을 넘은 이유는 정확히 그 지점에서 토글하려고.
      // 나머지는 중간 체크포인트(디버그/안정성에 도움)
    };

    // 에러가 나도 앱이 죽지 않도록 try/catch 넣기
    try {
      const cards = document.querySelectorAll(".about-wrapper__city-card");
      if (!cards.length) return;
      // .about-wrapper__city-card를 전부 찾고, 없으면 바로 종료(불필요한 셋업방지)

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      // 모든 사용자가 사용가능하도록, 사용자가 애니매이션최소화(모션줄이기)를 켜뒀다면 true.
      // 이런경우 애니메이션 없이 바로 표시함

      // 관찰콜백: 보이는 비율을 보고 토글하기
      const onIntersect = (entries) => {
        entries.forEach((entry) => {
          // entries: 이번에 가시성 변화가 생긴 카드들 목록
          const el = entry.target;
          // el: 그 카드의 DOM
          const caption = el.querySelector(".about-wrapper__city-caption");
          const r = entry.intersectionRatio;
          // r: 현재 보이는 비율(0.00 ~ 1.00 = 0% ~ 100%)

          const isVancouver = el.dataset.city === "vancouver";

          // 개발 환경에서 지금 r이 얼마인지 로그로 확인(디버깅용)
          // 개발 시: 스크롤할 때마다 "Card visibility: 0.45, visible: false" 같은 로그가 나와서 디버깅에 도움
          // 실제 사이트: 사용자가 콘솔에서 불필요한 로그를 보지 않음
          if (process.env.NODE_ENV === "development") {
            // console.log(
            //   `Card visibility: ${r.toFixed(2)}, visible: ${
            //     r >= THRESHOLDS.SHOW
            //   }`
            // );
          }

          // 모션 최소화 사용자는 항상 보이도록(토글로직 건너뜀)
          if (prefersReducedMotion) {
            caption.classList.add("is-visible");
            if (isVancouver) setIsVancouverVisible(true);
            return;
          }

          // 열기 기준: 65% 이상 보이면 open
          if (r >= THRESHOLDS.SHOW) {
            caption.classList.add("is-visible");
            if (isVancouver) setIsVancouverVisible(true);
          }
          // 닫기 기준: 45% 이하로 내려가면 close
          else if (r <= THRESHOLDS.HIDE) {
            caption.classList.remove("is-visible");
            if (isVancouver) setIsVancouverVisible(false);
          }
          // 45% ~ 65% 구간에서는 아무것도 하지 않음(깜빡임 방지용 완충)
        });
      };

      // 옵저버 만들기
      const io = new IntersectionObserver(onIntersect, {
        root: null,
        // 브라우저화면(뷰포트) 기준
        threshold: THRESHOLDS.OBSERVER,
        // 위에서 만든 체크포인트들
        rootMargin: "-60px 0px -30% 0px",
      });

      // 관잘 시작 + 정리
      cards.forEach((el) => io.observe(el));
      // 모든 .about-wrapper__city-card를 관찰 시작
      return () => io.disconnect();
      // 컴포넌트가 사라질때 관찰 해제(메모리/중복방지)
    } catch (error) {
      // 에러 캐치
      console.warn("Intersection observer setup failed:", error);
      // 예외가 나면 경고 로그만 남기고 앱은 계속 동작
    }
  }, []);
  // 의존성 배열: 마운트시 1회만 셋업

  // 이미지 로딩
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Metadata
        title="About"
        description="I'm a front-end developer with a passion for creating thoughtful, human-centered digital experiences."
        path="/about"
        ogImage="/assets/images/metadata/og_about.jpg"
      />

      {/* 콘텐츠 */}
      <div className="about-wrapper">
        {/* desktop 버전 */}
        <div className="about-wrapper__hero-content about-wrapper__hero-content--desktop">
          <h1 className="about-wrapper__hero-heading about-wrapper__hero-heading--desktop">
            <span>Hi,</span>
            <span>I'm</span>
            <span className="about-wrapper__highlight">Sunny {":)"}</span>
          </h1>
        </div>

        <div className="about-wrapper__hero">
          {/* <picture/> : 여러 해상도/ 조건에 따라 이미지를 다르게 보여주는 HTML 태그,
        <source>와 <img> 태그를 묶어주는 wrapper */}
          <picture className="about-wrapper__hero-picture">
            {!imageLoaded && (
              // ↑ 이미지 로드 전에만 스피너 표시
              <div className="loading-overlay">
                <div className="spinner" />
              </div>
            )}
            <source
              media="(min-width: 768px)"
              // 뷰포트 너비가 768px 이상이면 이 이미지 사용
              srcSet="/assets/images/about/profile-desktop.jpg"
              //  조건만족시 desktop 이미지를 로딩
              width="1200"
              height="800"
            />
            {/* 위 media 조건을 만족하지 못할경우 사용되는 기본이미지 */}
            <img
              src="/assets/images/about/profile-mobile.jpg"
              alt="Portrait of Sunny Ju, front-end developer"
              className="about-wrapper__hero-image about-wrapper__hero-image--mobile"
              fetchPriority="high"
              width="768"
              height="1024"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>
          {/* <source>는 여러개 사용할수 있으며 css media query 기반의 if-else-if 조건문처럼 작동한다.
          브라우저는 <source> 안의 조건들을 평가만 하지 렌더링하지는 않는다.
          그래서 실제 DOM에 들어가는건 <img> 하나뿐이라 퍼포먼스도 좋고 접근성도 좋다. */}

          {/* mobile 버전 */}
          <div className="about-wrapper__hero-content about-wrapper__hero-content--mobile">
            <p className="about-wrapper__hero-heading about-wrapper__hero-heading--mobile">
              <span>Hi,</span>
              <span>I'm</span>
              <span className="about-wrapper__highlight">Sunny {":)"}</span>
            </p>
            <div className="about-wrapper__hero-arrow">
              <AnimatedArrow animated={true} />
            </div>
          </div>
        </div>

        <div className="about-wrapper__intro-title">
          <h2>
            <span>I</span>
            <span className="about-wrapper__highlight">code.</span>
            <span>I</span>
            <span className="about-wrapper__highlight">design.</span>
          </h2>
        </div>

        <div className="about-wrapper__stack">
          <SiHtml5 size={32} color="#d6653d" title="HTML5" />
          <SiCss3 size={32} color="#3b8dbd" title="CSS3" />
          <SiJavascript size={32} color="#d4c74e" title="JavaScript" />
          <SiReact size={32} color="#53b6c5" title="React" />
          <SiReact size={32} color="#3DDC84" title="React Native" />
          <SiSass size={32} color="#b76387" title="SCSS" />
          <SiFigma size={32} color="#d95b40" title="Figma" />
          <SiAdobeillustrator size={32} color="#d2821b" title="Illustrator" />
          <SiAdobephotoshop size={32} color="#2a8dbd" title="Photoshop" />
        </div>

        <div className="about-wrapper__intro-body">
          <div>
            <p>
              I'm a{" "}
              <span className="about-wrapper__highlight">
                front-end developer
              </span>{" "}
              with a passion for creating thoughtful, human-centered digital
              experiences.
            </p>
            <p>
              With a background in handmade jewelry and fashion, I focus on{" "}
              <span className="about-wrapper__highlight">
                usability, clarity, and beauty
              </span>{" "}
              in everything I create, it's not just about how it looks, but how
              it works.
            </p>
          </div>
          <div>
            <p>
              Having lived and worked in Korea, Australia, the U.S., and now
              Canada, I bring a{" "}
              <span className="about-wrapper__highlight">
                flexible and global perspective
              </span>{" "}
              to every project.
            </p>
            <p>
              When I'm not building things, I enjoy sipping cappuccino while
              watching dogs, giving head pats to friendly neighborhood cats, and
              indulging in pistachio ice cream.
            </p>
          </div>
        </div>

        <div className="about-wrapper__journey">
          <p className="about-wrapper__journey-title">See My Journey</p>
          <AnimatedArrow
            animated={true}
            className="about-wrapper__journey-arrow"
          />
        </div>

        <div className="about-wrapper__section-title about-wrapper__section-title--korea">
          <h2>KOREA</h2>
        </div>

        <div className="about-wrapper__section-image">
          <div className="about-wrapper__city-card" data-city="korea">
            {/* data-city 속성은 HTML5 data attribute.
            이 카드가 'korea' 도시임을 표시하는 메타데이터로,
            CSS에서 [data-city="korea"] 선택자나
            JS에서 element.dataset.city 로 접근할 수 있음.
            지금은 필수는 아니지만, 추후 도시별 구분/디버깅에 유용 */}
            <img
              src="/assets/images/about/korea.jpg"
              alt="Scenic view representing Sunny Ju and hometown"
              width="1920"
              height="700"
              loading="lazy"
              decoding="async"
            />
            {/* loading="lazy" : 이미지나 iframe을 필요할때만 로드하게 해주는 속성이다. 사용자가 화면을 아래로 스크롤해서 해당 이미지가 뷰포트에 가까워질때 브라우저가 그때 이미지를 로딩하는 방식이다. 페이지 속도를 향상시킬수 있다. */}
            <div className="about-wrapper__city-caption">
              <p>
                I grew up in a small rural town in Korea, with a mother who
                never said no to my dreams. Her unwavering belief in me gave me
                the confidence and adaptability I carry wherever I go.
              </p>
            </div>
          </div>
        </div>

        <div className="about-wrapper__section-title about-wrapper__section-title--new-york">
          <h2>NEW YORK</h2>
        </div>

        <div className="about-wrapper__section-image">
          <div className="about-wrapper__city-card" data-city="new-york">
            <img
              src="/assets/images/about/new-york.jpg"
              alt="Sunny Ju in the New York City"
              width="1920"
              height="700"
              loading="lazy"
              decoding="async"
            />
            <div className="about-wrapper__city-caption">
              <p>
                Spent three months wandering through Manhattan. From sunsets at
                Battery Park, to crossing the Brooklyn Bridge at dusk, it was
                here I vowed to one day work.
              </p>
            </div>
          </div>
        </div>

        <div className="about-wrapper__section-title about-wrapper__section-title--brisbane">
          <h2>BRISBANE</h2>
        </div>

        <div className="about-wrapper__section-image">
          <div className="about-wrapper__city-card" data-city="brisbane">
            <img
              src="/assets/images/about/brisbane.jpg"
              alt="Market stall in Brisbane, Australia where Sunny launched BirdyJ brand"
              width="1920"
              height="700"
              loading="lazy"
              decoding="async"
            />
            <div className="about-wrapper__city-caption about-wrapper__city-caption--brisbane">
              <p>
                Over the course of five years, I launched my brand, BirdyJ,
                eventually running stalls at local markets. During the pandemic
                shutdown, I saw the limitations of offline markets. This sparked
                my journey into building online platforms and development.
              </p>
              <div className="about-wrapper__birdyj">
                <a
                  href="https://idus.kr/FptpT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-wrapper__birdyj-link"
                >
                  Visit BirdyJ {"("}KR{")"}
                </a>
                <AnimatedArrow
                  direction="right"
                  className="about-wrapper__birdyj-arrow"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-wrapper__section-title about-wrapper__section-title--sydney">
          <h2>SYDNEY</h2>
        </div>

        <div className="about-wrapper__section-image">
          <div className="about-wrapper__city-card" data-city="sydney">
            <img
              src="/assets/images/about/sydney.jpg"
              alt="Beachfront in Sydney, Australia during sunny afternoon"
              width="1920"
              height="700"
              loading="lazy"
              decoding="async"
            />
            <div className="about-wrapper__city-caption">
              <p>
                A city where I really let go and played for the first time.
                Exploring with my soul friend, strolling the beach, and rooting
                for each other as we walked into our future together. A shiny
                memory.
              </p>
            </div>
          </div>
        </div>

        <div className="about-wrapper__section-title about-wrapper__section-title--vancouver">
          <h2>VANCOUVER</h2>
        </div>

        <div className="about-wrapper__section-image">
          <div className="about-wrapper__city-card" data-city="vancouver">
            <img
              src="/assets/images/about/vancouver.jpg"
              alt="Sunny Ju attending the Web Summit event in Vancouver, Canada"
              width="1920"
              height="700"
              loading="lazy"
              decoding="async"
            />
            <div className="about-wrapper__city-caption about-wrapper__city-caption--vancouver">
              <p className="about-wrapper__city-caption-title">
                So, here I am!
              </p>
              <div className="about-wrapper__city-caption-time">
                <p>Since 2024 Aug</p>
                {isVancouverVisible && <TimeInVancouver />}
              </div>
            </div>
          </div>
        </div>

        <div className="about-wrapper__ending-quote">
          <p>Still Surviving {":)"}</p>
        </div>
      </div>
    </>
  );
}

export default About;
