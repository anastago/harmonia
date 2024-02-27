import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import CreateNote from "../components/CreateNote"
import History from "../components/History"
import AIResponse from "../components/AIResponse"

function Journal() {
  const {
    token,
    checkLogin,
    getAIResponse,
    getOwnerNotes,
    postNote,
    ownerNotes,
  } = useContext(AuthContext)
  const [currentNote, setCurrentNote] = useState(null)
  const [aiResponseText, setAIResponseText] = useState("")

  useEffect(() => {
    checkLogin()
    console.log("token vrai", token)
    getOwnerNotes(token)
  }, [token]) // ?? on what pages

  const handleNoteSelect = (note) => {
    setCurrentNote(note)
    setAIResponseText("")
  }

  const handleCreateNote = async (text) => {
    try {
      const response = await postNote(token, text)
      getOwnerNotes(token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center h-screen box-border bg-blue-400">
      <History ownerNotes={ownerNotes} onNoteSelect={handleNoteSelect} />
      <div className="flex flex-col h-full overflow-hidden flex-1 max-w-3xl w-full mx-auto px-5 m-auto bg-white rounded text-sky-950 font-roboto">
        <CreateNote onCreateNote={handleCreateNote} />
        {currentNote && (
          <div>
            <AIResponse noteId={currentNote._id} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Journal
