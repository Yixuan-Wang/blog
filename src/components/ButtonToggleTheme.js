import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';

import Icon from './Icon';
import { ContextTheme } from '../contexts/TheContextGlobal';

function ButtonToggleTheme({ className = '' }) {
  const { theme, toggleTheme } = useContext(ContextTheme);

  const getThemeColor = () => {
    const lightThemeColor = '#003A70';
    const darkThemeColor = '#253137';
    if (
      theme === 'dark' ||
      (theme === '' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return darkThemeColor;
    } else if (
      theme === 'light' ||
      (theme === '' &&
        window.matchMedia('(prefers-color-scheme: light)').matches)
    ) {
      return lightThemeColor;
    }
  };

  return (
    <a className={className} onClick={toggleTheme}>
      <Icon iconName={`theme-${theme === '' ? 'auto' : theme}`} />
      <Helmet>
        <meta content={getThemeColor()} name="theme-color" />
        <html className={theme} />
      </Helmet>
    </a>
  );
}

export default ButtonToggleTheme;
