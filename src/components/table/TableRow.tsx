import styles from './Table.module.css';
import { type Task } from '../../store/slices/tasksSlice';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../store/slices/tasksSlice';
import { FormEvent } from 'react';

export default function TableRow({
  id,
  index,
  name,
  dimension,
  templateId,
  text,
  ammount,
  genType,
  images,
}: Task & { index: number }) {
  const dispatch = useDispatch();

  const handleRemoveTask = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch(removeTask(id))
  }

  return (
    <form className={styles.tableRow}>
      <div>
        <span className={styles.id}>{index}</span>
      </div>
      <div>
        <span className={styles.name}>{name}</span>
      </div>
      <div>
        <span className={styles.filled}>{dimension}</span>
      </div>
      <div>
        <span className={styles.filled}>{templateId}</span>
      </div>
      <div>
        <ul className={styles.imageList}>
        {images.map((image) => (
          <li key={image.name}>{image.name}</li>
        ))}
        </ul>
      </div>
      <div>
        <p className={styles.text}>{text}</p>
      </div>
      <div>
        <span>{ammount}</span>
      </div>
      <div>
        <span className={styles.filled}>{genType}</span>
      </div>
      <div>link</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <button className='purple-btn'>Generate</button>
        <button className='red-btn' onClick={handleRemoveTask}>Remove</button>
      </div>
    </form>
  );
}
