import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import ButtonMedium from "../components/ButtonMedium"

function AIResponse({ onCreateAIResponse }) {
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
    <div>
      <div className=" h-14 text-black">
        <form onSubmit={handleAIResponse}>
          <ButtonMedium type="submit" text={"AI feedback"}></ButtonMedium>
        </form>
        {aiResponse}
      </div>
    </div>
  )
}

export default AIResponse
