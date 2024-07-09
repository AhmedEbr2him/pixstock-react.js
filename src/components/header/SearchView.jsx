import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../common/IconButton';
import { toggleSearchView, getSearchValueInput } from '../../redux/slices/mainSlice';
import { SearchViewContent } from '../index';

const SearchView = () => {
  const dispatch = useDispatch();
  const inputRefValue = useRef(null);
  const { isSearchViewOpen, searchInputValue } = useSelector(state => state.mainReducer);
  const [searchHistory, setSearchHistory] = useState(() => {
    const searchView = JSON.parse(localStorage.getItem('search_history'));
    return searchView ?? { items: [] };
  });

  /* SEARCH HISTORY FUNCTION */
  const updateSearchHistory = searchValue => {
    /* IF SEARCH VALUE IS ALREADY ON SEARCH HISTORY DONT ADD IT AGAIN, INSTADE OF REMOVE IT AND ADD IT AGAIN */
    if (searchHistory.items.includes(searchValue)) {
      searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
    }
    /* IF NOT ADD IT ON FIRST OF SEARCH HISTORY */
    searchHistory.items.unshift(searchValue);
    localStorage.setItem('search_history', JSON.stringify(searchHistory));
  };

  useEffect(() => {
    if (localStorage.getItem('search_history')) {
      setSearchHistory(JSON.parse(localStorage.getItem('search_history')));
    } else {
      localStorage.setItem('search_history', JSON.stringify(searchHistory));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchHistory]);

  const handleDeleteSearchValue = () => {
    inputRefValue.current.value = '';
    dispatch(getSearchValueInput(''));
  };

  const handleBackSearch = () => {
    inputRefValue.current.value = '';
    dispatch(toggleSearchView());
  };

  const handleSubmitSearch = () => {
    if (inputRefValue.current.value) {
      dispatch(toggleSearchView());
      updateSearchHistory(searchInputValue);
    }
  };

  const handleSubmitSearchKey = e => {
    if (e.key === 'Enter') {
      handleSubmitSearch();
    }
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
            onChange={e => dispatch(getSearchValueInput(e.target.value))}
            onKeyDown={handleSubmitSearchKey}
          />
        </div>

        <IconButton icon='close' ariaLabel='Close search' onClick={handleDeleteSearchValue} />
        <IconButton
          addClass='search-btn'
          icon='search'
          ariaLabel='Submit search'
          onClick={handleSubmitSearch}
        />
        <div className='state-layer'></div>
      </div>

      <SearchViewContent dispatch={dispatch} />
    </div>
  );
};

export default SearchView;
