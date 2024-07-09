import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routeConstants';
import MaterialIcon from './MaterialIcon';
import { useRippleEffect } from '../../hooks/useRippleEffect';
import PropTypes from 'prop-types';
import useAddToFavorite from '../../hooks/useAddToFavorite';
import { useEffect, useState } from 'react';

const PhotoCard = ({ photo }) => {
  const [photoData, setPhotoData] = useState({
    alt: '',
    avg_color: {},
    height: '',
    width: '',
    id: '',
    src: {},
  });
  useEffect(() => {
    photo && setPhotoData(photo);
  }, [photo]);

  const { rippleElement } = useRippleEffect();

  const { addToFavorite, favoriteObj } = useAddToFavorite();

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
        style={{ backgroundColor: photoData?.avg_color }}
        ref={rippleElement}
      >
        <figure
          className='card-banner'
          style={{ '--width': photoData?.width, '--height': photoData.height }}
        >
          <img
            src={photoData?.src?.large}
            alt={photoData?.alt}
            width={photoData?.width}
            height={photoData?.height}
            loading='lazy'
            className='img-cover'
          />
        </figure>
        <div className='card-content'>
          <button
            aria-label='Add to favorite'
            className={`icon-btn small ${favoriteObj.photos[photoData?.id] ? 'active' : ''}`}
            onClick={() => addToFavorite('photos', photoData?.id, photo)}
          >
            <MaterialIcon icon={'favorite'} />
            <div className='state-layer'></div>
          </button>
        </div>

        <Link
          to={`${routeConstants.photos_detail}/${photoData?.id}`}
          className='state-layer'
        ></Link>
      </div>
    )
  );
};
export default PhotoCard;

PhotoCard.propTypes = {
  photo: PropTypes.object,
};
