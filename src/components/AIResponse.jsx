import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"

function AIResponse({ noteId }) {
  const { getAIResponse, token } = useContext(AuthContext)
  const [aiResponse, setAIResponse] = useState(null)

  useEffect(() => {
    const fetchAIResponse = async () => {
      if (token && noteId) {
        try {
          const response = await getAIResponse(token, noteId)
          setAIResponse(response)
        } catch (error) {
          console.log("Error fetching AI response:", error)
        }
      }
    }

    fetchAIResponse()
  }, [token, noteId])

  return (
    <div>
      {aiResponse ? (
        <div>
          <p>{aiResponse.text}</p>
        </div>
      ) : (
        <p>No AI response found.</p>
      )}
    </div>
  )
}

export default AIResponse
