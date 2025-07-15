
import { Link } from "react-router-dom";
import './FooterNavigation.scss';

function FooterNavigation() {
  return (
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
  )
}

export default FooterNavigation;