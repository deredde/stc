import './tema-fucsia.css';
import './app.css';
import { STC } from './stc.js';
import { App } from './App.jsx';

const { ToastProvider } = STC;
window.ReactDOM.createRoot(document.getElementById('app')).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
