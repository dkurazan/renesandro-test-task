import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../Table.module.css';

type TableLayerInputProps = {
  placeholder: string;
  onChange: (layersList: string[]) => void;
};

const TableLayerInput = forwardRef<
  { resetList: () => void },
  TableLayerInputProps
>(function TableLayerInput({ placeholder, onChange }, ref) {
  const [inputData, setInputData] = useState<string>('');
  const [layersList, setLayersList] = useState<string[]>([]);

  // Resetting lists
  useImperativeHandle(ref, () => ({
    resetList: () => setLayersList([]),
  }));

  const handleAddLayer = () => {
    const itemIndex = layersList.find((item) => item === inputData);

    // Validating input data
    if (inputData !== '' && !itemIndex) {
      setLayersList((prevList) => [...prevList, inputData]);
      onChange([...layersList, inputData]);
    } else {
      alert('You cannot add empty or duplicate values');
    }

    setInputData('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddLayer();
    }
  };

  return (
    <div className={styles.layer}>
      <ul className={styles.imageList}>
        {layersList.map((layer) => (
          <li key={`${layer}---${Math.random() * 1000}`}>{layer}</li>
        ))}
      </ul>
      <div className={styles.actions}>
        <input
          type='text'
          placeholder={placeholder}
          value={inputData}
          onChange={(e) => setInputData(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleAddLayer}>+</button>
      </div>
    </div>
  );
});

export default TableLayerInput;
