import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet"
import Homepage from "./pages/Homepage"
import Journal from "./pages/Journal"

function App() {
  useEffect(() => {
    document.body.classList.add("bg-blue-50")
    document.body.classList.add("box-border")
  }, [])
  return (
    <Router>
      <Helmet>
        <title>HarmonIA</title>
      </Helmet>
      <div className="min-w-[320px]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
