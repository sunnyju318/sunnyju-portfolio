
import { Link } from "react-router-dom";
import './HeaderNavigation.scss';
import NavigationDropdown from "./NavigationDropdown.jsx";
import { useState } from "react";

function HeaderNavigation({isScrolled, isContactOpen, setIsContactOpen}) {


  const onClose = () => {
    setIsContactOpen(false);
  };

  // Link는 내부 페이지 이동용이고 a는 다른 사이트 연결용이다
  return (
    <nav className="menu-navigation-header">
      <ul>
        <li>
          <Link className="nav-link" to="/projects">Projects</Link>
        </li>
        <li>
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li>
          <Link className="nav-link" to="/sandbox">Sandbox</Link>
        </li>
        {/* Link는 내부적으로 <a> 태그를 렌더링한다. */}
      </ul>

      <div className="menu-icons-header">
        <button
          className={`nav-link-button ${isScrolled ? 'scrolled' : ''}`}
          onClick={() => setIsContactOpen(!isContactOpen)}
        >
          Contact
        </button>

        <NavigationDropdown 
        isMenuOpen={isContactOpen}
        onToggle={() => setIsContactOpen(!isContactOpen)} 
        onClose={onClose}
        contactOnly={true}
        />

        <a
          className={`nav-link-button ${isScrolled ? 'scrolled' : ''}`}
          href="/jisunju_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="resume"
        >
          Resume
        </a>
      </div>


    </nav>
  )
}

export default HeaderNavigation;