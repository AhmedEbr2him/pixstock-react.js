import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSegmentValue } from '../../redux/slices/mainSlice';

const SearchViewContent = ({ dispatch }) => {
  const location = useLocation();
  const { segmentValue } = useSelector(state => state.mainReducer);
  const [segmentSelected, setSegmentSelected] = useState(segmentValue);

  const handleSegmentButton = e => {
    const value = e.currentTarget.dataset.segment_value;
    //  const value = e.currentTarget.getAttribute('data-segment_value');
    dispatch(getSegmentValue(value));
    setSegmentSelected(value);
  };

  // ADD SELECTED CLASS TO SEGMENT IF WE ARE IN VIDEOS OR PHOTOS
  useEffect(() => {
    const pathSegment = location.pathname.slice(1);

    if (pathSegment === 'videos') {
      setSegmentSelected('videos');
    } else {
      setSegmentSelected('photos');
    }
  }, [location.pathname]);

  return (
    <div className='search-veiw-content'>
      <div className='btn-group'>
        <button
          className={`btn-segment ${segmentSelected === 'photos' ? 'selected' : ''}`}
          data-ripple
          data-segment_value='photos'
          onClick={handleSegmentButton}
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
          onClick={handleSegmentButton}
        >
          <span className='material-symbols-outlined' aria-hidden='true'>
            videocam
          </span>
          <span className='label-large'>Videos</span>
          <div className='state-layer'></div>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};
export default SearchViewContent;
