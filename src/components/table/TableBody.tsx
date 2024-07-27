import NewTask from './new-task/NewTask';
import TableRow from './TableRow';
import styles from './Table.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function TableBody() {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div className={styles.tableBody}>
      {tasks.map((task, index) => (
        <TableRow key={`${task.name}--${index}`} {...task} index={index} />
      ))}
      <NewTask />
    </div>
  );
}
