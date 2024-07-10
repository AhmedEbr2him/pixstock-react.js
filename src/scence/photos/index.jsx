import { useDispatch, useSelector } from 'react-redux';
import { PageTitle, PhotoCard } from '../../components';
import { fetchCuratedPhotos } from '../../redux/slices/clientSlice';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import scrollToTop from '../../utils/scrollToTop';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const Photos = () => {
  const dispatch = useDispatch();
  const PhotosData = useSelector(state => state.clientReducer.client.photos.curated);
  const isPhotosLoading = useSelector(
    state => state.clientReducer.isLoading.photos.fetchCuratedPhotos
  );

  const [photosDataList, setPhotosDataList] = useState([]);
  let totalPages = 0;
  const perPage = 30;
  totalPages = Math.ceil(PhotosData?.total_results / perPage);
  const { loader, currentPage } = useInfiniteScroll({ totalPages, setPhotosDataList });

  useEffect(() => {
    scrollToTop();
  }, []);

  // Dispatches an action to fetch curated photos whenever the current page changes
  useEffect(() => {
    dispatch(fetchCuratedPhotos({ page: currentPage, per_page: perPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    // Updates the photos list state with new photos data
    // whenever photosData is updated
    if (PhotosData.photos) {
      setPhotosDataList(prevData => [...prevData, ...PhotosData.photos]);
    }
  }, [PhotosData]);

  return (
    <div className='container'>
      <PageTitle title='Curated Photos' />

      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {photosDataList?.map((photo, index) => (
              <PhotoCard key={`${photo.id}-${index}`} photo={photo} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {!isPhotosLoading && <div className='load-more' role='progressbar' ref={loader}></div>}
    </div>
  );
};
export default Photos;
