import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet"

function App() {
  useEffect(() => {
    document.body.classList.add("bg-blue-50")
    document.body.classList.add("box-border")
  }, [])
  return (
    <div className="min-w-[320px]">
      <Helmet>
        <title>HarmonIA</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
