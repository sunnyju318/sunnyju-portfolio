import './Sandbox.scss';
import { Link } from 'react-router-dom';
import AnimatedArrow from '../../components/common/animatedArrow/AnimatedArrow';

function Sandbox() {
  return (
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
  )
}

export default Sandbox;