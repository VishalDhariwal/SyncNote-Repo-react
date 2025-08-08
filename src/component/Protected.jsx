import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children }) {
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    }, [isLogin, navigate])

    if (!isLogin) {
        return null
    }

    return <>{children}</>
}

export default Protected
