import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserdata } from '../../redux/slices/AuthSlice';
import toast from 'react-hot-toast';
import { RootState } from '../../redux/store';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state: RootState) => state.user.userdata);

  const handleSignOut = () => {
    dispatch(clearUserdata()); // Clear user data from Redux store
    toast.success("You have successfully signed out."); // Display a success message
    navigate('/'); // Redirect to the sign-in page
};

const handleSignIn = ()=>{
    navigate('/login')
}

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">STOCK_PICS</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="view">
            view
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">

        <NavbarItem>
          {userdata ? (
            <Button
              className='bg-red-400 text-white font-semibold'
              onPress={handleSignOut}
              variant="flat"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className='bg-blue-400 text-white font-semibold'
              variant="flat"
              onPress={handleSignIn}
            >
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
