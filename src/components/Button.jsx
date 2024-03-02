import React from "react"
import { Link } from "react-router-dom"

function Button(props) {
  return (
    <button
      type="submit"
      className="w-36 h-12 bg-blue-200 hover:bg-blue-100 rounded-full p-3 text-center drop-shadow-lg flex items-center justify-center"
    >
      {props.text}
    </button>
  )
}

export default Button
