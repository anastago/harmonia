import { Link } from "react-router-dom"

import Navbar from "../components/Navbar"

function Homepage(props) {
  return (
    <div className="flex flex-col h-screen box-border">
      <Navbar></Navbar>
      <div className="flex flex-col h-screen items-center justify-around content-center">
        <div className="flex flex-col items-center justify-center w-4/5 text-blue-800 font-roboto text-center">
          <h1 className="text-6xl font-roboto py-3">
            Enhance your emotionl well-being
          </h1>

          <h2 className="text-sky-950 my-8 text-lg">
            HarmonIA is your personal AI-Powered CBT Journal. Unlock your
            potential and navigate life's challenges with CBT-driven insights.
          </h2>
          <Link
            className="w-46s h-12 bg-blue-100 rounded-full p-7 text-center drop-shadow-lg flex items-center justify-center"
            to="/journal"
          >
            {" "}
            Start journaling{" "}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
