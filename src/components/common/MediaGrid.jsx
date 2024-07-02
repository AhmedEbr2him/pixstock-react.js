import Skeleton from './Skeleton';
import { PhotoCard, VideoCard } from '../';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useSelector } from 'react-redux';

const MediaGrid = ({ children }) => {
  // GET VIDEO DATA HERE CAUS NETWORK ERROR HANDLE
  const videosData = useSelector(state => state.clientReducer.client.videos.popular);

  return (
    <>
      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {children}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};
export default MediaGrid;
