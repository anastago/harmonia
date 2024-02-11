import { useEffect, useRef, useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { SparklesIcon } from "@heroicons/react/24/outline"

function Journal() {
  const [inputText, setInputText] = useState("")
  const [AIResponse, setAIResponse] = useState("")

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setInputText("")
  }
  return (
    <div className="flex flex-col h-screen box-border bg-blue-400">
      <div className="flex flex-col h-full overflow-hidden flex-1 max-w-3xl w-full mx-auto px-5 m-auto  bg-white rounded text-sky-950 font-roboto">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col w-full h-3/4 justify-end items-start sticky mb-6 -mt-3  p-1 overflow-hidden"
        >
          <button
            type="submit"
            className="h-16 w-16 hover:bg-blue-100 rounded-full flex items-center justify-center "
          >
            {" "}
            <PlusCircleIcon className="h-7 w-7 text-blue-800" />
          </button>
          <TextareaAutosize
            autoFocus
            className="flex-1 w-full px-6 h-16 resize-none outline-none border-0 rounded bg-transparent text-sky-950 font-roboto"
            name="chat"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="How are you feeling today?"
          />
        </form>
        <div>
          <SparklesIcon className="h-7 w-7 text-blue-800" />
          <div> {AIResponse} </div>
        </div>
      </div>
    </div>
  )
}

export default Journal
