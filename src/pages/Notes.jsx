import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import Note from "../components/Note"
import History from "../components/History"
import AIResponse from "../components/AIResponse"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { PlusIcon } from "@heroicons/react/24/outline"

function Notes(props) {
  const {
    token,
    checkLogin,
    getOwnerNotes,
    postNote,
    ownerNotes,
    getNote,
    note,
    postAIResponse,
  } = useContext(AuthContext)

  const [currentNote, setCurrentNote] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  console.log("params", id)

  useEffect(() => {
    checkLogin()
    console.log("token after sigunp", token) // null
    if (!token) return

    getOwnerNotes()

    if (id === "new") {
      const createNewNote = async () => {
        try {
          const newNote = await postNote(token, "")
          navigate(`/notes/${newNote.data._id}`)
          console.log(currentNote) // null
        } catch (error) {
          console.log(error)
        }
      }
      createNewNote()
    } else {
      getNote(token, id)
    }
  }, [token, id])

  useEffect(() => {
    console.log("set note", note)
  }, [note])

  const handleNoteSelect = (note) => {
    setCurrentNote(note)
    console.log(currentNote)
  }

  const handleCreateNote = async (text) => {
    try {
      const response = await postNote(token, text)
      getOwnerNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateAIResponse = async (noteId) => {
    try {
      const response = await postAIResponse(token, noteId)
      getOwnerNotes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col h-screen box-border font-roboto overflow-y-auto">
      <Navbar></Navbar>
      <div className="flex flex-1 w-full overflow-hidden">
        <History ownerNotes={ownerNotes} onNoteSelect={handleNoteSelect} />

        <div className="flex-1">
          <div className="flex flex-col h-full relative mx-auto px-5 bg-white rounded text-sky-950">
            <Link to="/notes/new">
              <PlusIcon className="absolute left-4 top-4 h-7 w-7 text-blue-800" />
            </Link>
            <Note onCreateNote={handleCreateNote} />
            <div className="">
              <AIResponse onCreateAIResponse={handleCreateAIResponse} />
            </div>
          </div>
        </div>
        <div className="w-52" />
      </div>
    </div>
  )
}

export default Notes
