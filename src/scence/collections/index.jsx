import { useEffect, useState } from 'react';
import { CollectionCard, PageTitle } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedCollections } from '../../redux/slices/clientSlice';
import scrollToTop from '../../utils/scrollToTop';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const Collections = () => {
  const dispatch = useDispatch();
  const collectionsData = useSelector(state => state.clientReducer.client.collections.featured);
  const [collectionList, setCollectionList] = useState([]);
  const perPage = 18;
  const totalPages = Math.ceil(collectionsData?.total_results / perPage);
  const { loader, currentPage } = useInfiniteScroll({ totalPages, setCollectionList });

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    // Dispatches an action to fetch featured collections whenever the current page changes
    dispatch(fetchFeaturedCollections({ page: currentPage, per_page: perPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    // Updates the collection list state with new collections data
    // whenever collectionsData.collections is updated
    if (collectionsData.collections) {
      setCollectionList(prevData => [...prevData, ...collectionsData.collections]);
    }
  }, [collectionsData]);

  return (
    <div className='container'>
      <PageTitle title='Featured Collections' />
      <div className='collection-grid'>
        {collectionList?.map((collection, index) => (
          <CollectionCard key={index} data={collection} />
        ))}
      </div>

      <div className='load-more' role='progressbar' ref={loader}></div>
    </div>
  );
};
export default Collections;
