import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionDetail } from '../../redux/slices/clientSlice';
import { useLocation } from 'react-router-dom';
import { urlDecode } from '../../utils/urlDecode';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { PageTitle, PhotoCard, VideoCard } from '../../components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Skeleton from '../../components/common/Skeleton';

const CollectionsDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const collectionDetail = useSelector(state => state.clientReducer.client.collections.detail);
  const isCollectionDetailLoading = useSelector(
    state => state.clientReducer.isLoading.collection.fetchCollectionDetail
  );

  const [collectionDetailDataList, setCollectionDetailDataList] = useState([]);
  const objectId = urlDecode(location.search.slice(1));
  const perPage = 30;
  const totalPages = Math.ceil(collectionDetail?.total_results / perPage);
  const { loader, isLoad, currentPage } = useInfiniteScroll({
    totalPages,
  });

  // Dispatches an action to fetch  collections detail whenever the current page changes
  useEffect(() => {
    dispatch(
      fetchCollectionDetail(objectId.collectionId, { per_page: perPage, page: currentPage })
    );
  }, [dispatch, objectId.collectionId, currentPage]);

  useEffect(() => {
    // Updates the collection data list state with new collection data
    // whenever collectionDetail is updated
    if (collectionDetail?.media) {
      setCollectionDetailDataList(prevData => [...prevData, ...collectionDetail.media]);
    }
  }, [collectionDetail]);
  // RE RENDER SET COLLECTION DATA DETAIL LIST WHEN THE SEARCH IS UPDATED
  useEffect(() => {
    setCollectionDetailDataList([]);
  }, [location.search]);

  return (
    <div className='container'>
      <PageTitle title='Collection Detail' />
      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {collectionDetailDataList?.map((item, index) => {
              if (item.type === 'Photo') {
                return <PhotoCard key={index} itemData={item} />;
              } else if (item.type === 'Video') {
                return <VideoCard key={index} videoData={item} />;
              } else {
                return null;
              }
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {isCollectionDetailLoading && <Skeleton />}
      <div className='load-more' ref={loader}></div>
    </div>
  );
};
export default CollectionsDetail;
