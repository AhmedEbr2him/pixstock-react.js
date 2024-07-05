import { useEffect, useRef, useState } from 'react';

const useInfiniteScroll = ({ totalPages, setDataList }) => {
  const loader = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    const loadMore = () => {
      if (
        loader.current.getBoundingClientRect().top < window.innerHeight * 2 &&
        currentPage <= totalPages &&
        isLoad
      ) {
        setTimeout(() => {
          setIsLoad(true);
          setCurrentPage(prevPage => prevPage + 1);
          setDataList([]);
        }, 1500);
        setIsLoad(false);
      }
    };

    window.addEventListener('scroll', loadMore);

    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [currentPage, totalPages, isLoad, setIsLoad, setCurrentPage, setDataList]);

  return { loader, currentPage, isLoad };
};

export default useInfiniteScroll;
