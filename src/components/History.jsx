import React from "react"

import { AuthContext } from "../context/auth.context"
function History(props) {
  const { getNotes, token } = useContext(AuthContext)
  
  const getAllNotes = async (event) => {
    const responseAllNotes = await getNotes(event, token, text)
    console.log(responsePostNote)
  }

  return <div></div>
}

export default History
