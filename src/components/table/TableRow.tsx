import styles from './Table.module.css';
import TaskCard from '../cards/TaskCard';
import TableCell from './TableCell';
import LayerList from './LayerList';
import GenerateButton from './GenerateBtn';
import RemoveButton from './RemoveBtn';

import { useState } from 'react';
import { type Task } from '../../util/GLOBAL_TYPES';
import ResultUrl from './ResultUrl';

export default function TableRow({
  index,
  id,
  name,
  dimension,
  templateId,
  text,
  ammount,
  genType,
  images,
}: Task & { index: number }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenCard = () => {
    setShowModal(true);
  };

  const handleCloseCard = () => {
    setShowModal(false);
  };

  return (
    <>
      <TaskCard
        modalState={showModal}
        onClose={handleCloseCard}
        taskInfo={{ id, name, images }}
      />
      <form className={styles.tableRow} onClick={handleOpenCard}>
        <TableCell content={index + 1} className={styles.id} />
        <TableCell content={name} className={styles.name} />
        <TableCell content={dimension} className={styles.filled} />
        <TableCell content={templateId} className={styles.filled} />
        <LayerList items={images} className={styles.imageList} />
        <LayerList items={text} className={styles.imageList} />
        <TableCell content={ammount} />
        <TableCell content={genType} className={styles.filled} />
        <ResultUrl taskId={id} />
        <div className={styles.buttons}>
          <GenerateButton taskId={id} name={name} dimension={dimension} />
          <RemoveButton taskId={id} />
        </div>
      </form>
    </>
  );
}
