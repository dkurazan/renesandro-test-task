import { useAppSelector } from '../../hooks/useReduxHooks';
import { sendGenerationRequest } from '../cards/GenerateBtnHelpers';

export default function GenerateButton({ taskId }: { taskId: string }) {
  const allButtons = useAppSelector((state) => state.generateBtn);
  const allTasks = useAppSelector((state) => state.tasks);

  const currentTask = allTasks.find((item) => item.id === taskId);
  const btnState = allButtons.find((item) => item.id === taskId);

  const handleOnGenerate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!btnState?.isBtnDisabled) {
      const dataForGeneration = {
        name: currentTask?.name,
        dimension: currentTask?.dimension,
        templateId: currentTask?.templateId,
        images: currentTask?.images,
        ammount: currentTask?.ammount,
        genType: currentTask?.genType,
        image_layers: currentTask?.images,
        text_layers: currentTask?.text,
      };

      console.log(dataForGeneration);
      

      // try {
      //   const result = await sendGenerationRequest(dataForGeneration, 'tz-front/generate_formats');
      //   console.log(result);
      //   dispatch(enableButton(taskId));
      // } catch (error) {
      //   console.error('There was a problem with the fetch operation:', error);
      //   alert('An error occurred while generating images. Please try again.');
      // }
    }
  };

  return (
    <button
      className='purple-btn'
      onClick={(event) => handleOnGenerate(event)}
      disabled={btnState?.isBtnDisabled}
      title={
        btnState?.isBtnDisabled
          ? 'You need to setup images generation first'
          : undefined
      }
    >
      Generate
    </button>
  );
}
