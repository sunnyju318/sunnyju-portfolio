
import { Link } from "react-router-dom";
import './HeaderNavigation.scss';
import MobileNavigation from "./MobileNavigation.jsx";
import { useState } from "react";

function HeaderNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
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
          className="nav-link-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Contact
        </button>

        <MobileNavigation 
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)} 
        onClose={onClose}
        contactOnly={true}
        />

        <a
          className="nav-link-button"
          href="#"
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