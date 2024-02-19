import { createContext, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([])
  const [ownerNotes, setOwnerNotes] = useState([])

  const API_URL = process.env.API_URL

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
    if (storedToken) {
      setToken(storedToken)
    }
  }

  const signup = (event, email, password) => {
    event.preventDefault()
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

  const getOwnerNotes = (userToken) => {
    axios
      .get(`${API_URL}/api/articles/owner`, {
        /// CETTE ROUTE
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setOwnerArticles(response.data.articles)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const postNote = (event, userToken, text) => {
    event.preventDefault()
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
        console.log(response.data.message)
        return "Note created"
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProviderWrapper }
