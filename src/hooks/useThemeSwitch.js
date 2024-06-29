import { useEffect, useState } from 'react';

export const useThemeSwitch = () => {
  const [isDark, setIsDark] = useState(window.matchMedia('prefers-color-scheme'));

  useEffect(() => {
    const HTML = document.documentElement;

    if (sessionStorage.getItem('theme')) {
      HTML.dataset.theme = sessionStorage.getItem('theme');
    } else {
      HTML.dataset.theme = isDark ? 'dark' : 'light';
    }
  }, [isDark]);

  const changeTheme = () => {
    setIsDark(!isDark);
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return { changeTheme, isDark };
};
