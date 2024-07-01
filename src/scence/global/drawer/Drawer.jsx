import './drawer.css';
import { IconButton } from '../../../components';
import { Link, useLocation } from 'react-router-dom';
import { routeConstants } from '../../../constants/routeConstants';
import { toggleDrawer } from '../../../redux/slices/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
const Drawer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isDrawerOpen } = useSelector(state => state.mainReducer);
  const drawerItems = [
    { to: routeConstants.home, icon: 'home', label: 'Home' },
    { to: routeConstants.photos, icon: 'image', label: 'Photos' },
    { to: routeConstants.videos, icon: 'videocam', label: 'Videos' },
    { to: routeConstants.collections, icon: 'auto_awesome_mosaic', label: 'Collections' },
    { to: routeConstants.favorite, icon: 'favorite', label: 'Favorite' },
  ];

  return (
    <>
      <nav className={`navigation ${isDrawerOpen ? 'show' : ''}`}>
        <div className='navigation-header'>
          <IconButton
            ariaLabel='Close menu'
            icon='arrow_back'
            onClick={() => dispatch(toggleDrawer())}
          />
          <Link to={routeConstants}>Pixstock</Link>
        </div>

        <ul className='drawer-list'>
          {drawerItems.map((item, index) => (
            <DrawerItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={() => dispatch(toggleDrawer())}
            />
          ))}
        </ul>
        {/* SCRIM */}
      </nav>
      <div
        className={`scrim ${isDrawerOpen ? 'active' : ''}`}
        onClick={() => dispatch(toggleDrawer())}
      ></div>
    </>
  );
};

const DrawerItem = ({ icon, label, to, onClick }) => {
  return (
    <li className='drawer-item' onClick={onClick}>
      <Link to={to} className={`drawer-link ${location.pathname === to ? 'active' : ''}`}>
        <span className='material-symbols-outlined leading-icon' aria-hidden='true'>
          {icon}
        </span>
        <span className='label-large'>{label}</span>
        <div className='state-layer'></div>
      </Link>
    </li>
  );
};
export default Drawer;
