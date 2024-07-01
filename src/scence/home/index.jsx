import { useDispatch, useSelector } from 'react-redux';
import { Banner, CollectionCard, MediaGrid, SectionTitle } from '../../components';
import OverlayBtn from '../../components/common/OverlayBtn';
import { routeConstants } from '../../constants/routeConstants';
import { useEffect } from 'react';
import {
  fetchCuratedPhotos,
  fetchFeaturedCollections,
  fetchPopularVideos,
} from '../../redux/slices/clientSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const photosData = useSelector(state => state.clinetReducer.client.photos.curated);
  const videosData = useSelector(state => state.clinetReducer.client.videos.popular);
  const collectionsData = useSelector(state => state.clinetReducer.client.collections.featured);
  const isPhotosLoading = useSelector(
    state => state.clinetReducer.isLoading.photos.fetchCuratedPhotos
  );
  const isVideosLoading = useSelector(
    state => state.clinetReducer.isLoading.videos.fetchPopularVideos
  );
  const isCollectionsLoading = useSelector(
    state => state.clinetReducer.isLoading.collection.fetchFeaturedCollections
  );

  useEffect(() => {
    dispatch(fetchCuratedPhotos({ page: 1, per_page: 15 }));
    dispatch(fetchPopularVideos({ page: 2, per_page: 15 }));
    dispatch(fetchFeaturedCollections({ page: 2, per_page: 18 }));
  }, [dispatch]);

  return (
    <>
      <Banner />

      {/* SECTIONS */}
      <section className='section featured-photos' aria-labelledby='featured-photos'>
        <div className='container'>
          <SectionTitle title='Featured Photos' id='section label' />
          <MediaGrid data={photosData} isLoading={isPhotosLoading} />
          <OverlayBtn to={routeConstants.photos} text={'Explore More'} />
        </div>
      </section>

      <section className='section popular-videos' aria-labelledby='popular-videos'>
        <div className='container'>
          <SectionTitle title='Featured Videos' id='section label' />
          <MediaGrid data={videosData} isLoading={isVideosLoading} />
          <OverlayBtn to={routeConstants.photos} text={'Explore More'} />
        </div>
      </section>

      <section className='section collection  ' aria-labelledby='popular-videos'>
        <div className='container'>
          <SectionTitle title='Featured Collections' id='section label' />
          <div className='collection-grid'>
            {collectionsData?.collections?.map((collection, index) => (
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
