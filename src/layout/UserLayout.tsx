import React from 'react'
import Header from '../components/user/Header'
import { Outlet,useLocation } from 'react-router-dom'

const UserLayout = () => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login','/signup','/Otp','/reset-password','/new-password']
  return (
    < div >
        {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
        <Outlet/>
    </div>
  )
}

export default UserLayout
