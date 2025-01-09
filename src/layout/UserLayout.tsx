import React from 'react'
import Header from '../components/user/Header'
import { AuroraBackground } from '../components/ui/aurora-background'
import { Outlet,useLocation } from 'react-router-dom'

const UserLayout = () => {
  const location = useLocation()
  const hideHeaderRoutes = ['/login','/signup','/otp']
  return (
    <AuroraBackground>
      <div className="w-full h-full ">
        <Outlet/>
      </div>
    </AuroraBackground>
  )
}

export default UserLayout
