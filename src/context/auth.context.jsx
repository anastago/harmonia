import { createContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([])
  const [ownerNotes, setOwnerNotes] = useState([])
  const [aiResponse, setAIResponse] = useState([])
  const API_URL = import.meta.env.VITE_API_URL
  console.log(API_URL)

  const login = async (event, email, password) => {
    event.preventDefault()

    try {
      const fetchLogin = await axios.post(`${API_URL}/api/users/signin`, {
        email: email,
        password: password,
      })
      setToken(fetchLogin.data.token)
      localStorage.setItem("authToken", fetchLogin.data.token)
      return "login valid"
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const checkLogin = () => {
    const storedToken = localStorage.getItem("authToken")
    console.log("token", storedToken)
    if (storedToken) {
      setToken(storedToken)
    }
  }

  const signup = (event, email, password) => {
    event.preventDefault()
    console.log(email, password)
    axios
      .post(`${API_URL}/api/users`, { email: email, password: password })
      .then(() => {
        console.log(response.data.token)
        setToken(response.data.token)
        return "Signup OK"
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  }

  const logout = (event) => {
    event.preventDefault()
    setToken("")
    localStorage.removeItem("authToken")
  }

  const getUser = (userToken) => {
    axios
      .get(`${API_URL}/api/users/single`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUser(response.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getNotes = (userToken) => {
    axios
      .get(`${API_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setNotes(response.data.notes)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getNote = (userToken) => {
    axios
      .get(`${API_URL}/api/notes/:noteId`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setNotes(response.data.notes)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getAIResponse = (userToken, noteId) => {
    axios
      .get(`${API_URL}/api/airesponses/single`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          noteId: noteId,
        },
      })
      .then((response) => {
        setAIResponse(response.data.aiResponse)
      })
      .catch((err) => {
        console.log("Error fetching AI response:", err)
      })
  }

  const getOwnerNotes = (userToken) => {
    if (!userToken) {
      return
    }
    axios

      .get(`${API_URL}/api/notes/owner`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setOwnerNotes(response.data.notes)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const postNote = async (userToken, text) => {
    axios
      .post(
        `${API_URL}/api/notes/`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        value: "AuthValue",
        login,
        checkLogin,
        signup,
        logout,
        token,
        getUser,
        user,
        getNotes,
        notes,
        getOwnerNotes,
        ownerNotes,
        postNote,
        getAIResponse,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthProviderWrapper }
