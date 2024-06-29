import './header.css';
import { Link } from 'react-router-dom';
import { IconButton, SearchView } from '../../../components';
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
      <button
        className='icon-btn theme-switch'
        aria-label='Theme switch'
        data-ripple
        onClick={() => changeTheme()}
      >
        <span className='material-symbols-outlined dark-icon' aria-hidden='true'>
          dark_mode
        </span>
        <span className='material-symbols-outlined light-icon' aria-hidden='true'>
          light_mode
        </span>
        <div className='state-layer'></div>
      </button>
    </header>
  );
};

export default Header;
