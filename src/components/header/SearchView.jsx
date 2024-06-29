import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../common/IconButton';
import { toggleSearchView, searchValueInput, getSegmentValue } from '../../redux/slices/mainSlice';

const SearchView = () => {
  const dispatch = useDispatch();
  const inputRefValue = useRef(null);
  const { isSearchViewOpen, searchInputValue } = useSelector(state => state.mainReducer);

  const handleDeleteSearchValue = () => {
    inputRefValue.current.value = '';
    dispatch(searchValueInput(''));
  };

  const handleBackSearch = () => {
    inputRefValue.current.value = '';
    dispatch(toggleSearchView());
  };

  return (
    <div className={`search-veiw ${isSearchViewOpen ? 'show' : ''}`}>
      <div className='search-bar'>
        <IconButton
          addClass='search-open'
          icon='arrow_back'
          ariaLabel='Close search'
          onClick={handleBackSearch}
        />

        <div className='input-wrapper'>
          <span className='material-symbols-outlined leading-icon' aria-hidden='true'>
            search
          </span>

          <input
            type='text'
            name='search'
            placeholder='Search...'
            autoComplete='off'
            className='input-field body-large'
            ref={inputRefValue}
            defaultValue={searchInputValue}
            onChange={e => dispatch(searchValueInput(e.target.value))}
          />
        </div>

        <IconButton icon='close' ariaLabel='Close search' onClick={handleDeleteSearchValue} />
        <IconButton
          addClass='search-btn'
          icon='search'
          ariaLabel='Submit search'
          onClick={() => dispatch(toggleSearchView())}
        />
        <div className='state-layer'></div>
      </div>

      <SearchViewContent />

      <div className='list'></div>
    </div>
  );
};

const SearchViewContent = () => {
  const dispatch = useDispatch();
  const { segmentValue } = useSelector(state => state.mainReducer);
  const [segmentSelected, setSegmentSelected] = useState(segmentValue);

  const handleSegmentButton = e => {
    const value = e.currentTarget.dataset.segment_value;
    dispatch(getSegmentValue(value));
    setSegmentSelected(value);
  };

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
export default SearchView;
