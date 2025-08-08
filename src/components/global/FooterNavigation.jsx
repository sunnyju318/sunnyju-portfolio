
import { Link } from "react-router-dom";
import './FooterNavigation.scss';

function FooterNavigation({ setIsContactOpen, isContactOpen }) {
  return (
    <nav className="footer-nav-wrapper">
      <div className="footer-col">
        <Link to="/"
          className="nav-plain">Home</Link>
        <Link to="/projects" className="nav-highlight">Projects</Link>
      </div>
      <div className="footer-col">
        <Link to="/about"
          className="nav-plain">About</Link>
        <Link to="/sandbox"
          className="nav-plain">Sandbox</Link>
        <button 
        className="nav-highlight"
          onClick={() => setIsContactOpen(!isContactOpen)}
        >
          Contact
        </button>
      </div>
    </nav>
  )
}

export default FooterNavigation;
