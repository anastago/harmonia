import React, { useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import ButtonSecondary from "./ButtonSecondary"
import { SparklesIcon } from "@heroicons/react/24/outline"

function AIResponse({ onCreateAIResponse, isLoading }) {
  const { getAIResponse, token, aiResponse, note } = useContext(AuthContext)

  useEffect(() => {
    const fetchAIResponse = async () => {
      if (token && note._id) {
        try {
          await getAIResponse(token, note._id)
        } catch (error) {
          console.log("Error fetching AI response:", error)
        }
      }
    }

    fetchAIResponse()
  }, [token, note._id])

  const handleAIResponse = async (event) => {
    event.preventDefault()

    await onCreateAIResponse(note._id)
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <form onSubmit={handleAIResponse} className="my-5 h-12">
        <ButtonSecondary
          type="submit"
          text={"Feedback"}
          Icon={SparklesIcon}
        ></ButtonSecondary>
      </form>
      <div className="flex-1 overflow-y-auto mb-2">
        {isLoading ? (
          <div className="text-slate-500">Thinking...</div>
        ) : (
          aiResponse
        )}
      </div>
    </div>
  )
}

export default AIResponse
