import React from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectRouts = ({children,user,redirect='/login'}) => {
  if(!user){
    return <Navigate to={redirect} />
    }
  return <Outlet />;
};

export default ProtectRouts;