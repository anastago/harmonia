import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"

import React from "react"



function Login(props) {
    const { value, login, checkLogin } = useContext(AuthContext)

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()

const handleSubmit = async (event) => {
  const loginResponse = await login(event, email, password)
  if (loginResponse === "login ok") {
    navigate("/journal")
  }
}

useEffect(() => {
  checkLogin()
}, [])

  return (
    <div>
      <h1>Login page</h1>
      {value}
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
