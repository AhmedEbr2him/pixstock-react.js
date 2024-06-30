import cardMedia_1 from './images/card-media-1.jpg';
import cardMedia_2 from './images/card-media-2.jpg';
import cardMedia_3 from './images/card-media-3.jpg';
import cardMedia_4 from './images/card-media-4.jpg';
import cardMedia_5 from './images/card-media-5.jpg';
import cardMedia_6 from './images/card-media-6.jpg';
import cardMedia_7 from './images/card-media-7.jpg';
import cardMedia_8 from './images/card-media-8.jpg';
import cardMedia_9 from './images/card-media-9.jpg';
import photoBanner_1 from './images/photo-banner-1.jpg';
import photoBanner_2 from './images/photo-banner-2.jpg';
import photoBanner_3 from './images/photo-banner-3.jpg';
import photoBanner_4 from './images/photo-banner-4.jpg';
import photoBanner_5 from './images/photo-banner-5.jpg';
import photoBanner_6 from './images/photo-banner-6.jpg';
import collectionBanner_1 from './images/collection-banner-1.jpg';
import collectionBanner_2 from './images/collection-banner-3.jpg';
import collectionBanner_3 from './images/collection-banner-4.jpg';

/* VIDEOS */
import videoBanner_1 from './videos/video-banner-1.mp4';
import videoBanner_2 from './videos/video-banner-2.mp4';
import videoBanner_3 from './videos/video-banner-3.mp4';
import videoBanner_4 from './videos/video-banner-4.mp4';
import videoBanner_5 from './videos/video-banner-5.mp4';
import videoBanner_6 from './videos/video-banner-6.mp4';
import collectionBannerVid_1 from './videos/collection-banner-2.mp4';
import collectionBannerVid_2 from './videos/collection-banner-5.mp4';
import collectionBannerVid_3 from './videos/collection-banner-6.mp4';

export const media = {
  photoBanner: [
    { src: photoBanner_1 },
    { src: photoBanner_2 },
    { src: photoBanner_3 },
    { src: photoBanner_4 },
    { src: photoBanner_5 },
    { src: photoBanner_6 },
  ],
  videoBanner: [
    { src: videoBanner_1, width: '360', height: '420' },
    { src: videoBanner_2, width: '360', height: '640' },
    { src: videoBanner_3, width: '480', height: '360' },
    { src: videoBanner_4, width: '360', height: '640' },
    { src: videoBanner_5, width: '640', height: '360' },
    { src: videoBanner_6, width: '480', height: '360' },
  ],
  collectionBanner: [
    { src: collectionBanner_1 },
    { source: collectionBannerVid_1, width: '360', height: '420' },
    { src: collectionBanner_2 },
    { src: collectionBanner_3 },
    { source: collectionBannerVid_2, width: '640', height: '360' },
    { source: collectionBannerVid_3, width: '640', height: '338' },
  ],
  cardMedia: {
    cardMedia_1,
    cardMedia_2,
    cardMedia_3,
    cardMedia_4,
    cardMedia_5,
    cardMedia_6,
    cardMedia_7,
    cardMedia_8,
    cardMedia_9,
  },
};
