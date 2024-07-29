import Accordion from '../UI/Accordion';
import ImagePicker from '../UI/ImagePicker';
import CardSelect from './CardSelect';
import styles from './TaskCard.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { addImageData } from '../../store/slices/imagesSlice';
import { getLayersDataFromStore } from '../../util/helpers';
import { INPUTFIELDS_DATA } from '../../util/STATIC_DATA';

type ImageLayerProps = {
  title: string;
  taskId: string;
};

export default function ImageLayer({ title, taskId }: ImageLayerProps) {
  const imageLayersStoredData = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();

  // Stored layers data fetching
  const currentObject = imageLayersStoredData.find(
    (item) => item.taskId === taskId,
  );
  const storedData = getLayersDataFromStore(currentObject, title);

  const handleOnChange = (key: string, value: string) => {
    dispatch(addImageData({ taskId, imageId: title, key, value }));
  };

  return (
    <Accordion title={title}>
      <CardSelect
        value={storedData?.dimension ? storedData.dimension : ''}
        placeholder={`${INPUTFIELDS_DATA.dimension.name} (!)`}
        options={INPUTFIELDS_DATA.dimension.options}
        onChange={(val) => handleOnChange(INPUTFIELDS_DATA.dimension.name.toLowerCase(), val)}
      />
      <CardSelect
        value={storedData?.flow ? storedData.flow : ''}
        placeholder={`${INPUTFIELDS_DATA.flow.name} (!)`}
        options={INPUTFIELDS_DATA.flow.options}
        onChange={(val) => handleOnChange(INPUTFIELDS_DATA.flow.name.toLowerCase(), val)}
      />
      <div className='image-refs'>
        <h4>Image refs (!)</h4>
        <ImagePicker
          passImages={(val) => handleOnChange('image', val)}
          value={storedData?.image ? storedData.image : ''}
        />
      </div>
      <input
        className={styles.input}
        type='text'
        placeholder='Manual prompts'
        value={storedData?.manual_prompts ? storedData.manual_prompts : ''}
        onChange={(event) =>
          handleOnChange('manual_prompts', event.currentTarget.value)
        }
      />
      <input
        className={styles.input}
        type='number'
        placeholder='Generates per ref (!)'
        value={storedData?.gen_per_ref ? storedData.gen_per_ref : ''}
        onChange={(event) =>
          handleOnChange('gen_per_ref', event.currentTarget.value)
        }
      />
      <CardSelect
        value={storedData?.style ? storedData.style : ''}
        placeholder={`${INPUTFIELDS_DATA.style.name} (!)`}
        options={['An ultra-realistic photography', 'Anime style']}
        onChange={(val) => handleOnChange(INPUTFIELDS_DATA.style.name.toLowerCase(), val)}
      />
    </Accordion>
  );
}
