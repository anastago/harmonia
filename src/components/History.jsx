import { Link, useParams } from "react-router-dom"
import React, { useContext, useState } from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { AuthContext } from "../context/auth.context"

function History({ ownerNotes, onNoteSelect, isOpen }) {
  const { id } = useParams()
  const { deleteNote, token } = useContext(AuthContext)

  const handleDeleteNote = async (event, noteId) => {
    event.preventDefault()
    try {
      await deleteNote(token, noteId)
    } catch (error) {
      console.log(error)
    }
  }

  const [hoveredNoteId, setHoveredNoteId] = useState(null)

  return (
    <div
      className={`text-black bg-blue-50 overflow-auto h-full sm:w-52 w-4/5 px-5 fixed sm:static z-10 transition-transform sm:bg-transparent ${
        isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}
    >
      <h1 className="text-xs text-blue-500 top-0 p-1">Previous</h1>
      <ul>
        {ownerNotes.map((note) => (
          <Link className="" to={`/notes/${note._id}`} key={note._id}>
            <li
              onClick={() => onNoteSelect(note)}
              className={`hover:bg-blue-100 p-1 rounded-md flex justify-between${
                id === note._id ? " bg-blue-200 hover:bg-blue-200" : ""
              }`}
              onMouseEnter={() => setHoveredNoteId(note._id)}
              onMouseLeave={() => setHoveredNoteId(null)}
            >
              <div className="sm:w-44 truncate">
                {note.text === "" ? "New" : note.text}
              </div>
              {hoveredNoteId === note._id && (
                <button onClick={(event) => handleDeleteNote(event, note._id)}>
                  <TrashIcon className="h-5 w-5 text-blue-800" />
                </button>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default History
