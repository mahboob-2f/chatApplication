import React,{lazy} from 'react';
import Home from '../../pages/Home';
import { Outlet } from 'react-router';
import Title from '../shared/Title';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const AppLayout = () => {
  return (
    <div>
      <Title/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default AppLayout;

















