import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './Table.module.css';

export default function Table() {
  return (
    <div className={styles.table}>
      <div className={styles.tableContainer}>
        <TableHeader />
        <TableBody />
      </div>
    </div>
  );
}
