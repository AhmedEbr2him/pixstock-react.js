import { useDispatch, useSelector } from 'react-redux';
import { Banner, MediaGrid, SectionTitle } from '../../components';
import OverlayBtn from '../../components/common/OverlayBtn';
import { routeConstants } from '../../constants/routeConstants';
import { useEffect } from 'react';
import { fetchCuratedPhotos } from '../../redux/slices/clientSlice';

const Home = () => {
  const dispatch = useDispatch();
  const photosData = useSelector(state => state.clinetReducer.client.photos.curated);
  const isLoading = useSelector(state => state.clinetReducer.isLoading.photos.fetchCuratedPhotos);

  useEffect(() => {
    dispatch(fetchCuratedPhotos({ page: 2, per_page: 20 }));
  }, [dispatch]);

  return (
    <>
      <Banner />

      {/* SECTIONS */}
      <section className='section featured-photos' aria-labelledby='featured-section'>
        <div className='container'>
          <SectionTitle title='Featured Photos' id='featured label' />
          <MediaGrid data={photosData} isLoading={isLoading} />
          <OverlayBtn to={routeConstants.photos} text={'Explore More'} />
        </div>
      </section>
    </>
  );
};
export default Home;
