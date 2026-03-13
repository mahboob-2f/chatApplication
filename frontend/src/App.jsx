
import { Routes, Route } from 'react-router';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Routess from './Routess';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50 container-responsive'>
      



      <Routess></Routess>
      <Toaster />
    </div>
  );
};

export default App;