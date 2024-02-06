import React, { Suspense } from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
// import i18n
import './global/i18n.js'; //ignoring TS for now. To use TS see https://www.i18next.com/overview/typescript
import Loading from './global/Loading.tsx';


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )


hydrateRoot(document.getElementById('root')!, 
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <App assetMap={(window as any).assetMap} />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);