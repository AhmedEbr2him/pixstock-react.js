import { Route, Routes } from 'react-router-dom';
import { Drawer, Footer, Header, Home } from './scence';
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
          </Routes>
        </article>
      </main>
      <Footer />
    </>
  );
};
export default App;
