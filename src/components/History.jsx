import { Link } from "react-router-dom"

function History({ ownerNotes, onNoteSelect }) {
  return (
    <div className="text-black">
      <ul className="">
        {ownerNotes.map((note) => (
          <li
            key={note._id}
            onClick={() => onNoteSelect(note)}
            className="truncate"
          >
            <Link className="truncate" to={`/notes/${note._id}`}>
              {note.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
