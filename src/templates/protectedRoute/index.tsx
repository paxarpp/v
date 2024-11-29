import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  return <>{user ? children : <Navigate to="/" />}</>;
};
