import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="logo" width={100} height={100} />
      <h1>Renesandro AI</h1>
    </header>
  );
}
