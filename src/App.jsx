import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet"
import Homepage from "./pages/Homepage"
import Notes from "./pages/Notes"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PageNotFound from "./pages/PageNotFound"

function App() {
  useEffect(() => {
    document.body.classList.add("bg-gradient-to-b")
    document.body.classList.add("from-blue-100")
    document.body.classList.add("to-blue-400")
    document.body.classList.add("box-border")
  }, [])
  return (
    <>
      <Helmet>
        <title>Harmonia</title>
      </Helmet>
      <div className="min-w-[320px]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/notes/:id" element={<Notes />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
