
import './NotFound.scss';
import nopage from '../../assets/images/nopage.svg';
import { Link } from 'react-router-dom';
import AnimatedArrow from '../../components/common/AnimatedArrow/AnimatedArrow';

function NotFound(){
  return(
<div className='notfound-wrapper'>
  <img src={nopage} alt="Page not found" />
  <p>Oops… The page you're looking for doesn't exist.</p>
  <Link
          to='/'
          className='not-found-back-to-home'>
          <AnimatedArrow animated={true} />
          Back to Home
        </Link>
</div>
  )
}

export default NotFound;