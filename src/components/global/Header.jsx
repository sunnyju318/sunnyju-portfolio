
import { Link } from "react-router-dom";
import './Header.scss';
import HeaderNavigation from "./HeaderNavigation";

function Header() {
  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo-header">
          <p>JISUN</p>
          <p>SUNNY</p>
          <p>JU.</p>
        </Link>
        <HeaderNavigation />
      </div>
    </header>
  )
}

export default Header;