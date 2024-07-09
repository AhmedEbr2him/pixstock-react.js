import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routeConstants';
import MaterialIcon from './MaterialIcon';
import { useRippleEffect } from '../../hooks/useRippleEffect';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useAddToFavorite from '../../hooks/useAddToFavorite';

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

  const { addToFavorite, isDisabled, favoriteObj } = useAddToFavorite();

  //   const storedFavorites = JSON.parse(localStorage.getItem('favorite')) ?? {
  //     photos: {},
  //     videos: {},
  //   };

  //   if (storedFavorites[type][id]) {
  //     delete storedFavorites[type][id];
  //     setIsDisabled(true);
  //   } else {
  //     storedFavorites[type][id] = data;
  //     setIsDisabled(true);
  //   }
  //   setFavoriteObj(storedFavorites);
  //   localStorage.setItem('favorite', JSON.stringify(storedFavorites));
  // };
  // useEffect(() => {
  //   localStorage.setItem('favorite', JSON.stringify(favoriteObj));
  // }, [favoriteObj]);
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
          <button
            aria-label='Add to favorite'
            className={`icon-btn small ${favoriteObj.photos[id] ? 'active' : ''}`}
            onClick={() => addToFavorite('photos', id, photo)}
          >
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
