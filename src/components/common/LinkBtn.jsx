import { Link } from 'react-router-dom';
import { useRippleEffect } from '../../hooks/useRippleEffect';
import { useRef } from 'react';

const LinkBtn = ({ to, addClass, text }) => {
  const { rippleElement } = useRippleEffect();

  return (
    <Link to={to} className={`btn ${addClass} ? ${addClass}:""`} ref={rippleElement}>
      <span className='label-large text'>{text}</span>
      <div className='state-layer'></div>
    </Link>
  );
};
export default LinkBtn;
