import React, { useState, useContext } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { AuthContext } from "../context/auth.context"

function CreateNote({ onCreateNote }) {
  const [text, setText] = useState("")

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onCreateNote(text)
    setText("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextareaAutosize
            autoFocus
            className="flex-1 w-full px-6 h-16 resize-none outline-none border-0 rounded bg-transparent text-sky-950 font-roboto"
            name="chat"
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="How are you feeling today?"
          />
        </div>
        <button type="submit" className="border">
          Create note
        </button>
      </form>
    </div>
  )
}

export default CreateNote
