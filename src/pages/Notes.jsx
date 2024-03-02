import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import Note from "../components/Note"
import History from "../components/History"
import AIResponse from "../components/AIResponse"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Button from "../components/Button"
import { Link } from "react-router-dom"

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col h-screen box-border bg-blue-200 font-roboto">
      <Navbar></Navbar>
      <div className="flex flex-1 w-full h-full">
        <div className="flex-1 px-10 overflow-hidden">
          <Link to="/notes/new">
            <Button text={"New"} />
          </Link>
          <History ownerNotes={ownerNotes} onNoteSelect={handleNoteSelect} />
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-full max-w-3xl mx-auto px-5 bg-white rounded text-sky-950">
            <Note onCreateNote={handleCreateNote} />
            <div className="">
              <AIResponse onCreateAIResponse={handleCreateAIResponse} />
            </div>
          </div>
        </div>
        <div className="w-52 flex-1" />
      </div>
    </div>
  )
}

export default Notes
