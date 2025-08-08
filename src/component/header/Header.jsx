import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authServe } from '../../AppwriteServices/authService.js'
import { useDispatch } from 'react-redux'
import {logout} from '../../store/authSlice.js'


function Header() {
    const isLogin = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navItems = [
        { name: "Home", route: "/", requireLogin: false },
        { name: "Add Notes", route: "/addNote", requireLogin: true }

    ]
    const handleLogout = async () => {
        try {
            await authServe.logout()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
            <div className="text-2xl font-bold">Remainder</div>
            <ul className="flex space-x-6 items-center">
                {navItems.map((item) => {
                    if (item.requireLogin && !isLogin) return null
                    return (
                        <li key={item.route}>
                            <Link to={item.route} className="hover:text-yellow-400 transition">
                                {item.name}
                            </Link>
                        </li>
                    )
                })}

                {isLogin ? (
                    <li>
                        <button onClick={handleLogout} className="hover:text-red-500 transition">
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className="hover:text-green-400 transition">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Header