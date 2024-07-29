import { useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useReduxHooks';
import styles from '../Table.module.css';
import TaskForm from './TaskForm';
import { addTask } from '../../../store/slices/tasksSlice';
import { addBtnObject } from '../../../store/slices/generateBtnSlice';
import {
  type SelectedData,
  initialState,
  validateData,
} from './NewTaskHelpers';

export default function NewTask() {
  const [inputData, setInputData] = useState<SelectedData>(initialState);
  const imagesRef = useRef<{ resetList: () => void }>(null);
  const textRef = useRef<{ resetList: () => void }>(null);
  const dispatch = useAppDispatch();

  // Collecting input
  const handleGetSelectedValues = (value: string | string[], id: string) => {
    setInputData((prevValue) => {
      return {
        ...prevValue,
        [id]: value,
      };
    });
  };

  const handleAddTask = () => {
    // Validation and data transfer to the store
    const validationResult = validateData(inputData);

    if (validationResult) {
      // creating task state and generate button state
      dispatch(addTask(validationResult));
      dispatch(addBtnObject(validationResult.id));

      // Input fields reseting
      setInputData(initialState);
      imagesRef.current?.resetList();
      textRef.current?.resetList();
    } else {
      alert('Please fill in all the required fields');
    }
  };

  return (
    <div className={styles.newTask}>
      <TaskForm
        inputData={inputData}
        onAddInputData={handleGetSelectedValues}
        imagesRef={imagesRef}
        textRef={textRef}
      />
      <div>
        <button className='grey-btn' onClick={handleAddTask}>
          Add new task
        </button>
      </div>
    </div>
  );
}
