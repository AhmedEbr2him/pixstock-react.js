import './footer.css';
import { Link } from 'react-router-dom';
import { routeConstants } from '../../../constants/routeConstants';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-card'>
          <div className='col'>
            <Link to={routeConstants.home}>Pixstock</Link>
            <div className='text body-small'>
              Pixstock is a stock photo app developed by
              <span className='color-primary'>&nbsp;ahmedebrahim</span> and all Photos and Videos
              provided by
              <Link to='https://pexels.com'>Pexels</Link>.
            </div>
          </div>

          <div className='col'>
            <p className='title label-medium'>Follow us on</p>
            <div className='social-list'>
              <Link to='#' className='label-small color-primary'>
                Youtube&nbsp;
              </Link>
              <Link to='#' className='label-small color-primary'>
                Github&nbsp;
              </Link>
              <Link to='#' className='label-small color-primary'>
                Twitter (X)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
