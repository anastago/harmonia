import React from "react"

function ButtonTertiary(props) {
  return (
    <button
      type="submit"
      className="w-36 h-12 hover:bg-blue-100 rounded-full p-3 text-center drop-shadow-lg flex sm:items-center sm:justify-center justify-end"
    >
      {props.text}
    </button>
  )
}

export default ButtonTertiary
