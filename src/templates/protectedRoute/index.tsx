import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useUser } from '../../context';

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  return <>{user ? children : <Navigate to="/" />}</>;
};
