import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { enableButton } from '../../store/slices/generateBtnSlice';
import { getDataForImagesGeneration } from './GenerateBtnHelpers';
import { sendGenerationRequest } from './GenerateBtnHelpers';

type GenerateBtnProps = {
  children: ReactNode;
  taskId: string;
};

export default function GenerateBtn({ children, taskId }: GenerateBtnProps) {
  const layersData = useAppSelector((state) => state.images);
  const tasks = useAppSelector((state) => state.tasks);
  const allButtons = useAppSelector((state) => state.generateBtn);

  const dispatch = useAppDispatch();

  const btnState = allButtons.find((item) => item.id === taskId);
  const currenLayersArr = layersData.find((item) => item.taskId === taskId);
  const layerNames = tasks.find((item) => item.id === taskId);

  const handleGenerate = async () => {
    if (
      !currenLayersArr ||
      currenLayersArr.images.length !== layerNames!.images.length
    ) {
      alert('Please fill in all the required fields');
      return;
    }

    const dataForGeneration = getDataForImagesGeneration(
      currenLayersArr.images,
    );

    if (!dataForGeneration[0]) {
      return;
    }

    if (!dataForGeneration || dataForGeneration.length === 0) {
      alert('Please fill in all the required fields');
      return;
    }

    console.log(dataForGeneration);
    dispatch(enableButton(taskId));

    // try {
    //   const result = await sendGenerationRequest(dataForGeneration[0], 'tz-front/generate_images');
    //   console.log(result);
    //   dispatch(enableButton(taskId));
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    //   alert('An error occurred while generating images. Please try again.');
    // }
  };

  return (
    <>
      {btnState?.isBtnDisabled && (
        <button className='black-btn' onClick={handleGenerate}>
          {children}
        </button>
      )}
      {!btnState?.isBtnDisabled && <p style={{ color: 'green' }}>Generated</p>}
    </>
  );
}