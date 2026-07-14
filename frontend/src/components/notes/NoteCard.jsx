import '../../styles/note-card.css';

function NoteCard({ note }) {
  return (
    <article className='note-card'>
      <header className='note-card-header'>
        <h3>{note.owner?.username || 'Unknown User'}</h3>

        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </header>

      <p className='note-content'>{note.content}</p>
    </article>
  );
}

export default NoteCard;
