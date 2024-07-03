import { Route, Routes, useLocation } from 'react-router-dom';
import { Drawer, Footer, Header, Home, Photos, PhotosDetail, VideoDetail, Videos } from './scence';
import { routeConstants } from './constants/routeConstants';
import { useSelector } from 'react-redux';
import { PhotoDetailHeader, VideoDetailHeader } from './components';

const App = () => {
  const photoDownloadData = useSelector(state => state.mainReducer.photoDownloadData);
  const videoDownloadData = useSelector(state => state.mainReducer.videoDownloadData);
  const location = useLocation();
  const isPhotoDetailPage = location.pathname.includes(routeConstants.photos_detail);
  const isVideoDetailPage = location.pathname.includes(routeConstants.videos_detail);

  return (
    <>
      {isPhotoDetailPage || isVideoDetailPage ? null : <Header />}
      {isPhotoDetailPage && photoDownloadData && <PhotoDetailHeader />}
      {isVideoDetailPage && videoDownloadData && <VideoDetailHeader />}

      <Drawer />
      <main className='main'>
        <article>
          <Routes>
            <Route path={routeConstants.home} element={<Home />} />
            <Route path={routeConstants.photos} element={<Photos />} />
            <Route path={`${routeConstants.photos_detail}/:id`} element={<PhotosDetail />} />
            <Route path={routeConstants.videos} element={<Videos />} />
            <Route path={`${routeConstants.videos_detail}/:id`} element={<VideoDetail />} />
          </Routes>
        </article>
      </main>
      <Footer />
    </>
  );
};
export default App;
