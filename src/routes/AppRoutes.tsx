import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import Spinner from '../components/ui/spinner';
import ProtectedRoute from '../protected/ProtectedRoute';
import ResetPassword from '../pages/resetpassword/ResetPassword';
import NewPassword from '../pages/resetpassword/NewPassword';


const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Login = lazy(() => import('../pages/login/Login'));
const Signup = lazy(()=>import('../pages/signup/Signup'))
const Otp = lazy(()=>import('../pages/otp/Otp'))
const View = lazy(()=>import('../pages/cardview/CardView'))
const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<UserLayout />}>
        <Route path="/" element={<Dashboard/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/view' element={<View/>}/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/new-password' element={<NewPassword/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
