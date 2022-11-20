import { ToastContainer } from 'react-toastify';
import { Router } from './router';

import { GlobalStyles } from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

export function App() {
  return (
    <>
      <Router/>
      <ToastContainer position='top-right'/>
      <GlobalStyles />
    </>
  );
}
