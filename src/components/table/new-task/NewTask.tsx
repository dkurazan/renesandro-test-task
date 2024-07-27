import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../Table.module.css';
import TableSelect from './TableSelect';
import ImagePicker from '../../UI/ImagePicker';
import { type EncryptedImagesType } from '../../UI/ImagePicker';
import { addTask } from '../../../store/slices/tasksSlice';

// Type for collecting input data
type SelectedData = {
  name?: string;
  dimension?: '1x1' | '9x16' | '16x9';
  templateId?: 'mwpswxcudtwxb' | '0xdoscyowl50c';
  text?: string;
  ammount?: string;
  genType?: 'cyclic' | 'random';
  images?: { name: string; url: string }[];
};

// Type for validation of input data
type Task = {
  id: string;
  name: string;
  dimension: '1x1' | '9x16' | '16x9';
  templateId: 'mwpswxcudtwxb' | '0xdoscyowl50c';
  text: string;
  ammount: string;
  genType: 'cyclic' | 'random';
  images: { name: string; url: string }[];
};

// Initial state of input data
const initialState: SelectedData = {
  name: '',
  text: '',
  ammount: '',
};

export default function NewTask() {
  const [selectData, setSelectData] = useState<SelectedData>(initialState);
  const dispatch = useDispatch();
  const imagesRef = useRef<{ clearImages: () => void }>(null);

  const handleGetSelectedValues = (
    value: string | EncryptedImagesType,
    id: string,
  ) => {
    setSelectData((prevValue) => {
      return {
        ...prevValue,
        [id]: value,
      };
    });
  };

  const handleAddTask = () => {
    // Validation and data transfer to the store
    if (
      selectData &&
      selectData.name &&
      selectData.dimension &&
      selectData.templateId &&
      selectData.text &&
      selectData.ammount &&
      selectData.genType &&
      selectData.images
    ) {
      const task: Task = {
        id: `${selectData.name}--${Math.random() * 1000}`,
        name: selectData.name,
        dimension: selectData.dimension,
        templateId: selectData.templateId,
        text: selectData.text,
        ammount: selectData.ammount,
        genType: selectData.genType,
        images: selectData.images,
      };

      dispatch(addTask(task));
      setSelectData(initialState);
      imagesRef.current?.clearImages();
    } else {
      alert('Please fill in all the required fields');
    }
  };

  console.log(selectData);

  return (
    <div className={styles.newTask}>
      <div>-----</div>
      <div>
        <input
          type='text'
          placeholder='Name'
          value={selectData?.name}
          onChange={(event) =>
            handleGetSelectedValues(event.currentTarget.value, 'name')
          }
        />
      </div>
      <div>
        <TableSelect
          options={['1x1', '9x16', '16x9']}
          value=''
          passSelectedValue={(value) =>
            handleGetSelectedValues(value, 'dimension')
          }
        />
      </div>
      <div>
        <TableSelect
          options={['mwpswxcudtwxb', '0xdoscyowl50c']}
          value=''
          passSelectedValue={(value) =>
            handleGetSelectedValues(value, 'templateId')
          }
        />
      </div>
      <div>
        <ImagePicker
          ref={imagesRef}
          passImages={(images) => handleGetSelectedValues(images, 'images')}
        />
      </div>
      <div>
        <textarea
          rows={5}
          placeholder='Text'
          value={selectData?.text}
          onChange={(event) =>
            handleGetSelectedValues(event.currentTarget.value, 'text')
          }
        />
      </div>
      <div>
        <input
          type='number'
          placeholder='Ammount'
          value={selectData?.ammount}
          min={1}
          onChange={(event) =>
            handleGetSelectedValues(event.currentTarget.value, 'ammount')
          }
        />
      </div>
      <div>
        <TableSelect
          value=''
          options={['cyclic', 'random']}
          passSelectedValue={(value) =>
            handleGetSelectedValues(value, 'genType')
          }
        />
      </div>
      <div>-----</div>
      <div>
        <button className='grey-btn' onClick={handleAddTask}>
          Add new task
        </button>
      </div>
    </div>
  );
}
