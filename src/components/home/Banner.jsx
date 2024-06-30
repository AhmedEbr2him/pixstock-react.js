import './home.css';
import { routeConstants } from '../../constants/routeConstants';
import { media } from '../../assets/media';
import { LinkBtn } from '../';

const Banner = () => {
  return (
    <section className='banner' aria-label='Banner'>
      <div className='banner-card primary'>
        <CardContent
          headline='High quality stock photos for free!'
          text='Explore our exceptional collection of high-quality stock photos.'
          to={routeConstants.photos}
          type='btn-primary'
        />
        <div className='card-grid'>
          {media.photoBanner.map((photo, index) => (
            <div
              key={index}
              className='card-banner'
              style={{
                gridArea: `b${index + 1}`,
                backgroundImage: `url(${photo.src})`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className='banner-card secondary'>
        <CardContent
          headline='Top rated stock Videos for free!'
          text='Our curated selection videos is sure to inspire and captivate.'
          to={routeConstants.videos}
          type='btn-secondary'
        />

        <div className='card-grid'>
          {media.videoBanner.map((video, index) => {
            return (
              <div
                key={index}
                className='card-banner'
                style={{
                  gridArea: `b${index + 1}`,
                }}
              >
                <video
                  className='video'
                  width={video.width}
                  height={video.height}
                  loading='lazy'
                  autoPlay
                  muted
                  loop
                >
                  <source src={video.src} type='video/mp4' />
                </video>
              </div>
            );
          })}
        </div>
      </div>

      <div className='banner-card tertiary'>
        <CardContent
          headline='Best collections with best medias!'
          text='Discover a treasure trove of stunning images, captivating videos.'
          to={routeConstants.collections}
          type='btn-tertiary'
        />
        <div className='card-grid'>
          {media.collectionBanner.map((collection, index) => {
            return (
              <div
                key={index}
                className='card-banner'
                style={{
                  gridArea: `b${index + 1}`,
                  backgroundImage: collection.src && `url(${collection.src})`,
                }}
              >
                {collection.source && (
                  <video
                    className='video'
                    width={collection.width}
                    height={collection.height}
                    loading='lazy'
                    autoPlay
                    muted
                    loop
                  >
                    <source src={collection.source} type='video/mp4' />
                  </video>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Banner;

// eslint-disable-next-line react/prop-types
const CardContent = ({ headline, text, to, type }) => {
  return (
    <div className='card-content'>
      <h3 className='headline-medium card-title'>{headline}</h3>
      <p className='body-large card-text'>{text}</p>
      <LinkBtn to={to} addClass={type} text={'Explore Now'} />
    </div>
  );
};
