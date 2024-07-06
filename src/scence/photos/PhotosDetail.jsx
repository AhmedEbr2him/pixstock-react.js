import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoDetail, fetchSearchPhotos } from '../../redux/slices/clientSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PhotoCard } from '../../components';
import scrollToTop from '../../utils/scrollToTop';
import Skeleton from '../../components/common/Skeleton';
import { handlePhotoDownloadData } from '../../redux/slices/mainSlice';

const PhotosDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const photoDetailData = useSelector(state => state.clientReducer.client.photos.detail);
  const similarPhotosData = useSelector(state => state.clientReducer.client.photos.search);
  const isPhotoLoading = useSelector(
    state => state.clientReducer.isLoading.photos.fetchDetailPhoto
  );
  const [photosData, setPhotoData] = useState([]);
  let perPage = 30;
  const detailImgRef = useRef(null);
  const [photoDetail, setPhotoDetail] = useState({
    alt: '',
    avg_color: '',
    height: '',
    width: '',
    photographer: '',
    src: {},
  });
  const imgSrc = isPhotoLoading ? undefined : photoDetail?.src?.large2x;

  useEffect(() => {
    dispatch(fetchPhotoDetail(id));
    setPhotoData([]); // Set the new photos data
    scrollToTop();
    setPhotoDetail(photoDetailData);

    // FADE UP ANIMATION SET ON IMAGE
    const handleLoad = () => {
      detailImgRef.current.animate(
        {
          opacity: [0, 1],
          visibility: ['hidden', 'visible'],
        },
        {
          duration: 400,
          fill: 'forwards',
        }
      );
    };
    const detailImgCurrent = detailImgRef.current;
    if (detailImgCurrent) {
      detailImgCurrent.addEventListener('load', handleLoad);
    }
    return () => {
      if (detailImgCurrent) {
        detailImgCurrent.removeEventListener('load', handleLoad);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    if (similarPhotosData) {
      setPhotoDetail(photoDetailData);
    }
  }, [photoDetailData, similarPhotosData]);

  /* SIMILAR PHOTOS */
  useEffect(() => {
    if (photoDetail.alt) {
      dispatch(fetchSearchPhotos({ query: photoDetail.alt, page: 2, per_page: perPage }));
    }
    if (photoDetail.src) {
      dispatch(handlePhotoDownloadData(photoDetail.src));
    }
  }, [dispatch, photoDetail.alt, perPage, photoDetail.src]);

  useEffect(() => {
    if (similarPhotosData && similarPhotosData?.photos) {
      setPhotoData(prevData => [...prevData, ...similarPhotosData.photos]);
    }
  }, [similarPhotosData]);

  return (
    <div className='detail'>
      <div className='container '>
        <div className='detail-wrapper'>
          <figure
            className='detail-banner img-holder'
            style={{
              aspectRatio: `${photoDetail?.width}/${photoDetail?.height}`,
              backgroundColor: photoDetail?.avg_color,
            }}
          >
            <img
              src={imgSrc}
              alt={photoDetail.alt}
              draggable='false'
              width={photoDetail.width}
              height={photoDetail.height}
              className='img-cover'
              ref={detailImgRef}
              style={{ opacity: 0 }}
            />
          </figure>

          <p className='title-small'>
            Photograph by <span className='color-primary'>{photoDetail.photographer}</span>
          </p>
        </div>
        <h2 className='title-large'>More like this</h2>

        <div className='media-grid'>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
            {photoDetailData ? (
              <Masonry columnsCount={2} gutter='10px'>
                {photosData?.map((photo, index) => (
                  <PhotoCard key={index} photo={photo} />
                ))}
              </Masonry>
            ) : (
              <Skeleton />
            )}
          </ResponsiveMasonry>
        </div>
        {isPhotoLoading && <Skeleton />}
        {similarPhotosData?.photos && <div className='load-more' role='progressbar'></div>}
      </div>
    </div>
  );
};
export default PhotosDetail;
