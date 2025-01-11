import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Spinner from '../components/ui/spinner';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Login = lazy(() => import('../pages/login/Login'));
const Signup = lazy(()=>import('../pages/signup/Signup'))
const Otp = lazy(()=>import('../pages/otp/Otp'))
const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/otp' element={<Otp/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
