import './header.css';
import { Link } from 'react-router-dom';
import { IconButton, SearchView, ThemeSwitch } from '../../../components';
import { routeConstants } from '../../../constants/routeConstants';
import { useDispatch } from 'react-redux';
import { toggleSearchView, toggleDrawer } from '../../../redux/slices/mainSlice';
import { useEffect, useState } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleHeaderScroll = () => {
      if (window.scrollY >= 150) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    window.addEventListener('scroll', handleHeaderScroll);

    return () => {
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, [isActive]);
  return (
    <header className={`top-app-bar ${isActive ? 'active' : ''}`}>
      <IconButton ariaLabel='Open menu' icon={'menu'} onClick={() => dispatch(toggleDrawer())} />
      <Link to={routeConstants.home} className='logo'>
        Pixstock
      </Link>
      {/* SEARCH VIEW */}
      <SearchView />
      <IconButton
        addClass='search-open'
        ariaLabel='Open search'
        icon={'search'}
        onClick={() => dispatch(toggleSearchView())}
      />
      <ThemeSwitch />
    </header>
  );
};

export default Header;
