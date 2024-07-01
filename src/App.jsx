import { Route, Routes } from 'react-router-dom';
import { Drawer, Footer, Header, Home, Photos } from './scence';
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
          </Routes>
        </article>
      </main>
      <Footer />
    </>
  );
};
export default App;
