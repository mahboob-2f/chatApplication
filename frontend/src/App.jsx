
import { Routes, Route } from 'react-router';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50 container-responsive'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat/:chatId' element={<Chat />} />
        <Route path='/groups' element={<Groups />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;