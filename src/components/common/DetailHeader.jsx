import { Link, useNavigate } from 'react-router-dom';
import IconButton from './IconButton';
import { routeConstants } from '../../constants/routeConstants';
import MaterialIcon from './MaterialIcon';
import { useThemeSwitch } from '../../hooks/useThemeSwitch';
import { ThemeSwitch } from '../';
import { useState } from 'react';

const DetailHeader = ({ downlaodData }) => {
  const { changeTheme } = useThemeSwitch();
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  return (
    <header className='top-app-bar'>
      <IconButton
        ariaLabel='Back to previous page'
        icon='arrow_back'
        onClick={() => navigate(routeConstants.home)}
      />
      <Link to={routeConstants.home} className='logo'>
        Pixstock
      </Link>

      <div className='menu-wrapper'>
        <div className='split-btn'>
          <Link to={downlaodData.original} className='label' download>
            <span className='label-large'>Download</span>
            <div className='state-layer'></div>
          </Link>

          <button className='trailing-icon' onClick={() => setIsExpanded(!isExpanded)}>
            <MaterialIcon icon='arrow_drop_down' />
            <div className='state-layer'></div>
          </button>
        </div>

        <div className={`menu ${isExpanded ? 'expanded' : ''}`}>
          {Object.entries(downlaodData).map((item, index) => {
            const [key, value] = item;

            return (
              <Link key={index} to={value} download className='menu-item'>
                {key}
                <div className='state-layer'></div>
              </Link>
            );
          })}
        </div>
      </div>

      <IconButton ariaLabel='add to favorite' icon='favorite' />

      <ThemeSwitch />
    </header>
  );
};
export default DetailHeader;
