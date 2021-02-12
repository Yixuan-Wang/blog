import React, { createContext, useState } from 'react';

import ProvidersComposer from '../helpers/providers-composer';

export const ContextTheme = createContext({ theme: '', toggleTheme: () => {} });

export const ContextQuarter = createContext('');

function TheContextGlobal({ children }) {
  const [theme, setTheme] = useState('');
  const toggleTheme = () =>
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? '' : 'light');

  return (
    <ProvidersComposer
      providers={[
        <ContextTheme.Provider key="theme" value={{ theme, toggleTheme }} />,
        <ContextQuarter.Provider key="quarter" value={''} />,
      ]}
    >
      {children}
    </ProvidersComposer>
  );
}

export default TheContextGlobal;
