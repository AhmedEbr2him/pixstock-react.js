import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routeConstants';
import MaterialIcon from './MaterialIcon';
import { useRippleEffect } from '../../hooks/useRippleEffect';
import PropTypes from 'prop-types';

const PhotoCard = ({ photo }) => {
  const {
    alt,
    avg_color: backgroundColor,
    height,
    width,
    id,
    src: { large },
  } = photo;
  const favoritePhotos = JSON.parse(localStorage.getItem('favorite'));
  const { rippleElement } = useRippleEffect();

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
            className={`icon-btn small ${favoritePhotos?.photos[id] ? 'active' : ''}`}
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
