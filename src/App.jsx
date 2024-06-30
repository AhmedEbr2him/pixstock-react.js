import { Route, Routes } from 'react-router-dom';
import { Drawer, Footer, Header } from './scence';

const App = () => {
  return (
    <>
      <Header />
      <Drawer />
      <main className='main'>
        <Routes>
          <Route path='/' />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
export default App;
