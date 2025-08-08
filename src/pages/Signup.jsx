import React, { useState } from 'react'
import { authServe } from '../AppwriteServices/authService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'  // or create a signup action if you want

function Signup() {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, watch } = useForm()

    const password = watch('password', '')

    const onSubmit = async (data) => {
        setSubmitting(true)
        try {
            const user = await authServe.createUser({
                email: data.email,
                password: data.password,
                name: data.name
            })

            dispatch(login({
                userId: user.$id,         // or user.userId, depending on structure
                userName: user.name,      // or user.email or user.name
                isLoggedIn: true
            }))
            navigate('/')

            reset()
        } catch (error) {
            console.error('Signup failed:', error)
            // Handle error display to user
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 border rounded shadow">
            <div>
                <label className="block mb-1">Name</label>
                <input
                    type="name"
                    {...register('name', { required: 'name is required' })}
                    className="w-full p-2 border rounded"
                    disabled={submitting}
                />
            </div>
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
                    {...register('password', { required: 'Password is required', minLength: 6 })}
                    className="w-full p-2 border rounded"
                    disabled={submitting}
                />
            </div>

            <div>
                <label className="block mb-1">Confirm Password</label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match',
                    })}
                    className="w-full p-2 border rounded"
                    disabled={submitting}
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 rounded text-white ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                {submitting ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    )
}

export default Signup
