import { useState, useEffect } from "react";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import "./ScrollToTop.scss";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 조건 1: 300px 이상 스크롤
      const scrolledEnough = scrollY > 300;

      // 조건 2: 페이지가 충분히 긴가? (최소 2배 이상 스크롤 가능)
      const pageIsLongEnough = documentHeight > windowHeight * 3;

      // 조건 3: 푸터가 화면에 안 보이는가?
      const footer = document.getElementById("footer-boundary");
      let footerNotVisible = true;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // 푸터 상단이 화면 하단보다 아래에 있으면 (아직 안 보임)
        footerNotVisible = footerRect.top > windowHeight;
      }

      // 세 조건 모두 만족해야 버튼 표시
      setIsVisible(scrolledEnough && pageIsLongEnough && footerNotVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "scroll-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <AnimatedArrow direction="up" className="scroll-to-top__arrow" />
    </button>
  );
}

export default ScrollToTop;
