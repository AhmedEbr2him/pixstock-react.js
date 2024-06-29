import { useEffect } from 'react';
import { createElement } from 'react';

const useRipple = function (rippleElementRef) {
  useEffect(() => {
    const rippleFunction = function (e) {
      e.stopImmediatePropagation();

      const rippleElement = document.createElement('div');
      rippleElement.classList.add('ripple');

      const removeRipple = () => {
        rippleElement.animate(
          {
            opacity: 0,
          },
          {
            fill: 'forwards',
            duration: 600,
          }
        );
        setTimeout(() => {
          rippleElement.remove();
        }, 100);
      };

      this.addEventListener('pointerup', removeRipple);
      this.addEventListener('pointerleave', removeRipple);

      const rippleSize = Math.max(rippleElementRef.clientWidth, rippleElementRef.clientHeight);
      rippleElement.style.top = `${e.layerY}px`;
      rippleElement.style.left = `${e.layerX}px`;
      rippleElement.style.width = `${rippleSize}px`;
      rippleElement.style.height = `${rippleSize}px`;
    };

    rippleElementRef.current.addEventListener('pointerdown', rippleFunction());
    return () => {
      rippleElementRef.current.removeEventListener('pointerdown', rippleFunction);
    };
  }, []);
};

export default useRipple;
