import {
  useState,
  ChangeEvent,
  useRef,
} from 'react';
import styles from './ImagePicker.module.css';
import { filesToDataURL } from '../../util/helpers';

type StateType = string;

type ImagePickerProps = {
  passImages: (image: string) => void;
  value: string;
};

export default function ImagePicker({ passImages, value }: ImagePickerProps) {
  const [selectedFile, setSelectedFile] = useState<StateType>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const image = event.target.files[0];

      const encryptedImage = await filesToDataURL(image);

      setSelectedFile(encryptedImage);
      passImages(encryptedImage);
      event.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile('');
    passImages('');

  };

  return (
    <div className={styles.imagePicker}>
      <input
        id='fileInput'
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        ref={inputRef}
      />
      <div className={styles.imageContainer}>
        {selectedFile && (
          <>
            <img
              className={styles.image}
              src={selectedFile}
              alt='image ref'
              width='200'
              height='200'
            />
            <div className={styles.removeBtn} onClick={handleRemoveImage}>
              +
            </div>
          </>
        )}
        {!selectedFile && (
          <div
            className={styles.imagePlaceholder}
            onClick={() => inputRef.current?.click()}
          >
            +
          </div>
        )}
      </div>
      {/* <button
          className={styles.button}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          Select images
        </button> */}
    </div>
  );
}
