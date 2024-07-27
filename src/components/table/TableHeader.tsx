import styles from './Table.module.css';

const TITLES = [
  'ID',
  'Task name',
  'Dimension',
  'Template ID',
  'Images',
  'Text',
  'Ammount',
  'Gen Type',
  'Result Ads',
  'Actions',
];

export default function TableHeader() {
  return (
    <ul className={styles.tableHeader}>
      {TITLES.map((title) => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  );
}
