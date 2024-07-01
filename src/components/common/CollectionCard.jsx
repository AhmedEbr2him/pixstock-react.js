import { Link } from 'react-router-dom';
import { routeConstants } from '../../constants/routeConstants';

const CollectionCard = ({ data }) => {
  const { id, title, media_count } = data;
  return (
    <div className='grid-card list-item two-line' title={title}>
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
