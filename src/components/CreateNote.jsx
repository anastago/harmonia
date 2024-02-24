import React, { useState, useContext } from "react"
import TextareaAutosize from "react-textarea-autosize"

import { AuthContext } from "../context/auth.context"

function CreateNote(props) {
  const { postNote, token } = useContext(AuthContext)
  const [text, setText] = useState("")

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (event) => {
    const responsePostNote = await postNote(event, token, text)
    console.log(responsePostNote)
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event)
        }}
      >
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
