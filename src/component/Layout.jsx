import {React, useEffect} from 'react'
import Header from './header/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {login , logout} from '../store/authSlice'
import { authServe } from '../AppwriteServices/authService'


function Layout() {
    const dispatch = useDispatch()

    useEffect(() => {
    async function checkUser() {
      try {
        const user = await authServe.getCurrUser();
        if (user) {
          dispatch(login({
            userId: user.$id,
            userName: user.name,
            isLoggedIn: true,
          }));
        }
      } catch (error) {
        dispatch(logout());
      }
    }

    checkUser();
  }, [dispatch]);
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
