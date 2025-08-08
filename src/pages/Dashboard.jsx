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
                console.log("user has been dispatched" , username)
                const data = await noteServe.getUserNotes( userId )
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
            const updated = await noteServe.editNote({noteId,
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
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
                {username ? `Welcome, ${username}` : 'Welcome'}
            </h3>

            {notes.length === 0 ? (
                <p>No notes found.</p>
            ) : (
                <ul className="space-y-4">
                    {notes.map((note) => (
                        <li
                            key={note.$id}
                            className="p-4 border border-gray-300 rounded-md shadow-sm"
                            style={{ color: note.textColor || '#000' }}
                        >
                            {editingNoteId === note.$id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editForm.title}
                                        onChange={handleInputChange}
                                        className="w-full mb-2 p-1 border"
                                    />
                                    <textarea
                                        name="content"
                                        value={editForm.content}
                                        onChange={handleInputChange}
                                        className="w-full p-1 border"
                                    />
                                    <div className="mt-2 space-x-2">
                                        <button
                                            onClick={() => handleSave(note.$id)}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="text-lg font-bold">{note.title}</h4>
                                    <p className="text-sm mt-1">{note.content}</p>
                                    <div className="mt-4 space-x-3">
                                        <button
                                            onClick={() => startEditing(note)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note.$id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dashboard
