import { Route, Routes,  } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';

import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Dashboard } from './Pages/Dashboard';

export function Router() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  );
}
