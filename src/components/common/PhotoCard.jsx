import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routeConstants';
import MaterialIcon from './MaterialIcon';
import { useRippleEffect } from '../../hooks/useRippleEffect';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const PhotoCard = ({ photo }) => {
  const {
    alt,
    avg_color: backgroundColor,
    height,
    width,
    id,
    src: { large },
  } = photo;

  const { rippleElement } = useRippleEffect();
  const [favoriteObj, setFavoriteObj] = useState(
    JSON.parse(localStorage.getItem('favorite')) ?? {
      photos: {},
      videos: {},
    }
  );
  const [isActive, setIsActive] = useState(false);
  const [isdisabled, setIsDisabled] = useState(false);
  const addToFavorite = () => {
    if (!favoriteObj.photos[id]) {
    }
  };
  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteObj));
  }, [favoriteObj]);

  return (
    photo && (
      <div
        className='card grid-item'
        style={{ backgroundColor: backgroundColor }}
        ref={rippleElement}
      >
        <figure className='card-banner' style={{ '--width': width, '--height': height }}>
          <img
            src={large}
            alt={alt}
            width={width}
            height={height}
            loading='lazy'
            className='img-cover'
          />
        </figure>
        <div className='card-content'>
          <button aria-label='Add to favorite' className={`icon-btn small`} onClick={addToFavorite}>
            <MaterialIcon icon={'favorite'} />
            <div className='state-layer'></div>
          </button>
        </div>

        <Link to={`${routeConstants.photos_detail}/${id}`} className='state-layer'></Link>
      </div>
    )
  );
};
export default PhotoCard;

PhotoCard.propTypes = {
  photo: PropTypes.object,
};
