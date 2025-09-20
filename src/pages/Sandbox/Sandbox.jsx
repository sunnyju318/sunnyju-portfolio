import './Sandbox.scss';
import { Link } from 'react-router-dom';
import AnimatedArrow from '../../components/common/AnimatedArrow/AnimatedArrow.jsx';

function Sandbox() {
  return (
    <>
      {/* React 19 Native Metadata */}
      <title>Sunny Ju | Sandbox</title>
      <meta
        name="description"
        content="A playground of UI experiments, micro-interactions, and performance tests by Sunny Ju."
      />
      <link rel="canonical" href="https://jisun-ju.ca/sandbox" />

      {/* Open Graph */}
      <meta property="og:title" content="Sandbox — Sunny Ju" />
      <meta
        property="og:description"
        content="A playground of UI experiments, micro-interactions, and performance tests by Sunny Ju." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jisun-ju.ca/sandbox" />
      <meta property="og:image" content="https://jisun-ju.ca/assets/images/sandbox-og.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sandbox — Sunny Ju" />
      <meta
        name="twitter:description"
        content="A playground of UI experiments, micro-interactions, and performance tests by Sunny Ju." />
      <meta name="twitter:image" content="https://jisun-ju.ca/assets/images/sandbox-og.jpg" />

      {/* 콘텐츠 */}
      <div className='sandbox-wrapper'>
        <div className='coming-soon-wrapper'>
          <h1>Coming Soon</h1>
          <Link
            to='/'
            className='back-to-home'>
            <AnimatedArrow animated={true} />
            Back to Home
          </Link>
        </div>
      </div>

    </>
  )
}

export default Sandbox;