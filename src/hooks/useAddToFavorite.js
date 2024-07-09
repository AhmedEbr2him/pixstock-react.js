import { useEffect, useState } from 'react';

const useAddToFavorite = () => {
  const [favoriteObj, setFavoriteObj] = useState(
    JSON.parse(localStorage.getItem('favorite')) ?? {
      photos: {},
      videos: {},
    }
  );

  const [isDisabled, setIsDisabled] = useState(false);
  const storedFavorites = JSON.parse(localStorage.getItem('favorite'));

  const addToFavorite = (type, id, data) => {
    if (storedFavorites[type][id]) {
      delete storedFavorites[type][id];
      setIsDisabled(false);
    } else {
      storedFavorites[type][id] = data;
      setIsDisabled(true);
    }
    setFavoriteObj(storedFavorites);
    localStorage.setItem('favorite', JSON.stringify(storedFavorites));
  };
  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteObj));
  }, [favoriteObj]);
  return { addToFavorite, favoriteObj, isDisabled };
};

export default useAddToFavorite;
