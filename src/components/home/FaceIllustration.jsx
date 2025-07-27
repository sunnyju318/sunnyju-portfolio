import './FaceIllustration.scss';
import FaceSvg from '../../assets/images/face-illustration.svg?react';
import { div } from 'framer-motion/client';

function FaceIllustration() {
  return (
    <div className='face-wrapper'>
      <FaceSvg className='face-svg'/>
    </div>
  );
}

export default FaceIllustration;