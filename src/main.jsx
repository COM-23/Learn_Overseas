import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile.css'
import App from './App.jsx'
import PremiumCursor from './components/PremiumCursor.jsx'

window.onerror = function(message, source, lineno, colno, error) {
  const errDiv = document.createElement('div');
  errDiv.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: red; color: white; z-index: 9999999; padding: 20px; font-family: monospace; overflow: auto;';
  errDiv.innerHTML = `<h3>FATAL MOBILE CRASH</h3><p>${message}</p><p>Source: ${source}:${lineno}:${colno}</p><pre>${error?.stack}</pre>`;
  document.body.appendChild(errDiv);
};

window.onunhandledrejection = function(event) {
  const errDiv = document.createElement('div');
  errDiv.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: purple; color: white; z-index: 9999999; padding: 20px; font-family: monospace; overflow: auto;';
  errDiv.innerHTML = `<h3>ASYNC MOBILE CRASH</h3><pre>${event.reason?.stack || event.reason}</pre>`;
  document.body.appendChild(errDiv);
};
// StrictMode intentionally removed: it double-fires useEffect in dev,
// which cancels the Preloader timer before onComplete fires → permanent white screen on restart.
// StrictMode is dev-only and has zero effect on production builds.
createRoot(document.getElementById('root')).render(
  <>
    <PremiumCursor />
    <App />
  </>
)
