
import { Link } from "react-router-dom";
import './FooterNavigation.scss';

function FooterNavigation() {
  return (
    <nav className="footer-nav-wrapper">
      <div className="footer-col">
        <Link to="/">Home</Link>
        <Link to="/projects" className="nav-highlight">Projects</Link>
      </div>
      <div className="footer-col">
        <Link to="/about">About</Link>
        <Link to="/sandbox">Sandbox</Link>
        <Link to="/contact" className="nav-highlight">Contact</Link>
      </div>
    </nav>
  )
}

export default FooterNavigation;
