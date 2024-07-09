import { useRippleEffect } from '../../hooks/useRippleEffect';
import MaterialIcon from '../common/MaterialIcon';
import PropTypes from 'prop-types';

const SearchList = ({ searchHistory, setSearchHistory }) => {
  const removeItem = removedIndex => {
    const updateItems = searchHistory.items.filter((_, index) => index !== removedIndex);

    // COPY OLD ITEMS ARRAY, GIVE ITEMS NEW VALUE WITH UPDATEITEMS
    const updateHistory = { ...searchHistory, items: updateItems };

    setSearchHistory(updateHistory);
    localStorage.setItem('search_history', JSON.stringify(updateHistory));
  };
  const { rippleElement } = useRippleEffect();

  return (
    <div className='list'>
      {searchHistory?.items?.slice(0, 5).map((item, index) => (
        <button
          key={index}
          type='button'
          aria-label='search history item'
          className='list-item'
          ref={rippleElement}
        >
          <MaterialIcon icon={'history'} />
          <span className='bo dy-large text'>{item}</span>
          <span className='remove-item label-medium' onClick={() => removeItem(index)}>
            Remove
          </span>
          <div className='state-layer'></div>
        </button>
      ))}
    </div>
  );
};
export default SearchList;
SearchList.propTypes = {
  searchHistory: PropTypes.object,
  setSearchHistory: PropTypes.func,
};
