import { Link, useParams } from "react-router-dom"

function History({ ownerNotes, onNoteSelect }) {
  const { id } = useParams()
  return (
    <div className="text-black overflow-auto h-full w-52 px-5">
      <h1 className="text-xs text-blue-500 top-0 p-1">Previous</h1>
      <ul className="">
        {ownerNotes.map((note) => (
          <Link className="" to={`/notes/${note._id}`}>
            <li
              key={note._id}
              onClick={() => onNoteSelect(note)}
              className={`truncate hover:bg-blue-100 p-1 rounded-md ${
                id == note._id ? "bg-blue-200 hover:bg-blue-200" : ""
              }`}
            >
              {note.text == "" ? "New" : note.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default History
