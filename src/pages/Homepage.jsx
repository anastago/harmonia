import { Link } from "react-router-dom"

function Homepage() {
  return (
    <div className="flex flex-col h-screen box-border bg-blue-900">
      <Link
        className="text-7xl w-46 h-12 bg-blue-900 rounded-full p-7 text-center drop-shadow-lg flex items-center justify-center"
        to="/journal"
      >
        {" "}
        Start journaling{" "}
      </Link>
    </div>
  )
}

export default Homepage
