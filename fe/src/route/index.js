import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../page/auth/login';
import Register from '../page/auth/register';
import Dashboard from '../page/dashboard';

export const PublicRoutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
  );
};

export const PrivateRoutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
  );
};