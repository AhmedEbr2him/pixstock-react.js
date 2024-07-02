import { Link } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';
import { routeConstants } from '../../constants/routeConstants';
import { useEffect, useRef, useState } from 'react';

const VideoCard = ({ videoData }) => {
  const [videoUsageData, setVideoUsageData] = useState({
    height: '',
    width: '',
    id: '',
    image: '',
    video_files: [],
  });

  const sdVideo =
    videoData &&
    videoUsageData?.video_files?.find(item => item.quality === 'sd' && item.width < 1000);

  const [videoSrc, setVideoSrc] = useState({ file_type: '', link: '' });

  const favoriteObj = JSON.parse(localStorage.getItem('favorite'));
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  let playTimeOut = useRef(null);

  useState(() => {
    if (videoData) {
      setVideoUsageData(videoData);
    }
  }, [videoData]);

  useEffect(() => {
    if (sdVideo) {
      setVideoSrc(sdVideo);
    }
  }, [sdVideo]);
  const cardRef = useRef(null);

  useEffect(() => {
    const handlePlay = () => {
      playTimeOut.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 1000);
    };

    const handlePause = () => {
      if (playTimeOut.current) {
        clearTimeout(playTimeOut.current);
      }

      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    cardRef.current && cardRef.current.addEventListener('pointerover', handlePlay);
    cardRef.current && cardRef.current.addEventListener('pointerout', handlePause);

    const cardElement = cardRef.current;
    return () => {
      cardElement && cardElement.removeEventListener('pointerover', handlePlay);
      cardElement && cardElement.removeEventListener('pointerout', handlePause);
    };
  }, []);

  return (
    <div className='card grid-item video' ref={cardRef}>
      <div
        className='card-banner'
        style={{ '--width': videoUsageData.width, '--height': videoUsageData.height }}
      >
        <video poster={videoUsageData.image} muted loop className='img-cover' ref={videoRef}>
          {videoSrc.file_type && videoSrc.link && (
            <source src={videoSrc.link} type={videoSrc.file_type} />
          )}
        </video>
      </div>
      <div className='card-content'>
        <button
          aria-label='Add to favorite button'
          className={`icon-btn small ${favoriteObj?.videos[videoUsageData.id] ? 'active' : ''}`}
        >
          <MaterialIcon icon='favorite' />
          <div className='state-layer'></div>
        </button>
      </div>

      <div className='card-badge' style={{ display: isPlaying && 'none' }}>
        <MaterialIcon icon='play_arrow' />
      </div>
      <Link
        to={`${routeConstants.videos_detail}/${videoUsageData.id}`}
        className='state-layer'
      ></Link>
    </div>
  );
};
export default VideoCard;
