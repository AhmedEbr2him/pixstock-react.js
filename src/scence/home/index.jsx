import { Banner, MediaGrid, SectionTitle } from '../../components';
import OverlayBtn from '../../components/common/OverlayBtn';
import { routeConstants } from '../../constants/routeConstants';

const Home = () => {
  return (
    <>
      <Banner />

      {/* SECTIONS */}
      <section className='section featured-photos' aria-labelledby='featured-section'>
        <div className='container'>
          <SectionTitle title='Featured Photos' id='featured label' />
          <MediaGrid />
          <OverlayBtn to={routeConstants.photos} text={'Explore More'} />
        </div>
      </section>
    </>
  );
};
export default Home;
