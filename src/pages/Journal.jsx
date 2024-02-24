import { useEffect, useRef, useState, useContext } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { SparklesIcon } from "@heroicons/react/24/outline"
import CreateNote from "../components/CreateNote"
import { AuthContext } from "../context/auth.context"

function Journal() {
  const { token, checkLogin } = useContext(AuthContext)

  const [text, setText] = useState("")
  const [AIResponse, setAIResponse] = useState("")

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setText("")
  }

  useEffect(() => {
    checkLogin()
  }, []) // faut redirect sur la page de login?

  return (
    <div className="flex flex-col h-screen box-border bg-blue-400">
      <div className="flex flex-col h-full overflow-hidden flex-1 max-w-3xl w-full mx-auto px-5 m-auto  bg-white rounded text-sky-950 font-roboto">
        <CreateNote></CreateNote>
        <div>
          <SparklesIcon className="h-7 w-7 text-blue-800" />
          <div> {AIResponse} </div>
        </div>
      </div>
    </div>
  )
}

export default Journal
