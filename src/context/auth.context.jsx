import { createContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState([])
  const [ownerNotes, setOwnerNotes] = useState([])
  const [aiResponse, setAIResponse] = useState([])
  const navigate = useNavigate()
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

  const checkLogin = async () => {
    const storedToken = localStorage.getItem("authToken")
    console.log("token", storedToken)
    if (storedToken) {
      setToken(storedToken)

      try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        console.log(response.data.user)
        setUser(response.data.user)
      } catch (error) {
        console.error(error)
        setToken("")
        navigate("/login")
      }
    } else navigate("/login")
  }

  const signup = async (event, email, password) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/api/users`, {
        email,
        password,
      })
      setToken(response.data.token)
      localStorage.setItem("authToken", response.data.token)
      console.log(response.data.token)
      return "signup ok"
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const logout = (event) => {
    setToken("")
    setUser({})
    localStorage.removeItem("authToken")
  }

  const getUser = async (userToken) => {
    await axios
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

  const getNotes = async (userToken) => {
    await axios
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

  const getNote = async (userToken, id) => {
    await axios
      .get(`${API_URL}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response)
        setNote(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateNote = async (userToken, id, newText) => {
    await axios
      .put(
        `${API_URL}/api/notes/${id}`,
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
        setNote(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getAIResponse = async (userToken, noteId) => {
    await axios
      .get(`${API_URL}/api/airesponses/single`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          noteId: noteId,
        },
      })
      .then((response) => {
        setAIResponse(response.data.text)
      })
      .catch((err) => {
        console.log("Error fetching AI response:", err)
      })
  }

  const postAIResponse = async (userToken, noteId) => {
    await axios
      .post(
        `${API_URL}/api/airesponses/`,
        { noteId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setAIResponse(response.data.data.text)
        console.log("Created AI response:", response.data.data.text)
      })
      .catch((err) => {
        console.log("Error fetching AI response:", err)
      })
  }

  const getOwnerNotes = async () => {
    const token = localStorage.getItem("authToken")
    await axios

      .get(`${API_URL}/api/notes/owner`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    try {
      const response = await axios.post(
        `${API_URL}/api/notes/`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      console.log("id of a new note", response.data.data._id)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
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
        getNote,
        note,
        aiResponse,
        postAIResponse,
        updateNote,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthProviderWrapper }
