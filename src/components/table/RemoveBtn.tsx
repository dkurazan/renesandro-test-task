import { useAppDispatch } from '../../hooks/useReduxHooks';
import { FormEvent } from 'react';
import { removeTask } from '../../store/slices/tasksSlice';
import { resetImagesData } from '../../store/slices/imagesSlice';
import { removeBtnObject } from '../../store/slices/generateBtnSlice';
import { removeCreoGeneration } from '../../store/slices/resultUrlSlice';

export default function RemoveButton({ taskId }: { taskId: string }) {
  const dispatch = useAppDispatch();

  const handleRemoveTask = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Resetting task, imageLayers and button stores
    dispatch(removeTask(taskId));
    dispatch(resetImagesData(taskId));
    dispatch(removeBtnObject(taskId));
    dispatch(removeCreoGeneration(taskId));
  };

  return (
    <button className='red-btn' onClick={handleRemoveTask}>
      Remove
    </button>
  );
}
