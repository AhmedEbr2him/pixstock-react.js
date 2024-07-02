import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularVideos } from '../../redux/slices/clientSlice';
import scrollToTop from '../../utils/scrollToTop';
import { PageTitle, VideoCard } from '../../components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useInfinitieScroll from '../../hooks/useInfiniteScroll';
import Skeleton from '../../components/common/Skeleton';
const Videos = () => {
  const dispatch = useDispatch();
  const initialVideosData = useSelector(state => state.clientReducer.client.videos.popular);
  const isVideosLoading = useSelector(
    state => state.clientReducer.isLoading.videos.fetchPopularVideos
  );
  const [videosData, setVideosData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const loader = useRef(null);
  const [isLoad, setIsLoad] = useState(true);
  let totalPages = 0;
  const perPage = 30;
  totalPages = Math.ceil(initialVideosData?.total_results / perPage);

  /* FETCH MAIN DATA */
  useEffect(() => {
    dispatch(fetchPopularVideos({ page: currentPage, per_page: perPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (initialVideosData.videos) {
      setVideosData(prevData => [...prevData, ...initialVideosData.videos]);
    }
  }, [initialVideosData]);

  /* LOAD MORE && INFINITE SCROLL */
  useEffect(() => {
    const loadMore = () => {
      if (
        loader.current &&
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

  /* SCROLL TO TOP*/
  useEffect(() => {
    scrollToTop();
  }, []);

  if (isVideosLoading) {
    <div className='media-grid-skeleton'>
      <Skeleton />
    </div>;
  }
  return (
    <div className='container'>
      <PageTitle title='Popular Videos' />

      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {videosData &&
              videosData.map((video, index) => <VideoCard key={index} videoData={video} />)}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div className='load-more' role='progressbar' ref={loader}></div>
    </div>
  );
};
export default Videos;
