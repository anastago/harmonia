import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import React from "react"
import NavbarLoginPages from "../components/NavbarLoginPages"
import ButtonMedium from "../components/ButtonMedium"

function Login(props) {
  const { value, login, checkLogin } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    const loginResponse = await login(event, email, password)
    if (loginResponse === "login valid") {
      navigate("/notes/new")
    } else {
      setError("Invalid email address or password. Please try again")
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className="flex flex-col h-screen box-border bg-blue-200 font-roboto">
      <NavbarLoginPages />
      <div className="flex flex-1 w-full h-full">
        <div className="flex-1 w-52">
          <div className="flex  flex-col items-center space-y-10 h-full max-w-3xl mx-auto px-5 bg-white rounded text-sky-950 font-roboto">
            <form
              className="flex flex-col w-full items-center space-y-6 mt-10"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <label>Email address</label>
              <input
                className="bg-blue-100"
                value={email}
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />

              <label>Your Password</label>
              <input
                className="bg-blue-100"
                value={password}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />

              <ButtonMedium text={"Sign in"} />
              {error && <div className="text-red-500">{error}</div>}
            </form>
            <Link to="/signup" className="underline text-xs">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="w-52 flex-1" />
    </div>
  )
}

export default Login
