import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import OneNote from "../components/OneNote"
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
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  console.log("params", id)

  useEffect(() => {
    checkLogin()
    console.log("token after sigunp", token)
    if (!token) return

    getOwnerNotes()

    if (id === "new") {
      const createNewNote = async () => {
        try {
          const newNote = await postNote(token, "")
          navigate(`/notes/${newNote.data._id}`)
          console.log(currentNote)
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
      setIsLoading(true)
      console.log(isLoading)
      await postAIResponse(token, noteId)
      getOwnerNotes()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen box-border font-roboto overflow-y-auto">
      <Navbar></Navbar>
      <div className="flex flex-1 w-full overflow-hidden">
        <History
          isOpen={isOpen}
          ownerNotes={ownerNotes}
          onNoteSelect={handleNoteSelect}
        />

        <div className="flex-1">
          <div className="flex flex-col h-full relative mx-auto px-5 bg-white sm:rounded text-sky-950">
            <Link
              to="/notes/new"
              className="h-10 w-10 hover:bg-blue-100 rounded-full flex items-center justify-center absolute left-4 top-4"
            >
              <PlusIcon className="h-7 w-7 text-blue-800" />
            </Link>
            <button
              className="sm:hidden w-12 h-12 flex justify-center items-center rounded-full bg-blue-300 fixed bottom-4 right-4"
              onClick={() => setIsOpen(!isOpen)}
            ></button>
            <OneNote onCreateNote={handleCreateNote} />
            <AIResponse
              onCreateAIResponse={handleCreateAIResponse}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="w-52 hidden sm:block" />
      </div>
    </div>
  )
}

export default Notes
