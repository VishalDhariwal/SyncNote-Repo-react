import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authServe } from '../../AppwriteServices/authService.js'
import { logout } from '../../store/authSlice.js'

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
            console.log(error)
        }
    }

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <div className="text-2xl font-bold tracking-wide">
                📝 Remainder
            </div>

            <ul className="flex space-x-6 items-center">
                {navItems.map((item) => {
                    if (item.requireLogin && !isLogin) return null
                    return (
                        <li key={item.route}>
                            <Link
                                to={item.route}
                                className="hover:text-yellow-400 transition duration-300"
                            >
                                {item.name}
                            </Link>
                        </li>
                    )
                })}

                {isLogin ? (
                    <li>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
                        >
                            Signup
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Header