import { Route, Routes } from 'react-router-dom';
import { Drawer, Footer, Header, Home, Photos, PhotosDetail, VideoDetail, Videos } from './scence';
import { routeConstants } from './constants/routeConstants';

const App = () => {
  return (
    <>
      <Header />
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
