import { Link, useNavigate } from 'react-router-dom';
import IconButton from '../common/IconButton';
import { routeConstants } from '../../constants/routeConstants';
import MaterialIcon from '../common/MaterialIcon';
import { ThemeSwitch } from '..';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const PhotoDetailHeader = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const photoDownloadData = useSelector(state => state.mainReducer.photoDownloadData);

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
          <Link to={photoDownloadData.original} className='label' download>
            <span className='label-large'>Download</span>
            <div className='state-layer'></div>
          </Link>

          <button className='trailing-icon' onClick={() => setIsExpanded(!isExpanded)}>
            <MaterialIcon icon='arrow_drop_down' />
            <div className='state-layer'></div>
          </button>
        </div>

        <div className={`menu ${isExpanded ? 'expanded' : ''}`}>
          {Object.entries(photoDownloadData).map((item, index) => {
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
export default PhotoDetailHeader;
