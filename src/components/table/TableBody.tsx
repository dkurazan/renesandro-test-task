import NewTask from './new-task/NewTask';
import TableRow from './TableRow';
import styles from './Table.module.css';
import { useAppSelector } from '../../hooks/useReduxHooks';

export default function TableBody() {
  const tasks = useAppSelector((state) => state.tasks);

  return (
    <div className={styles.tableBody}>
      {tasks.map((task, index) => (
        <TableRow key={`${task.name}--${index}`} {...task} index={index} />
      ))}
      <NewTask />
    </div>
  );
}
