import React from "react"

function ButtonPrimary(props) {
  return (
    <button
      type="submit"
      className="w-56 h-12 bg-blue-100 hover:bg-blue-50 rounded-full p-3 text-center drop-shadow-lg flex items-center justify-center"
    >
      {props.text}
    </button>
  )
}

export default ButtonPrimary
