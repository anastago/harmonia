import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import CreateNote from "../components/CreateNote"
import History from "../components/History"
import AIResponse from "../components/AIResponse"
import { useParams, useNavigate } from "react-router-dom"

function Journal(props) {
  const {
    token,
    checkLogin,
    getOwnerNotes,
    postNote,
    ownerNotes,
    getNote,
    note,
    postAIResponse,
    aiResponseNew,
    setNote,
  } = useContext(AuthContext)

  const [currentNote, setCurrentNote] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  console.log("params", id)
  // navigate("/notes/new")

  useEffect(() => {
    checkLogin()
    if (!token) return

    getOwnerNotes(token)

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
    console.log(currentNote) // NULL first, ok
  }

  const handleCreateNote = async (text) => {
    try {
      const response = await postNote(token, text)
      getOwnerNotes(token)
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
    <div className="flex justify-center h-screen box-border bg-blue-400">
      <History ownerNotes={ownerNotes} onNoteSelect={handleNoteSelect} />
      <div className="flex flex-col h-full overflow-hidden flex-1 max-w-3xl w-full mx-auto px-5 m-auto bg-white rounded text-sky-950 font-roboto">
        <CreateNote onCreateNote={handleCreateNote} />
        <div>
          <AIResponse onCreateAIResponse={handleCreateAIResponse} />
        </div>
      </div>
      s
    </div>
  )
}

export default Journal
