import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../redux/store'

const ProtectedRoute = () => {
  const userData = useSelector((state: RootState) => state.user.userdata)

  // If there is no user data, navigate to home page ('/')
  if (!userData) {
    return <Navigate to="/" replace />
  }

  // If there is user data, render the Outlet
  return <Outlet />
}

export default ProtectedRoute
