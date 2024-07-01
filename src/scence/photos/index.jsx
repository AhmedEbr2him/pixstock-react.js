import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcon, MediaGrid, PageTitle, PhotoCard } from '../../components';
import { routeConstants } from '../../constants/routeConstants';
import { fetchCuratedPhotos } from '../../redux/slices/clientSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Photos = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const initialPhotosData = useSelector(state => state.clinetReducer.client.photos.curated);
  const isPhotosLoading = useSelector(
    state => state.clinetReducer.isLoading.photos.fetchCuratedPhotos
  );
  const [photosData, setPhotoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const loader = useRef(null);
  const [isLoad, setIsLoad] = useState(true);
  let totalPages = 0;
  const perPage = 30;
  totalPages = Math.ceil(initialPhotosData?.total_results / perPage);

  useEffect(() => {
    dispatch(fetchCuratedPhotos({ page: currentPage, per_page: perPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (initialPhotosData.photos) {
      setPhotoData(prevData => [...prevData, ...initialPhotosData.photos]);
    }
  }, [initialPhotosData]);

  useEffect(() => {
    const loadMore = () => {
      if (
        loader.current.getBoundingClientRect().top < window.innerHeight * 2 &&
        currentPage <= totalPages &&
        isLoad
      ) {
        setTimeout(() => {
          setIsLoad(true);
          setCurrentPage(prevPage => prevPage + 1);
        }, 1500);
        setIsLoad(false);
      }
    };
    window.addEventListener('scroll', loadMore);

    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [currentPage, totalPages, isLoad]);
  return (
    <div className='container'>
      <PageTitle title='Curated Photos' />

      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {photosData?.map((photo, index) => (
              <PhotoCard key={index} itemData={photo} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      <div className='load-more' role='progressbar' ref={loader}></div>
    </div>
  );
};
export default Photos;
