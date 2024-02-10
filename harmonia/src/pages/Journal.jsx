import { useEffect, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

function Journal() {
  const [inputText, setInputText] = useState("")
  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setInputText("")
  }
  return (
    <div className="flex flex-col h-screen box-border bg-blue-900">
      <div className="w-full sticky">
        <form
          onSubmit={handleFormSubmit}
          className="flex w-full justify-end items-center sticky border rounded-full mb-6 -mt-3 shadow-lg bg-white p-1 overflow-hidden"
        >
          <TextareaAutosize
            autoFocus
            className="flex-1 px-6 h-16 resize-none outline-none border-0 rounded bg-transparent text-sky-950 font-roboto"
            name="chat"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Write your message..."
          />

          <button
            type="submit"
            className="h-16 w-16 hover:bg-blue-100 rounded-full flex items-center justify-center "
          >
            {" "}
            <PaperAirplaneIcon className="h-7 w-7 text-blue-800" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Journal
