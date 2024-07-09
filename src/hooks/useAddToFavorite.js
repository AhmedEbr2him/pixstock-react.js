import { useEffect, useState } from 'react';

const useAddToFavorite = () => {
  const [favoriteObj, setFavoriteObj] = useState(
    JSON.parse(localStorage.getItem('favorite')) ?? {
      photos: {},
      videos: {},
    }
  );

  const [isDisabled, setIsDisabled] = useState(false);

  const addToFavorite = (type, id, data) => {
    // Initialized a stored fav varialbe here to re render every item added.
    const storedFavorites = JSON.parse(localStorage.getItem('favorite'));
    // Check if item already exists in favorites
    if (storedFavorites[type][id]) {
      delete storedFavorites[type][id];
      setIsDisabled(false);
      localStorage.setItem('favorite', JSON.stringify(storedFavorites));
    } else {
      // Item dosn't exist, so add it.
      storedFavorites[type][id] = data;
      setIsDisabled(true);
    }
    setFavoriteObj(storedFavorites);
    localStorage.setItem('favorite', JSON.stringify(storedFavorites));
  };
  useEffect(() => {
    // Update localStorage whenever favoriteObj changes
    localStorage.setItem('favorite', JSON.stringify(favoriteObj));
  }, [favoriteObj]);

  return { addToFavorite, favoriteObj, isDisabled };
};

export default useAddToFavorite;
