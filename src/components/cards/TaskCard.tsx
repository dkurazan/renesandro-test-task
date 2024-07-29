import { CardHeader } from './CardHeader';
import CardBody from './CardBody';
import Modal from '../UI/Modal';
import styles from './TaskCard.module.css';

type TaskCardProps = {
  modalState: boolean;
  onClose: () => void;
  taskInfo: {
    id: string;
    name: string;
    images: string[];
  };
};

export default function TaskCard({ modalState, onClose, taskInfo }: TaskCardProps) {
  return (
    <Modal open={modalState} onClose={onClose}>
      <div className={styles.modalContainer}>
        <CardHeader taskName={taskInfo.name} onClose={onClose} />
        <CardBody images={taskInfo.images} id={taskInfo.id} />
      </div>
    </Modal>
  );
}
