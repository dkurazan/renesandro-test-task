import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks';
import { saveCreoGeneration } from '../../store/slices/resultUrlSlice';
import { sendGenerationRequest } from '../cards/GenerateBtnHelpers';

type GenerateBtnProps = {
  taskId: string;
  name: string;
  dimension: string;
};

export default function GenerateButton({
  taskId,
  name,
  dimension,
}: GenerateBtnProps) {
  const allButtons = useAppSelector((state) => state.generateBtn);
  const allTasks = useAppSelector((state) => state.tasks);
  const creoGenerationState = useAppSelector((state) => state.creoGeneration);
  const dispatch = useAppDispatch();

  const currentTask = allTasks.find((item) => item.id === taskId);
  const btnState = allButtons.find((item) => item.id === taskId);
  const currentCreoGenState = creoGenerationState.find(
    (item) => item.id === taskId,
  );

  const handleOnGenerate = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (!btnState?.isBtnDisabled) {
      const dataForGeneration = {
        task_name: currentTask!.name,
        dimension: currentTask!.dimension,
        template_id: currentTask!.templateId,
        amount: currentTask!.ammount,
        gen_type: currentTask!.genType,
        image_layers: currentTask!.images,
        text_layers: currentTask!.text,
      };

      try {
        const result = await sendGenerationRequest(
          dataForGeneration,
          'tz-front/generate_formats',
        );
        console.log(result);
        dispatch(saveCreoGeneration({ id: taskId, name, dimension }));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred while generating images. Please try again.');
      }
    }
  };

  return (
    <>
      {!currentCreoGenState && (
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
      )}
      {currentCreoGenState && (
        <p className='generated' onClick={(e) => e.stopPropagation()}>
          Generated
        </p>
      )}
    </>
  );
}
