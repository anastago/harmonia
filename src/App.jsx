import { useState } from "react"
import { Routes, Route, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet"
import Homepage from "./pages/Homepage"
import Journal from "./pages/Notes"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  useEffect(() => {
    document.body.classList.add("bg-gradient-to-b")
    document.body.classList.add("from-blue-100")
    document.body.classList.add("to-blue-300")
    document.body.classList.add("box-border")
  }, [])
  return (
    <>
      <Helmet>
        <title>Harmonai</title>
      </Helmet>
      <div className="min-w-[320px]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/notes/:id" element={<Journal />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
