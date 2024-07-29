import styles from './Table.module.css';
import TaskCard from '../cards/TaskCard';
import TableCell from './TableCell';
import LayerList from './LayerList';
import GenerateButton from './GenerateBtn';
import RemoveButton from './RemoveBtn';
import { useAppDispatch } from '../../hooks/useReduxHooks';
import { removeTask } from '../../store/slices/tasksSlice';
import { resetImagesData } from '../../store/slices/imagesSlice';
import { removeBtnObject } from '../../store/slices/generateBtnSlice';
import { FormEvent, useState } from 'react';
import { type Task } from '../../util/GLOBAL_TYPES';

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
  const dispatch = useAppDispatch();

  const handleRemoveTask = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Resetting task, imageLayers and button stores
    dispatch(removeTask(id));
    dispatch(resetImagesData(id));
    dispatch(removeBtnObject(id));
  };

  const handleOpenCard = () => {
    setShowModal(true);
  };

  const handleCloseCadr = () => {
    setShowModal(false);
  };

  return (
    <>
      <TaskCard
        modalState={showModal}
        onClose={handleCloseCadr}
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
        <TableCell content="link" />
        <div className={styles.buttons}>
        <GenerateButton taskId={id} />
        <RemoveButton onClick={handleRemoveTask} />
        </div>
      </form>
    </>
  );
}
