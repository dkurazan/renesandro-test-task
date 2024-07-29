import styles from './Table.module.css';
import { TABLE_HEADINGS } from '../../util/STATIC_DATA';

export default function TableHeader() {
  return (
    <ul className={styles.tableHeader}>
      {TABLE_HEADINGS.map((title) => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  );
}
