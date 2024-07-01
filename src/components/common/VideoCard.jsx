import { Link } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
import { routeConstants } from '../../constants/routeConstants';
import { useEffect, useRef, useState } from 'react';

const VideoCard = ({ videoData }) => {
  const { height, width, id, image, video_files } = videoData;
  const sdVideo = video_files.find(item => item.quality === 'sd' && item.width < 1000);
  const { file_type, link } = sdVideo;
  const favoriteObj = JSON.parse(localStorage.getItem('favorite'));
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  let playTimeOut;

  useEffect(() => {
    if (isPlaying) {
      playTimeOut = setTimeout(() => {
        videoRef.current.play();
        setIsPlaying(true);
      }, 1000);
    } else {
      clearTimeout(playTimeOut);
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <div
      className='card grid-item video'
      // onMouseOver={() => setIsPlaying(true)}
      // onMouseOut={() => setIsPlaying(false)}
    >
      <div className='card-banner' style={{ '--width': width, '--height': height }}>
        <video poster={image} muted loop className='img-cover' ref={videoRef}>
          <source src={link} type={file_type} />
        </video>
      </div>
      <div className='card-content'>
        <button
          aria-label='Add to favorite button'
          className={`icon-btn small ${favoriteObj?.videos[id] ? 'active' : ''}`}
        >
          <MaterialIcon icon='favorite' />
          <div className='state-layer'></div>
        </button>
      </div>

      <div className='card-badge' style={{ display: isPlaying && 'none' }}>
        <MaterialIcon icon='play_arrow' />
      </div>
      <Link to={`${routeConstants.videos_detail}?id=${id}`} className='state-layer'></Link>
    </div>
  );
};
export default VideoCard;
