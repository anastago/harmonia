import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { AuthContext } from "../context/auth.context"
import Button from "../components/Button"
import { Link } from "react-router-dom"

function Signup(props) {
  const { signup } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    const signupResponse = await signup(event, email, password)
    if (signupResponse === "signup ok") {
      navigate("/notes/new")
    }
  }

  return (
    <div className="flex flex-col h-screen box-border bg-blue-200 font-roboto">
      <Navbar></Navbar>
      <div className="flex flex-1 w-full h-full">
        <div className="flex-1 w-52">
          <div className="flex  flex-col items-center space-y-10 h-full max-w-3xl mx-auto px-5 bg-white rounded text-sky-950 font-roboto">
            <form
              className="flex flex-col w-full items-center space-y-6 mt-10"
              onSubmit={(event) => {
                handleSubmit(event)
              }}
            >
              <label>Email adress</label>
              <input
                className="bg-blue-100"
                value={email}
                type="text"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />

              <label>Password</label>
              <input
                className="bg-blue-100"
                value={password}
                type="text"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />

              <Button text={"Sign up"} />
            </form>
            <Link to="/signup" className="underline text-xs">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="w-52 flex-1" />
    </div>
  )
}

export default Signup
