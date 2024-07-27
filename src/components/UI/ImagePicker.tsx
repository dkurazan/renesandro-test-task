import { useState, ChangeEvent, forwardRef, useImperativeHandle } from 'react';
import styles from './ImagePicker.module.css';
import { filesToDataURL } from '../../util/helpers';

type StateType = File[];

export type EncryptedImagesType = { name: string; url: string }[];

type ImagePickerProps = {
  passImages: (images: EncryptedImagesType) => void;
};

const ImagePicker = forwardRef<{ clearImages: () => void }, ImagePickerProps>(
  function ImagePicker({ passImages }, ref) {
    const [selectedFiles, setSelectedFiles] = useState<StateType>([]);

    useImperativeHandle(ref, () => ({
      clearImages: () => setSelectedFiles([]),
    }));

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => {
          return [...prevFiles, ...files];
        });

        const encryptedImages = await filesToDataURL([
          ...selectedFiles,
          ...files,
        ]);

        passImages(encryptedImages);
      }
    };

    return (
      <div className={styles.imagePicker}>
        <input
          id='fileInput'
          type='file'
          multiple
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <div>
          <ul className={styles.imageList}>
            {selectedFiles.map((file, index) => (
              <li className={styles.imageListItem} key={index}>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={styles.button}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          Select images
        </button>
      </div>
    );
  },
);

export default ImagePicker;
