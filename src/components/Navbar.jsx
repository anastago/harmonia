import { useContext } from "react"
import { Link } from "react-router-dom"
import ButtonTertiary from "./ButtonTertiary"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"

function Navbar() {
  const { token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = (event) => {
    logout()
    navigate("/")
  }
  return (
    <nav className="sticky p-2 sm:h-14 flex font-roboto justify-between text-sky-950 ">
      <Link
        to="/"
        className="w-36 h-12 rounded-full p-3 text-center drop-shadow-l text-sky-500 flex items-center gap-1"
      >
        Harmonia
      </Link>

      {token ? (
        <form onSubmit={handleLogout}>
          <ButtonTertiary text={"Log out"}></ButtonTertiary>{" "}
        </form>
      ) : (
        <Link
          to="/login"
          className="w-36 h-12 rounded-full p-3 text-center drop-shadow-l hover:bg-blue-100 flex items-center justify-center"
        >
          Log in
        </Link>
      )}
    </nav>
  )
}

export default Navbar
