import { Link, useLocation } from "react-router-dom";
import "./HeaderNavigation.scss";
import NavigationDropdown from "./NavigationDropdown.jsx";

function HeaderNavigation({ isScrolled, isContactOpen, setIsContactOpen }) {
  const onClose = () => {
    setIsContactOpen(false);
  };

  const location = useLocation();

  // Link는 내부 페이지 이동용이고 a는 다른 사이트 연결용이다
  return (
    <nav className="menu-navigation-header">
      <ul>
        <li>
          <Link
            className={`nav-link ${
              location.pathname === "/projects" ||
              location.pathname.startsWith("/projects/")
                ? "active"
                : ""
            }`}
            to="/projects"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`nav-link ${
              location.pathname === "/sandbox" ? "active" : ""
            }`}
            to="/sandbox"
          >
            Sandbox
          </Link>
        </li>
        {/* Link는 내부적으로 <a> 태그를 렌더링한다. */}
      </ul>

      <div className="menu-icons-header">
        <button
          className={`nav-link-button ${isScrolled ? "scrolled" : ""}`}
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
      </div>
    </nav>
  );
}

export default HeaderNavigation;
