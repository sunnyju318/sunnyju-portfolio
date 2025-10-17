import "./Footer.scss";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

import FooterNavigation from "./FooterNavigation.jsx";

function Footer() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("idle");
  // idle | sending | success | error
  const [isExpanded, setIsExpanded] = useState(false);
  // 폼 텍스트 영역 확장 상태관리
  const location = useLocation(); // 현재 경로 감지

  // =============== Form Reset on Page Change ===============

  useEffect(() => {
    setFormData({ email: "", message: "" });
    setStatus("");
    setIsExpanded(false);
  }, [location.pathname]);
  // 페이지 전환시 폼 리셋

  // =============== Event Handlers ===============

  const handleLogoClick = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  }; // 클릭시 상단으로 부드럽게 이동

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("sending"); // 버튼을 비활성화 상태로
    emailjs.init("OtRCujMzVnsbfqM2t");

    // EmailJS 초기화 (Public Key 넣기)
    emailjs.init("OtRCujMzVnsbfqM2t");

    // 폼 전송
    emailjs
      .sendForm("service_to4g768", "template_cbn24bf", e.target)
      .then(() => {
        setStatus("success");
        setFormData({ email: "", message: "" });
        setIsExpanded(false);
        // 2초 뒤 다시 "Send"로 복귀
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      })
      .catch((error) => {
        setStatus("error");
        console.error("Failed to send:", error);
        // 에러도 2초 후 복귀
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      });
  };

  // 텍스트에리아 포커스, 블러 제어
  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => {
    if (!formData.message.trim()) {
      setIsExpanded(false); // 내용 없으면 접기
    }
  };

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        {/* =============== Footer Text =============== */}

        <div className="footer__text">
          <p className="footer__title">Hi, I'm Jisun Ju</p>
          <p className="footer__subtitle">But you can call me SUNNY</p>
          <p className="footer__copyright">
            © 2025 Sunny Ju. All rights reserved.
          </p>
        </div>

        {/* =============== Divider =============== */}

        <div className="footer__divider" id="footer-boundary"></div>

        {/* =============== Navigation & Socials =============== */}

        <div className="footer__link">
          <FooterNavigation />
          <div className="footer__social-wrapper">
            <a
              href="https://www.linkedin.com/in/jisun-ju/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="footer__social-icon"
            >
              in
            </a>
            <a
              href="https://github.com/sunnyju318"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="footer__social-icon"
            >
              <AiFillGithub size="2rem" />
            </a>
          </div>
        </div>

        {/* =============== Contact Form =============== */}

        <div className="footer__contact-section">
          <h2>GET IN TOUCH {":)"}</h2>
          <form
            id="contact-form"
            className={`footer__contact-form ${
              isExpanded ? "footer__contact-form--expanded" : ""
            }`}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="footer__contact-input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              className="footer__contact-input"
              value={formData.message}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button
              type="submit"
              className={`footer__contact-button ${
                status ? `footer__contact-button--${status}` : ""
              }`}
              disabled={status === "sending"} // 전송 중에는 클릭 비활성화
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Sent!"
                : status === "error"
                ? "Failed"
                : "Send"}
            </button>
          </form>
        </div>

        {/* =============== Logo (Scroll to Top) =============== */}

        <Link to="/" onClick={handleLogoClick}>
          <span className="footer__logo" aria-label="Go to home"></span>
        </Link>
        {/* 인라인 요소<link>안에 블록<div>요소를 넣는것은 HTML문법위반이므로 div에서 span으로 바꾸고 display: inline-block를 줘서 높이를 주는게 가능하도록 하였다 */}
      </div>
    </footer>
  );
}

export default Footer;
