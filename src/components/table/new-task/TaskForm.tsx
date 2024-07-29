import TableSelect from './TableSelect';
import TableLayerInput from './TableLayersInput';
import { INPUTFIELDS_DATA } from '../../../util/STATIC_DATA';
import { type SelectedData } from './NewTaskHelpers';

type TaskFormProps = {
  inputData: SelectedData;
  onAddInputData: (value: string | string[], key: string) => void;
  imagesRef: React.Ref<{ resetList: () => void }>;
  textRef: React.Ref<{ resetList: () => void }>;
};

export default function TaskForm({
  inputData,
  onAddInputData,
  textRef,
  imagesRef,
}: TaskFormProps) {
  return (
    <>
      <div>-----</div>
      <div>
        <input
          type='text'
          placeholder='Name'
          value={inputData?.name}
          onChange={(event) =>
            onAddInputData(event.currentTarget.value, 'name')
          }
        />
      </div>
      <div>
        <TableSelect
          options={INPUTFIELDS_DATA.dimension.options}
          value=''
          passSelectedValue={(value) =>
            onAddInputData(value, INPUTFIELDS_DATA.dimension.name.toLowerCase())
          }
        />
      </div>
      <div>
        <TableSelect
          options={INPUTFIELDS_DATA.templateId.options}
          value=''
          passSelectedValue={(value) =>
            onAddInputData(value, INPUTFIELDS_DATA.templateId.name)
          }
        />
      </div>
      <div>
        <TableLayerInput
          ref={imagesRef}
          placeholder='Image layers'
          onChange={(list) => onAddInputData(list, 'images')}
        />
      </div>
      <div>
        <TableLayerInput
          ref={textRef}
          placeholder='Text layers'
          onChange={(list) => onAddInputData(list, 'text')}
        />
      </div>
      <div>
        <input
          type='number'
          placeholder='Ammount'
          value={inputData?.ammount}
          min={1}
          onChange={(event) =>
            onAddInputData(event.currentTarget.value, 'ammount')
          }
        />
      </div>
      <div>
        <TableSelect
          value=''
          options={INPUTFIELDS_DATA.genType.options}
          passSelectedValue={(value) =>
            onAddInputData(value, INPUTFIELDS_DATA.genType.name)
          }
        />
      </div>
      <div>-----</div>
    </>
  );
}
