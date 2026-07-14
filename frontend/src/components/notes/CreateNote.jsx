import { useState } from 'react';

import toast from 'react-hot-toast';

import { createNote } from '../../services/noteService';

import '../../styles/create-note.css';

function CreateNote({ onNoteCreated }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      toast.error('Please write something before publishing.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createNote({
        content: content.trim(),
      });

      toast.success(response.message);

      setContent('');

      if (onNoteCreated) {
        onNoteCreated();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to publish note.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='create-note-section'>
      <form className='create-note-form' onSubmit={handleSubmit}>
        <textarea
          name='content'
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="What's on your mind?"
          rows='4'
        />

        <div className='create-note-actions'>
          <button
            type='submit'
            className='publish-button'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateNote;
