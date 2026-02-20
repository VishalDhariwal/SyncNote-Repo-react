import React, { useState } from 'react'
import { noteServe } from '../AppwriteServices/noteService'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function AddNote() {
    const userId = useSelector((state) => state.auth.userId)
    const { register, handleSubmit, watch, reset } = useForm()
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const selectedColor = watch('textColor', 'black')

    const onSubmit = async (data) => {
        setSubmitting(true)
        try {
            await noteServe.addNote({
                title: data.title,
                content: data.content,
                userId: userId,
                textColor: data.textColor || 'black'
            })

            reset()
            navigate('/')
        } catch (error) {
            console.error("Error creating note:", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center 
                        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg bg-white/20 backdrop-blur-lg 
                           border border-white/30 rounded-2xl 
                           shadow-2xl p-8 space-y-6 text-white"
            >
                <h2 className="text-2xl font-bold text-center">
                    ✨ Create New Note
                </h2>

                {/* Title */}
                <div>
                    <label className="block mb-2 font-medium">Title</label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        className="w-full p-3 rounded-lg bg-white/30 
                                   focus:bg-white/40 outline-none 
                                   transition-all duration-300"
                        placeholder="Enter note title..."
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-2 font-medium">Content</label>
                    <textarea
                        rows="4"
                        {...register('content', { required: true })}
                        className="w-full p-3 rounded-lg bg-white/30 
                                   focus:bg-white/40 outline-none 
                                   transition-all duration-300"
                        placeholder="Write something amazing..."
                    />
                </div>

                {/* Text Color */}
                <div>
                    <label className="block mb-2 font-medium">Text Color</label>
                    <select
                        {...register('textColor')}
                        defaultValue="black"
                        className="w-full p-3 rounded-lg bg-white/30 
                                   focus:bg-white/40 outline-none 
                                   transition-all duration-300 text-black"
                    >
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                        <option value="gray">Gray</option>
                    </select>
                </div>

                {/* Live Preview */}
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                    <p className="text-sm opacity-80 mb-2">Live Preview:</p>
                    <p style={{ color: selectedColor }} className="font-semibold">
                        This is how your note text will look ✨
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 rounded-lg font-semibold 
                                transition-all duration-300 transform 
                                ${submitting 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600 hover:scale-105'
                                }`}
                >
                    {submitting ? '🚀 Adding...' : '➕ Add Note'}
                </button>
            </form>
        </div>
    )
}

export default AddNote