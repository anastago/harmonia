import { Link } from "react-router-dom"

function NavbarLoginPages() {
  return (
    <nav className="sticky p-2 h-14 flex font-roboto justify-between text-sky-950">
      <Link
        to="/"
        className="w-36 h-12 rounded-full p-3 text-center drop-shadow-l text-sky-500 flex items-center gap-1"
      >
        Harmonia
      </Link>
    </nav>
  )
}

export default NavbarLoginPages
