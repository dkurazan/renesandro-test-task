import { useAppSelector } from '../../hooks/useReduxHooks';

type ResultUrlProps = {
  taskId: string;
};

export default function ResultUrl({ taskId }: ResultUrlProps) {
  const creoGenerationState = useAppSelector((state) => state.creoGeneration);
  const currentGenerationState = creoGenerationState.find(
    (item) => item.id === taskId,
  );

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (currentGenerationState) {
      event.stopPropagation();
    }
  };

  return (
    <div onClick={handleOnClick}>
      {currentGenerationState && (
        <a href={currentGenerationState.url} target='_blank'>
          Result link
        </a>
      )}
      {!currentGenerationState && '-----'}
    </div>
  );
}
