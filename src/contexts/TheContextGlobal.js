import React, { createContext, useState } from 'react';

import ProvidersComposer from '../helpers/providers-composer';

export const ContextTheme = createContext({ theme: '', toggleTheme: () => {} });

function TheContextGlobal({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? '');
  const toggleTheme = () => {
    const nextTheme =
      theme === 'light' ? 'dark' : theme === 'dark' ? '' : 'light';
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <ProvidersComposer
      providers={[
        <ContextTheme.Provider key="theme" value={{ theme, toggleTheme }} />,
      ]}
    >
      {children}
    </ProvidersComposer>
  );
}

export default TheContextGlobal;
