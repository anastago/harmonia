import React, { useEffect, useState, useContext } from "react"
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
    <div className="h-14">
      <form onSubmit={handleAIResponse} className="my-4">
        <ButtonSecondary
          type="submit"
          text={"Feedback"}
          Icon={SparklesIcon}
        ></ButtonSecondary>
      </form>
      {isLoading ? (
        <div className="text-slate-500">Thinking...</div>
      ) : (
        aiResponse
      )}
    </div>
  )
}

export default AIResponse
