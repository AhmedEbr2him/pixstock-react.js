import './videos.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoDetail } from '../../redux/slices/clientSlice';
import scrollToTop from '../../utils/scrollToTop';
import { handleIsDetailPage, handleVideoDownloadData } from '../../redux/slices/mainSlice';

const VideoDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const videoDetailData = useSelector(state => state.clientReducer.client.videos.detail);

  const [videoDetail, setVideoDetail] = useState({
    width: '',
    height: '',
    image: '',
    user: [],
    video_files: [],
  });

  const [hdVideo, setHdVideo] = useState(null);
  const { file_type, link } = hdVideo || {};

  useEffect(() => {
    dispatch(fetchVideoDetail(id));
    scrollToTop();
    handleIsDetailPage(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (fetchVideoDetail) {
      setVideoDetail(videoDetailData);

      // GET HD VIDEO
      const hdVideo = videoDetail.video_files?.find(item => item.quality === 'hd');
      setHdVideo(hdVideo);

      // GET DOWNLOAD HEADER DATA
      dispatch(handleVideoDownloadData(videoDetail.video_files));
    }
  }, [dispatch, videoDetailData, videoDetail.video_files]);

  return (
    <div className='container'>
      <div className='detail-wrapper'>
        <div className='detail-banner'>
          {link && (
            <video
              key={link} // USED KEY TO RE RENDER VIDEO INSISTED OF PLAY OLD ONE
              poster={videoDetail?.image}
              style={{ aspectRatio: `${videoDetail?.width} / ${videoDetail?.height}` }}
              controls
              className='img-cover'
            >
              {file_type && link && <source type={file_type} src={link} />}
            </video>
          )}
        </div>
        <div className='title-small'>
          Video by&nbsp;
          <div className='color-primary'>{videoDetail?.user?.name}</div>
        </div>
      </div>
    </div>
  );
};
export default VideoDetail;
