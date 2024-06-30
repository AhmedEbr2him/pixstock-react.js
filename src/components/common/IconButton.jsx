import { useEffect, useRef } from 'react';

const IconButton = ({ ariaLabel, icon, moreIcon, addClass, onClick, onKeyDown }) => {
  return (
    <button
      className={`icon-btn ${addClass ? addClass : ''}`}
      aria-label={ariaLabel}
      data-ripple
      onClick={onClick}
      onKeyDown={onKeyDown}
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
