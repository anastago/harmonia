import React from "react"

function ButtonSecondary(props) {
  const Icon = props.Icon
  return (
    <button
      type="submit"
      className="sm:m-0 mx-auto text-blue-800 w-36 h-12 bg-blue-50 hover:bg-blue-100 rounded-full p-3 text-center drop-shadow-lg flex items-center justify-center"
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />} {props.text}
    </button>
  )
}

export default ButtonSecondary
