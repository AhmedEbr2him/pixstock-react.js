import './favorite.css';
import { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import PhotoCard from '../../components/common/PhotoCard';
import VideoCard from '../../components/common/VideoCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Favorite = () => {
  const [segmentValue, setSegmentValue] = useState('photos');
  const segmentSelected = segmentValue;
  const favoritePhotos = JSON.parse(localStorage.getItem('favorite'));

  return (
    <div className='favorite-page'>
      <div className='container'>
        <PageTitle title='Favorite Page' />

        <div className='btn-group'>
          <button
            className={`btn-segment ${segmentSelected === 'photos' ? 'selected' : ''}`}
            data-ripple
            data-segment_value='photos'
            onClick={() => setSegmentValue('photos')}
          >
            <span className='material-symbols-outlined' aria-hidden='true'>
              image
            </span>
            <span className='label-large'>Photos</span>
            <div className='state-layer'></div>
          </button>

          <button
            className={`btn-segment ${segmentSelected === 'videos' ? 'selected' : ''}`}
            data-ripple
            data-segment_value='videos'
            onClick={() => setSegmentValue('videos')}
          >
            <span className='material-symbols-outlined' aria-hidden='true'>
              videocam
            </span>
            <span className='label-large'>Videos</span>
            <div className='state-layer'></div>
          </button>
        </div>
        <div className='media-grid'>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
            <Masonry columnsCount={2} gutter='10px'>
              {Object.values(favoritePhotos[segmentValue]).map((item, index) => {
                if (segmentValue === 'photos') {
                  return <PhotoCard key={index} photo={item} />;
                } else if (segmentValue === 'videos') {
                  return <VideoCard key={index} video={item} />;
                } else {
                  return null;
                }
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </div>
  );
};
export default Favorite;
