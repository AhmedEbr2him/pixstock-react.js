import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { Banner, CollectionCard, PhotoCard, SectionTitle, VideoCard } from '../../components';
import OverlayBtn from '../../components/common/OverlayBtn';
import { routeConstants } from '../../constants/routeConstants';
import { useEffect } from 'react';
import {
  fetchCuratedPhotos,
  fetchFeaturedCollections,
  fetchPopularVideos,
} from '../../redux/slices/clientSlice';
import { Link } from 'react-router-dom';
import scrollToTop from '../../utils/scrollToTop';
import Skeleton from '../../components/common/Skeleton';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Home = () => {
  const dispatch = useDispatch();
  const photosData = useSelector(state => state?.clientReducer?.client?.photos.curated);
  const videosData = useSelector(state => state?.clientReducer?.client?.videos.popular);
  const collectionsData = useSelector(state => state?.clientReducer?.client?.collections.featured);
  const isPhotosLoading = useSelector(
    state => state.clientReducer.isLoading.photos.fetchCuratedPhotos
  );
  const isVideosLoading = useSelector(
    state => state.clientReducer.isLoading.videos.fetchPopularVideos
  );
  // const isCollectionsLoading = useSelector(
  //   state => state.clientReducer.isLoading.collection.fetchFeaturedCollections
  // );

  useEffect(() => {
    dispatch(fetchCuratedPhotos({ page: 1, per_page: 15 }));
    dispatch(fetchPopularVideos({ page: 1, per_page: 15 }));
    dispatch(fetchFeaturedCollections({ page: 2, per_page: 18 }));
    scrollToTop();
  }, [dispatch]);

  if (isPhotosLoading && isVideosLoading) {
    return <Skeleton />;
  }
  return (
    <>
      <Banner />

      <section className='section featured-photos' aria-labelledby='featured-photos'>
        <div className='container'>
          <SectionTitle title='Featured Photos' id='section label' />
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
            <Masonry columnsCount={2} gutter='10px'>
              {photosData?.photos &&
                photosData?.photos?.map((photo, index) => <PhotoCard photo={photo} key={index} />)}
            </Masonry>
          </ResponsiveMasonry>

          <OverlayBtn to={routeConstants.photos} text={'Explore More'} />
        </div>
      </section>

      <section className='section popular-videos' aria-labelledby='popular-videos'>
        <div className='container'>
          <SectionTitle title='Featured Videos' id='section label' />
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
            <Masonry columnsCount={2} gutter='10px'>
              {videosData?.videos &&
                videosData?.videos?.map((video, index) => <VideoCard video={video} key={index} />)}
            </Masonry>
          </ResponsiveMasonry>

          <OverlayBtn to={routeConstants.photos} text={'Explore More'} />
        </div>
      </section>

      <section className='section collection  ' aria-labelledby='popular-videos'>
        <div className='container'>
          <SectionTitle title='Featured Collections' id='section label' />
          <div className='collection-grid'>
            {collectionsData?.collections &&
              collectionsData?.collections?.map((collection, index) => (
                <CollectionCard data={collection} key={index} />
              ))}
          </div>
          <Link to={routeConstants.collections} className='btn btn-primary'>
            <span className='label-large text'>More Collection</span>
            <div className='state-layer'></div>
          </Link>
        </div>
      </section>
    </>
  );
};
export default Home;
