import React from 'react';

import 'normalize.css';
import 'katex/dist/katex.min.css';
import './src/styles/global.scss';

import TheLayout from './src/layouts/TheLayout';

import TheContextGlobal from './src/contexts/TheContextGlobal';

export const wrapRootElement = ({ element }) => {
  return (
    <TheContextGlobal>
      <TheLayout>{element}</TheLayout>
    </TheContextGlobal>
  );
};

export function onServiceWorkerUpdateReady({ _serviceWorker }) {
  console.log('A new service worker is installed, reload window.');
  window.location.reload(true);
}
