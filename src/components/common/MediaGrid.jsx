import Skeleton from './Skeleton';
import PhotoCard from './PhotoCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const MediaGrid = ({ data, isLoading }) => {
  return (
    <div>
      {isLoading && <Skeleton />}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
        <Masonry columnsCount={2} gutter='10px'>
          {data?.photos?.map((item, index) => (
            <PhotoCard key={index} itemData={item} index={index} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
export default MediaGrid;
