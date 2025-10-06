import { useState, useEffect, useRef } from "react";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";
import "./ScrollToTop.scss";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const boundary = document.getElementById("footer-boundary");
      const button = buttonRef.current;

      if (boundary && button) {
        const boundaryRect = boundary.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 푸터 경계가 버튼 위치(화면 하단 80px)보다 위에 있으면
        if (boundaryRect.top < windowHeight - 80) {
          // 버튼을 푸터 위로 밀어올림
          const offset = windowHeight - boundaryRect.top + 20;
          button.style.bottom = `${offset}px`;
        } else {
          // 일반 위치
          button.style.bottom = "2rem";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <AnimatedArrow direction="up" className="scroll-arrow" />
    </button>
  );
}

export default ScrollToTop;
