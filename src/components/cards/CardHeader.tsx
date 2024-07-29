import styles from './TaskCard.module.css';

type CardHeaderProps = {
  taskName: string;
  onClose: () => void;
};

export function CardHeader({ taskName, onClose }: CardHeaderProps) {
  return (
    <div className={styles.header}>
      <h2>{taskName}</h2>
      <div className={styles.closeBtn} onClick={onClose}>
        x
      </div>
    </div>
  );
}
