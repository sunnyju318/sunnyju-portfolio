import "./NotFound.scss";
import nopage from "../../assets/illustrations/nopage.svg";
import { Link } from "react-router-dom";
import AnimatedArrow from "../../components/common/AnimatedArrow/AnimatedArrow";

function NotFound() {
  return (
    <>
      {/* React 19 네이티브 메타데이터 */}
      <title>Sunny Ju | 404</title>
      <meta
        name="description"
        content="The page you're looking for doesn't exist. Return to Sunny Ju's portfolio homepage to explore featured work and designs."
      />
      <link rel="canonical" href="https://jisun-ju.ca/404" />

      {/* Open Graph */}
      <meta property="og:title" content="404 Not Found — Sunny Ju" />
      <meta
        property="og:description"
        content="The page you're looking for doesn't exist. Return to Sunny Ju's portfolio homepage to explore featured work and designs."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jisun-ju.ca/404" />
      <meta
        property="og:image"
        content="https://jisun-ju.ca/assets/images/404-og.jpg"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="404 Not Found — Sunny Ju" />
      <meta
        name="twitter:description"
        content="The page you're looking for doesn't exist. Return to Sunny Ju's portfolio homepage to explore featured work and designs."
      />
      <meta
        name="twitter:image"
        content="https://jisun-ju.ca/assets/images/404-og.jpg"
      />

      {/* 콘텐츠 */}
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
