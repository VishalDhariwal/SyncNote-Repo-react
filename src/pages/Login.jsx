// import React, { useState } from 'react'
// import { authServe } from '../AppwriteServices/authService'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { login } from '../store/authSlice'

// function Login() {
//   const [submitting, setSubmitting] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { register, handleSubmit, reset } = useForm()

//   const onSubmit = async (data) => {
//     setSubmitting(true)
//     try {
//       // Call your login service with email and password
//       const user = await authServe.login({
//         email: data.email,
//         password: data.password,
//       })
//       console.log('Returned user:', user)
//       dispatch(login({
//                 userId: user.$id,         // or user.userId, depending on structure
//                 userName: user.name,      // or user.email or user.name
//                 isLoggedIn: true
//             }))
//       navigate('/')
//       reset()
//     } catch (error) {
//       console.error('Login failed:', error)
//       setSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 border rounded shadow">
//       <div>
//         <label className="block mb-1">Email</label>
//         <input
//           type="email"
//           {...register('email', { required: 'Email is required' })}
//           className="w-full p-2 border rounded"
//           disabled={submitting}
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Password</label>
//         <input
//           type="password"
//           {...register('password', { required: 'Password is required' })}
//           className="w-full p-2 border rounded"
//           disabled={submitting}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={submitting}
//         className={`px-4 py-2 rounded text-white ${
//           submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//         }`}
//       >
//         {submitting ? 'Logging in...' : 'Login'}
//       </button>
//     </form>
//   )
// }

// export default Login

import React, { useState } from 'react'
import { authServe } from '../AppwriteServices/authService'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

function Login() {
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const user = await authServe.login({
        email: data.email,
        password: data.password,
      })

      dispatch(login({
        userId: user.$id,
        userName: user.name,
        isLoggedIn: true
      }))

      navigate('/')
      reset()
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg 
                   border border-white/30 rounded-2xl 
                   shadow-2xl p-8 space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center">
          🔐 Welcome Back
        </h2>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full p-3 rounded-lg bg-white/30 
                       focus:bg-white/40 outline-none transition-all duration-300"
            disabled={submitting}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              className="w-full p-3 rounded-lg bg-white/30 
                         focus:bg-white/40 outline-none transition-all duration-300"
              disabled={submitting}
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-sm opacity-80"
            >
              {showPassword ? '🙈' : '👁'}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-300 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg font-semibold 
                      transition-all duration-300 transform
                      ${submitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
        >
          {submitting ? '🚀 Logging in...' : 'Login'}
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm opacity-80">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline hover:text-yellow-300">
            Signup
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login