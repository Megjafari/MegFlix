import { useState } from 'react';
import styles from './EditMovieModal.module.css';

export default function EditMovieModal({ movie, onSave, onClose }) {
  const [title,       setTitle]       = useState(movie.title || '');
  const [description, setDescription] = useState(movie.description || '');
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate?.slice(0, 10) || '');
  const [loading,     setLoading]     = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await onSave(movie.id, { title, description, releaseDate: releaseDate || null });
    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Movie</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input className={styles.inp} value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea className={styles.ta} value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Release Date</label>
            <input className={styles.inp} type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
          </div>
          <div className={styles.actions}>
            <button className={styles.btnGhost} onClick={onClose}>Cancel</button>
            <button className={styles.btnRed} onClick={handleSave} disabled={loading || !title.trim()}>
              {loading ? <span className={styles.spinner} /> : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}