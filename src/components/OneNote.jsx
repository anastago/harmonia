import React, { useState, useContext, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { AuthContext } from "../context/auth.context"

function OneNote({ onCreateNote }) {
  const { note, updateNote, token } = useContext(AuthContext)

  const [text, setText] = useState("")

  useEffect(() => {
    if (note) {
      setText(note.text)
    }
  }, [note])
  useEffect(() => {
    const debounce = setTimeout(async () => {
      try {
        await updateNote(token, note._id, text)
      } catch (error) {
        console.log(error)
      }
    }, 300)

    return () => clearTimeout(debounce)
  }, [text, token])

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onCreateNote(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextareaAutosize
          autoFocus
          className="min-h-56 max-h-56 w-full mt-16 resize-none outline-none rounded bg-transparent text-sky-950 font-roboto overflow-y-auto"
          name="chat"
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="How are you feeling today?"
        />
      </div>
    </form>
  )
}

export default OneNote
