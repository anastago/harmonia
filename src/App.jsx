import { useState } from "react"
import { Routes, Route } from "react-router-dom"
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
    <>
      <Helmet>
        <title>HarmonIA</title>
      </Helmet>
      <div className="min-w-[320px]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </>
  )
}

export default App