import { Route, Routes } from 'react-router-dom';
import { Drawer, Header } from './scence';

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
    </>
  );
};
export default App;
