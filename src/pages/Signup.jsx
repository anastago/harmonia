import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"

function Signup(props) {
  const { signup } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    const signupResponse = await signup(event, email, password)
    if (signupResponse === "singup ok") {
      navigate("/journal")
    }
  }

  return (
    <div>
      <h1>Signup page</h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event)
        }}
      >
        <div>
          <label>email :</label>
          <input
            value={email}
            type="text"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        <div>
          <label>password :</label>
          <input
            value={password}
            type="text"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}

export default Signup
