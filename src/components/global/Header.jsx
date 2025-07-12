
import { Link } from "react-router-dom";
import './Header.scss';

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <p>JISUN</p>
        <p>SUNNY</p>
        <p>JU.</p>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/work">Work</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/sandbox">Sandbox</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;