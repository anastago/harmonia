import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import OneNote from "../components/OneNote"
import History from "../components/History"
import AIResponse from "../components/AIResponse"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { PlusIcon, Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline"

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

    if (!token) return

    getOwnerNotes()

    if (id === "new") {
      const createNewNote = async () => {
        try {
          const newNote = await postNote(token, "")
          navigate(`/notes/${newNote.data._id}`)
        } catch (error) {
          console.log(error)
        }
      }
      createNewNote()
    } else {
      getNote(token, id)
    }
  }, [token, id])

  useEffect(() => {}, [note])

  const handleNoteSelect = (note) => {
    setCurrentNote(note)
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
      await postAIResponse(token, noteId)
      getOwnerNotes()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen box-border font-roboto">
      <Navbar></Navbar>
      <div className="flex flex-1 w-full overflow-hidden">
        <History
          isOpen={isOpen}
          ownerNotes={ownerNotes}
          onNoteSelect={handleNoteSelect}
        />
        <div className="flex-1">
          <div className="flex flex-col h-full max-h-full relative mx-auto px-5 bg-white xl:rounded text-sky-950">
            {isOpen ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 hover:bg-blue-100 rounded-full flex items-center justify-center absolute sm:left-4 top-6 right-4"
              >
                {" "}
                <XMarkIcon className="h-7 w-7 text-blue-800" />
              </button>
            ) : (
              <Link
                to="/notes/new"
                className="h-10 w-10 hover:bg-blue-100 rounded-full flex items-center justify-center absolute sm:left-4 top-6 right-4"
              >
                <PlusIcon className="h-7 w-7 text-blue-800" />
              </Link>
            )}
            <button
              className="sm:hidden w-10 h-10 flex justify-center items-center rounded-full hover:bg-blue-100 absolute left-4 top-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bars2Icon className="h-7 w-7 text-blue-800" />
            </button>
            <OneNote onCreateNote={handleCreateNote} />
            <AIResponse
              onCreateAIResponse={handleCreateAIResponse}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="xl:w-72 hidden md:block" />
      </div>
    </div>
  )
}

export default Notes
