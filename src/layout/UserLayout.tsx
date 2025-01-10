import React from 'react'
import Header from '../components/user/Header'
import { AuroraBackground } from '../components/ui/aurora-background'
import { Outlet,useLocation } from 'react-router-dom'

const UserLayout = () => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login','/signup','/otp']
  return (
    <>
    <AuroraBackground>     
        {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
        <Outlet/>
    </AuroraBackground>
    </>
  )
}

export default UserLayout
