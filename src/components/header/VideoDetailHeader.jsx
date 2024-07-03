import { Link, useNavigate } from 'react-router-dom';
import IconButton from '../common/IconButton';
import MaterialIcon from '../common/MaterialIcon';
import ThemeSwitch from '../common/ThemeSwitch';
import { routeConstants } from '../../constants/routeConstants';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const DetailVideoHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const videoDownloadData = useSelector(state => state.mainReducer.videoDownloadData);

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
          <Link to='' className='label' download>
            <span className='label-large'>Download</span>
            <div className='state-layer'></div>
          </Link>

          <button className='trailing-icon' onClick={() => setIsExpanded(!isExpanded)}>
            <MaterialIcon icon='arrow_drop_down' />
            <div className='state-layer'></div>
          </button>
        </div>

        <div className={`menu ${isExpanded ? 'expanded' : ''}`}>
          {videoDownloadData?.map((item, index) => {
            const { width, height, quality, link } = item;

            return (
              <Link key={index} to={link} download className='menu-item'>
                <span className='label-large text'>{quality.toUpperCase()}</span>
                <span className='label-large trailing-text'>
                  {width}x{height}
                </span>
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
export default DetailVideoHeader;
