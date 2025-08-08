import React, { useState } from 'react'
import { authServe } from '../AppwriteServices/authService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

function Login() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      // Call your login service with email and password
      const user = await authServe.login({
        email: data.email,
        password: data.password,
      })
      console.log('Returned user:', user)
      dispatch(login({
                userId: user.$id,         // or user.userId, depending on structure
                userName: user.name,      // or user.email or user.name
                isLoggedIn: true
            }))
      navigate('/')
      reset()
    } catch (error) {
      console.error('Login failed:', error)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 border rounded shadow">
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="w-full p-2 border rounded"
          disabled={submitting}
        />
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="w-full p-2 border rounded"
          disabled={submitting}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 rounded text-white ${
          submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {submitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default Login
