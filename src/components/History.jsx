import { Link } from "react-router-dom"

function History({ ownerNotes, onNoteSelect }) {
  return (
    <div className="text-black w-1/4">
      <h2 className="text-lg font-bold">History</h2>
      <ul>
        {ownerNotes.map((note) => (
          <li key={note._id} onClick={() => onNoteSelect(note)}>
            <Link to={`/notes/${note._id}`}>{note.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
