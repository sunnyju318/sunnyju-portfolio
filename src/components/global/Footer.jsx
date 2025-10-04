import { Link } from "react-router-dom";
import "./Footer.scss";
import FooterNavigation from "./FooterNavigation.jsx";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";

function Footer() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleLogoClick = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  }; // 클릭시 상단으로 부드럽게 이동

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS 초기화 (Public Key 넣기)
    emailjs.init("OtRCujMzVnsbfqM2t");

    // 폼 전송
    emailjs
      .sendForm("service_to4g768", "template_cbn24bf", e.target)
      .then(() => {
        setStatus("success");
        setFormData({ email: "", message: "" });
        alert("Message sent successfully!");
      })
      .catch((error) => {
        setStatus("error");
        console.error("Failed to send:", error);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-text">
          <p className="footer-title">Hi, I'm Jisun Ju</p>
          <p className="footer-sub">But you can call me SUNNY</p>
          <p className="footer-copy">© 2025 Sunny Ju. All rights reserved.</p>
        </div>

        <div className="footer-divider"></div>
        <div className="footer-link">
          <FooterNavigation />
          <div className="social-icon-wrapper">
            <a
              href="https://www.linkedin.com/in/jisun-ju/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="social-icon"
            >
              in
            </a>
            <a
              href="https://github.com/sunnyju318"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="social-icon"
            >
              <AiFillGithub size="2rem" />
            </a>
          </div>
        </div>

        <div className="contact-section">
          <h2>GET IN TOUCH {":)"}</h2>
          <form
            id="contact-form"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="contact-form-input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              className="contact-form-input"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button type="submit" className="contact-form-button">
              Send
            </button>
          </form>
        </div>

        <Link to="/" onClick={handleLogoClick}>
          <span className="footer-logo" aria-label="Go to home"></span>
        </Link>
        {/* 인라인 요소<link>안에 블록<div>요소를 넣는것은 HTML문법위반이므로 div에서 span으로 바꾸고 display: inline-block를 줘서 높이를 주는게 가능하도록 하였다 */}
      </div>
    </footer>
  );
}

export default Footer;
