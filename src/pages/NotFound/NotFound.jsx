import "./NotFound.scss";
import { Link } from "react-router-dom";

import nopage from "../../assets/illustrations/nopage.svg";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow";
import Metadata from "../../components/global/Metadata.jsx";

function NotFound() {
  return (
    <>
      <Metadata
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />

      <div className="notfound">
        <img
          src={nopage}
          alt="404 illustration - Page not found"
          className="notfound__image"
          width="500"
          height="500"
          decoding="async"
        />
        <p className="notfound__text">
          Oops… The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="notfound__link">
          <AnimatedArrow animated={true} />
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
