import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routeConstants';
import { useRippleEffect } from '../../hooks/useRippleEffect';
import PropTypes from 'prop-types';

const CollectionCard = ({ data }) => {
  const { rippleElement } = useRippleEffect();

  const { id, title, media_count } = data;
  return (
    <div className='grid-card list-item two-line' title={title} ref={rippleElement}>
      <div>
        <h3 className='body-large'>{title}</h3>
        <p className='body-medium label'>{media_count}</p>
      </div>
      <Link
        to={`${routeConstants.collection_detail}?collectionId=${id}&title=${title}`}
        className='state-layer'
      ></Link>
    </div>
  );
};
export default CollectionCard;

CollectionCard.propTypes = {
  data: PropTypes.object,
};
