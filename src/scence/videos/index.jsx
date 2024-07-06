import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularVideos } from '../../redux/slices/clientSlice';
import scrollToTop from '../../utils/scrollToTop';
import { PageTitle, VideoCard } from '../../components';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Skeleton from '../../components/common/Skeleton';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
const Videos = () => {
  const dispatch = useDispatch();
  const videosData = useSelector(state => state.clientReducer.client.videos.popular);
  const isVideosLoading = useSelector(
    state => state.clientReducer.isLoading.videos.fetchPopularVideos
  );
  const [videosDataList, setVideosDataList] = useState([]);
  let totalPages = 0;
  const perPage = 30;
  totalPages = Math.ceil(videosData?.total_results / perPage);
  const { loader, currentPage } = useInfiniteScroll({ totalPages, setVideosDataList });

  // Dispatches an action to fetch featured collections whenever the current page changes
  useEffect(() => {
    dispatch(fetchPopularVideos({ page: currentPage, per_page: perPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    // Updates the videos list state with new videos data
    // whenever videosData is updated
    if (videosData.videos) {
      setVideosDataList(prevData => [...prevData, ...videosData.videos]);
    }
  }, [videosData]);

  /* SCROLL TO TOP*/
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='container'>
      <PageTitle title='Popular Videos' />

      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {videosDataList &&
              videosDataList.map((video, index) => <VideoCard key={index} video={video} />)}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {isVideosLoading && <Skeleton />}
      <div className='load-more' role='progressbar' ref={loader}></div>
    </div>
  );
};
export default Videos;
