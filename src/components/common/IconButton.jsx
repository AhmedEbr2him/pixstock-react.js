import { useEffect, useRef } from 'react';
import useRipple from '../../hooks/useRipple';

const IconButton = ({ ariaLabel, icon, moreIcon, addClass, onClick }) => {
  return (
    <button
      className={`icon-btn ${addClass ? addClass : ''}`}
      aria-label={ariaLabel}
      data-ripple
      onClick={onClick}
    >
      <span className='material-symbols-outlined' aria-hidden='true'>
        {icon}
        {moreIcon}
      </span>
      <div className='state-layer'></div>
    </button>
  );
};
export default IconButton;
