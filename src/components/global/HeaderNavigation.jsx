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
    <nav className="header-navigation">
      <ul>
        <li>
          <Link
            className={`header-navigation__link ${
              location.pathname === "/projects" ||
              location.pathname.startsWith("/projects/")
                ? "header-navigation__link--active"
                : ""
            }`}
            to="/projects"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            className={`header-navigation__link ${
              location.pathname === "/about"
                ? "header-navigation__link--active"
                : ""
            }`}
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`header-navigation__link ${
              location.pathname === "/sandbox"
                ? "header-navigation__link--active"
                : ""
            }`}
            to="/sandbox"
          >
            Sandbox
          </Link>
        </li>
        {/* Link는 내부적으로 <a> 태그를 렌더링한다. */}
      </ul>

      <div className="header-navigation__icons">
        <button
          className={`header-navigation__button ${
            isScrolled ? "header-navigation__button--scrolled" : ""
          }`}
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
