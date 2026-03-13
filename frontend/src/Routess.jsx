import React ,{lazy, useState}from 'react';
import { Route,Routes } from 'react-router';
import ProtectRouts from './components/auth/ProtectRouts';
const Home =lazy(() => import('./pages/Home'));
const Login =lazy(() => import('./pages/Login'));
const Chat =lazy(() => import('./pages/Chat'));
const Groups =lazy(() => import('./pages/Groups'));
const NotFound =lazy(() => import('./pages/NotFound'));

const Routess = () => {
  const [user,setUser] = useState(false);
  return (
    <Routes>
        <Route element={<ProtectRouts user={user}/>}>
          <Route path='/' element={<Home />} />
          <Route path='/chat/:chatId' element={<Chat />} />
          <Route path='/groups' element={<Groups />} />
        </Route>
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Routess;