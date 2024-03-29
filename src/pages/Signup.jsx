import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import NavbarLoginPages from "../components/NavbarLoginPages"
import { AuthContext } from "../context/auth.context"
import ButtonSecondary from "../components/ButtonSecondary"
import { Link } from "react-router-dom"

function Signup(props) {
  const { signup } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const signupResponse = await signup(event, email, password)
    if (signupResponse === "signup ok") {
      navigate("/notes/new")
    } else {
      setError(
        "Invalid or already existing email adress. Please log in or try again"
      )
    }
  }

  return (
    <div className="flex flex-col h-screen box-border font-roboto">
      <NavbarLoginPages />
      <div className="flex flex-1 w-full h-full">
        <div className="flex-1 w-52">
          <div className="flex flex-col items-center space-y-7 h-full max-w-3xl mx-auto pb-7 px-5 bg-white rounded text-sky-950 font-roboto">
            <form
              className="flex flex-col w-full items-center space-y-7 mt-10"
              onSubmit={handleSubmit}
            >
              <label>Email address</label>
              <input
                className="bg-blue-100"
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <label>Create Password</label>
              <input
                className="bg-blue-100"
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <ButtonSecondary text={"Sign up"} />
              {error && (
                <div className="text-red-500 mx-auto text-center">{error}</div>
              )}
            </form>
            <Link to="/login" className="underline text-xs">
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
