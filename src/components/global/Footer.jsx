
import { Link } from "react-router-dom";
import './Footer.scss';
import FooterNavigation from "./FooterNavigation.jsx";


function Footer({isScrolled, isContactOpen, setIsContactOpen, setIsMenuOpen}) {
  const handleLogoClick = () =>{
window.scroll({top:0, behavior: 'smooth'});
  }; // 클릭시 상단으로 부드럽게 이동

  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-text">
          <p className="footer-title">Hi, I'm Jisun Ju</p>
          <p className="footer-sub">But you can call me SUNNY</p>
        </div>

        <div className="footer-divider"></div>
        <div className="footer-link">
        <FooterNavigation 
        isScrolled={isScrolled}
        setIsContactOpen={setIsContactOpen} 
        isContactOpen={isContactOpen}
        setIsMenuOpen={setIsMenuOpen}
        />
        <div className='social-icon-wrapper'>
          <a
            href="https://www.linkedin.com/in/jisun-ju/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className='social-icon'
          >
            in
          </a>
          <a
            href="https://github.com/sunnyju318"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile" className='social-icon'
          >
            git
          </a>
        </div>
        </div>
        <a
          className='email-address'
          href='mailto:sunnyju318@naver.com'>
          Tap tap, email me! sunnyju318@naver.com
        </a>
        <div className="footer-copy">
          <small>© 2025 Sunny Ju. All rights reserved.</small>
        </div>
        <Link to='/' onClick={handleLogoClick}>
          <span className="footer-logo" aria-label="Go to home"></span>
        </Link>
        {/* 인라인 요소<link>안에 블록<div>요소를 넣는것은 HTML문법위반이므로 div에서 span으로 바꾸고 display: inline-block를 줘서 높이를 주는게 가능하도록 하였다 */}
      </div>
    </footer>
  )
}

export default Footer;