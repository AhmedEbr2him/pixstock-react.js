import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PropTypes from 'prop-types';
const MediaGrid = ({ children }) => {
  return (
    <>
      <div className='media-grid'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3 }}>
          <Masonry columnsCount={2} gutter='10px'>
            {children}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default MediaGrid;

MediaGrid.propTypes = {
  children: PropTypes.node,
};
