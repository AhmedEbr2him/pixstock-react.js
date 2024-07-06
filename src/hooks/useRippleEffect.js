import { useEffect, useRef } from 'react';

export const useRippleEffect = function () {
  const rippleElement = useRef(null);

  // REMOVE RIPPLE ELEMENT
  const removeRipple = ripple => {
    ripple.animate(
      {
        opacity: [1, 0],
      },
      {
        fill: 'forwards',
        duration: 500,
      }
    );
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  useEffect(() => {
    const handlePointerDown = e => {
      e.stopImmediatePropagation();
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      rippleElement?.current.appendChild(ripple);

      // ADD RIPPLE EFFECT
      const isNotIconBtn = !rippleElement?.current.classList.contains('icon-btn');
      if (isNotIconBtn) {
        const rippleSize = Math.max(
          rippleElement.current.clientWidth,
          rippleElement.current.clientHeight
        );

        ripple.style.top = `${e.layerY}px`;
        ripple.style.left = `${e.layerX}px`;
        ripple.style.width = `${rippleSize}px`;
        ripple.style.height = `${rippleSize}px`;
      }

      // REMOVE RIPPLE FROM DOM
      ripple.addEventListener('pointerleave', removeRipple(ripple));
      ripple.addEventListener('pointerup', removeRipple(ripple));
      // CLEAN UP FUNCTION TO REMOVE EVENT
      return () => {
        ripple.removeEventListener('pointerleave', removeRipple(ripple));
        ripple.removeEventListener('pointerup', removeRipple(ripple));
      };
    };

    const currentElement = rippleElement.current;
    if (currentElement) {
      currentElement.addEventListener('pointerdown', handlePointerDown);
    }
    // CLEAN UP FUNCTION TO REMOVE EVENT
    return () => {
      if (currentElement) {
        currentElement.removeEventListener('pointerdown', handlePointerDown);
      }
    };
  }, []);

  return { rippleElement };
};
