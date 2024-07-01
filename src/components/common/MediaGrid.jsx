import Skeleton from './Skeleton';
import { PhotoCard, VideoCard } from '../';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MediaGrid = ({ data, isLoading }) => {
  return (
    <>
      <div className='media-grid'>
        {isLoading && <Skeleton />}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {data?.photos &&
              data?.photos?.map((photo, index) => (
                <PhotoCard key={index} itemData={photo} index={index} />
              ))}

            {data?.videos &&
              data?.videos?.map((video, index) => (
                <VideoCard key={index} videoData={video} index={index} />
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};
export default MediaGrid;
