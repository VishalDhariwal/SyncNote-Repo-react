import React, { useState } from 'react'
import { noteServe } from '../AppwriteServices/noteService'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function AddNote() {
    const userId = useSelector((state) => state.auth.userId)
    const { register, handleSubmit, reset } = useForm()
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setSubmitting(true)
        console.log("add note suer id is" ,userId)
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
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4 border rounded shadow">
            <div>
                <label className="block mb-1">Title</label>
                <input
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block mb-1">Content</label>
                <textarea
                    {...register('content', { required: true })}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block mb-1">Text Color (optional)</label>
                <select
                    {...register('textColor')}
                    className="w-full p-2 border rounded"
                    defaultValue="black"
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


            <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 rounded text-white ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                    }`}
            >
                {submitting ? 'Adding...' : 'Add Note'}
            </button>
        </form>
    )
}

export default AddNote
