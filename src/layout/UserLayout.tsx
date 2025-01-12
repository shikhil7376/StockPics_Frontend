import React from 'react'
import Header from '../components/user/Header'
import { AuroraBackground } from '../components/ui/aurora-background'
import { Outlet,useLocation } from 'react-router-dom'

const UserLayout = () => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login','/signup','/Otp']
  return (
    < div className='h-[100vh] '>
    
        {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
        <Outlet/>
    </div>
  )
}

export default UserLayout
