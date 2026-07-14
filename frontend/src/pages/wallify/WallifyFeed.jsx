import { useEffect, useState } from 'react';

import AuthenticatedLayout from '../../components/layout/AuthenticatedLayout';
import CreateNote from '../../components/notes/CreateNote';
import NoteCard from '../../components/notes/NoteCard';

import { getAllNotes } from '../../services/noteService';

import '../../styles/wallify-feed.css';

function WallifyFeed() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();

      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <AuthenticatedLayout>
      <section className='wallify-feed'>
        <header className='feed-header'>
          <h1>Wallify Feed</h1>

          <p>Share your thoughts and discover what others are saying.</p>
        </header>

        <CreateNote onNoteCreated={fetchNotes} />

        <section className='feed-notes'>
          {notes.length === 0 ? (
            <p className='empty-feed'>No Wallifies have been posted yet.</p>
          ) : (
            notes.map((note) => <NoteCard key={note._id} note={note} />)
          )}
        </section>
      </section>
    </AuthenticatedLayout>
  );
}

export default WallifyFeed;
