import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { noteServe } from '../AppwriteServices/noteService'

function Dashboard() {
    const username = useSelector((state) => state.auth.userName)
    const userId = useSelector((state) => state.auth.userId)

    const [notes, setNotes] = useState([])
    const [editingNoteId, setEditingNoteId] = useState(null)
    const [editForm, setEditForm] = useState({ title: '', content: '' })

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await noteServe.getUserNotes(userId)
                if (data?.documents) {
                    setNotes(data.documents)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotes()
    }, [userId])

    const handleDelete = async (noteId) => {
        try {
            await noteServe.deleteNote(noteId)
            setNotes(prev => prev.filter(note => note.$id !== noteId))
        } catch (error) {
            console.log('Error deleting note:', error)
        }
    }

    const startEditing = (note) => {
        setEditingNoteId(note.$id)
        setEditForm({ title: note.title, content: note.content })
    }

    const cancelEditing = () => {
        setEditingNoteId(null)
        setEditForm({ title: '', content: '' })
    }

    const handleSave = async (noteId) => {
        try {
            const updated = await noteServe.editNote({
                noteId,
                title: editForm.title,
                content: editForm.content
            })

            setNotes(prev =>
                prev.map(note => note.$id === noteId ? updated : note)
            )

            cancelEditing()
        } catch (error) {
            console.error('Error updating note:', error)
        }
    }

    const handleInputChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
                    👋 {username ? `Welcome back, ${username}` : 'Welcome'}
                </h1>

                {notes.length === 0 ? (
                    <div className="bg-white/20 backdrop-blur-lg p-10 rounded-xl text-center text-white shadow-lg">
                        <h2 className="text-xl font-semibold">✨ No Notes Yet</h2>
                        <p className="mt-2 opacity-80">Start creating something amazing!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note.$id}
                                className="bg-white/20 backdrop-blur-md border border-white/30 
                                           rounded-xl p-5 shadow-xl transition-all duration-300 
                                           hover:scale-105 hover:shadow-2xl text-white"
                            >
                                {editingNoteId === note.$id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editForm.title}
                                            onChange={handleInputChange}
                                            className="w-full mb-3 p-2 rounded bg-white/30 text-white placeholder-white outline-none"
                                            placeholder="Note Title"
                                        />
                                        <textarea
                                            name="content"
                                            value={editForm.content}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full p-2 rounded bg-white/30 text-white placeholder-white outline-none"
                                            placeholder="Write something..."
                                        />

                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={() => handleSave(note.$id)}
                                                className="flex-1 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
                                            >
                                                💾 Save
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="flex-1 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition"
                                            >
                                                ❌ Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-lg font-semibold">
                                            {note.title}
                                        </h3>
                                        <p className="text-sm mt-2 opacity-90 line-clamp-4">
                                            {note.content}
                                        </p>

                                        <div className="mt-5 flex gap-3">
                                            <button
                                                onClick={() => startEditing(note)}
                                                className="flex-1 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(note.$id)}
                                                className="flex-1 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard