import './header.css';
import { Link } from 'react-router-dom';
import { IconButton, SearchView, ThemeSwitch } from '../../../components';
import { routeConstants } from '../../../constants/routeConstants';
import { useDispatch } from 'react-redux';
import { toggleSearchView, toggleDrawer } from '../../../redux/slices/mainSlice';
import { useThemeSwitch } from '../../../hooks/useThemeSwitch';

const Header = () => {
  const dispatch = useDispatch();
  const { changeTheme } = useThemeSwitch();

  return (
    <header className='top-app-bar'>
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
